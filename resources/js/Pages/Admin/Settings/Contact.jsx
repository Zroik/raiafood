import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Contact({ settings }) {
    const { data, setData, post, processing, errors } = useForm({
        phone: settings.phone || '',
        email: settings.email || '',
        address: settings.address || '',
        operating_hours: settings.operating_hours || '',
        maps_link: settings.maps_link || '',
        maps_iframe: settings.maps_iframe || '',
        whatsapp_number: settings.whatsapp_number || '',
        whatsapp_message: settings.whatsapp_message || '',
        whatsapp_button_enabled: settings.whatsapp_button_enabled || '1',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.settings.contact.update'));
    };

    return (
        <AdminLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Kontak, WhatsApp & Lokasi Peta</h2>}>
            <Head title="Kontak & Lokasi - Admin" />

            <div className="max-w-4xl mx-auto space-y-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Kontak Utama */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                        <h3 className="text-base font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                            <span>📞</span>
                            <span>Informasi Kontak Toko</span>
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">Nomor Telepon / Hotline</label>
                                <input
                                    type="text"
                                    value={data.phone}
                                    onChange={e => setData('phone', e.target.value)}
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#843799] focus:ring-2 focus:ring-[#FAE6FF] outline-none"
                                    placeholder="+62 812-2277-7468"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">Alamat Email Toko</label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#843799] focus:ring-2 focus:ring-[#FAE6FF] outline-none"
                                    placeholder="raiafoodcentre@gmail.com"
                                />
                            </div>

                            <div className="sm:col-span-2">
                                <label className="block text-xs font-semibold text-gray-700 mb-1">Jam Operasional / Keterangan Layanan</label>
                                <input
                                    type="text"
                                    value={data.operating_hours}
                                    onChange={e => setData('operating_hours', e.target.value)}
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#843799] focus:ring-2 focus:ring-[#FAE6FF] outline-none"
                                    placeholder="Respon setiap hari 08:00 - 20:00 WIB"
                                />
                            </div>
                        </div>
                    </div>

                    {/* WhatsApp Widget */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                        <h3 className="text-base font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                            <span>💬</span>
                            <span>Integrasi Tombol WhatsApp Floating</span>
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={data.whatsapp_button_enabled === '1'}
                                        onChange={e => setData('whatsapp_button_enabled', e.target.checked ? '1' : '0')}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:width-5 after:transition-all peer-checked:bg-[#25D366]"></div>
                                </label>
                                <span className="text-xs font-bold text-gray-750">Tampilkan Tombol Melayang WhatsApp di Halaman Toko</span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1">Nomor WhatsApp (Contoh: 6281222777468)</label>
                                    <input
                                        type="text"
                                        value={data.whatsapp_number}
                                        onChange={e => setData('whatsapp_number', e.target.value)}
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#843799] focus:ring-2 focus:ring-[#FAE6FF] outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1">Pesan Otomatis Default</label>
                                    <input
                                        type="text"
                                        value={data.whatsapp_message}
                                        onChange={e => setData('whatsapp_message', e.target.value)}
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#843799] focus:ring-2 focus:ring-[#FAE6FF] outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Alamat & Google Maps */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                        <h3 className="text-base font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                            <span>📍</span>
                            <span>Alamat Toko & Lokasi Google Maps</span>
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">Alamat Lengkap Toko / Kantor</label>
                                <textarea
                                    value={data.address}
                                    onChange={e => setData('address', e.target.value)}
                                    rows={2}
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#843799] focus:ring-2 focus:ring-[#FAE6FF] outline-none"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1">Link URL Google Maps (Buka di Tab Baru)</label>
                                    <input
                                        type="url"
                                        value={data.maps_link}
                                        onChange={e => setData('maps_link', e.target.value)}
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#843799] focus:ring-2 focus:ring-[#FAE6FF] outline-none"
                                        placeholder="https://maps.google.com/?q=..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1">URL Iframe Embed Google Maps</label>
                                    <input
                                        type="text"
                                        value={data.maps_iframe}
                                        onChange={e => setData('maps_iframe', e.target.value)}
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#843799] focus:ring-2 focus:ring-[#FAE6FF] outline-none"
                                        placeholder="https://maps-api-ssl.google.com/maps?..."
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-6 py-2.5 rounded-xl bg-[#843799] text-white font-bold text-sm shadow-md hover:bg-[#60396A] transition-all disabled:opacity-50"
                        >
                            {processing ? 'Menyimpan...' : 'Simpan Pengaturan Kontak'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
