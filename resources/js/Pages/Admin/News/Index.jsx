import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ articles, filters = {} }) {
    const [search, setSearch] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('admin.news.index'), {
            search: search,
            status: statusFilter,
        }, { preserveState: true });
    };

    const handleStatusChange = (status) => {
        setStatusFilter(status);
        router.get(route('admin.news.index'), {
            search: search,
            status: status,
        }, { preserveState: true });
    };

    const handleDelete = (article) => {
        if (confirm(`Apakah Anda yakin ingin menghapus artikel "${article.title}"?`)) {
            router.delete(route('admin.news.destroy', article.id));
        }
    };

    return (
        <AdminLayout
            header={
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h2 className="font-bold text-xl sm:text-2xl text-gray-900 leading-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
                            📰 Berita & Artikel (News / Blog)
                        </h2>
                        <p className="text-xs text-gray-500 mt-1">
                            Kelola publikasi artikel berita, cerita seputar produk, dan promo untuk pelanggan
                        </p>
                    </div>

                    <Link
                        href={route('admin.news.create')}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold text-white shadow-md hover:shadow-lg transition-all hover:opacity-95"
                        style={{ backgroundColor: '#843799' }}
                    >
                        <span>✍️</span>
                        <span>Tulis Berita Baru</span>
                    </Link>
                </div>
            }
        >
            <Head title="Kelola Berita & Artikel - Admin Raia Food" />

            <div className="space-y-6">
                {/* Search and Filters Card */}
                <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-100 shadow-sm">
                    <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex-1 w-full flex items-center gap-3">
                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Cari judul artikel atau cuplikan..."
                                    className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-2xl border border-gray-200 focus:border-[#843799] focus:ring-2 focus:ring-[#FAE6FF] outline-none transition-all"
                                />
                                <span className="absolute left-3.5 top-3 text-gray-400 text-sm">🔍</span>
                            </div>

                            <button
                                type="submit"
                                className="px-4 py-2.5 text-xs sm:text-sm font-bold rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                            >
                                Cari
                            </button>
                        </div>

                        {/* Status Filter Tabs */}
                        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-gray-100/80 w-full md:w-auto overflow-x-auto">
                            <button
                                type="button"
                                onClick={() => handleStatusChange('')}
                                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                                    statusFilter === ''
                                        ? 'bg-white text-[#843799] shadow-sm'
                                        : 'text-gray-600 hover:text-gray-900'
                                }`}
                            >
                                Semua
                            </button>
                            <button
                                type="button"
                                onClick={() => handleStatusChange('published')}
                                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                                    statusFilter === 'published'
                                        ? 'bg-emerald-500 text-white shadow-sm'
                                        : 'text-gray-600 hover:text-gray-900'
                                }`}
                            >
                                Published
                            </button>
                            <button
                                type="button"
                                onClick={() => handleStatusChange('draft')}
                                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                                    statusFilter === 'draft'
                                        ? 'bg-amber-500 text-white shadow-sm'
                                        : 'text-gray-600 hover:text-gray-900'
                                }`}
                            >
                                Draft
                            </button>
                        </div>
                    </form>
                </div>

                {/* Article List Table Card */}
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs sm:text-sm">
                            <thead className="bg-gray-50/70 border-b border-gray-100 text-gray-400 uppercase tracking-wider text-[11px] font-semibold">
                                <tr>
                                    <th className="px-6 py-4">Gambar</th>
                                    <th className="px-6 py-4">Judul & Ringkasan</th>
                                    <th className="px-6 py-4">Penulis</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Tgl Publish</th>
                                    <th className="px-6 py-4 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {articles.data.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-16 text-center">
                                            <div className="flex flex-col items-center justify-center">
                                                <span className="text-5xl mb-3">📰</span>
                                                <h3 className="text-base font-bold text-gray-800 mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>
                                                    Belum Ada Berita
                                                </h3>
                                                <p className="text-xs text-gray-500 max-w-sm mb-4">
                                                    {search || statusFilter
                                                        ? 'Tidak ditemukan artikel yang sesuai dengan filter pencarian.'
                                                        : 'Mulai publikasikan berita atau artikel pertama Anda untuk pelanggan.'}
                                                </p>
                                                <Link
                                                    href={route('admin.news.create')}
                                                    className="px-4 py-2 rounded-xl text-xs font-bold text-white shadow-sm transition-all"
                                                    style={{ backgroundColor: '#843799' }}
                                                >
                                                    ✍️ Tulis Artikel Pertama
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    articles.data.map((article) => (
                                        <tr key={article.id} className="hover:bg-purple-50/20 transition-colors group">
                                            <td className="px-6 py-4 align-top w-28">
                                                <div className="w-20 h-14 rounded-xl overflow-hidden border border-gray-200 bg-gray-100 flex items-center justify-center flex-shrink-0 shadow-sm">
                                                    {article.featured_image_url ? (
                                                        <img
                                                            src={article.featured_image_url}
                                                            alt={article.title}
                                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                        />
                                                    ) : (
                                                        <span className="text-xl">🖼️</span>
                                                    )}
                                                </div>
                                            </td>

                                            <td className="px-6 py-4 align-top max-w-md">
                                                <div className="space-y-1">
                                                    <Link
                                                        href={route('admin.news.edit', article.id)}
                                                        className="font-bold text-gray-900 hover:text-[#843799] transition-colors line-clamp-1 block text-sm sm:text-base"
                                                        style={{ fontFamily: 'Outfit, sans-serif' }}
                                                    >
                                                        {article.title}
                                                    </Link>
                                                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                                                        {article.excerpt || 'Tidak ada ringkasan...'}
                                                    </p>
                                                    <div className="flex items-center gap-2 pt-1">
                                                        <span className="text-[11px] text-gray-400 font-mono">
                                                            /news/{article.slug}
                                                        </span>
                                                        {article.status === 'published' && (
                                                            <a
                                                                href={`/news/${article.slug}`}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                className="text-[11px] font-semibold text-[#843799] hover:underline flex items-center gap-0.5"
                                                            >
                                                                <span>Lihat Publik</span>
                                                                <span>↗</span>
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-6 py-4 align-top whitespace-nowrap">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-purple-700 bg-purple-100">
                                                        {article.author?.name ? article.author.name.charAt(0).toUpperCase() : 'A'}
                                                    </div>
                                                    <div>
                                                        <span className="font-semibold text-gray-800 block text-xs">
                                                            {article.author?.name || 'Admin'}
                                                        </span>
                                                        <span className="text-[10px] text-gray-400">
                                                            {article.author?.email || ''}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-6 py-4 align-top whitespace-nowrap">
                                                {article.status === 'published' ? (
                                                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-700 border border-emerald-200">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                                        Published
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-700 border border-amber-200">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                                                        Draft
                                                    </span>
                                                )}
                                            </td>

                                            <td className="px-6 py-4 align-top whitespace-nowrap">
                                                <span className="text-xs text-gray-600 block">
                                                    {article.formatted_published_date}
                                                </span>
                                                <span className="text-[10px] text-gray-400 block">
                                                    Update: {new Date(article.updated_at).toLocaleDateString('id-ID')}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4 align-top text-right whitespace-nowrap">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link
                                                        href={route('admin.news.edit', article.id)}
                                                        className="p-2 rounded-xl text-gray-600 hover:text-[#843799] hover:bg-purple-50 transition-all"
                                                        title="Edit Artikel"
                                                    >
                                                        ✏️
                                                    </Link>

                                                    <button
                                                        onClick={() => handleDelete(article)}
                                                        className="p-2 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all"
                                                        title="Hapus Artikel"
                                                    >
                                                        🗑️
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {articles.links && articles.links.length > 3 && (
                        <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between">
                            <span className="text-xs text-gray-500">
                                Menampilkan {articles.from || 0} - {articles.to || 0} dari {articles.total} artikel
                            </span>
                            <div className="flex items-center gap-1">
                                {articles.links.map((link, idx) => (
                                    <Link
                                        key={idx}
                                        href={link.url || '#'}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                                            link.active
                                                ? 'bg-[#843799] text-white shadow-sm'
                                                : link.url
                                                ? 'text-gray-600 hover:bg-gray-200/70 bg-white border border-gray-200'
                                                : 'text-gray-300 cursor-not-allowed'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
