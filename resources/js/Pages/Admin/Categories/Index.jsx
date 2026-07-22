import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ categories }) {
    const { flash } = usePage().props;
    const [editMode, setEditMode] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const { data, setData, post, put, reset, processing, errors } = useForm({
        name: '',
        description: '',
        is_active: true,
        sort_order: 0,
    });

    const openCreateModal = () => {
        reset();
        setEditMode(false);
        setSelectedCategory(null);
        setModalOpen(true);
    };

    const openEditModal = (category) => {
        setData({
            name: category.name || '',
            description: category.description || '',
            is_active: category.is_active ?? true,
            sort_order: category.sort_order ?? 0,
        });
        setEditMode(true);
        setSelectedCategory(category);
        setModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editMode && selectedCategory) {
            put(route('admin.categories.update', selectedCategory.id), {
                onSuccess: () => {
                    setModalOpen(false);
                    reset();
                }
            });
        } else {
            post(route('admin.categories.store'), {
                onSuccess: () => {
                    setModalOpen(false);
                    reset();
                }
            });
        }
    };

    const handleDelete = (categoryId, categoryName) => {
        if (confirm(`Apakah Anda yakin ingin menghapus kategori "${categoryName}"?`)) {
            router.delete(route('admin.categories.destroy', categoryId), {
                preserveScroll: true,
            });
        }
    };

    return (
        <AdminLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Daftar Kategori Cookies</h2>}>
            <Head title="Kelola Kategori" />

            <div className="space-y-6">
                {/* Flash Messages */}
                {flash?.success && (
                    <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-5 py-3 rounded-xl text-sm font-medium flex items-center gap-2">
                        <span>✅</span> {flash.success}
                    </div>
                )}
                {flash?.error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-3 rounded-xl text-sm font-medium flex items-center gap-2">
                        <span>⚠️</span> {flash.error}
                    </div>
                )}

                {/* Search & Actions */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                    <p className="text-sm text-gray-500">Kelompokkan cookies ke dalam kategori untuk mempermudah pencarian.</p>
                    <button
                        onClick={openCreateModal}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-sm font-semibold transition-all shadow-md shadow-violet-100"
                    >
                        ➕ Tambah Kategori
                    </button>
                </div>

                {/* Categories Table */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                                    <th className="py-4 px-6">Urutan</th>
                                    <th className="py-4 px-6">Nama Kategori</th>
                                    <th className="py-4 px-6">Deskripsi</th>
                                    <th className="py-4 px-6">Jumlah Produk</th>
                                    <th className="py-4 px-6">Status</th>
                                    <th className="py-4 px-6 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-150 text-sm">
                                {categories.data.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="py-12 text-center text-gray-400">
                                            Belum ada kategori. Klik "Tambah Kategori" untuk membuat kategori pertama Anda.
                                        </td>
                                    </tr>
                                ) : (
                                    categories.data.map(cat => (
                                        <tr key={cat.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="py-4 px-6 font-semibold text-gray-800">#{cat.sort_order}</td>
                                            <td className="py-4 px-6 font-bold text-gray-900">{cat.name}</td>
                                            <td className="py-4 px-6 text-gray-600 max-w-xs truncate">{cat.description || '-'}</td>
                                            <td className="py-4 px-6 font-semibold text-gray-800">{cat.products_count} cookies</td>
                                            <td className="py-4 px-6">
                                                {cat.is_active ? (
                                                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full text-[10px] font-bold uppercase">Aktif</span>
                                                ) : (
                                                    <span className="px-2.5 py-1 bg-gray-100 text-gray-600 border border-gray-200 rounded-full text-[10px] font-bold uppercase">Nonaktif</span>
                                                )}
                                            </td>
                                            <td className="py-4 px-6 text-right space-x-2 whitespace-nowrap">
                                                <button
                                                    onClick={() => openEditModal(cat)}
                                                    className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gray-50 text-gray-600 hover:bg-violet-50 hover:text-violet-600 transition-colors"
                                                    title="Edit"
                                                >
                                                    ✏️
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDelete(cat.id, cat.name)}
                                                    className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gray-50 text-red-600 hover:bg-red-50 transition-colors"
                                                    title="Hapus"
                                                >
                                                    🗑️
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {categories.links && categories.last_page > 1 && (
                        <div className="flex justify-center gap-2 p-6 border-t border-gray-50">
                            {categories.links.map((link, idx) => (
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

            {/* Modal Form */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="fixed inset-0 bg-gray-900 bg-opacity-50" onClick={() => setModalOpen(false)}></div>
                    <div className="bg-white rounded-2xl max-w-md w-full border border-gray-100 shadow-xl overflow-hidden relative z-10 animate-fade-in">
                        <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                            <h3 className="text-md font-bold text-gray-800">
                                {editMode ? 'Edit Kategori' : 'Tambah Kategori'}
                            </h3>
                            <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-lg">
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Nama Kategori *</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none"
                                    required
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Nomor Urutan Tampil *</label>
                                <input
                                    type="number"
                                    value={data.sort_order}
                                    onChange={e => setData('sort_order', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none"
                                    required
                                />
                                {errors.sort_order && <p className="text-red-500 text-xs mt-1">{errors.sort_order}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Deskripsi Singkat</label>
                                <textarea
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    rows={3}
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none"
                                />
                                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                            </div>

                            <div className="py-2">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={data.is_active}
                                        onChange={e => setData('is_active', e.target.checked)}
                                        className="w-4.5 h-4.5 text-violet-600 focus:ring-violet-500 rounded border-gray-300"
                                    />
                                    <span className="text-sm font-semibold text-gray-700">Aktifkan Kategori</span>
                                </label>
                            </div>

                            <div className="pt-4 border-t border-gray-50 flex items-center justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setModalOpen(false)}
                                    className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-500 hover:bg-gray-50 transition-colors"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-6 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-sm font-semibold transition-all shadow-md shadow-violet-100"
                                >
                                    {processing ? 'Menyimpan...' : 'Simpan Kategori'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
