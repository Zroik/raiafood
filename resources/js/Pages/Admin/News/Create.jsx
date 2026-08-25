import AdminLayout from '@/Layouts/AdminLayout';
import ArticleEditor from '@/Components/ArticleEditor';
import MediaLibraryModal from '@/Components/MediaLibraryModal';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Create({ authors = [] }) {
    const [mediaModalOpen, setMediaModalOpen] = useState(false);
    const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        featured_image: '',
        author_id: authors[0]?.id || '',
        status: 'draft',
        published_at: '',
    });

    const slugify = (text) => {
        return text
            .toString()
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')
            .replace(/[^\w\-]+/g, '')
            .replace(/\-\-+/g, '-')
            .replace(/^-+/, '')
            .replace(/-+$/, '');
    };

    const handleTitleChange = (e) => {
        const val = e.target.value;
        if (!isSlugManuallyEdited) {
            setData((prev) => ({
                ...prev,
                title: val,
                slug: slugify(val),
            }));
        } else {
            setData('title', val);
        }
    };

    const handleSlugChange = (e) => {
        setIsSlugManuallyEdited(true);
        setData('slug', slugify(e.target.value));
    };

    const handleSelectFeaturedImage = (mediaItem) => {
        if (mediaItem?.path) {
            setData('featured_image', mediaItem.path);
        }
    };

    const handleSubmit = (submitStatus) => {
        const payload = { ...data };
        if (submitStatus) {
            payload.status = submitStatus;
        }
        if (payload.status === 'published' && !payload.published_at) {
            // default to now if publishing immediately
            const now = new Date();
            now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
            payload.published_at = now.toISOString().slice(0, 16);
        }

        post(route('admin.news.store'));
    };

    return (
        <AdminLayout
            header={
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <Link
                            href={route('admin.news.index')}
                            className="w-10 h-10 rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-800 hover:bg-gray-50 transition-colors shadow-sm"
                        >
                            ◀
                        </Link>
                        <div>
                            <h2 className="font-bold text-xl sm:text-2xl text-gray-900 leading-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
                                ✍️ Tulis Berita Baru
                            </h2>
                            <p className="text-xs text-gray-500 mt-1">
                                Buat artikel berita informatif, tips, atau pengumuman resmi Raia Food
                            </p>
                        </div>
                    </div>
                </div>
            }
        >
            <Head title="Tulis Berita Baru - Admin Raia Food" />

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}
                className="space-y-6"
            >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content (Left 2 cols) */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Title & Slug Card */}
                        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                                    Judul Artikel <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={handleTitleChange}
                                    placeholder="Contoh: Raia Food Hadirkan Varian Menu Sehat Terbaru untuk Keluarga"
                                    className="w-full px-4 py-3 text-sm font-semibold rounded-2xl border border-gray-200 focus:border-[#843799] focus:ring-2 focus:ring-[#FAE6FF] outline-none transition-all"
                                    required
                                />
                                {errors.title && <p className="text-xs text-red-500 mt-1.5">{errors.title}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                                    Slug URL <span className="text-red-500">*</span>
                                </label>
                                <div className="flex items-center rounded-2xl border border-gray-200 overflow-hidden bg-gray-50/50 focus-within:border-[#843799] focus-within:ring-2 focus-within:ring-[#FAE6FF]">
                                    <span className="px-3.5 py-2.5 text-xs text-gray-400 font-mono select-none border-r border-gray-200">
                                        /news/
                                    </span>
                                    <input
                                        type="text"
                                        value={data.slug}
                                        onChange={handleSlugChange}
                                        placeholder="raia-food-hadirkan-varian-menu-sehat"
                                        className="w-full px-3.5 py-2.5 text-xs font-mono text-gray-700 bg-transparent border-none outline-none focus:ring-0"
                                        required
                                    />
                                </div>
                                {errors.slug && <p className="text-xs text-red-500 mt-1.5">{errors.slug}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                                    Ringkasan / Excerpt (Opsional)
                                </label>
                                <textarea
                                    value={data.excerpt}
                                    onChange={(e) => setData('excerpt', e.target.value)}
                                    placeholder="Ringkasan singkat artikel yang akan muncul di daftar berita dan SEO meta description..."
                                    rows="3"
                                    className="w-full px-4 py-3 text-xs sm:text-sm rounded-2xl border border-gray-200 focus:border-[#843799] focus:ring-2 focus:ring-[#FAE6FF] outline-none transition-all"
                                />
                                {errors.excerpt && <p className="text-xs text-red-500 mt-1.5">{errors.excerpt}</p>}
                            </div>
                        </div>

                        {/* Article Content Editor Card */}
                        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-3">
                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                                Konten Artikel Lengkap <span className="text-red-500">*</span>
                            </label>
                            <p className="text-xs text-gray-400">
                                Gunakan toolbar untuk memformat teks, menambahkan heading (H2/H3), daftar, tautan, dan menyisipkan gambar dari Media Library.
                            </p>

                            <ArticleEditor
                                content={data.content}
                                onChange={(html) => setData('content', html)}
                            />
                            {errors.content && <p className="text-xs text-red-500 mt-1.5">{errors.content}</p>}
                        </div>
                    </div>

                    {/* Sidebar Publish & Featured Image (Right 1 col) */}
                    <div className="space-y-6">
                        {/* Publish Settings Card */}
                        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
                            <h3 className="font-bold text-sm text-gray-900 pb-2 border-b border-gray-100" style={{ fontFamily: 'Outfit, sans-serif' }}>
                                ⚙️ Pengaturan Publikasi
                            </h3>

                            {/* Status */}
                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                                    Status
                                </label>
                                <select
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className="w-full px-3.5 py-2.5 text-xs rounded-2xl border border-gray-200 focus:border-[#843799] focus:ring-2 focus:ring-[#FAE6FF] outline-none"
                                >
                                    <option value="draft">📁 Simpan sebagai Draft</option>
                                    <option value="published">🚀 Terbitkan (Published)</option>
                                </select>
                            </div>

                            {/* Publish Date */}
                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                                    Jadwal / Waktu Terbit
                                </label>
                                <input
                                    type="datetime-local"
                                    value={data.published_at}
                                    onChange={(e) => setData('published_at', e.target.value)}
                                    className="w-full px-3.5 py-2.5 text-xs rounded-2xl border border-gray-200 focus:border-[#843799] focus:ring-2 focus:ring-[#FAE6FF] outline-none"
                                />
                                <span className="text-[11px] text-gray-400 mt-1 block">
                                    Kosongkan untuk otomatis menggunakan waktu saat ini ketika diterbitkan.
                                </span>
                            </div>

                            {/* Author */}
                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                                    Penulis (Author)
                                </label>
                                <select
                                    value={data.author_id}
                                    onChange={(e) => setData('author_id', e.target.value)}
                                    className="w-full px-3.5 py-2.5 text-xs rounded-2xl border border-gray-200 focus:border-[#843799] focus:ring-2 focus:ring-[#FAE6FF] outline-none"
                                >
                                    {authors.map((author) => (
                                        <option key={author.id} value={author.id}>
                                            {author.name} ({author.email})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Buttons */}
                            <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
                                <button
                                    type="button"
                                    disabled={processing}
                                    onClick={() => {
                                        setData('status', 'published');
                                        handleSubmit('published');
                                    }}
                                    className="w-full py-3 rounded-2xl text-xs sm:text-sm font-bold text-white shadow-md hover:shadow-lg transition-all hover:opacity-95 disabled:opacity-50 flex items-center justify-center gap-2"
                                    style={{ backgroundColor: '#843799' }}
                                >
                                    <span>🚀</span>
                                    <span>{processing ? 'Menyimpan...' : 'Terbitkan Sekarang'}</span>
                                </button>

                                <button
                                    type="button"
                                    disabled={processing}
                                    onClick={() => {
                                        setData('status', 'draft');
                                        handleSubmit('draft');
                                    }}
                                    className="w-full py-2.5 rounded-2xl text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-50"
                                >
                                    Simpan sebagai Draft
                                </button>
                            </div>
                        </div>

                        {/* Featured Image Card */}
                        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
                            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                                <h3 className="font-bold text-sm text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
                                    🖼️ Gambar Utama (Featured)
                                </h3>
                                {data.featured_image && (
                                    <button
                                        type="button"
                                        onClick={() => setData('featured_image', '')}
                                        className="text-xs text-red-500 hover:underline"
                                    >
                                        Hapus
                                    </button>
                                )}
                            </div>

                            {data.featured_image ? (
                                <div className="space-y-3">
                                    <div className="rounded-2xl overflow-hidden border border-gray-200 aspect-video bg-gray-100 relative group shadow-sm">
                                        <img
                                            src={
                                                data.featured_image.startsWith('http') || data.featured_image.startsWith('/')
                                                    ? data.featured_image
                                                    : `/storage/${data.featured_image}`
                                            }
                                            alt="Featured Preview"
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                            <button
                                                type="button"
                                                onClick={() => setMediaModalOpen(true)}
                                                className="px-3 py-1.5 rounded-xl bg-white text-xs font-bold text-gray-800 shadow-md hover:bg-gray-100"
                                            >
                                                Ganti Gambar
                                            </button>
                                        </div>
                                    </div>
                                    <p className="text-[11px] text-gray-400 font-mono truncate">
                                        Path: {data.featured_image}
                                    </p>
                                </div>
                            ) : (
                                <div
                                    onClick={() => setMediaModalOpen(true)}
                                    className="border-2 border-dashed border-purple-200 rounded-3xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-[#843799] hover:bg-purple-50/20 transition-all group"
                                >
                                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-2 group-hover:scale-110 transition-transform" style={{ backgroundColor: '#FAE6FF', color: '#843799' }}>
                                        📷
                                    </div>
                                    <span className="text-xs font-bold text-gray-700 block mb-0.5">
                                        Pilih Gambar Utama
                                    </span>
                                    <span className="text-[11px] text-gray-400">
                                        Upload baru atau pilih dari Media Library
                                    </span>
                                </div>
                            )}

                            {errors.featured_image && <p className="text-xs text-red-500 mt-1">{errors.featured_image}</p>}
                        </div>
                    </div>
                </div>
            </form>

            {/* Media Library Modal for Featured Image */}
            <MediaLibraryModal
                isOpen={mediaModalOpen}
                onClose={() => setMediaModalOpen(false)}
                onSelectImage={handleSelectFeaturedImage}
                title="Pilih Gambar Utama Artikel"
            />
        </AdminLayout>
    );
}
