import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ stats, recentOrders, monthlySales }) {
    const formattedRevenue = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(stats.totalRevenue);

    // Month Names
    const monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
        'Jul', 'Agt', 'Sep', 'Okt', 'Nov', 'Des'
    ];

    // Find the maximum value in monthly sales for chart scaling
    const maxSalesVal = monthlySales.reduce((max, item) => Math.max(max, Number(item.total)), 0) || 1;

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
        <AdminLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Dashboard Overview</h2>}>
            <Head title="Admin Dashboard" />

            <div className="space-y-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Revenue Card */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Pendapatan</p>
                            <h3 className="text-2xl font-bold text-gray-900 mt-2">{formattedRevenue}</h3>
                        </div>
                        <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-xl text-emerald-600">
                            💰
                        </div>
                    </div>

                    {/* Orders Card */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Pesanan</p>
                            <h3 className="text-2xl font-bold text-gray-900 mt-2">{stats.totalOrders}</h3>
                        </div>
                        <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-xl text-blue-600">
                            📦
                        </div>
                    </div>

                    {/* Products Card */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Produk</p>
                            <h3 className="text-2xl font-bold text-gray-900 mt-2">{stats.totalProducts}</h3>
                        </div>
                        <div className="w-12 h-12 bg-violet-50 rounded-2xl flex items-center justify-center text-xl text-violet-600">
                            🍪
                        </div>
                    </div>

                    {/* Customers Card */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Pelanggan</p>
                            <h3 className="text-2xl font-bold text-gray-900 mt-2">{stats.totalCustomers}</h3>
                        </div>
                        <div className="w-12 h-12 bg-pink-50 rounded-2xl flex items-center justify-center text-xl text-pink-600">
                            👥
                        </div>
                    </div>
                </div>

                {/* Sales Chart & Quick Analytics */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Sales bar chart */}
                    <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
                        <h3 className="text-md font-bold text-gray-800 mb-6">Grafik Penjualan Bulanan</h3>
                        <div className="flex-1 flex items-end justify-between gap-2 h-64 pt-4 border-b border-gray-100">
                            {monthNames.map((month, idx) => {
                                const matchedSale = monthlySales.find(item => Number(item.month) === idx + 1);
                                const saleVal = matchedSale ? Number(matchedSale.total) : 0;
                                const heightPercentage = (saleVal / maxSalesVal) * 100;
                                return (
                                    <div key={month} className="flex-1 flex flex-col items-center group relative h-full justify-end">
                                        {saleVal > 0 && (
                                            <div className="absolute bottom-full mb-2 bg-gray-900 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap pointer-events-none shadow-md">
                                                Rp {saleVal.toLocaleString('id-ID')} ({matchedSale.count} order)
                                            </div>
                                        )}
                                        <div
                                            style={{ height: `${Math.max(heightPercentage, saleVal > 0 ? 4 : 0)}%` }}
                                            className={`w-full rounded-t-lg transition-all duration-500 max-h-[92%] ${
                                                saleVal > 0
                                                    ? 'bg-gradient-to-t from-violet-600 to-purple-500 hover:from-violet-500 hover:to-purple-400'
                                                    : 'bg-gray-100'
                                            }`}
                                        ></div>
                                        <span className="text-[10px] font-semibold text-gray-400 mt-2 block">{month}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Quick promo code card or stats */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
                        <div>
                            <h3 className="text-md font-bold text-gray-800 mb-4">Pintasan Cepat</h3>
                            <p className="text-xs text-gray-500 mb-6 leading-relaxed">
                                Kelola konten toko cookies, promo, pantau pesanan pelanggan, dan update harga diskon secara berkala.
                            </p>
                        </div>
                        <div className="space-y-3">
                            <Link
                                href={route('admin.products.create')}
                                className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:bg-violet-50 hover:border-violet-200 transition-all group"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-lg">🍪</span>
                                    <span className="text-sm font-semibold text-gray-700 group-hover:text-violet-700">Tambah Produk Baru</span>
                                </div>
                                <span className="text-gray-400 group-hover:translate-x-1 transition-transform">→</span>
                            </Link>
                            <Link
                                href={route('admin.promos.index')}
                                className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:bg-violet-50 hover:border-violet-200 transition-all group"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-lg">🏷️</span>
                                    <span className="text-sm font-semibold text-gray-700 group-hover:text-violet-700">Kelola Voucher Promo</span>
                                </div>
                                <span className="text-gray-400 group-hover:translate-x-1 transition-transform">→</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Recent Orders Table */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                        <h3 className="text-md font-bold text-gray-800">Pesanan Terbaru</h3>
                        <Link
                            href={route('admin.orders.index')}
                            className="text-xs font-semibold text-violet-600 hover:text-violet-700 hover:underline"
                        >
                            Lihat Semua →
                        </Link>
                    </div>
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
                            <tbody className="divide-y divide-gray-50 text-sm">
                                {recentOrders.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="py-8 text-center text-gray-400">
                                            Belum ada pesanan masuk.
                                        </td>
                                    </tr>
                                ) : (
                                    recentOrders.map(order => (
                                        <tr key={order.id} className="hover:bg-gray-50/55 transition-colors">
                                            <td className="py-4 px-6 font-semibold text-gray-800">{order.order_number}</td>
                                            <td className="py-4 px-6">
                                                <div>
                                                    <p className="font-medium text-gray-900">{order.user?.name || order.shipping_address?.name || 'Tamu'}</p>
                                                    <p className="text-xs text-gray-400 truncate max-w-[150px]">{order.user?.email || order.shipping_address?.email || '-'}</p>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-gray-500">
                                                {new Date(order.created_at).toLocaleDateString('id-ID', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric'
                                                })}
                                            </td>
                                            <td className="py-4 px-6 font-bold text-gray-900">
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
                                                    className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gray-50 text-gray-600 hover:bg-violet-50 hover:text-violet-600 transition-colors"
                                                    title="Detail"
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
                </div>
            </div>
        </AdminLayout>
    );
}
