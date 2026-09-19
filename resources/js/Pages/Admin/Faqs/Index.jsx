import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import { Plus, X } from 'lucide-react';

export default function FaqIndex({ faqs = [] }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [editingFaq, setEditingFaq] = useState(null);

    const { data, setData, post, put, reset, processing, errors } = useForm({
        category: 'Pemesanan',
        title: '',
        content: '',
        sort_order: 0,
        is_active: true,
    });

    const openCreateModal = () => {
        setEditingFaq(null);
        reset();
        setData({
            category: 'Pemesanan',
            title: '',
            content: '',
            sort_order: faqs.length + 1,
            is_active: true,
        });
        setModalOpen(true);
    };

    const openEditModal = (faq) => {
        setEditingFaq(faq);
        setData({
            category: faq.category,
            title: faq.title,
            content: faq.content,
            sort_order: faq.sort_order,
            is_active: faq.is_active,
        });
        setModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingFaq) {
            put(route('admin.faqs.update', editingFaq.id), {
                onSuccess: () => setModalOpen(false),
            });
        } else {
            post(route('admin.faqs.store'), {
                onSuccess: () => setModalOpen(false),
            });
        }
    };

    const handleDelete = (faq) => {
        if (confirm(`Yakin ingin menghapus pertanyaan "${faq.title}"?`)) {
            router.delete(route('admin.faqs.destroy', faq.id));
        }
    };

    return (
        <AdminLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Kelola FAQ (Tanya Jawab)</h2>}>
            <Head title="Kelola FAQ - Admin" />

            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <p className="text-sm text-gray-600">Pertanyaan dan jawaban di bawah ini akan otomatis tampil di halaman <strong>/faq</strong> toko.</p>
                    <button
                        onClick={openCreateModal}
                        className="px-4 py-2.5 rounded-xl bg-[#843799] text-white font-bold text-xs shadow-md hover:bg-[#60396A] transition-all flex items-center gap-2 self-start sm:self-auto"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Tambah Pertanyaan FAQ</span>
                    </button>
                </div>

                {/* Table / List */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-gray-600">
                            <thead className="bg-[#FAE6FF]/40 text-xs font-bold text-[#843799] uppercase border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4">Urutan</th>
                                    <th className="px-6 py-4">Kategori</th>
                                    <th className="px-6 py-4">Pertanyaan & Jawaban</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {faqs.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center text-gray-400">
                                            Belum ada data FAQ. Klik tombol tambah untuk membuat FAQ pertama.
                                        </td>
                                    </tr>
                                ) : (
                                    faqs.map((faq, idx) => (
                                        <tr key={faq.id} className="hover:bg-gray-50/70 transition-colors">
                                            <td className="px-6 py-4 font-bold text-gray-700">{faq.sort_order}</td>
                                            <td className="px-6 py-4">
                                                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-50 text-[#843799] border border-purple-100">
                                                    {faq.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 max-w-md">
                                                <p className="font-bold text-gray-900 mb-1">{faq.title}</p>
                                                <p className="text-xs text-gray-500 line-clamp-2">{faq.content}</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${faq.is_active ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                                                    {faq.is_active ? 'Aktif' : 'Nonaktif'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right space-x-2">
                                                <button
                                                    onClick={() => openEditModal(faq)}
                                                    className="px-3 py-1.5 rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100 text-xs font-bold transition-colors"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(faq)}
                                                    className="px-3 py-1.5 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 text-xs font-bold transition-colors"
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

            {/* Modal Form */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
                    <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                            <h3 className="font-bold text-base text-gray-900">
                                {editingFaq ? 'Edit Pertanyaan FAQ' : 'Tambah Pertanyaan FAQ'}
                            </h3>
                            <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1">Kategori</label>
                                    <input
                                        type="text"
                                        value={data.category}
                                        onChange={e => setData('category', e.target.value)}
                                        className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:border-[#843799] outline-none"
                                        placeholder="Pemesanan, Produk, dll"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1">Urutan Nomor</label>
                                    <input
                                        type="number"
                                        value={data.sort_order}
                                        onChange={e => setData('sort_order', e.target.value)}
                                        className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:border-[#843799] outline-none"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">Judul Pertanyaan *</label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#843799] outline-none"
                                    placeholder="Contoh: Bagaimana cara pemesanan?"
                                    required
                                />
                                {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">Isi Jawaban Lengkap *</label>
                                <textarea
                                    value={data.content}
                                    onChange={e => setData('content', e.target.value)}
                                    rows={4}
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#843799] outline-none"
                                    placeholder="Jawab pertanyaan secara lengkap dan jelas..."
                                    required
                                />
                                {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content}</p>}
                            </div>

                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={data.is_active}
                                    onChange={e => setData('is_active', e.target.checked)}
                                    className="w-4 h-4 text-[#843799] rounded border-gray-300 focus:ring-[#843799]"
                                />
                                <span className="text-xs font-semibold text-gray-700">Tampilkan FAQ ini di halaman toko</span>
                            </label>

                            <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={() => setModalOpen(false)}
                                    className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-50 border border-gray-200"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-5 py-2 rounded-xl bg-[#843799] text-white text-xs font-bold hover:bg-[#60396A] transition-all disabled:opacity-50"
                                >
                                    {processing ? 'Menyimpan...' : 'Simpan FAQ'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
