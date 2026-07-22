<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Promo;
use App\Models\Product;
use App\Models\Setting;
use App\Services\MidtransService;
use App\Services\ShippingService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CheckoutController extends Controller
{
    private function getCartItems()
    {
        if (auth()->check()) {
            return Cart::with('product')
                ->where('user_id', auth()->id())
                ->get();
        }

        $sessionCart = session('cart', []);
        $cartItems = [];
        foreach ($sessionCart as $productId => $item) {
            $product = Product::find($productId);
            if ($product) {
                $cartItems[] = (object)[
                    'id' => 'guest_' . $productId,
                    'product_id' => $productId,
                    'quantity' => $item['quantity'],
                    'product' => $product
                ];
            }
        }
        return collect($cartItems);
    }

    public function index()
    {
        $cartItems = $this->getCartItems();

        if ($cartItems->isEmpty()) {
            return redirect()->route('shop.cart')->with('error', 'Keranjang Anda kosong.');
        }

        return Inertia::render('Shop/Checkout', [
            'cartItems' => $cartItems,
            'shippingCost' => (float) Setting::getValue('shipping_cost', 15000),
            'freeShippingMin' => (float) Setting::getValue('free_shipping_min', 150000),
            'midtransClientKey' => config('midtrans.client_key'),
            'midtransSnapUrl' => config('midtrans.snap_url'),
        ]);
    }

    public function store(Request $request, MidtransService $midtrans)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => auth()->check() ? 'nullable|email|max:255' : 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'address' => 'required|string',
            'city' => 'required|string',
            'postal_code' => 'required|string|max:10',
            'notes' => 'nullable|string|max:500',
            'promo_code' => 'nullable|string|max:50',
            'destination_id' => 'required|integer',
            'courier_code' => 'required|string|in:jne,pos,tiki',
            'courier_service' => 'required|string',
            'shipping_cost' => 'required|numeric',
        ]);

        $cartItems = $this->getCartItems();

        if ($cartItems->isEmpty()) {
            return back()->with('error', 'Keranjang Anda kosong.');
        }

        return DB::transaction(function () use ($request, $cartItems, $midtrans) {
            $subtotal = 0;
            foreach ($cartItems as $item) {
                $price = $item->product->discount_price ?? $item->product->price;
                $subtotal += $price * $item->quantity;
            }

            // Apply promo
            $discount = 0;
            $promoCode = null;
            if ($request->filled('promo_code')) {
                $promo = Promo::where('code', strtoupper($request->promo_code))
                    ->valid()
                    ->first();

                if ($promo) {
                    $discount = $promo->calculateDiscount($subtotal);
                    $promoCode = $promo->code;
                    $promo->increment('used_count');
                }
            }

            // Shipping
            $shippingCost = (float) $request->shipping_cost;

            // Optional Backend Cross-check validation to prevent tampering
            try {
                $totalWeight = 0;
                foreach ($cartItems as $item) {
                    $weight = (float) ($item->product->weight ?? 100);
                    $totalWeight += $weight * $item->quantity;
                }
                $shippingService = app(ShippingService::class);
                $results = $shippingService->calculateCost(
                    $request->destination_id,
                    $totalWeight,
                    $request->courier_code
                );
                if (!empty($results)) {
                    $found = false;
                    foreach ($results[0]['costs'] ?? [] as $costOption) {
                        if ($costOption['service'] === $request->courier_service) {
                            $shippingCost = (float) ($costOption['cost'][0]['value'] ?? 0);
                            $found = true;
                            break;
                        }
                    }
                }
            } catch (\Exception $e) {
                // Keep the input request shipping cost in case of API failure
            }

            $freeShippingMin = (float) Setting::getValue('free_shipping_min', 150000);
            if ($subtotal >= $freeShippingMin) {
                $shippingCost = 0;
            }

            $total = $subtotal - $discount + $shippingCost;

            // Create order
            $order = Order::create([
                'user_id' => auth()->id(),
                'order_number' => Order::generateOrderNumber(),
                'subtotal' => $subtotal,
                'discount' => $discount,
                'shipping_cost' => $shippingCost,
                'total' => $total,
                'promo_code' => $promoCode,
                'shipping_address' => [
                    'name' => $request->name,
                    'email' => $request->email ?: (auth()->user()?->email ?: ''),
                    'phone' => $request->phone,
                    'address' => $request->address,
                    'city' => $request->city,
                    'postal_code' => $request->postal_code,
                    'destination_id' => $request->destination_id,
                    'courier_code' => $request->courier_code,
                    'courier_service' => $request->courier_service,
                ],
                'notes' => $request->notes,
            ]);

            // Create order items
            foreach ($cartItems as $item) {
                $price = $item->product->discount_price ?? $item->product->price;
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item->product_id,
                    'product_name' => $item->product->name,
                    'product_price' => $price,
                    'quantity' => $item->quantity,
                    'subtotal' => $price * $item->quantity,
                ]);

                // Reduce stock
                $item->product->decrement('stock', $item->quantity);
            }

            // Generate Midtrans Snap Token
            $order->load('items', 'user');
            $snapToken = $midtrans->createSnapToken($order);
            $order->update(['midtrans_snap_token' => $snapToken]);

            // Clear cart
            if (auth()->check()) {
                Cart::where('user_id', auth()->id())->delete();
            } else {
                session()->forget('cart');
            }

            return response()->json([
                'snap_token' => $snapToken,
                'order_number' => $order->order_number,
            ]);
        });
    }

    public function applyPromo(Request $request)
    {
        $request->validate(['code' => 'required|string']);

        $promo = Promo::where('code', strtoupper($request->code))
            ->valid()
            ->first();

        if (!$promo) {
            return response()->json(['valid' => false, 'message' => 'Kode promo tidak valid atau sudah kadaluarsa.']);
        }

        $cartItems = $this->getCartItems();

        $subtotal = 0;
        foreach ($cartItems as $item) {
            $price = $item->product->discount_price ?? $item->product->price;
            $subtotal += $price * $item->quantity;
        }

        $discount = $promo->calculateDiscount($subtotal);

        return response()->json([
            'valid' => $discount > 0,
            'discount' => $discount,
            'message' => $discount > 0
                ? "Diskon Rp " . number_format($discount, 0, ',', '.') . " berhasil diterapkan!"
                : "Minimum pembelian belum terpenuhi (Rp " . number_format($promo->min_order, 0, ',', '.') . ").",
        ]);
    }

    public function searchCities(Request $request, ShippingService $shippingService)
    {
        $keyword = $request->query('keyword', '');
        $cities = $shippingService->searchCities($keyword);
        return response()->json($cities);
    }

    public function calculateShippingCost(Request $request, ShippingService $shippingService)
    {
        $request->validate([
            'destination_id' => 'required|integer',
            'courier' => 'required|string|in:jne,pos,tiki',
        ]);

        $cartItems = $this->getCartItems();

        $totalWeight = 0;
        foreach ($cartItems as $item) {
            $weight = (float) ($item->product->weight ?? 100);
            $totalWeight += $weight * $item->quantity;
        }

        $results = $shippingService->calculateCost(
            $request->destination_id,
            $totalWeight,
            $request->courier
        );

        return response()->json($results);
    }
}
