import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm, router, usePage } from '@inertiajs/react';
import { useState, useRef } from 'react';

export default function Index({ banners }) {
    const { flash } = usePage().props;
    const [editMode, setEditMode] = useState(false);
    const [selectedBanner, setSelectedBanner] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const fileInputRef = useRef(null);

    const { data, setData, post, reset, processing, errors } = useForm({
        _method: 'POST',
        title: '',
        description: '',
        image: null,
        link: '',
        sort_order: 0,
        is_active: true,
    });

    const openCreateModal = () => {
        reset();
        setData({
            _method: 'POST',
            title: '',
            description: '',
            image: null,
            link: '',
            sort_order: 0,
            is_active: true,
        });
        setEditMode(false);
        setSelectedBanner(null);
        setModalOpen(true);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const openEditModal = (banner) => {
        setData({
            _method: 'PUT',
            title: banner.title || '',
            description: banner.description || '',
            image: null, // Image remains unchanged unless a new file is uploaded
            link: banner.link || '',
            sort_order: banner.sort_order ?? 0,
            is_active: banner.is_active ?? true,
        });
        setEditMode(true);
        setSelectedBanner(banner);
        setModalOpen(true);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editMode && selectedBanner) {
            // Using POST with _method: 'PUT' for Inertia file upload override
            post(route('admin.banners.update', selectedBanner.id), {
                onSuccess: () => {
                    setModalOpen(false);
                    reset();
                }
            });
        } else {
            post(route('admin.banners.store'), {
                onSuccess: () => {
                    setModalOpen(false);
                    reset();
                }
            });
        }
    };

    const handleDelete = (bannerId, bannerTitle) => {
        if (confirm(`Apakah Anda yakin ingin menghapus banner "${bannerTitle}"?`)) {
            router.delete(route('admin.banners.destroy', bannerId), {
                preserveScroll: true,
            });
        }
    };

    return (
        <AdminLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Kelola Banner Beranda</h2>}>
            <Head title="Kelola Banner" />

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

                {/* Info & Actions */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">Banner Slider Beranda</h3>
                        <p className="text-sm text-gray-500">Banner akan bergeser otomatis di halaman depan beranda. Direkomendasikan gambar beresolusi 1900x630.</p>
                    </div>
                    <button
                        onClick={openCreateModal}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-sm font-semibold transition-all shadow-md shadow-violet-100"
                    >
                        ➕ Tambah Banner
                    </button>
                </div>

                {/* Banners Grid/Table */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                                    <th className="py-4 px-6 w-20">Urutan</th>
                                    <th className="py-4 px-6 w-48">Gambar</th>
                                    <th className="py-4 px-6">Informasi Banner</th>
                                    <th className="py-4 px-6">Link Navigasi</th>
                                    <th className="py-4 px-6 w-32">Status</th>
                                    <th className="py-4 px-6 w-36 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-sm">
                                {banners.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="py-12 text-center text-gray-400">
                                            Belum ada banner yang ditambahkan.
                                        </td>
                                    </tr>
                                ) : (
                                    banners.map((banner) => (
                                        <tr key={banner.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="py-4 px-6 font-semibold text-gray-700">{banner.sort_order}</td>
                                            <td className="py-4 px-6">
                                                <div className="w-40 aspect-[190/63] rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                                                    <img
                                                        src={banner.image.startsWith('images/') || banner.image.startsWith('/') ? `/${banner.image}` : `/storage/${banner.image}`}
                                                        alt={banner.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="font-bold text-gray-900">{banner.title}</div>
                                                <div className="text-xs text-gray-400 mt-1 max-w-sm line-clamp-2">{banner.description || '-'}</div>
                                            </td>
                                            <td className="py-4 px-6 font-mono text-xs text-gray-500">{banner.link || '-'}</td>
                                            <td className="py-4 px-6">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${banner.is_active ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                                                    {banner.is_active ? 'Aktif' : 'Nonaktif'}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-right space-x-3">
                                                <button
                                                    onClick={() => openEditModal(banner)}
                                                    className="text-violet-600 hover:text-violet-900 font-semibold"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(banner.id, banner.title)}
                                                    className="text-red-600 hover:text-red-900 font-semibold"
                                                >
                                                    Hapus
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Create/Edit Modal */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-600 bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-lg w-full border border-gray-100 shadow-xl overflow-hidden animate-fade-in">
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                            <h3 className="text-lg font-bold text-gray-900">
                                {editMode ? 'Edit Banner' : 'Tambah Banner'}
                            </h3>
                            <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-lg">
                                ✕
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Judul Banner</label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                    placeholder="Masukkan judul banner..."
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none transition-all"
                                />
                                {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Deskripsi (Opsional)</label>
                                <textarea
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    placeholder="Masukkan penjelasan singkat banner..."
                                    rows="2"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none transition-all resize-none"
                                />
                                {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Gambar Banner</label>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={e => setData('image', e.target.files[0])}
                                    accept="image/*"
                                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 cursor-pointer"
                                />
                                <p className="text-[10px] text-gray-400 mt-1">Harus berupa gambar. Format yang disarankan: 1900x630 (resolusi banner).</p>
                                {errors.image && <p className="text-xs text-red-500 mt-1">{errors.image}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Link Navigasi</label>
                                    <input
                                        type="text"
                                        value={data.link}
                                        onChange={e => setData('link', e.target.value)}
                                        placeholder="Contoh: /products"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none transition-all"
                                    />
                                    {errors.link && <p className="text-xs text-red-500 mt-1">{errors.link}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Urutan Tampil</label>
                                    <input
                                        type="number"
                                        value={data.sort_order}
                                        onChange={e => setData('sort_order', parseInt(e.target.value) || 0)}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none transition-all"
                                    />
                                    {errors.sort_order && <p className="text-xs text-red-500 mt-1">{errors.sort_order}</p>}
                                </div>
                            </div>

                            <div className="flex items-center gap-2 pt-2">
                                <input
                                    type="checkbox"
                                    id="is_active"
                                    checked={data.is_active}
                                    onChange={e => setData('is_active', e.target.checked)}
                                    className="rounded border-gray-300 text-violet-600 focus:ring-violet-500"
                                />
                                <label htmlFor="is_active" className="text-sm font-semibold text-gray-700">Tampilkan Banner (Aktif)</label>
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={() => setModalOpen(false)}
                                    className="px-5 py-2.5 text-sm font-bold text-gray-500 hover:text-gray-700 transition-colors"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-6 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-sm font-bold transition-all shadow-md shadow-violet-100 disabled:opacity-50"
                                >
                                    {processing ? 'Menyimpan...' : 'Simpan Banner'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
