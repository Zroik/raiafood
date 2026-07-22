import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ products, categories, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [categoryId, setCategoryId] = useState(filters.category || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('admin.products.index'), { search, category: categoryId }, { preserveState: true });
    };

    const handleDelete = (productId) => {
        if (confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
            router.delete(route('admin.products.destroy', productId));
        }
    };

    return (
        <AdminLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Daftar Produk Cookies</h2>}>
            <Head title="Kelola Produk" />

            <div className="space-y-6">
                {/* Search & Actions */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <form onSubmit={handleSearch} className="flex-1 flex flex-col sm:flex-row items-stretch gap-3">
                        <input
                            type="text"
                            placeholder="Cari nama produk..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none transition-all"
                        />
                        <select
                            value={categoryId}
                            onChange={e => setCategoryId(e.target.value)}
                            className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none bg-white"
                        >
                            <option value="">Semua Kategori</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                        <button type="submit" className="px-5 py-2.5 bg-violet-100 hover:bg-violet-200 text-violet-700 rounded-xl text-sm font-semibold transition-colors">
                            Filter
                        </button>
                    </form>
                    <Link
                        href={route('admin.products.create')}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-sm font-semibold transition-all shadow-md shadow-violet-100"
                    >
                        ➕ Tambah Produk
                    </Link>
                </div>

                {/* Product List */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                                    <th className="py-4 px-6">Produk</th>
                                    <th className="py-4 px-6">Kategori</th>
                                    <th className="py-4 px-6">Harga</th>
                                    <th className="py-4 px-6">Stok</th>
                                    <th className="py-4 px-6">Fitur</th>
                                    <th className="py-4 px-6">Status</th>
                                    <th className="py-4 px-6 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-150 text-sm">
                                {products.data.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="py-12 text-center text-gray-400">
                                            Belum ada produk. Klik tombol "Tambah Produk" untuk memasukkan data baru.
                                        </td>
                                    </tr>
                                ) : (
                                    products.data.map(product => {
                                        const finalPrice = product.discount_price || product.price;
                                        return (
                                            <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-12 h-12 bg-violet-50 rounded-xl flex items-center justify-center text-2xl overflow-hidden flex-shrink-0">
                                                            {product.image ? (
                                                                <img src={`/storage/${product.image}`} alt={product.name} className="w-full h-full object-contain p-1" />
                                                            ) : (
                                                                '🍪'
                                                            )}
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold text-gray-900">{product.name}</p>
                                                            <p className="text-xs text-gray-400">Berat: {product.weight}g</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6 text-gray-600">{product.category?.name}</td>
                                                <td className="py-4 px-6">
                                                    <div>
                                                        <p className="font-bold text-gray-900">Rp {Number(finalPrice).toLocaleString('id-ID')}</p>
                                                        {product.discount_price && (
                                                            <p className="text-xs text-gray-400 line-through">Rp {Number(product.price).toLocaleString('id-ID')}</p>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6 font-semibold text-gray-800">{product.stock} pcs</td>
                                                <td className="py-4 px-6">
                                                    {product.is_featured ? (
                                                        <span className="px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-100 rounded-full text-[10px] font-bold uppercase">Featured</span>
                                                    ) : (
                                                        <span className="text-gray-300">-</span>
                                                    )}
                                                </td>
                                                <td className="py-4 px-6">
                                                    {product.is_active ? (
                                                        <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full text-[10px] font-bold uppercase">Aktif</span>
                                                    ) : (
                                                        <span className="px-2.5 py-1 bg-gray-100 text-gray-600 border border-gray-200 rounded-full text-[10px] font-bold uppercase">Nonaktif</span>
                                                    )}
                                                </td>
                                                <td className="py-4 px-6 text-right space-x-2 whitespace-nowrap">
                                                    <Link
                                                        href={route('admin.products.edit', product.id)}
                                                        className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gray-50 text-gray-600 hover:bg-violet-50 hover:text-violet-600 transition-colors"
                                                        title="Edit"
                                                    >
                                                        ✏️
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(product.id)}
                                                        className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gray-50 text-red-600 hover:bg-red-50 transition-colors"
                                                        title="Hapus"
                                                    >
                                                        🗑️
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {products.links && products.last_page > 1 && (
                        <div className="flex justify-center gap-2 p-6 border-t border-gray-50">
                            {products.links.map((link, idx) => (
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
