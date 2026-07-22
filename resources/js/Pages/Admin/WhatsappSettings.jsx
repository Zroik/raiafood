import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';

export default function WhatsappSettings({ settings }) {
    const { data, setData, post, processing, errors } = useForm({
        whatsapp_button_enabled: settings.whatsapp_button_enabled || '1',
        whatsapp_number: settings.whatsapp_number || '',
        whatsapp_message: settings.whatsapp_message || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.whatsapp.update'));
    };

    const previewUrl = data.whatsapp_number
        ? `https://wa.me/${data.whatsapp_number}?text=${encodeURIComponent(data.whatsapp_message)}`
        : '#';

    return (
        <AdminLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Pengaturan Tombol WhatsApp</h2>}>
            <Head title="Pengaturan WhatsApp" />

            <div className="max-w-2xl mx-auto space-y-6">
                {/* Preview Card */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <h3 className="text-md font-bold text-gray-800 mb-4">Pratinjau Tombol</h3>
                    <div className="bg-gray-50 rounded-xl p-8 flex items-center justify-center relative min-h-[120px]">
                        {data.whatsapp_button_enabled === '1' ? (
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <a
                                        href={previewUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-14 h-14 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-full flex items-center justify-center shadow-lg shadow-emerald-200 transition-all hover:scale-110"
                                    >
                                        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                        </svg>
                                    </a>
                                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full animate-pulse"></span>
                                </div>
                                <div className="text-sm">
                                    <p className="font-semibold text-gray-800">Tombol Aktif</p>
                                    <p className="text-gray-500 text-xs mt-0.5">Akan tampil di kanan bawah halaman toko</p>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center text-gray-400">
                                <span className="text-3xl block mb-2">🔇</span>
                                <p className="text-sm font-medium">Tombol WhatsApp Nonaktif</p>
                                <p className="text-xs mt-0.5">Pelanggan tidak akan melihat tombol ini</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Settings Form */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-50">
                        <h3 className="text-md font-bold text-gray-800">Konfigurasi</h3>
                        <p className="text-xs text-gray-500 mt-1">Atur nomor WhatsApp, template pesan, dan status tombol mengambang.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        {/* Enable/Disable Toggle */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Status Tombol</label>
                            <div className="flex gap-4">
                                <label className={`flex-1 cursor-pointer rounded-xl border-2 p-4 text-center transition-all ${data.whatsapp_button_enabled === '1' ? 'border-emerald-400 bg-emerald-50 text-emerald-700' : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300'}`}>
                                    <input
                                        type="radio"
                                        name="whatsapp_button_enabled"
                                        value="1"
                                        checked={data.whatsapp_button_enabled === '1'}
                                        onChange={e => setData('whatsapp_button_enabled', e.target.value)}
                                        className="sr-only"
                                    />
                                    <span className="text-2xl block mb-1">✅</span>
                                    <span className="text-sm font-semibold">Aktif</span>
                                </label>
                                <label className={`flex-1 cursor-pointer rounded-xl border-2 p-4 text-center transition-all ${data.whatsapp_button_enabled === '0' ? 'border-red-300 bg-red-50 text-red-700' : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300'}`}>
                                    <input
                                        type="radio"
                                        name="whatsapp_button_enabled"
                                        value="0"
                                        checked={data.whatsapp_button_enabled === '0'}
                                        onChange={e => setData('whatsapp_button_enabled', e.target.value)}
                                        className="sr-only"
                                    />
                                    <span className="text-2xl block mb-1">❌</span>
                                    <span className="text-sm font-semibold">Nonaktif</span>
                                </label>
                            </div>
                        </div>

                        {/* WhatsApp Number */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Nomor WhatsApp *</label>
                            <p className="text-xs text-gray-400 mb-2">Format internasional tanpa tanda + (contoh: 6281234567890)</p>
                            <input
                                type="text"
                                value={data.whatsapp_number}
                                onChange={e => setData('whatsapp_number', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none font-mono"
                                placeholder="6281234567890"
                                required
                            />
                            {errors.whatsapp_number && <p className="text-red-500 text-xs mt-1">{errors.whatsapp_number}</p>}
                        </div>

                        {/* Message Template */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Template Pesan *</label>
                            <p className="text-xs text-gray-400 mb-2">Pesan otomatis yang terisi saat pelanggan mengklik tombol WhatsApp</p>
                            <textarea
                                value={data.whatsapp_message}
                                onChange={e => setData('whatsapp_message', e.target.value)}
                                rows={4}
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none"
                                placeholder="Halo RaiaFood! Saya tertarik dengan produk cookies kalian..."
                                required
                            />
                            <div className="flex justify-between mt-1">
                                {errors.whatsapp_message && <p className="text-red-500 text-xs">{errors.whatsapp_message}</p>}
                                <p className="text-xs text-gray-400 ml-auto">{data.whatsapp_message.length}/500</p>
                            </div>
                        </div>

                        {/* Generated Link Preview */}
                        {data.whatsapp_number && (
                            <div className="bg-gray-50 rounded-xl p-4">
                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Link Yang Dihasilkan</p>
                                <p className="text-xs font-mono text-violet-600 break-all select-all">{previewUrl}</p>
                            </div>
                        )}

                        <div className="pt-4 border-t border-gray-50 flex items-center justify-end">
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-6 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-sm font-semibold transition-all shadow-md shadow-violet-100 disabled:opacity-50"
                            >
                                {processing ? 'Menyimpan...' : 'Simpan Pengaturan'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
