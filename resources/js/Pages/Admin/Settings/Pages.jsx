import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { BookOpen, Image as ImageIcon, Home, PhoneCall, CheckCircle2, Sparkles } from 'lucide-react';

export default function Pages({ settings }) {
    const { data, setData, post, processing, recentlySuccessful, errors } = useForm({
        // Beranda
        home_hero_greeting: settings.home_hero_greeting || 'Selamat datang di',
        home_hero_title: settings.home_hero_title || (settings.company_name || 'Raia Food'),
        home_hero_motto: settings.home_hero_motto || 'Pusat Makanan Khas Batu',
        home_hero_cta_text: settings.home_hero_cta_text || 'Belanja Sekarang',
        home_hero_cta_link: settings.home_hero_cta_link || '/products',
        home_hero_cta_sec_text: settings.home_hero_cta_sec_text || 'Tentang Kami',
        home_hero_cta_sec_link: settings.home_hero_cta_sec_link || '/tentang-kami',
        home_section_latest_title: settings.home_section_latest_title || 'Produk Terbaru',
        home_section_popular_title: settings.home_section_popular_title || 'Produk Terlaris',

        // Tentang Kami
        about_title: settings.about_title || 'Kisah & Dedikasi Raia Food',
        about_description: settings.about_description || '',
        about_vision: settings.about_vision || '',
        about_mission: settings.about_mission || '',
        about_cta_title: settings.about_cta_title || 'Jelajahi Produk Kami',
        about_cta_subtitle: settings.about_cta_subtitle || "Rasakan kelezatan khas Jawa dalam setiap gigitan.\nTemukan favoritmu sekarang!",
        about_cta_btn_text: settings.about_cta_btn_text || 'Lihat Produk',
        about_cta_btn_link: settings.about_cta_btn_link || '/products',

        // Hubungi Kami
        contact_hero_title: settings.contact_hero_title || 'Kami Siap Membantu Anda',
        contact_hero_subtitle: settings.contact_hero_subtitle || "Punya pertanyaan, saran, atau ingin bekerja sama?\nJangan ragu untuk menghubungi kami.\nTim RAIA Food akan dengan senang hati membantu anda",

        // Banners
        about_banner: null,
        products_banner: null,
        contact_banner: null,
        faq_banner: null,
    });

    const [previews, setPreviews] = useState({
        about_banner: settings.about_banner ? `/storage/${settings.about_banner}` : '/images/hero.webp',
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
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Banner & Teks Konten Halaman</h2>}>
            <Head title="Banner & Konten Halaman - Admin" />

            <div className="max-w-4xl mx-auto space-y-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Header Action Card */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                <Sparkles className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
                                <span>Konten Teks & Banner Halaman</span>
                            </h1>
                            <p className="text-xs text-gray-500 mt-1">
                                Kelola teks sambutan beranda, judul section, visi misi tentang kami, dan foto banner header.
                            </p>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="px-6 py-2.5 rounded-xl text-white font-bold text-xs shadow-sm transition-all duration-200 cursor-pointer disabled:opacity-50"
                            style={{ backgroundColor: 'var(--color-primary)' }}
                        >
                            {processing ? 'Menyimpan...' : 'Simpan Konten Halaman'}
                        </button>
                    </div>

                    {recentlySuccessful && (
                        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl px-4 py-3 text-xs flex items-center gap-2 animate-fade-in">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                            <span>Konten halaman berhasil diperbarui.</span>
                        </div>
                    )}

                    {/* SECTION 1: KONTEN TEKS HALAMAN BERANDA */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs space-y-5">
                        <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
                            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--color-soft)', color: 'var(--color-primary)' }}>
                                <Home className="w-4 h-4" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-gray-900">Teks Hero & Judul Section Beranda</h3>
                                <p className="text-xs text-gray-500">Sesuaikan teks overlay pada banner utama dan judul bagian di beranda toko.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">Salam Pembuka Hero</label>
                                <input
                                    type="text"
                                    value={data.home_hero_greeting}
                                    onChange={e => setData('home_hero_greeting', e.target.value)}
                                    placeholder="Selamat datang di"
                                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-gray-900 outline-none focus:ring-1 focus:ring-purple-400"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">Nama Toko Hero</label>
                                <input
                                    type="text"
                                    value={data.home_hero_title}
                                    onChange={e => setData('home_hero_title', e.target.value)}
                                    placeholder="Raia Food"
                                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-gray-900 font-bold outline-none focus:ring-1 focus:ring-purple-400"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">Motto / Tagline Hero</label>
                                <input
                                    type="text"
                                    value={data.home_hero_motto}
                                    onChange={e => setData('home_hero_motto', e.target.value)}
                                    placeholder="Pusat Makanan Khas Batu"
                                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-gray-900 outline-none focus:ring-1 focus:ring-purple-400"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                            <div className="bg-gray-50/70 p-3.5 rounded-xl border border-gray-100 space-y-2">
                                <span className="text-[11px] font-bold text-gray-700 block">Tombol Aksi Utama (CTA 1)</span>
                                <input
                                    type="text"
                                    value={data.home_hero_cta_text}
                                    onChange={e => setData('home_hero_cta_text', e.target.value)}
                                    placeholder="Label: Belanja Sekarang"
                                    className="w-full px-3 py-1.5 rounded-lg border border-gray-200 text-xs bg-white outline-none"
                                />
                                <input
                                    type="text"
                                    value={data.home_hero_cta_link}
                                    onChange={e => setData('home_hero_cta_link', e.target.value)}
                                    placeholder="URL: /products"
                                    className="w-full px-3 py-1.5 rounded-lg border border-gray-200 text-xs bg-white font-mono outline-none"
                                />
                            </div>

                            <div className="bg-gray-50/70 p-3.5 rounded-xl border border-gray-100 space-y-2">
                                <span className="text-[11px] font-bold text-gray-700 block">Tombol Aksi Kedua (CTA 2)</span>
                                <input
                                    type="text"
                                    value={data.home_hero_cta_sec_text}
                                    onChange={e => setData('home_hero_cta_sec_text', e.target.value)}
                                    placeholder="Label: Tentang Kami"
                                    className="w-full px-3 py-1.5 rounded-lg border border-gray-200 text-xs bg-white outline-none"
                                />
                                <input
                                    type="text"
                                    value={data.home_hero_cta_sec_link}
                                    onChange={e => setData('home_hero_cta_sec_link', e.target.value)}
                                    placeholder="URL: /tentang-kami"
                                    className="w-full px-3 py-1.5 rounded-lg border border-gray-200 text-xs bg-white font-mono outline-none"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">Judul Bagian 1 (Produk Terbaru)</label>
                                <input
                                    type="text"
                                    value={data.home_section_latest_title}
                                    onChange={e => setData('home_section_latest_title', e.target.value)}
                                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-gray-900 outline-none focus:ring-1 focus:ring-purple-400"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">Judul Bagian 2 (Produk Terlaris)</label>
                                <input
                                    type="text"
                                    value={data.home_section_popular_title}
                                    onChange={e => setData('home_section_popular_title', e.target.value)}
                                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-gray-900 outline-none focus:ring-1 focus:ring-purple-400"
                                />
                            </div>
                        </div>
                    </div>

                    {/* SECTION 2: HALAMAN TENTANG KAMI */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs space-y-4">
                        <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
                            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--color-soft)', color: 'var(--color-primary)' }}>
                                <BookOpen className="w-4 h-4" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-gray-900">Konten Halaman Tentang Kami & Visi Misi</h3>
                                <p className="text-xs text-gray-500">Teks cerita usaha, visi, butir misi, serta banner ajakan belanja di bagian bawah.</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">Judul Utama Halaman</label>
                                <input
                                    type="text"
                                    value={data.about_title}
                                    onChange={e => setData('about_title', e.target.value)}
                                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs text-gray-900 outline-none focus:ring-1 focus:ring-purple-400"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">Deskripsi / Cerita Usaha</label>
                                <textarea
                                    value={data.about_description}
                                    onChange={e => setData('about_description', e.target.value)}
                                    rows={3}
                                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs text-gray-900 outline-none focus:ring-1 focus:ring-purple-400"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1">Visi Usaha</label>
                                    <textarea
                                        value={data.about_vision}
                                        onChange={e => setData('about_vision', e.target.value)}
                                        rows={4}
                                        className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs text-gray-900 outline-none focus:ring-1 focus:ring-purple-400"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1">Misi Usaha (Pisahkan baris per butir misi)</label>
                                    <textarea
                                        value={data.about_mission}
                                        onChange={e => setData('about_mission', e.target.value)}
                                        rows={4}
                                        placeholder="Tulis setiap butir misi dalam baris baru..."
                                        className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs text-gray-900 outline-none focus:ring-1 focus:ring-purple-400"
                                    />
                                </div>
                            </div>

                            {/* Banner Bawah Jelajahi Produk */}
                            <div className="pt-3 border-t border-gray-100">
                                <span className="text-xs font-bold text-gray-800 block mb-2">Banner Bawah: "Jelajahi Produk Kami"</span>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
                                    <input
                                        type="text"
                                        placeholder="Judul Banner (Jelajahi Produk Kami)"
                                        value={data.about_cta_title}
                                        onChange={e => setData('about_cta_title', e.target.value)}
                                        className="px-3 py-2 rounded-xl border border-gray-200 text-xs text-gray-900 outline-none"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Teks Tombol (Lihat Produk)"
                                        value={data.about_cta_btn_text}
                                        onChange={e => setData('about_cta_btn_text', e.target.value)}
                                        className="px-3 py-2 rounded-xl border border-gray-200 text-xs text-gray-900 outline-none"
                                    />
                                </div>
                                <textarea
                                    placeholder="Subjudul / Ajakan singkat banner..."
                                    value={data.about_cta_subtitle}
                                    onChange={e => setData('about_cta_subtitle', e.target.value)}
                                    rows={2}
                                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-gray-900 outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* SECTION 3: HALAMAN HUBUNGI KAMI */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs space-y-4">
                        <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
                            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--color-soft)', color: 'var(--color-primary)' }}>
                                <PhoneCall className="w-4 h-4" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-gray-900">Konten Teks Hubungi Kami</h3>
                                <p className="text-xs text-gray-500">Teks sambutan hero pada halaman Hubungi Kami.</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">Judul Hero Hubungi Kami</label>
                                <input
                                    type="text"
                                    value={data.contact_hero_title}
                                    onChange={e => setData('contact_hero_title', e.target.value)}
                                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs text-gray-900 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">Deskripsi Hero Hubungi Kami</label>
                                <textarea
                                    value={data.contact_hero_subtitle}
                                    onChange={e => setData('contact_hero_subtitle', e.target.value)}
                                    rows={2}
                                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs text-gray-900 outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* SECTION 4: FOTO BANNER HEADER HALAMAN */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs space-y-4">
                        <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
                            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--color-soft)', color: 'var(--color-primary)' }}>
                                <ImageIcon className="w-4 h-4" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-gray-900">Foto Banner Header Setiap Halaman</h3>
                                <p className="text-xs text-gray-500">Upload foto banner rasio 3:1 untuk latar belakang header halaman.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-2">Tentang Kami</label>
                                {previews.about_banner && (
                                    <div className="rounded-xl overflow-hidden border border-gray-200 mb-2 aspect-[3/1] bg-gray-50">
                                        <img src={previews.about_banner} alt="About Banner" className="w-full h-full object-cover" />
                                    </div>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={e => handleFileChange('about_banner', e)}
                                    className="w-full text-xs text-gray-500 file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-[11px] file:font-semibold file:bg-purple-50 file:text-purple-700 cursor-pointer"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-2">Hubungi Kami</label>
                                {previews.contact_banner && (
                                    <div className="rounded-xl overflow-hidden border border-gray-200 mb-2 aspect-[3/1] bg-gray-50">
                                        <img src={previews.contact_banner} alt="Contact Banner" className="w-full h-full object-cover" />
                                    </div>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={e => handleFileChange('contact_banner', e)}
                                    className="w-full text-xs text-gray-500 file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-[11px] file:font-semibold file:bg-purple-50 file:text-purple-700 cursor-pointer"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-2">FAQ</label>
                                {previews.faq_banner && (
                                    <div className="rounded-xl overflow-hidden border border-gray-200 mb-2 aspect-[3/1] bg-gray-50">
                                        <img src={previews.faq_banner} alt="FAQ Banner" className="w-full h-full object-cover" />
                                    </div>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={e => handleFileChange('faq_banner', e)}
                                    className="w-full text-xs text-gray-500 file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-[11px] file:font-semibold file:bg-purple-50 file:text-purple-700 cursor-pointer"
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
