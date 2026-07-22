import { Head, Link } from '@inertiajs/react';
import ShopLayout from '@/Layouts/ShopLayout';
import { useEffect } from 'react';

const renderStatusBadge = (status, paymentStatus) => {
    if (status === 'cancelled' || paymentStatus === 'failed' || paymentStatus === 'expired') {
        return (
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                Dibatalkan
            </span>
        );
    }
    if (paymentStatus === 'pending') {
        return (
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
                Menunggu Pembayaran
            </span>
        );
    }
    if (paymentStatus === 'paid') {
        if (status === 'delivered') {
            return (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
                    Selesai
                </span>
            );
        }
        if (status === 'shipped') {
            return (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                    Dikirim
                </span>
            );
        }
        return (
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#FAE6FF] text-[#843799]">
                Diproses
            </span>
        );
    }
    return (
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
            {status}
        </span>
    );
};

export default function OrderDetail({ order, midtransClientKey, midtransSnapUrl }) {
    useEffect(() => {
        if (order.payment_status === 'pending' && midtransSnapUrl) {
            const script = document.createElement('script');
            script.src = midtransSnapUrl;
            script.setAttribute('data-client-key', midtransClientKey);
            script.async = true;
            document.head.appendChild(script);
            return () => {
                document.head.removeChild(script);
            };
        }
    }, [order.payment_status, midtransSnapUrl, midtransClientKey]);

    const payAgain = () => {
        if (order.midtrans_snap_token && window.snap) {
            window.snap.pay(order.midtrans_snap_token, {
                onSuccess: () => { window.location.reload(); },
                onPending: () => { window.location.reload(); },
                onError: () => { alert('Pembayaran gagal. Silakan coba lagi.'); },
                onClose: () => { window.location.reload(); },
            });
        } else {
            alert('Layanan pembayaran belum siap. Silakan refresh halaman.');
        }
    };

    return (
        <ShopLayout>
            <Head title={`Pesanan ${order.order_number} - RaiaFood`} />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Link href="/orders" className="text-sm text-[#843799] hover:underline mb-4 inline-block">← Kembali ke Pesanan Saya</Link>
                <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
                    <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">{order.order_number}</h1>
                            <p className="text-sm text-gray-500 mt-1">{new Date(order.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                        </div>
                        <div>
                            {renderStatusBadge(order.status, order.payment_status)}
                        </div>
                    </div>

                    {/* Items */}
                    <div className="space-y-3 mb-6">
                        {order.items?.map(item => (
                            <div key={item.id} className="flex items-center gap-4 bg-gray-50 rounded-xl p-4">
                                <div className="w-14 h-14 rounded-lg bg-[#FAE6FF] flex items-center justify-center flex-shrink-0">
                                    {item.product?.image ? <img src={`/storage/${item.product.image}`} alt="" className="w-full h-full object-contain p-1" /> : <span className="text-xl">🍪</span>}
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-gray-900 text-sm">{item.product_name}</p>
                                    <p className="text-xs text-gray-500">Rp {Number(item.product_price).toLocaleString('id-ID')} × {item.quantity}</p>
                                </div>
                                <p className="font-semibold text-gray-900 text-sm">Rp {Number(item.subtotal).toLocaleString('id-ID')}</p>
                            </div>
                        ))}
                    </div>

                    {/* Summary */}
                    <div className="border-t pt-4 space-y-2">
                        <div className="flex justify-between text-sm"><span className="text-gray-500">Subtotal</span><span>Rp {Number(order.subtotal).toLocaleString('id-ID')}</span></div>
                        {order.discount > 0 && <div className="flex justify-between text-sm"><span className="text-emerald-600">Diskon</span><span className="text-emerald-600">-Rp {Number(order.discount).toLocaleString('id-ID')}</span></div>}
                        <div className="flex justify-between text-sm"><span className="text-gray-500">Ongkir</span><span>{Number(order.shipping_cost) === 0 ? 'Gratis' : `Rp ${Number(order.shipping_cost).toLocaleString('id-ID')}`}</span></div>
                        <div className="flex justify-between text-lg font-bold pt-2 border-t"><span>Total</span><span className="text-[#843799]">Rp {Number(order.total).toLocaleString('id-ID')}</span></div>
                    </div>

                    {order.payment_status === 'pending' && order.status === 'pending' && (
                        <div className="flex flex-col sm:flex-row gap-4 mt-6">
                            <button onClick={payAgain} className="flex-1 bg-[#843799] text-white py-3 rounded-xl font-semibold hover:bg-[#60396A] transition-colors">
                                Bayar Sekarang
                            </button>
                            <Link 
                                href={route('shop.orders.cancel', order.order_number)} 
                                method="post" 
                                as="button" 
                                className="flex-1 bg-white border border-red-200 text-red-600 py-3 rounded-xl font-semibold hover:bg-red-50 transition-colors text-center"
                                onClick={(e) => {
                                    if (!confirm('Apakah Anda yakin ingin membatalkan pesanan ini?')) {
                                        e.preventDefault();
                                    }
                                }}
                            >
                                Batalkan Pesanan
                            </Link>
                        </div>
                    )}
                </div>

                {/* Shipping */}
                {order.shipping_address && (
                    <div className="bg-white rounded-2xl border border-gray-100 p-6">
                        <h2 className="font-semibold text-gray-900 mb-3">Alamat Pengiriman</h2>
                        <div className="text-sm text-gray-600 space-y-1">
                            <p className="font-medium text-gray-900">{order.shipping_address.name}</p>
                            <p>{order.shipping_address.phone}</p>
                            <p>{order.shipping_address.address}</p>
                            <p>{order.shipping_address.city}, {order.shipping_address.postal_code}</p>
                        </div>
                        {order.notes && <p className="mt-3 text-sm text-gray-500 italic">Catatan: {order.notes}</p>}
                    </div>
                )}
            </div>
        </ShopLayout>
    );
}
