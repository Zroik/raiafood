import ShopLayout from '@/Layouts/ShopLayout';
import { Head, Link } from '@inertiajs/react';

export default function Show({ article, previousArticle, nextArticle, recentArticles = [] }) {
    const metaDescription = article.excerpt || article.title;
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

    return (
        <ShopLayout>
            <Head>
                <title>{`${article.title} - Berita Raia Food`}</title>
                <meta name="description" content={metaDescription} />
                <meta property="og:title" content={article.title} />
                <meta property="og:description" content={metaDescription} />
                {article.featured_image_url && <meta property="og:image" content={article.featured_image_url} />}
                <meta property="og:type" content="article" />
                <meta property="og:url" content={currentUrl} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={article.title} />
                <meta name="twitter:description" content={metaDescription} />
                {article.featured_image_url && <meta name="twitter:image" content={article.featured_image_url} />}
            </Head>

            <div className="bg-[#FAF7FC] min-h-screen py-8 sm:py-12">
                <div className="w-full max-w-[92vw] xl:max-w-[88vw] 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-2 text-xs text-gray-500 font-medium overflow-x-auto whitespace-nowrap">
                        <Link href="/" className="hover:text-[#843799] transition-colors">
                            Beranda
                        </Link>
                        <span>/</span>
                        <Link href="/news" className="hover:text-[#843799] transition-colors">
                            News
                        </Link>
                        <span>/</span>
                        <span className="text-gray-800 font-semibold truncate max-w-xs sm:max-w-md">
                            {article.title}
                        </span>
                    </nav>

                    {/* Article Header Card */}
                    <header className="space-y-4 text-center sm:text-left">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: 'var(--color-soft)', color: 'var(--color-primary)' }}>
                            <span>📰</span>
                            <span>KABAR RAIA FOOD</span>
                        </div>

                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight tracking-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
                            {article.title}
                        </h1>

                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-gray-500 pt-1 pb-2 border-b border-gray-200">
                            <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-purple-700 bg-purple-100">
                                    {article.author?.name ? article.author.name.charAt(0).toUpperCase() : 'R'}
                                </div>
                                <span className="font-semibold text-gray-800">
                                    Oleh {article.author?.name || 'Admin Raia Food'}
                                </span>
                            </div>

                            <span>•</span>

                            <div className="flex items-center gap-1.5">
                                <span>📅</span>
                                <span>{article.formatted_published_date}</span>
                            </div>
                        </div>
                    </header>

                    {/* Featured Image */}
                    {article.featured_image_url && (
                        <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100 bg-gray-100 aspect-[16/9] sm:aspect-[21/9]">
                            <img
                                src={article.featured_image_url}
                                alt={article.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    {/* Article Body Content */}
                    <main className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-gray-100 shadow-sm">
                        {/* Excerpt Lead Paragraph (if present) */}
                        {article.excerpt && (
                            <p className="text-base sm:text-lg font-medium text-gray-600 leading-relaxed mb-8 pb-6 border-b border-gray-100">
                                {article.excerpt}
                            </p>
                        )}

                        {/* Rich Text Body */}
                        <div
                            className="prose prose-purple max-w-none text-gray-800 text-sm sm:text-base leading-relaxed space-y-4"
                            dangerouslySetInnerHTML={{ __html: article.content }}
                        />
                    </main>

                    {/* Previous & Next Article Navigation */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                        {previousArticle ? (
                            <Link
                                href={`/news/${previousArticle.slug}`}
                                className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:border-[#843799]/50 hover:shadow-md transition-all group flex flex-col justify-between"
                            >
                                <span className="text-xs font-bold text-gray-400 group-hover:text-[#843799] flex items-center gap-1 mb-2">
                                    <span>←</span>
                                    <span>Artikel Sebelumnya</span>
                                </span>
                                <h4 className="font-bold text-sm text-gray-900 line-clamp-2 group-hover:text-[#843799] transition-colors" style={{ fontFamily: 'Outfit, sans-serif' }}>
                                    {previousArticle.title}
                                </h4>
                            </Link>
                        ) : (
                            <div className="hidden sm:block" />
                        )}

                        {nextArticle ? (
                            <Link
                                href={`/news/${nextArticle.slug}`}
                                className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:border-[#843799]/50 hover:shadow-md transition-all group flex flex-col justify-between text-right sm:col-start-2"
                            >
                                <span className="text-xs font-bold text-gray-400 group-hover:text-[#843799] flex items-center justify-end gap-1 mb-2">
                                    <span>Artikel Selanjutnya</span>
                                    <span>→</span>
                                </span>
                                <h4 className="font-bold text-sm text-gray-900 line-clamp-2 group-hover:text-[#843799] transition-colors" style={{ fontFamily: 'Outfit, sans-serif' }}>
                                    {nextArticle.title}
                                </h4>
                            </Link>
                        ) : null}
                    </div>

                    {/* Related / Recent Articles Section */}
                    {recentArticles.length > 0 && (
                        <div className="pt-8 space-y-6">
                            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                                <h3 className="text-lg sm:text-xl font-bold text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
                                    Berita Lainnya dari Raia Food
                                </h3>
                                <Link href="/news" className="text-xs font-bold text-[#843799] hover:underline">
                                    Lihat Semua ➔
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                                {recentArticles.map((recent) => (
                                    <Link
                                        key={recent.id}
                                        href={`/news/${recent.slug}`}
                                        className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all group flex flex-col"
                                    >
                                        <div className="aspect-[16/10] bg-gray-100 overflow-hidden relative">
                                            {recent.featured_image_url ? (
                                                <img
                                                    src={recent.featured_image_url}
                                                    alt={recent.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-purple-50 text-3xl">
                                                    🍪
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-4 flex-1 flex flex-col justify-between">
                                            <span className="text-[10px] text-gray-400 block mb-1">
                                                {recent.formatted_published_date}
                                            </span>
                                            <h5 className="font-bold text-xs sm:text-sm text-gray-900 group-hover:text-[#843799] line-clamp-2 transition-colors">
                                                {recent.title}
                                            </h5>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </ShopLayout>
    );
}
