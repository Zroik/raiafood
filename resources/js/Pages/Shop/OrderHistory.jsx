import { Head, Link } from '@inertiajs/react';
import ShopLayout from '@/Layouts/ShopLayout';

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

export default function OrderHistory({ orders }) {
    return (
        <ShopLayout>
            <Head title="Pesanan Saya - RaiaFood" />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8" style={{ fontFamily: 'Outfit, sans-serif' }}>Pesanan Saya</h1>

                {orders.data.length === 0 ? (
                    <div className="text-center py-20">
                        <span className="text-5xl mb-4 block">📦</span>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Belum ada pesanan</h3>
                        <p className="text-gray-500 text-sm mb-6">Anda belum membuat pesanan apapun.</p>
                        <Link href="/products" className="inline-flex items-center gap-2 bg-[#843799] text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-[#60396A]">Mulai Belanja</Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {orders.data.map(order => (
                            <Link key={order.id} href={`/orders/${order.order_number}`} className="block bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md hover:border-purple-200 transition-all">
                                <div className="flex flex-wrap items-center justify-between gap-4">
                                    <div>
                                        <p className="font-semibold text-gray-900">{order.order_number}</p>
                                        <p className="text-sm text-gray-500 mt-1">{new Date(order.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                    </div>
                                    <div>
                                        {renderStatusBadge(order.status, order.payment_status)}
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-[#843799]">Rp {Number(order.total).toLocaleString('id-ID')}</p>
                                        <p className="text-xs text-gray-500">{order.items?.length || 0} item</p>
                                    </div>
                                </div>
                            </Link>
                        ))}

                        {orders.links && orders.last_page > 1 && (
                            <div className="flex justify-center gap-2 mt-8">
                                {orders.links.map((link, i) => (
                                    <Link key={i} href={link.url || '#'} className={`px-4 py-2 rounded-lg text-sm font-medium ${link.active ? 'bg-[#843799] text-white' : link.url ? 'bg-gray-50 text-gray-700 hover:bg-[#FAE6FF]' : 'text-gray-300'}`} dangerouslySetInnerHTML={{ __html: link.label }} />
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </ShopLayout>
    );
}
