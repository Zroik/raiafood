import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ orders, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || '');

    const handleFilter = (e) => {
        e.preventDefault();
        router.get(route('admin.orders.index'), { search, status }, { preserveState: true });
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
        <AdminLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Daftar Transaksi Pesanan</h2>}>
            <Head title="Kelola Pesanan" />

            <div className="space-y-6">
                {/* Filters */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <form onSubmit={handleFilter} className="flex flex-col sm:flex-row items-stretch gap-3">
                        <input
                            type="text"
                            placeholder="Cari nomor pesanan / nama pelanggan..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none transition-all"
                        />
                        <select
                            value={status}
                            onChange={e => setStatus(e.target.value)}
                            className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none bg-white"
                        >
                            <option value="">Semua Status Pesanan</option>
                            <option value="pending">Menunggu (Pending)</option>
                            <option value="processing">Diproses (Processing)</option>
                            <option value="shipped">Dikirim (Shipped)</option>
                            <option value="delivered">Selesai (Delivered)</option>
                            <option value="cancelled">Batal (Cancelled)</option>
                        </select>
                        <button type="submit" className="px-6 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-sm font-semibold transition-all">
                            Filter
                        </button>
                    </form>
                </div>

                {/* Orders List */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                                    <th className="py-4 px-6">No. Pesanan</th>
                                    <th className="py-4 px-6">Pelanggan</th>
                                    <th className="py-4 px-6">Tanggal</th>
                                    <th className="py-4 px-6">Total</th>
                                    <th className="py-4 px-6">Status Bayar</th>
                                    <th className="py-4 px-6">Status Pesanan</th>
                                    <th className="py-4 px-6 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-150 text-sm">
                                {orders.data.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="py-12 text-center text-gray-400">
                                            Tidak ada data transaksi pesanan yang sesuai filter.
                                        </td>
                                    </tr>
                                ) : (
                                    orders.data.map(order => (
                                        <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="py-4 px-6 font-semibold text-gray-800">{order.order_number}</td>
                                            <td className="py-4 px-6">
                                                <div>
                                                    <p className="font-semibold text-gray-900">{order.user?.name || order.shipping_address?.name || 'Tamu'}</p>
                                                    <p className="text-xs text-gray-400">{order.user?.email || order.shipping_address?.email || '-'}</p>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-gray-500">
                                                {new Date(order.created_at).toLocaleDateString('id-ID', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric'
                                                })}
                                            </td>
                                            <td className="py-4 px-6 font-bold text-gray-950">
                                                Rp {Number(order.total).toLocaleString('id-ID')}
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${paymentColors[order.payment_status] || 'bg-gray-50 text-gray-700'}`}>
                                                    {order.payment_status}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${statusColors[order.status] || 'bg-gray-50 text-gray-700'}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-right">
                                                <Link
                                                    href={route('admin.orders.show', order.id)}
                                                    className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gray-50 hover:bg-violet-50 hover:text-violet-600 text-gray-600 transition-colors"
                                                    title="Lihat Detail"
                                                >
                                                    👁️
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {orders.links && orders.last_page > 1 && (
                        <div className="flex justify-center gap-2 p-6 border-t border-gray-50">
                            {orders.links.map((link, idx) => (
                                <Link
                                    key={idx}
                                    href={link.url || '#'}
                                    className={`px-4 py-2 rounded-lg text-xs font-semibold ${link.active ? 'bg-violet-600 text-white shadow-sm' : link.url ? 'bg-gray-50 text-gray-600 hover:bg-violet-50' : 'text-gray-300 cursor-not-allowed'}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
