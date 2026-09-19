import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import { Plus, Pencil, Trash2, X } from 'lucide-react';

export default function Index({ promos }) {
    const [editMode, setEditMode] = useState(false);
    const [selectedPromo, setSelectedPromo] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const { data, setData, post, put, reset, processing, errors } = useForm({
        code: '',
        name: '',
        description: '',
        type: 'percentage',
        value: '',
        min_order: '',
        max_discount: '',
        usage_limit: '',
        start_date: '',
        end_date: '',
        is_active: true,
    });

    const openCreateModal = () => {
        reset();
        setEditMode(false);
        setSelectedPromo(null);
        setModalOpen(true);
    };

    const openEditModal = (promo) => {
        setData({
            code: promo.code || '',
            name: promo.name || '',
            description: promo.description || '',
            type: promo.type || 'percentage',
            value: promo.value || '',
            min_order: promo.min_order || '',
            max_discount: promo.max_discount || '',
            usage_limit: promo.usage_limit || '',
            start_date: promo.start_date || '',
            end_date: promo.end_date || '',
            is_active: promo.is_active ?? true,
        });
        setEditMode(true);
        setSelectedPromo(promo);
        setModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editMode && selectedPromo) {
            put(route('admin.promos.update', selectedPromo.id), {
                onSuccess: () => setModalOpen(false)
            });
        } else {
            post(route('admin.promos.store'), {
                onSuccess: () => setModalOpen(false)
            });
        }
    };

    const handleDelete = (promoId) => {
        if (confirm('Apakah Anda yakin ingin menghapus voucher promo ini?')) {
            router.delete(route('admin.promos.destroy', promoId));
        }
    };

    return (
        <AdminLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Kelola Voucher Promo</h2>}>
            <Head title="Kelola Voucher Promo" />

            <div className="space-y-6">
                {/* Intro / Action Header */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-gray-500">Buat kode promo baru untuk menarik minat pembelian pelanggan.</p>
                    <button
                        onClick={openCreateModal}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-sm font-semibold transition-all shadow-md shadow-violet-100 flex-shrink-0"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Tambah Promo Baru</span>
                    </button>
                </div>

                {/* Promo Table list */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                                    <th className="py-4 px-6">Kode Promo</th>
                                    <th className="py-4 px-6">Nama / Varian</th>
                                    <th className="py-4 px-6">Nilai Diskon</th>
                                    <th className="py-4 px-6">Penggunaan</th>
                                    <th className="py-4 px-6">Masa Berlaku</th>
                                    <th className="py-4 px-6">Status</th>
                                    <th className="py-4 px-6 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-150 text-sm">
                                {promos.data.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="py-12 text-center text-gray-400">
                                            Belum ada voucher promo cookies. Klik "Tambah Promo Baru" untuk memulai.
                                        </td>
                                    </tr>
                                ) : (
                                    promos.data.map(promo => {
                                        const now = new Date();
                                        const start = new Date(promo.start_date);
                                        const end = new Date(promo.end_date);
                                        const isExpired = now > end;
                                        const isUpcoming = now < start;

                                        return (
                                            <tr key={promo.id} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="py-4 px-6 font-mono font-bold text-violet-700">{promo.code}</td>
                                                <td className="py-4 px-6">
                                                    <div>
                                                        <p className="font-semibold text-gray-900">{promo.name}</p>
                                                        {promo.min_order > 0 && (
                                                            <p className="text-xs text-gray-400">Min. Belanja: Rp {Number(promo.min_order).toLocaleString('id-ID')}</p>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <span className="font-bold text-gray-900">
                                                        {promo.type === 'percentage' ? `${promo.value}%` : `Rp ${Number(promo.value).toLocaleString('id-ID')}`}
                                                    </span>
                                                    {promo.type === 'percentage' && promo.max_discount > 0 && (
                                                        <p className="text-xs text-gray-400">Maksimal: Rp {Number(promo.max_discount).toLocaleString('id-ID')}</p>
                                                    )}
                                                </td>
                                                <td className="py-4 px-6">
                                                    <span className="font-semibold text-gray-800">{promo.used_count}</span>
                                                    {promo.usage_limit ? (
                                                        <span className="text-gray-400 text-xs"> / {promo.usage_limit} kali</span>
                                                    ) : (
                                                        <span className="text-gray-400 text-xs"> / ∞ kali</span>
                                                    )}
                                                </td>
                                                <td className="py-4 px-6">
                                                    <div className="text-xs text-gray-600">
                                                        <p>{start.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })} - {end.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                                                        {isExpired && <p className="text-red-500 font-bold mt-0.5 uppercase tracking-wider text-[9px]">Expired</p>}
                                                        {isUpcoming && <p className="text-amber-500 font-bold mt-0.5 uppercase tracking-wider text-[9px]">Akan Datang</p>}
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6">
                                                    {promo.is_active && !isExpired ? (
                                                        <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full text-[10px] font-bold uppercase">Aktif</span>
                                                    ) : (
                                                        <span className="px-2.5 py-1 bg-gray-105 text-gray-600 border border-gray-200 rounded-full text-[10px] font-bold uppercase">Nonaktif</span>
                                                    )}
                                                </td>
                                                <td className="py-4 px-6 text-right space-x-2 whitespace-nowrap">
                                                    <button
                                                        onClick={() => openEditModal(promo)}
                                                        className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gray-50 hover:bg-violet-50 hover:text-violet-600 text-gray-600 transition-colors"
                                                        title="Edit"
                                                    >
                                                        <Pencil className="w-3.5 h-3.5" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(promo.id)}
                                                        className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gray-50 hover:bg-red-50 text-red-650 transition-colors"
                                                        title="Hapus"
                                                    >
                                                        <Trash2 className="w-3.5 h-3.5" />
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
                    {promos.links && promos.last_page > 1 && (
                        <div className="flex justify-center gap-2 p-6 border-t border-gray-50">
                            {promos.links.map((link, idx) => (
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
                    <div className="bg-white rounded-2xl max-w-lg w-full border border-gray-100 shadow-xl overflow-hidden relative z-10 animate-fade-in max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                            <h3 className="text-md font-bold text-gray-850">
                                {editMode ? 'Edit Voucher Promo' : 'Tambah Voucher Promo'}
                            </h3>
                            <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Kode Voucher *</label>
                                    <input
                                        type="text"
                                        value={data.code}
                                        onChange={e => setData('code', e.target.value.toUpperCase())}
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none uppercase font-mono"
                                        placeholder="CONTOH: COOKIES10"
                                        required
                                    />
                                    {errors.code && <p className="text-red-500 text-xs mt-1">{errors.code}</p>}
                                </div>

                                <div className="col-span-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Nama Promo *</label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none"
                                        placeholder="Promo Hari Raya / Gajian..."
                                        required
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Tipe Diskon *</label>
                                    <select
                                        value={data.type}
                                        onChange={e => setData('type', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none bg-white"
                                    >
                                        <option value="percentage">Persentase (%)</option>
                                        <option value="fixed">Nominal Tetap (Rupiah)</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Nilai Diskon *</label>
                                    <input
                                        type="number"
                                        value={data.value}
                                        onChange={e => setData('value', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none"
                                        placeholder={data.type === 'percentage' ? '10' : '15000'}
                                        required
                                    />
                                    {errors.value && <p className="text-red-500 text-xs mt-1">{errors.value}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Min. Pembelian (Rp)</label>
                                    <input
                                        type="number"
                                        value={data.min_order}
                                        onChange={e => setData('min_order', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none"
                                        placeholder="0"
                                    />
                                    {errors.min_order && <p className="text-red-500 text-xs mt-1">{errors.min_order}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Maks. Potongan Diskon (Rp)</label>
                                    <input
                                        type="number"
                                        value={data.max_discount}
                                        onChange={e => setData('max_discount', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none"
                                        placeholder="0"
                                    />
                                    {errors.max_discount && <p className="text-red-500 text-xs mt-1">{errors.max_discount}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Mulai Berlaku *</label>
                                    <input
                                        type="datetime-local"
                                        value={data.start_date}
                                        onChange={e => setData('start_date', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none"
                                        required
                                    />
                                    {errors.start_date && <p className="text-red-500 text-xs mt-1">{errors.start_date}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Selesai Berlaku *</label>
                                    <input
                                        type="datetime-local"
                                        value={data.end_date}
                                        onChange={e => setData('end_date', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none"
                                        required
                                    />
                                    {errors.end_date && <p className="text-red-500 text-xs mt-1">{errors.end_date}</p>}
                                </div>

                                <div className="col-span-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Batas Penggunaan Total</label>
                                    <input
                                        type="number"
                                        value={data.usage_limit}
                                        onChange={e => setData('usage_limit', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none"
                                        placeholder="Kosongkan jika tidak terbatas..."
                                    />
                                    {errors.usage_limit && <p className="text-red-500 text-xs mt-1">{errors.usage_limit}</p>}
                                </div>

                                <div className="col-span-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Deskripsi Ringkas</label>
                                    <textarea
                                        value={data.description}
                                        onChange={e => setData('description', e.target.value)}
                                        rows={2}
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none"
                                        placeholder="Ketentuan diskon..."
                                    />
                                    {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                                </div>
                            </div>

                            <div className="py-2">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={data.is_active}
                                        onChange={e => setData('is_active', e.target.checked)}
                                        className="w-4.5 h-4.5 text-violet-600 focus:ring-violet-500 rounded border-gray-300"
                                    />
                                    <span className="text-sm font-semibold text-gray-750">Aktifkan Voucher Ini</span>
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
                                    {processing ? 'Menyimpan...' : 'Simpan Promo'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
