import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import {
    Truck,
    Megaphone,
    CreditCard,
    Save,
    CheckCircle2,
    HelpCircle,
    Building,
    UserCheck,
    Coins,
    Sparkles
} from 'lucide-react';

export default function Store({ settings }) {
    const { data, setData, post, processing, recentlySuccessful } = useForm({
        shipping_cost: settings.shipping_cost || 15000,
        free_shipping_min: settings.free_shipping_min || 150000,
        announcement_enabled: settings.announcement_enabled === '1' ? '1' : '0',
        announcement_text: settings.announcement_text || '',
        announcement_link: settings.announcement_link || '',
        payment_bank_name: settings.payment_bank_name || 'BCA',
        payment_bank_account: settings.payment_bank_account || '123-456-7890',
        payment_bank_holder: settings.payment_bank_holder || 'Raia Food Official',
        payment_instructions: settings.payment_instructions || 'Silakan transfer total pembayaran ke rekening di atas dan konfirmasikan bukti transfer ke WhatsApp kami.',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.settings.store.update'), {
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Pengaturan Toko, Pengiriman & Pengumuman</h2>}>
            <Head title="Pengiriman & Pengumuman - Admin" />

            <div className="max-w-4xl mx-auto space-y-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Header Action */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                <Truck className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
                                <span>Pengaturan Operasional & Promo Toko</span>
                            </h1>
                            <p className="text-xs text-gray-500 mt-1">
                                Kelola banner pengumuman atas, ongkos kirim standar, batas bebas ongkir, serta rekening pembayaran.
                            </p>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs text-white shadow-sm transition-all duration-200 cursor-pointer disabled:opacity-50"
                            style={{ backgroundColor: 'var(--color-primary)' }}
                        >
                            {processing ? (
                                <span>Menyimpan...</span>
                            ) : (
                                <>
                                    <Save className="w-4 h-4" />
                                    <span>Simpan Pengaturan</span>
                                </>
                            )}
                        </button>
                    </div>

                    {recentlySuccessful && (
                        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl px-4 py-3 text-xs flex items-center gap-2 animate-fade-in">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                            <span>Pengaturan toko berhasil diperbarui dan disinkronkan ke seluruh sistem storefront.</span>
                        </div>
                    )}

                    {/* SECTION 1: BANNER PENGUMUMAN ATAS (ANNOUNCEMENT BAR) */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs space-y-5">
                        <div className="flex items-start justify-between gap-4 pb-4 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--color-soft)', color: 'var(--color-primary)' }}>
                                    <Megaphone className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-gray-900">Banner Pengumuman Atas (Top Announcement Bar)</h3>
                                    <p className="text-xs text-gray-500">Menampilkan pita teks informasi promo atau pengumuman penting di atas navbar.</p>
                                </div>
                            </div>

                            {/* Toggle Switch */}
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={data.announcement_enabled === '1'}
                                    onChange={e => setData('announcement_enabled', e.target.checked ? '1' : '0')}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-700"></div>
                            </label>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">Teks Pengumuman</label>
                                <input
                                    type="text"
                                    value={data.announcement_text}
                                    onChange={e => setData('announcement_text', e.target.value)}
                                    placeholder="Contoh: 🚚 Promo Gratis Ongkir untuk pembelian di atas Rp150.000!"
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 outline-none focus:ring-1 focus:ring-purple-400"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">Tautan URL Banner (Opsional)</label>
                                <input
                                    type="text"
                                    value={data.announcement_link}
                                    onChange={e => setData('announcement_link', e.target.value)}
                                    placeholder="Contoh: /products atau /promo (biarkan kosong jika tidak ada link klik)"
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 font-mono outline-none focus:ring-1 focus:ring-purple-400"
                                />
                            </div>

                            {/* Live Preview Bar */}
                            <div className="mt-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-2">Live Preview di Header:</span>
                                {data.announcement_enabled === '1' ? (
                                    <div
                                        style={{ backgroundColor: 'var(--color-primary)', color: '#ffffff' }}
                                        className="py-2 px-4 rounded-lg text-center text-xs font-semibold flex items-center justify-between"
                                    >
                                        <div className="w-5" />
                                        <span className="truncate">{data.announcement_text || 'Teks pengumuman akan tampil di sini'}</span>
                                        <span className="opacity-70 text-[11px]">✕</span>
                                    </div>
                                ) : (
                                    <div className="py-2 px-4 rounded-lg bg-gray-200 text-gray-500 text-center text-xs">
                                        Banner Sedang Dinonaktifkan
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* SECTION 2: BIAYA PENGIRIMAN & FREE SHIPPING */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs space-y-5">
                        <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--color-soft)', color: 'var(--color-primary)' }}>
                                <Coins className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-gray-900">Tarif Pengiriman & Syarat Bebas Ongkir</h3>
                                <p className="text-xs text-gray-500">Atur besaran ongkir flat dan nilai belanja minimum untuk mendapatkan gratis pengiriman otomatis saat checkout.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">
                                    Biaya Pengiriman Standar (Flat Rate Rp)
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-2.5 text-xs text-gray-400 font-semibold">Rp</span>
                                    <input
                                        type="number"
                                        min="0"
                                        step="1000"
                                        value={data.shipping_cost}
                                        onChange={e => setData('shipping_cost', e.target.value)}
                                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-900 outline-none focus:ring-1 focus:ring-purple-400"
                                    />
                                </div>
                                <p className="text-[11px] text-gray-400 mt-1">Biaya kirim yang dibebankan per transaksi pesanan.</p>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">
                                    Minimal Belanja Gratis Ongkir (Rp)
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-2.5 text-xs text-gray-400 font-semibold">Rp</span>
                                    <input
                                        type="number"
                                        min="0"
                                        step="5000"
                                        value={data.free_shipping_min}
                                        onChange={e => setData('free_shipping_min', e.target.value)}
                                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-900 outline-none focus:ring-1 focus:ring-purple-400"
                                    />
                                </div>
                                <p className="text-[11px] text-gray-400 mt-1">Bila total belanja di atas nilai ini, ongkir menjadi Rp 0.</p>
                            </div>
                        </div>
                    </div>

                    {/* SECTION 3: REKENING BANK & INSTRUKSI PEMBAYARAN */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs space-y-5">
                        <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--color-soft)', color: 'var(--color-primary)' }}>
                                <CreditCard className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-gray-900">Rekening Pembayaran & Instruksi Transfer</h3>
                                <p className="text-xs text-gray-500">Informasi nomor rekening yang ditampilkan kepada pelanggan saat memilih pembayaran transfer manual.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">Nama Bank</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={data.payment_bank_name}
                                        onChange={e => setData('payment_bank_name', e.target.value)}
                                        placeholder="Misal: BCA / Mandiri / BRI"
                                        className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 font-medium outline-none focus:ring-1 focus:ring-purple-400"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">Nomor Rekening</label>
                                <input
                                    type="text"
                                    value={data.payment_bank_account}
                                    onChange={e => setData('payment_bank_account', e.target.value)}
                                    placeholder="Contoh: 123-456-7890"
                                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 font-mono font-bold outline-none focus:ring-1 focus:ring-purple-400"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">Atas Nama Pemilik</label>
                                <input
                                    type="text"
                                    value={data.payment_bank_holder}
                                    onChange={e => setData('payment_bank_holder', e.target.value)}
                                    placeholder="Contoh: Raia Food Official"
                                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 font-medium outline-none focus:ring-1 focus:ring-purple-400"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Panduan / Instruksi Pembayaran</label>
                            <textarea
                                value={data.payment_instructions}
                                onChange={e => setData('payment_instructions', e.target.value)}
                                rows={3}
                                placeholder="Petunjuk langkah demi langkah bagi pembeli untuk menyelesaikan pembayaran..."
                                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 outline-none focus:ring-1 focus:ring-purple-400"
                            />
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
