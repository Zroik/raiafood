<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Inertia\Inertia;

use App\Models\Promo;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function index(\App\Services\MidtransService $midtrans)
    {
        $pendingOrders = Order::where('user_id', auth()->id())
            ->where('payment_status', 'pending')
            ->get();

        foreach ($pendingOrders as $order) {
            $midtrans->checkStatusAndUpdate($order);
        }

        $orders = Order::where('user_id', auth()->id())
            ->with('items')
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('Shop/OrderHistory', [
            'orders' => $orders,
        ]);
    }

    public function show(string $orderNumber, \App\Services\MidtransService $midtrans)
    {
        $order = Order::where('order_number', $orderNumber)
            ->where('user_id', auth()->id())
            ->with('items.product')
            ->firstOrFail();

        if ($order->payment_status === 'pending') {
            $midtrans->checkStatusAndUpdate($order);
            $order = $order->fresh(['items.product']);
        }

        return Inertia::render('Shop/OrderDetail', [
            'order' => $order,
            'midtransClientKey' => config('midtrans.client_key'),
            'midtransSnapUrl' => config('midtrans.snap_url'),
        ]);
    }

    public function cancel(string $orderNumber)
    {
        $order = Order::where('order_number', $orderNumber)
            ->where('user_id', auth()->id())
            ->with('items.product')
            ->firstOrFail();

        if ($order->status !== 'pending' || $order->payment_status !== 'pending') {
            return back()->with('error', 'Pesanan ini tidak dapat dibatalkan.');
        }

        DB::transaction(function () use ($order) {
            $order->update([
                'status' => 'cancelled',
                'payment_status' => 'failed',
            ]);

            // Restore stock
            foreach ($order->items as $item) {
                $item->product->increment('stock', $item->quantity);
            }

            // Restore promo usage count
            if ($order->promo_code) {
                $promo = Promo::where('code', $order->promo_code)->first();
                if ($promo) {
                    $promo->decrement('used_count');
                }
            }
        });

        return back()->with('success', 'Pesanan Anda berhasil dibatalkan.');
    }
}
