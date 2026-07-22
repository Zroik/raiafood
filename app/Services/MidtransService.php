<?php

namespace App\Services;

use Midtrans\Config;
use Midtrans\Snap;
use Midtrans\Notification;
use App\Models\Order;

use Midtrans\Transaction;
use Illuminate\Support\Facades\DB;
use App\Models\Promo;

class MidtransService
{
    public function __construct()
    {
        Config::$serverKey = config('midtrans.server_key');
        Config::$isProduction = config('midtrans.is_production');
        Config::$isSanitized = config('midtrans.is_sanitized');
        Config::$is3ds = config('midtrans.is_3ds');
    }

    public function createSnapToken(Order $order): string
    {
        $items = [];
        foreach ($order->items as $item) {
            $items[] = [
                'id' => $item->product_id,
                'price' => (int) $item->product_price,
                'quantity' => $item->quantity,
                'name' => substr($item->product_name, 0, 50),
            ];
        }

        if ($order->discount > 0) {
            $items[] = [
                'id' => 'DISCOUNT',
                'price' => (int) -$order->discount,
                'quantity' => 1,
                'name' => 'Diskon' . ($order->promo_code ? " ({$order->promo_code})" : ''),
            ];
        }

        if ($order->shipping_cost > 0) {
            $items[] = [
                'id' => 'SHIPPING',
                'price' => (int) $order->shipping_cost,
                'quantity' => 1,
                'name' => 'Ongkos Kirim',
            ];
        }

        $customerName = $order->user ? $order->user->name : ($order->shipping_address['name'] ?? 'Guest');
        $customerEmail = $order->user ? $order->user->email : ($order->shipping_address['email'] ?? 'guest@raiafood.com');
        $customerPhone = $order->user ? ($order->user->phone ?? '') : ($order->shipping_address['phone'] ?? '');

        $params = [
            'transaction_details' => [
                'order_id' => $order->order_number,
                'gross_amount' => (int) $order->total,
            ],
            'item_details' => $items,
            'customer_details' => [
                'first_name' => $customerName,
                'email' => $customerEmail,
                'phone' => $customerPhone,
            ],
        ];

        return Snap::getSnapToken($params);
    }

    public function handleNotification(): Notification
    {
        return new Notification();
    }

    public function checkStatusAndUpdate(Order $order)
    {
        if ($order->payment_status !== 'pending') {
            return;
        }

        try {
            $status = Transaction::status($order->order_number);
            
            $transactionStatus = $status->transaction_status ?? null;
            $paymentType = $status->payment_type ?? null;
            $fraudStatus = $status->fraud_status ?? null;
            $transactionId = $status->transaction_id ?? null;

            if (!$transactionStatus) {
                return;
            }

            $isPaid = $transactionStatus == 'settlement' || ($transactionStatus == 'capture' && $fraudStatus == 'accept');
            $isFailedOrCancelled = in_array($transactionStatus, ['deny', 'cancel']);
            $isExpired = $transactionStatus == 'expire';

            $oldPaymentStatus = $order->payment_status;

            if ($isPaid) {
                DB::transaction(function () use ($order, $transactionId, $paymentType) {
                    $order->update([
                        'payment_status' => 'paid',
                        'status' => 'processing',
                        'paid_at' => now(),
                        'midtrans_transaction_id' => $transactionId,
                        'payment_type' => $paymentType,
                    ]);
                });
            } elseif ($isFailedOrCancelled) {
                if ($oldPaymentStatus !== 'failed' && $order->status !== 'cancelled') {
                    DB::transaction(function () use ($order, $transactionId, $paymentType) {
                        $order->update([
                            'payment_status' => 'failed',
                            'status' => 'cancelled',
                            'midtrans_transaction_id' => $transactionId,
                            'payment_type' => $paymentType,
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
                }
            } elseif ($isExpired) {
                if ($oldPaymentStatus !== 'expired' && $order->status !== 'cancelled') {
                    DB::transaction(function () use ($order, $transactionId, $paymentType) {
                        $order->update([
                            'payment_status' => 'expired',
                            'status' => 'cancelled',
                            'midtrans_transaction_id' => $transactionId,
                            'payment_type' => $paymentType,
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
                }
            }
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::warning("Midtrans check status error for order {$order->order_number}: " . $e->getMessage());
        }
    }
}
