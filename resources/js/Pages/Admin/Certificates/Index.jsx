import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm, router, usePage } from '@inertiajs/react';
import { useState, useRef } from 'react';

export default function Index({ certificates = [] }) {
    const { flash } = usePage().props;
    const [editMode, setEditMode] = useState(false);
    const [selectedCert, setSelectedCert] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('all'); // 'all', 'certificate', 'award'
    const fileInputRef = useRef(null);

    const { data, setData, post, reset, processing, errors } = useForm({
        _method: 'POST',
        title: '',
        type: 'certificate',
        image: null,
        sort_order: 0,
        is_active: true,
    });

    const openCreateModal = (defaultType = 'certificate') => {
        reset();
        setData({
            _method: 'POST',
            title: '',
            type: defaultType,
            image: null,
            sort_order: 0,
            is_active: true,
        });
        setEditMode(false);
        setSelectedCert(null);
        setModalOpen(true);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const openEditModal = (cert) => {
        setData({
            _method: 'PUT',
            title: cert.title || '',
            type: cert.type || 'certificate',
            image: null,
            sort_order: cert.sort_order ?? 0,
            is_active: cert.is_active ?? true,
        });
        setEditMode(true);
        setSelectedCert(cert);
        setModalOpen(true);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editMode && selectedCert) {
            post(route('admin.certificates.update', selectedCert.id), {
                onSuccess: () => {
                    setModalOpen(false);
                    reset();
                }
            });
        } else {
            post(route('admin.certificates.store'), {
                onSuccess: () => {
                    setModalOpen(false);
                    reset();
                }
            });
        }
    };

    const handleDelete = (certId, certTitle) => {
        if (confirm(`Apakah Anda yakin ingin menghapus "${certTitle}"?`)) {
            router.delete(route('admin.certificates.destroy', certId), {
                preserveScroll: true,
            });
        }
    };

    const filteredList = certificates.filter(c => {
        if (activeTab === 'all') return true;
        return (c.type || 'certificate') === activeTab;
    });

    return (
        <AdminLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Kelola Sertifikasi & Penghargaan</h2>}>
            <Head title="Kelola Sertifikasi & Penghargaan" />

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
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">Galeri Sertifikasi & Penghargaan</h3>
                        <p className="text-sm text-gray-500">Kelola sertifikat izin edar/halal serta piagam penghargaan toko untuk ditampilkan pada 2 galeri terpisah di halaman Tentang Kami.</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => openCreateModal('certificate')}
                            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-xs font-semibold transition-all shadow-md shadow-violet-100"
                        >
                            ➕ Tambah Sertifikat
                        </button>
                        <button
                            onClick={() => openCreateModal('award')}
                            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-semibold transition-all shadow-md shadow-amber-100"
                        >
                            🏆 Tambah Penghargaan
                        </button>
                    </div>
                </div>

                {/* Filter Tabs */}
                <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
                    <button
                        onClick={() => setActiveTab('all')}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'all' ? 'bg-violet-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                        Semua ({certificates.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('certificate')}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'certificate' ? 'bg-violet-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                        📜 Sertifikasi ({certificates.filter(c => (c.type || 'certificate') === 'certificate').length})
                    </button>
                    <button
                        onClick={() => setActiveTab('award')}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'award' ? 'bg-amber-500 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                        🏆 Penghargaan ({certificates.filter(c => c.type === 'award').length})
                    </button>
                </div>

                {/* Certificates Grid/Table */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                                    <th className="py-4 px-6 w-20">Urutan</th>
                                    <th className="py-4 px-6 w-32">Kategori</th>
                                    <th className="py-4 px-6 w-40">Gambar</th>
                                    <th className="py-4 px-6">Nama / Judul</th>
                                    <th className="py-4 px-6 w-32">Status</th>
                                    <th className="py-4 px-6 w-36 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-sm">
                                {filteredList.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="py-12 text-center text-gray-400">
                                            Belum ada data untuk kategori ini.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredList.map((cert) => (
                                        <tr key={cert.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="py-4 px-6 font-semibold text-gray-700">{cert.sort_order}</td>
                                            <td className="py-4 px-6">
                                                <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold ${cert.type === 'award' ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-violet-50 text-violet-700 border border-violet-200'}`}>
                                                    {cert.type === 'award' ? '🏆 Penghargaan' : '📜 Sertifikasi'}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="w-24 aspect-[4/3] rounded-lg overflow-hidden bg-gray-50 border border-gray-200 flex items-center justify-center p-1">
                                                    <img
                                                        src={cert.image.startsWith('images/') || cert.image.startsWith('/') ? `/${cert.image}` : `/storage/${cert.image}`}
                                                        alt={cert.title}
                                                        className="w-full h-full object-contain"
                                                    />
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="font-bold text-gray-900">{cert.title}</div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${cert.is_active ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                                                    {cert.is_active ? 'Aktif' : 'Nonaktif'}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-right space-x-3">
                                                <button
                                                    onClick={() => openEditModal(cert)}
                                                    className="text-violet-600 hover:text-violet-900 font-semibold"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(cert.id, cert.title)}
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
                                {editMode ? 'Edit Data' : 'Tambah Baru'}
                            </h3>
                            <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-lg">
                                ✕
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Kategori Galeri</label>
                                <div className="grid grid-cols-2 gap-3">
                                    <label className={`flex items-center justify-center gap-2 p-3 rounded-xl border cursor-pointer text-xs font-bold transition-all ${data.type === 'certificate' ? 'bg-violet-50 border-violet-500 text-violet-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                                        <input
                                            type="radio"
                                            name="type"
                                            value="certificate"
                                            checked={data.type === 'certificate'}
                                            onChange={e => setData('type', e.target.value)}
                                            className="sr-only"
                                        />
                                        <span>📜 Sertifikasi</span>
                                    </label>
                                    <label className={`flex items-center justify-center gap-2 p-3 rounded-xl border cursor-pointer text-xs font-bold transition-all ${data.type === 'award' ? 'bg-amber-50 border-amber-500 text-amber-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                                        <input
                                            type="radio"
                                            name="type"
                                            value="award"
                                            checked={data.type === 'award'}
                                            onChange={e => setData('type', e.target.value)}
                                            className="sr-only"
                                        />
                                        <span>🏆 Penghargaan</span>
                                    </label>
                                </div>
                                {errors.type && <p className="text-xs text-red-500 mt-1">{errors.type}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Nama / Judul</label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                    placeholder={data.type === 'award' ? "Contoh: Juara 1 UMKM Berprestasi Kota Batu" : "Contoh: Sertifikat Halal MUI..."}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none transition-all"
                                />
                                {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">File Gambar (Sertifikat / Piagam)</label>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={e => setData('image', e.target.files[0])}
                                    accept="image/*"
                                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 cursor-pointer"
                                />
                                <p className="text-[10px] text-gray-400 mt-1">Format: JPG, PNG, WEBP. Ditampilkan dalam rasio 4:3 proporsional.</p>
                                {errors.image && <p className="text-xs text-red-500 mt-1">{errors.image}</p>}
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

                            <div className="flex items-center gap-2 pt-2">
                                <input
                                    type="checkbox"
                                    id="is_active"
                                    checked={data.is_active}
                                    onChange={e => setData('is_active', e.target.checked)}
                                    className="rounded border-gray-300 text-violet-600 focus:ring-violet-500"
                                />
                                <label htmlFor="is_active" className="text-sm font-semibold text-gray-700">Aktifkan untuk Tampil di Website</label>
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
                                    {processing ? 'Menyimpan...' : 'Simpan Data'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
