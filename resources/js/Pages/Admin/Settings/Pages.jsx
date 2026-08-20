import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Pages({ settings }) {
    const { data, setData, post, processing, errors } = useForm({
        about_title: settings.about_title || '',
        about_description: settings.about_description || '',
        about_vision: settings.about_vision || '',
        about_mission: settings.about_mission || '',
        about_banner: null,
        products_banner: null,
        contact_banner: null,
        faq_banner: null,
    });

    const [previews, setPreviews] = useState({
        about_banner: settings.about_banner ? `/storage/${settings.about_banner}` : '/images/about-banner.webp',
        products_banner: settings.products_banner ? `/storage/${settings.products_banner}` : null,
        contact_banner: settings.contact_banner ? `/storage/${settings.contact_banner}` : '/images/hero.webp',
        faq_banner: settings.faq_banner ? `/storage/${settings.faq_banner}` : '/images/faq.webp',
    });

    const handleFileChange = (field, e) => {
        const file = e.target.files[0];
        if (file) {
            setData(field, file);
            setPreviews(prev => ({ ...prev, [field]: URL.createObjectURL(file) }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.settings.pages.update'), {
            forceFormData: true,
        });
    };

    return (
        <AdminLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Banner & Teks Konten Halaman</h2>}>
            <Head title="Banner & Halaman - Admin" />

            <div className="max-w-4xl mx-auto space-y-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Halaman Tentang Kami */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                        <h3 className="text-base font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                            <span>📖</span>
                            <span>Konten Halaman Tentang Kami</span>
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">Judul Utama Halaman</label>
                                <input
                                    type="text"
                                    value={data.about_title}
                                    onChange={e => setData('about_title', e.target.value)}
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#843799] focus:ring-2 focus:ring-[#FAE6FF] outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">Deskripsi / Cerita Usaha</label>
                                <textarea
                                    value={data.about_description}
                                    onChange={e => setData('about_description', e.target.value)}
                                    rows={4}
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#843799] focus:ring-2 focus:ring-[#FAE6FF] outline-none"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1">Visi Usaha</label>
                                    <textarea
                                        value={data.about_vision}
                                        onChange={e => setData('about_vision', e.target.value)}
                                        rows={3}
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#843799] focus:ring-2 focus:ring-[#FAE6FF] outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1">Misi Usaha</label>
                                    <textarea
                                        value={data.about_mission}
                                        onChange={e => setData('about_mission', e.target.value)}
                                        rows={3}
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#843799] focus:ring-2 focus:ring-[#FAE6FF] outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Banner Header Setiap Halaman */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                        <h3 className="text-base font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                            <span>🖼️</span>
                            <span>Foto Banner Header Halaman</span>
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* Tentang Kami Banner */}
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-2">Banner Header Tentang Kami</label>
                                {previews.about_banner && (
                                    <div className="rounded-xl overflow-hidden border border-gray-200 mb-2 aspect-[3/1] bg-gray-50">
                                        <img src={previews.about_banner} alt="About Banner" className="w-full h-full object-cover" />
                                    </div>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={e => handleFileChange('about_banner', e)}
                                    className="w-full text-xs text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-purple-50 file:text-[#843799] hover:file:bg-purple-100 cursor-pointer"
                                />
                            </div>

                            {/* Hubungi Kami Banner */}
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-2">Banner Header Hubungi Kami</label>
                                {previews.contact_banner && (
                                    <div className="rounded-xl overflow-hidden border border-gray-200 mb-2 aspect-[3/1] bg-gray-50">
                                        <img src={previews.contact_banner} alt="Contact Banner" className="w-full h-full object-cover" />
                                    </div>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={e => handleFileChange('contact_banner', e)}
                                    className="w-full text-xs text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-purple-50 file:text-[#843799] hover:file:bg-purple-100 cursor-pointer"
                                />
                            </div>

                            {/* FAQ Banner */}
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-2">Banner Header FAQ</label>
                                {previews.faq_banner && (
                                    <div className="rounded-xl overflow-hidden border border-gray-200 mb-2 aspect-[3/1] bg-gray-50">
                                        <img src={previews.faq_banner} alt="FAQ Banner" className="w-full h-full object-cover" />
                                    </div>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={e => handleFileChange('faq_banner', e)}
                                    className="w-full text-xs text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-purple-50 file:text-[#843799] hover:file:bg-purple-100 cursor-pointer"
                                />
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
                            {processing ? 'Menyimpan...' : 'Simpan Konten Halaman'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
