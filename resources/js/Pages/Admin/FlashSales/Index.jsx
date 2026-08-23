import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ campaigns = [], products = [], banners = [] }) {
    const { flash } = usePage().props;
    const [editMode, setEditMode] = useState(false);
    const [selectedCampaign, setSelectedCampaign] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [productSearch, setProductSearch] = useState('');
    const [bulkDiscountInput, setBulkDiscountInput] = useState('20');

    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        description: '',
        start_time: '',
        end_time: '',
        is_active: true,
        banner_id: '',
        items: [],
    });

    const openCreateModal = () => {
        reset();
        setEditMode(false);
        setSelectedCampaign(null);
        setData({
            title: 'Flash Sale Spesial Hari Ini',
            description: 'Diskon kilat produk pilihan terbatas waktu!',
            start_time: '',
            end_time: '',
            is_active: true,
            banner_id: banners[0]?.id ? String(banners[0].id) : '',
            items: [],
        });
        setModalOpen(true);
    };

    const openEditModal = (campaign) => {
        setEditMode(true);
        setSelectedCampaign(campaign);
        setData({
            title: campaign.title || '',
            description: campaign.description || '',
            start_time: campaign.start_time ? campaign.start_time.replace(' ', 'T').slice(0, 16) : '',
            end_time: campaign.end_time ? campaign.end_time.replace(' ', 'T').slice(0, 16) : '',
            is_active: Boolean(campaign.is_active),
            banner_id: campaign.banner_id ? String(campaign.banner_id) : '',
            items: (campaign.items || []).map(item => ({
                product_id: item.product_id,
                discount_price: item.discount_price,
                discount_percentage: item.discount_percentage,
            })),
        });
        setModalOpen(true);
    };

    const toggleProductSelection = (product) => {
        const exists = data.items.some(i => i.product_id === product.id);
        if (exists) {
            setData('items', data.items.filter(i => i.product_id !== product.id));
        } else {
            const percent = parseInt(bulkDiscountInput) || 20;
            const discountPrice = Math.round(product.price * (1 - percent / 100));
            setData('items', [
                ...data.items,
                {
                    product_id: product.id,
                    discount_price: discountPrice,
                    discount_percentage: percent,
                }
            ]);
        }
    };

    const applyBulkDiscountToSelected = () => {
        const percent = parseInt(bulkDiscountInput) || 0;
        if (percent <= 0 || percent >= 100) return;

        const updatedItems = data.items.map(item => {
            const p = products.find(prod => prod.id === item.product_id);
            if (!p) return item;
            const discountPrice = Math.round(p.price * (1 - percent / 100));
            return {
                ...item,
                discount_percentage: percent,
                discount_price: discountPrice,
            };
        });

        setData('items', updatedItems);
    };

    const updateSingleItemDiscount = (productId, field, value) => {
        const updatedItems = data.items.map(item => {
            if (item.product_id !== productId) return item;
            const p = products.find(prod => prod.id === productId);
            if (!p) return item;

            if (field === 'percentage') {
                const percent = Math.max(1, Math.min(99, parseInt(value) || 0));
                const discountPrice = Math.round(p.price * (1 - percent / 100));
                return { ...item, discount_percentage: percent, discount_price: discountPrice };
            } else if (field === 'price') {
                const price = Math.max(0, Math.min(p.price, parseFloat(value) || 0));
                const percent = Math.round(((p.price - price) / p.price) * 100);
                return { ...item, discount_price: price, discount_percentage: percent };
            }
            return item;
        });

        setData('items', updatedItems);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (data.items.length === 0) {
            alert('Pilih minimal 1 produk untuk Flash Sale!');
            return;
        }

        if (editMode && selectedCampaign) {
            router.put(route('admin.flash-sales.update', selectedCampaign.id), data, {
                onSuccess: () => {
                    setModalOpen(false);
                }
            });
        } else {
            post(route('admin.flash-sales.store'), {
                onSuccess: () => {
                    setModalOpen(false);
                }
            });
        }
    };

    const handleDelete = (campaign) => {
        if (confirm(`Hapus campaign Flash Sale "${campaign.title}"? Produk akan kembali ke harga normal.`)) {
            router.delete(route('admin.flash-sales.destroy', campaign.id));
        }
    };

    const filteredProducts = products.filter(p => 
        p.name.toLowerCase().includes(productSearch.toLowerCase())
    );

    return (
        <AdminLayout>
            <Head title="Kelola Flash Sale Batch & Sinkronisasi Waktu - Admin Raia Food" />

            <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
                {/* Header Title & Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-purple-50">
                    <div>
                        <div className="flex items-center gap-2 text-xs text-[#843799] font-bold tracking-wider uppercase mb-1">
                            <span>⚡ Promosi Otomatis</span>
                            <span>•</span>
                            <span>Sinkronisasi Realtime</span>
                        </div>
                        <h1 className="text-2xl font-black text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
                            Campaign Flash Sale & Batch Produk
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Atur target waktu promo mulai & selesai otomatis, sinkronisasi ke Countdown Banner, dan daftarkan banyak produk sekaligus.
                        </p>
                    </div>
                    <button
                        onClick={openCreateModal}
                        className="px-5 py-2.5 bg-[#843799] hover:bg-[#6c2c7d] text-white font-bold rounded-xl shadow-md hover:shadow-purple-200 transition-all flex items-center gap-2 self-start sm:self-auto cursor-pointer"
                    >
                        <span>➕</span>
                        <span>Buat Campaign Flash Sale</span>
                    </button>
                </div>

                {/* Flash Messages */}
                {flash?.success && (
                    <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-sm font-medium flex items-center gap-2">
                        <span>✅</span> {flash.success}
                    </div>
                )}

                {/* Campaign Table List */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                        <h3 className="font-bold text-gray-900 text-base">Daftar Campaign Flash Sale ({campaigns.length})</h3>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-gray-600">
                            <thead className="bg-[#FAF0FC] text-[#843799] text-xs uppercase tracking-wider">
                                <tr>
                                    <th className="py-3 px-4 font-bold">Judul Campaign</th>
                                    <th className="py-3 px-4 font-bold">Periode Waktu</th>
                                    <th className="py-3 px-4 font-bold">Banner Terhubung</th>
                                    <th className="py-3 px-4 font-bold">Jumlah Produk</th>
                                    <th className="py-3 px-4 font-bold">Status</th>
                                    <th className="py-3 px-4 font-bold text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {campaigns.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="py-8 text-center text-gray-400">
                                            Belum ada campaign Flash Sale aktif. Klik "Buat Campaign Flash Sale" untuk memulai batch diskon!
                                        </td>
                                    </tr>
                                ) : (
                                    campaigns.map((c) => {
                                        const now = new Date();
                                        const start = c.start_time ? new Date(c.start_time) : null;
                                        const end = c.end_time ? new Date(c.end_time) : null;
                                        const isRunning = c.is_active && (!start || start <= now) && (!end || end >= now);

                                        return (
                                            <tr key={c.id} className="hover:bg-purple-50/40 transition-colors">
                                                <td className="py-4 px-4 font-bold text-gray-900">
                                                    <div>{c.title}</div>
                                                    {c.description && <div className="text-xs text-gray-400 font-normal">{c.description}</div>}
                                                </td>
                                                <td className="py-4 px-4 text-xs">
                                                    <div className="font-medium text-gray-800">
                                                        Mulai: {c.start_time ? new Date(c.start_time).toLocaleString('id-ID') : 'Sekarang (Langsung)'}
                                                    </div>
                                                    <div className="font-medium text-rose-600">
                                                        Selesai: {c.end_time ? new Date(c.end_time).toLocaleString('id-ID') : 'Tidak terbatas'}
                                                    </div>
                                                </td>
                                                <td className="py-4 px-4 text-xs font-medium text-gray-700">
                                                    {c.banner ? (
                                                        <div className="flex items-center gap-2">
                                                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                                            <span className="truncate max-w-[150px]">{c.banner.title}</span>
                                                        </div>
                                                    ) : (
                                                        <span className="text-gray-400">- Tanpa Banner -</span>
                                                    )}
                                                </td>
                                                <td className="py-4 px-4">
                                                    <span className="px-2.5 py-1 bg-purple-100 text-[#843799] font-bold rounded-lg text-xs">
                                                        ⚡ {c.items?.length || 0} Produk
                                                    </span>
                                                </td>
                                                <td className="py-4 px-4">
                                                    {isRunning ? (
                                                        <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 font-bold rounded-full text-xs animate-pulse">
                                                            🔥 Sedang Berjalan
                                                        </span>
                                                    ) : (
                                                        <span className="px-2.5 py-1 bg-gray-100 text-gray-600 font-medium rounded-full text-xs">
                                                            {c.is_active ? 'Terjadwal / Selesai' : 'Nonaktif'}
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="py-4 px-4 text-right space-x-2">
                                                    <button
                                                        onClick={() => openEditModal(c)}
                                                        className="px-3 py-1 bg-violet-100 text-violet-700 hover:bg-violet-200 rounded-lg text-xs font-bold transition-all cursor-pointer"
                                                    >
                                                        ✏️ Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(c)}
                                                        className="px-3 py-1 bg-rose-100 text-rose-700 hover:bg-rose-200 rounded-lg text-xs font-bold transition-all cursor-pointer"
                                                    >
                                                        🗑️ Hapus
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* MODAL FORM: Buat & Edit Flash Sale Campaign */}
                {modalOpen && (
                    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
                        <div className="bg-white rounded-3xl max-w-4xl w-full p-6 shadow-2xl border border-purple-100 my-8">
                            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
                                <h2 className="text-xl font-bold text-[#843799]">
                                    {editMode ? '✏️ Edit Campaign Flash Sale' : '⚡ Buat Campaign Flash Sale Baru'}
                                </h2>
                                <button
                                    onClick={() => setModalOpen(false)}
                                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 font-bold"
                                >
                                    ✕
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Grid Info Utama & Jadwal */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1 sm:col-span-2">
                                        <label className="text-xs font-bold text-gray-700">Judul Flash Sale</label>
                                        <input
                                            type="text"
                                            value={data.title}
                                            onChange={e => setData('title', e.target.value)}
                                            placeholder="Contoh: Flash Sale Gajian / Akhir Pekan 50%"
                                            className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-700">Waktu Mulai (Start Time)</label>
                                        <input
                                            type="datetime-local"
                                            value={data.start_time}
                                            onChange={e => setData('start_time', e.target.value)}
                                            className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none"
                                        />
                                        <span className="text-[11px] text-gray-400">Kosongkan jika ingin langsung aktif</span>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-rose-600">Waktu Selesai (End Time Countdown)</label>
                                        <input
                                            type="datetime-local"
                                            value={data.end_time}
                                            onChange={e => setData('end_time', e.target.value)}
                                            className="w-full px-3.5 py-2 rounded-xl border border-rose-200 text-sm focus:border-rose-400 focus:ring-2 focus:ring-rose-100 outline-none bg-rose-50/30 font-medium"
                                        />
                                        <span className="text-[11px] text-gray-400">Otomatis sinkron ke Countdown Timer Banner</span>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-700">Hubungkan dengan Banner Beranda</label>
                                        <select
                                            value={data.banner_id}
                                            onChange={e => setData('banner_id', e.target.value)}
                                            className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none"
                                        >
                                            <option value="">-- Tanpa Banner Terhubung --</option>
                                            {banners.map(b => (
                                                <option key={b.id} value={b.id}>{b.title}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="flex items-center gap-3 pt-6">
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={data.is_active}
                                                onChange={e => setData('is_active', e.target.checked)}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#843799]"></div>
                                        </label>
                                        <span className="text-xs font-bold text-gray-700">Status Campaign Aktif</span>
                                    </div>
                                </div>

                                {/* BATCH PRODUCT SELECTION SECTION */}
                                <div className="space-y-3 pt-4 border-t border-gray-100">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#FAF0FC] p-3.5 rounded-2xl border border-purple-100">
                                        <div>
                                            <h4 className="font-bold text-[#843799] text-sm">Pilih Produk & Atur Diskon Massal (Batch)</h4>
                                            <p className="text-xs text-gray-500">Terpilih: <b>{data.items.length}</b> dari {products.length} produk</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-gray-600 font-bold">Diskon Massal:</span>
                                            <input
                                                type="number"
                                                min="1"
                                                max="99"
                                                value={bulkDiscountInput}
                                                onChange={e => setBulkDiscountInput(e.target.value)}
                                                className="w-16 px-2 py-1 bg-white border border-gray-200 rounded-lg text-xs font-bold text-center"
                                            />
                                            <span className="text-xs font-bold">%</span>
                                            <button
                                                type="button"
                                                onClick={applyBulkDiscountToSelected}
                                                className="px-3 py-1 bg-[#843799] text-white rounded-lg text-xs font-bold shadow hover:bg-[#6c2c7d] cursor-pointer"
                                            >
                                                Terapkan ke Semua Terpilih
                                            </button>
                                        </div>
                                    </div>

                                    {/* Search Product Input */}
                                    <input
                                        type="text"
                                        placeholder="🔍 Cari nama produk yang ingin dimasukkan..."
                                        value={productSearch}
                                        onChange={e => setProductSearch(e.target.value)}
                                        className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none"
                                    />

                                    {/* Product Grid List */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-64 overflow-y-auto p-1 bg-gray-50/50 rounded-2xl border border-gray-200">
                                        {filteredProducts.map(prod => {
                                            const selectedItem = data.items.find(i => i.product_id === prod.id);
                                            const isSelected = Boolean(selectedItem);

                                            return (
                                                <div
                                                    key={prod.id}
                                                    className={`p-3 rounded-xl border transition-all flex flex-col justify-between gap-2 ${isSelected ? 'bg-purple-50/60 border-purple-300 shadow-sm' : 'bg-white border-gray-200 hover:border-purple-200'}`}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <input
                                                            type="checkbox"
                                                            checked={isSelected}
                                                            onChange={() => toggleProductSelection(prod)}
                                                            className="w-4 h-4 text-[#843799] rounded focus:ring-purple-400 cursor-pointer"
                                                        />
                                                        <div className="flex-1 min-w-0">
                                                            <div className="font-bold text-xs text-gray-900 truncate">{prod.name}</div>
                                                            <div className="text-[11px] text-gray-500">Harga Asli: Rp {Number(prod.price).toLocaleString('id-ID')}</div>
                                                        </div>
                                                    </div>

                                                    {isSelected && (
                                                        <div className="flex items-center justify-between gap-2 pt-2 border-t border-purple-100 text-xs">
                                                            <div className="flex items-center gap-1">
                                                                <span className="text-[10px] text-gray-500 font-bold">Diskon:</span>
                                                                <input
                                                                    type="number"
                                                                    min="1"
                                                                    max="99"
                                                                    value={selectedItem.discount_percentage || ''}
                                                                    onChange={e => updateSingleItemDiscount(prod.id, 'percentage', e.target.value)}
                                                                    className="w-12 px-1.5 py-0.5 border border-purple-200 rounded text-center font-bold text-xs bg-white"
                                                                />
                                                                <span className="text-[10px] font-bold">%</span>
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <span className="text-[10px] text-gray-500 font-bold">Jadi Rp:</span>
                                                                <input
                                                                    type="number"
                                                                    value={selectedItem.discount_price || ''}
                                                                    onChange={e => updateSingleItemDiscount(prod.id, 'price', e.target.value)}
                                                                    className="w-24 px-1.5 py-0.5 border border-purple-200 rounded text-right font-bold text-xs bg-white text-[#843799]"
                                                                />
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Modal Actions */}
                                <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                                    <button
                                        type="button"
                                        onClick={() => setModalOpen(false)}
                                        className="px-5 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50 cursor-pointer"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-6 py-2.5 bg-[#843799] hover:bg-[#6c2c7d] text-white rounded-xl text-xs font-bold shadow-md hover:shadow-purple-200 transition-all cursor-pointer"
                                    >
                                        {processing ? 'Menyimpan...' : (editMode ? '💾 Simpan Perubahan' : '⚡ Buat Flash Sale')}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
