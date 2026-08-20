import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function General({ settings }) {
    const { data, setData, post, processing, errors } = useForm({
        company_name: settings.company_name || 'Raia Food',
        company_tagline: settings.company_tagline || '',
        meta_description: settings.meta_description || '',
        primary_color: settings.primary_color || '#843799',
        secondary_color: settings.secondary_color || '#F4C6FF',
        soft_color: settings.soft_color || '#FAE6FF',
        dark_color: settings.dark_color || '#60396A',
        logo: null,
        favicon: null,
    });

    const [logoPreview, setLogoPreview] = useState(settings.site_logo ? `/storage/${settings.site_logo}` : '/images/raia-logo.webp');
    const [faviconPreview, setFaviconPreview] = useState(settings.site_favicon ? `/storage/${settings.site_favicon}` : '/images/raia-logo.webp');

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('logo', file);
            setLogoPreview(URL.createObjectURL(file));
        }
    };

    const handleFaviconChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('favicon', file);
            setFaviconPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.settings.general.update'), {
            forceFormData: true,
        });
    };

    return (
        <AdminLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Identitas & Tampilan Website</h2>}>
            <Head title="Identitas & Tampilan - Admin" />

            <div className="max-w-4xl mx-auto space-y-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Identitas Usaha */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                        <h3 className="text-base font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                            <span>🏢</span>
                            <span>Informasi Identitas Usaha</span>
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="sm:col-span-2">
                                <label className="block text-xs font-semibold text-gray-700 mb-1">Nama Usaha / Toko *</label>
                                <input
                                    type="text"
                                    value={data.company_name}
                                    onChange={e => setData('company_name', e.target.value)}
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#843799] focus:ring-2 focus:ring-[#FAE6FF] outline-none"
                                    required
                                />
                                {errors.company_name && <p className="text-red-500 text-xs mt-1">{errors.company_name}</p>}
                            </div>

                            <div className="sm:col-span-2">
                                <label className="block text-xs font-semibold text-gray-700 mb-1">Slogan / Tagline Usaha</label>
                                <input
                                    type="text"
                                    value={data.company_tagline}
                                    onChange={e => setData('company_tagline', e.target.value)}
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#843799] focus:ring-2 focus:ring-[#FAE6FF] outline-none"
                                    placeholder="Contoh: Camilan Enak & Gurih Khas Batu Malang"
                                />
                                {errors.company_tagline && <p className="text-red-500 text-xs mt-1">{errors.company_tagline}</p>}
                            </div>

                            <div className="sm:col-span-2">
                                <label className="block text-xs font-semibold text-gray-700 mb-1">Deskripsi Singkat (SEO Meta Description)</label>
                                <textarea
                                    value={data.meta_description}
                                    onChange={e => setData('meta_description', e.target.value)}
                                    rows={3}
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#843799] focus:ring-2 focus:ring-[#FAE6FF] outline-none"
                                    placeholder="Deskripsi ringkas yang tampil di pencarian Google..."
                                />
                                {errors.meta_description && <p className="text-red-500 text-xs mt-1">{errors.meta_description}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Logo & Favicon */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                        <h3 className="text-base font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                            <span>🖼️</span>
                            <span>Upload Logo & Favicon</span>
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* Logo */}
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-2">Logo Utama Website</label>
                                <div className="flex items-center gap-4">
                                    <div className="w-24 h-16 rounded-xl border border-gray-200 bg-gray-50 flex items-center justify-center p-2 overflow-hidden">
                                        <img src={logoPreview} alt="Logo Preview" className="max-h-full max-w-full object-contain" />
                                    </div>
                                    <div className="flex-1">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleLogoChange}
                                            className="w-full text-xs text-gray-500 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-purple-50 file:text-[#843799] hover:file:bg-purple-100 cursor-pointer"
                                        />
                                        <p className="text-[11px] text-gray-400 mt-1">PNG/WebP transparan (Rekomendasi lebar 250px)</p>
                                    </div>
                                </div>
                                {errors.logo && <p className="text-red-500 text-xs mt-1">{errors.logo}</p>}
                            </div>

                            {/* Favicon */}
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-2">Favicon (Ikon Tab Browser)</label>
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-xl border border-gray-200 bg-gray-50 flex items-center justify-center p-2 overflow-hidden">
                                        <img src={faviconPreview} alt="Favicon Preview" className="max-h-full max-w-full object-contain" />
                                    </div>
                                    <div className="flex-1">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFaviconChange}
                                            className="w-full text-xs text-gray-500 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-purple-50 file:text-[#843799] hover:file:bg-purple-100 cursor-pointer"
                                        />
                                        <p className="text-[11px] text-gray-400 mt-1">Rasio 1:1 persegi (Format .ico / .png / .webp)</p>
                                    </div>
                                </div>
                                {errors.favicon && <p className="text-red-500 text-xs mt-1">{errors.favicon}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Skema Warna Tema */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                        <h3 className="text-base font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                            <span>🎨</span>
                            <span>Palet Warna Desain Toko</span>
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">Primary Color (Ungu Utama)</label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="color"
                                        value={data.primary_color}
                                        onChange={e => setData('primary_color', e.target.value)}
                                        className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer p-1"
                                    />
                                    <input
                                        type="text"
                                        value={data.primary_color}
                                        onChange={e => setData('primary_color', e.target.value)}
                                        className="flex-1 px-3 py-2 text-xs rounded-lg border border-gray-200"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">Secondary (Sidebar/Aksen)</label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="color"
                                        value={data.secondary_color}
                                        onChange={e => setData('secondary_color', e.target.value)}
                                        className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer p-1"
                                    />
                                    <input
                                        type="text"
                                        value={data.secondary_color}
                                        onChange={e => setData('secondary_color', e.target.value)}
                                        className="flex-1 px-3 py-2 text-xs rounded-lg border border-gray-200"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">Soft Color (Background Card)</label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="color"
                                        value={data.soft_color}
                                        onChange={e => setData('soft_color', e.target.value)}
                                        className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer p-1"
                                    />
                                    <input
                                        type="text"
                                        value={data.soft_color}
                                        onChange={e => setData('soft_color', e.target.value)}
                                        className="flex-1 px-3 py-2 text-xs rounded-lg border border-gray-200"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">Dark Accent (Teks Gelap)</label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="color"
                                        value={data.dark_color}
                                        onChange={e => setData('dark_color', e.target.value)}
                                        className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer p-1"
                                    />
                                    <input
                                        type="text"
                                        value={data.dark_color}
                                        onChange={e => setData('dark_color', e.target.value)}
                                        className="flex-1 px-3 py-2 text-xs rounded-lg border border-gray-200"
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
                            {processing ? 'Menyimpan...' : 'Simpan Pengaturan'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
