import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import { BellOff, CheckCircle2, XCircle } from 'lucide-react';

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
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Pratinjau Tombol Toko</h3>
                    <div className="bg-gray-50 rounded-xl p-8 flex items-center justify-center border border-dashed border-gray-200 min-h-[160px]">
                        {data.whatsapp_button_enabled === '1' ? (
                            <div className="flex items-center gap-4">
                                <a
                                    href={previewUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-14 h-14 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-full flex items-center justify-center shadow-lg shadow-emerald-200 transition-all hover:scale-110"
                                >
                                    <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                                        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.971.53 1.769.814 2.796.814 3.181 0 5.767-2.586 5.768-5.766 0-3.18-2.587-5.766-5.768-5.766zm3.376 8.21c-.14.394-.716.745-1.002.775-.27.028-.62.046-1.785-.436-1.488-.616-2.457-2.128-2.531-2.227-.075-.099-.607-.808-.607-1.542s.385-1.096.522-1.246c.137-.15.299-.187.399-.187.1 0 .2.001.287.006.091.005.213-.035.333.253.123.296.422 1.028.459 1.103.037.075.062.163.012.262-.05.1-.075.163-.15.25-.075.088-.158.196-.226.263-.075.074-.153.155-.066.305.087.15.387.639.83 1.033.57.507 1.05.664 1.199.739.15.075.237.062.325-.038.087-.1.374-.436.474-.586.1-.15.2-.125.337-.075.137.05.872.411 1.022.486.15.075.249.112.287.175.037.062.037.362-.103.756z" />
                                    </svg>
                                </a>
                                <div>
                                    <p className="font-semibold text-gray-800">Tombol Aktif</p>
                                    <p className="text-gray-500 text-xs mt-0.5">Akan tampil di kanan bawah halaman toko</p>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center text-gray-400">
                                <BellOff className="w-8 h-8 mx-auto mb-2 text-gray-300" />
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
                                    <CheckCircle2 className="w-6 h-6 mx-auto mb-1 text-emerald-600" />
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
                                    <XCircle className="w-6 h-6 mx-auto mb-1 text-red-500" />
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
