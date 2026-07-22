import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Show({ order }) {
    const { data, setData, patch, processing } = useForm({
        status: order.status || 'pending',
    });

    const handleStatusUpdate = (e) => {
        e.preventDefault();
        patch(route('admin.orders.status', order.id));
    };

    const statusColors = {
        pending: 'bg-yellow-50 text-yellow-700 border-yellow-100',
        processing: 'bg-blue-50 text-blue-700 border-blue-100',
        shipped: 'bg-purple-50 text-purple-700 border-purple-100',
        delivered: 'bg-emerald-50 text-emerald-700 border-emerald-100',
        cancelled: 'bg-red-50 text-red-700 border-red-100',
    };

    const paymentColors = {
        pending: 'bg-amber-50 text-amber-700 border-amber-100',
        paid: 'bg-emerald-50 text-emerald-700 border-emerald-100',
        failed: 'bg-red-50 text-red-700 border-red-100',
        expired: 'bg-gray-50 text-gray-700 border-gray-100',
        refunded: 'bg-violet-50 text-violet-700 border-violet-100',
    };

    return (
        <AdminLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Detail Transaksi Pesanan</h2>}>
            <Head title={`Detail Pesanan ${order.order_number}`} />

            <div className="max-w-4xl mx-auto space-y-6">
                {/* Back button and quick info */}
                <div className="flex items-center justify-between">
                    <Link href={route('admin.orders.index')} className="text-sm font-semibold text-violet-600 hover:text-violet-700">
                        ← Kembali ke Transaksi
                    </Link>
                    <p className="text-sm text-gray-400">Order Ref: {order.order_number}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Order Details & Items */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                            <h3 className="text-md font-bold text-gray-850 mb-4">Item Cookies Dipesan</h3>
                            <div className="space-y-4">
                                {order.items?.map(item => (
                                    <div key={item.id} className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl">
                                        <div className="w-12 h-12 bg-white rounded-lg border border-gray-100 flex items-center justify-center text-xl overflow-hidden flex-shrink-0">
                                            {item.product?.image ? (
                                                <img src={`/storage/${item.product.image}`} alt="" className="w-full h-full object-contain p-1" />
                                            ) : (
                                                '🍪'
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold text-gray-900 truncate text-sm">{item.product_name}</p>
                                            <p className="text-xs text-gray-500">Rp {Number(item.product_price).toLocaleString('id-ID')} x {item.quantity}</p>
                                        </div>
                                        <p className="font-bold text-gray-950 text-sm">
                                            Rp {Number(item.subtotal).toLocaleString('id-ID')}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* Calculation Summary */}
                            <div className="border-t border-gray-150 pt-4 mt-6 space-y-2.5 text-sm">
                                <div className="flex justify-between text-gray-650">
                                    <span>Subtotal Produk</span>
                                    <span>Rp {Number(order.subtotal).toLocaleString('id-ID')}</span>
                                </div>
                                {order.discount > 0 && (
                                    <div className="flex justify-between text-emerald-600">
                                        <span>Potongan Diskon {order.promo_code && `(${order.promo_code})`}</span>
                                        <span>-Rp {Number(order.discount).toLocaleString('id-ID')}</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-gray-650">
                                    <span>Ongkos Kirim</span>
                                    <span>{Number(order.shipping_cost) === 0 ? 'Gratis Ongkir' : `Rp ${Number(order.shipping_cost).toLocaleString('id-ID')}`}</span>
                                </div>
                                <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-100 text-gray-900">
                                    <span>Total Bayar</span>
                                    <span className="text-violet-700">Rp {Number(order.total).toLocaleString('id-ID')}</span>
                                </div>
                            </div>
                        </div>

                        {/* Customer & Shipping info */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                            <h3 className="text-md font-bold text-gray-850 mb-4">Informasi Pengiriman</h3>
                            {order.shipping_address ? (
                                <div className="space-y-3 text-sm text-gray-600">
                                    <div>
                                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Nama Penerima</p>
                                        <p className="font-semibold text-gray-900 mt-0.5">{order.shipping_address.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Nomor Telepon</p>
                                        <p className="font-medium text-gray-900 mt-0.5">{order.shipping_address.phone}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Alamat Lengkap</p>
                                        <p className="mt-0.5">{order.shipping_address.address}, {order.shipping_address.city}, {order.shipping_address.postal_code}</p>
                                    </div>
                                    {order.notes && (
                                        <div>
                                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Catatan Pelanggan</p>
                                            <p className="italic text-gray-500 mt-0.5">"{order.notes}"</p>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <p className="text-sm text-gray-400">Tidak ada informasi pengiriman.</p>
                            )}
                        </div>
                    </div>

                    {/* Order Status Controller */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                            <h3 className="text-md font-bold text-gray-850 mb-4">Ubah Status Pesanan</h3>
                            <form onSubmit={handleStatusUpdate} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Status Pesanan</label>
                                    <select
                                        value={data.status}
                                        onChange={e => setData('status', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none bg-white font-medium"
                                    >
                                        <option value="pending">Menunggu (Pending)</option>
                                        <option value="processing">Diproses (Processing)</option>
                                        <option value="shipped">Dikirim (Shipped)</option>
                                        <option value="delivered">Selesai (Delivered)</option>
                                        <option value="cancelled">Batal (Cancelled)</option>
                                    </select>
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-sm font-semibold transition-all disabled:opacity-50"
                                >
                                    {processing ? 'Memproses...' : 'Perbarui Status'}
                                </button>
                            </form>
                        </div>

                        {/* Status Summary */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-4">
                            <h3 className="text-md font-bold text-gray-850">Informasi Transaksi</h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-500">Status Pembayaran</span>
                                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${paymentColors[order.payment_status] || 'bg-gray-50 text-gray-700'}`}>
                                        {order.payment_status}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-500">Status Pesanan</span>
                                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${statusColors[order.status] || 'bg-gray-50 text-gray-700'}`}>
                                        {order.status}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-500">Metode Bayar</span>
                                    <span className="font-semibold text-gray-800">{order.payment_type || 'Midtrans Snap'}</span>
                                </div>
                                {order.midtrans_transaction_id && (
                                    <div className="pt-2 border-t border-gray-55">
                                        <p className="text-[10px] text-gray-400 uppercase font-bold">Midtrans Trans ID</p>
                                        <p className="font-mono text-xs text-gray-500 mt-1 select-all">{order.midtrans_transaction_id}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
