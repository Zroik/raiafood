<?php

namespace App\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Promo;
use App\Services\MidtransService;
use Illuminate\Http\Request;

class MidtransController extends Controller
{
    public function notification(Request $request, MidtransService $midtrans)
    {
        try {
            $notification = $midtrans->handleNotification();

            $order = Order::where('order_number', $notification->order_id)->first();

            if (!$order) {
                return response()->json(['message' => 'Order not found'], 404);
            }

            $transactionStatus = $notification->transaction_status;
            $paymentType = $notification->payment_type;
            $fraudStatus = $notification->fraud_status ?? null;

            // Check if transaction status is capture and accept
            $isPaid = $transactionStatus == 'settlement' || ($transactionStatus == 'capture' && $fraudStatus == 'accept');
            $isFailedOrCancelled = in_array($transactionStatus, ['deny', 'cancel']);
            $isExpired = $transactionStatus == 'expire';

            // 1. Guard: If order is already paid, do not downgrade/cancel/expire it
            if ($order->payment_status === 'paid' && ($transactionStatus == 'pending' || $isFailedOrCancelled || $isExpired)) {
                return response()->json(['message' => 'Order already paid, update ignored']);
            }

            $order->midtrans_transaction_id = $notification->transaction_id;
            $order->payment_type = $paymentType;

            // Save old payment status to detect transition changes
            $oldPaymentStatus = $order->payment_status;

            if ($isPaid) {
                // If the order is paid, transition to paid status
                $order->payment_status = 'paid';
                $order->status = 'processing';
                $order->paid_at = now();

                // Transitioning from failed/expired/cancelled back to paid (late payment)
                if (in_array($oldPaymentStatus, ['failed', 'expired']) || $order->status === 'cancelled') {
                    // Re-decrement stock (since it was restored on cancel/expire)
                    foreach ($order->items as $item) {
                        $item->product->decrement('stock', $item->quantity);
                    }
                    // Re-increment promo count (since it was decremented on cancel/expire)
                    if ($order->promo_code) {
                        $promo = Promo::where('code', $order->promo_code)->first();
                        if ($promo) {
                            $promo->increment('used_count');
                        }
                    }
                }
            } elseif ($transactionStatus == 'pending') {
                $order->payment_status = 'pending';
            } elseif ($isFailedOrCancelled) {
                // Prevent duplicate/double cancellation stock updates
                if ($oldPaymentStatus !== 'failed' && $order->status !== 'cancelled') {
                    $order->payment_status = 'failed';
                    $order->status = 'cancelled';

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
                }
            } elseif ($isExpired) {
                // Prevent duplicate expiration stock updates
                if ($oldPaymentStatus !== 'expired' && $order->status !== 'cancelled') {
                    $order->payment_status = 'expired';
                    $order->status = 'cancelled';

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
                }
            } elseif ($transactionStatus == 'refund') {
                $order->payment_status = 'refunded';
            }

            $order->save();

            return response()->json(['message' => 'OK']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error: ' . $e->getMessage()], 500);
        }
    }
}
