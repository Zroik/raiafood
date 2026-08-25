import ShopLayout from '@/Layouts/ShopLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ articles, heroArticle, filters = {}, settings = {} }) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/news', { search }, { preserveState: true });
    };

    return (
        <ShopLayout>
            <Head>
                <title>{`Berita, Cerita & Promo Terbaru - ${settings.store_name || 'Raia Food'}`}</title>
                <meta
                    name="description"
                    content={`Ikuti berita, artikel edukasi resep camilan sehat, dan pengumuman promo eksklusif terbaru dari ${settings.store_name || 'Raia Food'}.`}
                />
                <meta property="og:title" content={`Berita & Artikel - ${settings.store_name || 'Raia Food'}`} />
                <meta
                    property="og:description"
                    content={`Ikuti berita, artikel edukasi resep camilan sehat, dan pengumuman promo eksklusif terbaru dari ${settings.store_name || 'Raia Food'}.`}
                />
                <meta property="og:type" content="website" />
            </Head>

            <div className="bg-[#FAF7FC] min-h-screen py-10 sm:py-14">
                <div className="w-full max-w-[92vw] xl:max-w-[88vw] 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-14">
                    {/* Header Banner */}
                    <div className="text-center max-w-2xl mx-auto space-y-3">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold shadow-sm" style={{ backgroundColor: '#FAE6FF', color: '#843799' }}>
                            <span>📰</span>
                            <span>KABAR & CERITA RAIA FOOD</span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
                            Berita & Artikel Terkini
                        </h1>
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-medium">
                            Dapatkan wawasan seputar gaya hidup sehat, kisah inspiratif, tips kuliner, dan informasi promo spesial langsung dari dapur kami.
                        </p>

                        {/* Search Bar */}
                        <form onSubmit={handleSearch} className="pt-3 max-w-md mx-auto flex items-center gap-2">
                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Cari topik atau judul berita..."
                                    className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm rounded-2xl border border-purple-100 bg-white focus:border-[#843799] focus:ring-4 focus:ring-[#FAE6FF] shadow-sm outline-none transition-all"
                                />
                                <span className="absolute left-3.5 top-3.5 text-gray-400">🔍</span>
                            </div>
                            <button
                                type="submit"
                                className="px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold text-white shadow-md hover:shadow-lg transition-all hover:opacity-95 flex-shrink-0"
                                style={{ backgroundColor: '#843799' }}
                            >
                                Cari
                            </button>
                        </form>
                    </div>

                    {/* Featured / Hero Top Article (If on first page and no search filter) */}
                    {heroArticle && !search && (
                        <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-purple-100 shadow-xl shadow-purple-500/5 transition-all hover:shadow-purple-500/10 group">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                                {/* Featured Image */}
                                <div className="lg:col-span-7">
                                    <Link href={`/news/${heroArticle.slug}`} className="block relative rounded-2xl overflow-hidden aspect-[16/10] bg-gray-100 shadow-md">
                                        {heroArticle.featured_image_url ? (
                                            <img
                                                src={heroArticle.featured_image_url}
                                                alt={heroArticle.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-purple-50 text-5xl">
                                                🍪
                                            </div>
                                        )}
                                        <div className="absolute top-4 left-4 bg-[#843799] text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-md flex items-center gap-1.5">
                                            <span>⭐</span>
                                            <span>ARTIKEL UTAMA</span>
                                        </div>
                                    </Link>
                                </div>

                                {/* Content Details */}
                                <div className="lg:col-span-5 space-y-4">
                                    <div className="flex items-center gap-3 text-xs text-gray-500">
                                        <span className="font-semibold text-[#843799] flex items-center gap-1">
                                            <span>✍️</span> {heroArticle.author?.name || 'Tim Raia Food'}
                                        </span>
                                        <span>•</span>
                                        <span>📅 {heroArticle.formatted_published_date}</span>
                                    </div>

                                    <Link href={`/news/${heroArticle.slug}`} className="block group-hover:text-[#843799] transition-colors">
                                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug" style={{ fontFamily: 'Outfit, sans-serif' }}>
                                            {heroArticle.title}
                                        </h2>
                                    </Link>

                                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                                        {heroArticle.excerpt || 'Baca cerita selengkapnya tentang bagaimana kami menyajikan kualitas terbaik untuk Anda...'}
                                    </p>

                                    <div className="pt-2">
                                        <Link
                                            href={`/news/${heroArticle.slug}`}
                                            className="inline-flex items-center gap-2 font-bold text-xs sm:text-sm text-[#843799] hover:text-[#60396A] transition-colors group/link"
                                        >
                                            <span>Baca Selengkapnya</span>
                                            <span className="group-hover/link:translate-x-1 transition-transform">➔</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Articles Grid */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between border-b border-gray-200/80 pb-4">
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
                                {search ? `Hasil Pencarian: "${search}"` : 'Semua Berita'}
                            </h3>
                            <span className="text-xs text-gray-500 font-medium">
                                {articles.total} artikel ditemukan
                            </span>
                        </div>

                        {articles.data.length === 0 ? (
                            <div className="bg-white rounded-3xl p-12 text-center border border-purple-100 shadow-sm max-w-md mx-auto my-8">
                                <span className="text-5xl mb-3 block">📭</span>
                                <h4 className="text-base font-bold text-gray-800 mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>
                                    Tidak Ada Artikel Ditemukan
                                </h4>
                                <p className="text-xs text-gray-500 mb-4">
                                    {search
                                        ? 'Coba gunakan kata kunci pencarian yang lain.'
                                        : 'Belum ada artikel berita yang dipublikasikan saat ini.'}
                                </p>
                                {search && (
                                    <button
                                        onClick={() => {
                                            setSearch('');
                                            router.get('/news');
                                        }}
                                        className="px-4 py-2 rounded-xl text-xs font-bold text-white shadow-sm transition-all"
                                        style={{ backgroundColor: '#843799' }}
                                    >
                                        Lihat Semua Berita
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                                {articles.data.map((article) => (
                                    <article
                                        key={article.id}
                                        className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 flex flex-col group"
                                    >
                                        {/* Image */}
                                        <Link href={`/news/${article.slug}`} className="block relative aspect-[16/10] overflow-hidden bg-gray-100">
                                            {article.featured_image_url ? (
                                                <img
                                                    src={article.featured_image_url}
                                                    alt={article.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-purple-50 text-4xl">
                                                    🍪
                                                </div>
                                            )}
                                        </Link>

                                        {/* Content */}
                                        <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                                            <div className="space-y-2.5">
                                                <div className="flex items-center gap-2 text-[11px] text-gray-400">
                                                    <span className="font-semibold text-[#843799]">
                                                        {article.author?.name || 'Raia Food'}
                                                    </span>
                                                    <span>•</span>
                                                    <span>{article.formatted_published_date}</span>
                                                </div>

                                                <Link href={`/news/${article.slug}`} className="block group-hover:text-[#843799] transition-colors">
                                                    <h4 className="font-bold text-base sm:text-lg text-gray-900 line-clamp-2 leading-snug" style={{ fontFamily: 'Outfit, sans-serif' }}>
                                                        {article.title}
                                                    </h4>
                                                </Link>

                                                <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
                                                    {article.excerpt || 'Baca artikel selengkapnya...'}
                                                </p>
                                            </div>

                                            <div className="pt-2 border-t border-gray-100">
                                                <Link
                                                    href={`/news/${article.slug}`}
                                                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#843799] hover:text-[#60396A] transition-colors group/btn"
                                                >
                                                    <span>Baca Artikel</span>
                                                    <span className="group-hover/btn:translate-x-1 transition-transform">➔</span>
                                                </Link>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        )}

                        {/* Pagination */}
                        {articles.links && articles.links.length > 3 && (
                            <div className="flex items-center justify-center gap-2 pt-8">
                                {articles.links.map((link, idx) => (
                                    <Link
                                        key={idx}
                                        href={link.url || '#'}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                        className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all shadow-sm ${
                                            link.active
                                                ? 'bg-[#843799] text-white shadow-md'
                                                : link.url
                                                ? 'bg-white text-gray-700 hover:bg-purple-50 border border-gray-200'
                                                : 'bg-white text-gray-300 border border-gray-100 cursor-not-allowed'
                                        }`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </ShopLayout>
    );
}
