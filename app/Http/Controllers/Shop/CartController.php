<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    public function index()
    {
        if (auth()->check()) {
            $cartItems = Cart::with('product.category')
                ->where('user_id', auth()->id())
                ->get();
        } else {
            $sessionCart = session('cart', []);
            $cartItems = [];
            foreach ($sessionCart as $productId => $item) {
                $product = Product::with('category')->find($productId);
                if ($product) {
                    $cartItems[] = (object)[
                        'id' => 'guest_' . $productId,
                        'product_id' => $productId,
                        'quantity' => $item['quantity'],
                        'product' => $product
                    ];
                }
            }
            $cartItems = collect($cartItems);
        }

        return Inertia::render('Shop/Cart', [
            'cartItems' => $cartItems,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'integer|min:1|max:99',
        ]);

        $product = Product::findOrFail($request->product_id);
        $qty = $request->quantity ?? 1;

        if ($product->stock < $qty) {
            return back()->with('error', 'Stok tidak mencukupi.');
        }

        if (auth()->check()) {
            $cart = Cart::where('user_id', auth()->id())
                ->where('product_id', $request->product_id)
                ->first();

            if ($cart) {
                $newQty = $cart->quantity + $qty;
                if ($newQty > $product->stock) {
                    return back()->with('error', 'Stok tidak mencukupi.');
                }
                $cart->update(['quantity' => $newQty]);
            } else {
                Cart::create([
                    'user_id' => auth()->id(),
                    'product_id' => $request->product_id,
                    'quantity' => $qty,
                ]);
            }
        } else {
            $cart = session('cart', []);
            $currentQty = isset($cart[$request->product_id]) ? $cart[$request->product_id]['quantity'] : 0;
            $newQty = $currentQty + $qty;

            if ($newQty > $product->stock) {
                return back()->with('error', 'Stok tidak mencukupi.');
            }

            $cart[$request->product_id] = [
                'product_id' => $request->product_id,
                'quantity' => $newQty
            ];
            session(['cart' => $cart]);
        }

        return back()->with('success', 'Produk berhasil ditambahkan ke keranjang!');
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1|max:99',
        ]);

        if (auth()->check()) {
            $cart = Cart::findOrFail($id);
            if ($cart->user_id !== auth()->id()) {
                abort(403);
            }

            if ($request->quantity > $cart->product->stock) {
                return back()->with('error', 'Stok tidak mencukupi.');
            }

            $cart->update(['quantity' => $request->quantity]);
        } else {
            $productId = str_replace('guest_', '', $id);
            $product = Product::findOrFail($productId);

            if ($request->quantity > $product->stock) {
                return back()->with('error', 'Stok tidak mencukupi.');
            }

            $cart = session('cart', []);
            if (isset($cart[$productId])) {
                $cart[$productId]['quantity'] = $request->quantity;
                session(['cart' => $cart]);
            }
        }

        return back()->with('success', 'Keranjang diperbarui.');
    }

    public function destroy($id)
    {
        if (auth()->check()) {
            $cart = Cart::findOrFail($id);
            if ($cart->user_id !== auth()->id()) {
                abort(403);
            }

            $cart->delete();
        } else {
            $productId = str_replace('guest_', '', $id);
            $cart = session('cart', []);
            if (isset($cart[$productId])) {
                unset($cart[$productId]);
                session(['cart' => $cart]);
            }
        }

        return back()->with('success', 'Produk dihapus dari keranjang.');
    }

    public function count()
    {
        if (auth()->check()) {
            $count = Cart::where('user_id', auth()->id())->sum('quantity');
        } else {
            $cart = session('cart', []);
            $count = 0;
            foreach ($cart as $item) {
                $count += $item['quantity'];
            }
        }
        return response()->json(['count' => $count]);
    }

    public static function migrateSessionCartToDatabase($userId)
    {
        $sessionCart = session('cart', []);
        if (empty($sessionCart)) {
            return;
        }

        foreach ($sessionCart as $productId => $item) {
            $cart = Cart::where('user_id', $userId)
                ->where('product_id', $productId)
                ->first();

            if ($cart) {
                $cart->update(['quantity' => min(99, $cart->quantity + $item['quantity'])]);
            } else {
                Cart::create([
                    'user_id' => $userId,
                    'product_id' => $productId,
                    'quantity' => $item['quantity'],
                ]);
            }
        }

        session()->forget('cart');
    }
}
