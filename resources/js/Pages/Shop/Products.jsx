import { Head, Link, router } from '@inertiajs/react';
import ShopLayout from '@/Layouts/ShopLayout';

function StarRating({ rating, count }) {
    return (
        <div className="flex items-center gap-1">
            <div className="flex">
                {[1,2,3,4,5].map(i => (
                    <svg key={i} className={`w-3.5 h-3.5 ${i <= Math.round(rating) ? 'text-amber-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                ))}
            </div>
            <span className="text-xs text-gray-400">({count})</span>
        </div>
    );
}

export default function Products({ products, categories, filters }) {
    const handleFilter = (key, value) => {
        router.get('/products', { ...filters, [key]: value }, { preserveState: true, preserveScroll: true });
    };

    const clearFilters = () => {
        router.get('/products', {}, { preserveState: true });
    };

    return (
        <ShopLayout>
            <Head title="Shop - RaiaFood" />

            <div style={{ backgroundColor: '#FAE6FF' }} className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>Shop</h1>
                    <p className="text-gray-500 mt-1">Temukan cookies favorit Anda</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <aside className="lg:w-64 flex-shrink-0">
                        {/* Search */}
                        <div className="mb-6">
                            <input
                                type="text"
                                placeholder="Cari cookies..."
                                defaultValue={filters?.search || ''}
                                onKeyDown={e => e.key === 'Enter' && handleFilter('search', e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-[#843799] focus:ring-2 focus:ring-[#FAE6FF] outline-none transition-all"
                            />
                        </div>

                        {/* Categories */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-6">
                            <h3 className="font-semibold text-gray-900 mb-4">Kategori</h3>
                            <ul className="space-y-2">
                                <li>
                                    <button
                                        onClick={() => { const f = {...filters}; delete f.category; router.get('/products', f, { preserveState: true }); }}
                                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${!filters?.category ? 'bg-[#FAE6FF] text-[#843799] font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                                    >
                                        Semua Produk
                                    </button>
                                </li>
                                {categories.map(cat => (
                                    <li key={cat.id}>
                                        <button
                                            onClick={() => handleFilter('category', cat.slug)}
                                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex justify-between ${filters?.category === cat.slug ? 'bg-[#FAE6FF] text-[#843799] font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                                        >
                                            <span>{cat.name}</span>
                                            <span className="text-xs text-gray-400">{cat.products_count}</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Sort */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-5">
                            <h3 className="font-semibold text-gray-900 mb-4">Urutkan</h3>
                            <select
                                value={filters?.sort || ''}
                                onChange={e => handleFilter('sort', e.target.value)}
                                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:border-[#843799] focus:ring-2 focus:ring-[#FAE6FF] outline-none"
                            >
                                <option value="">Terbaru</option>
                                <option value="price_asc">Harga Terendah</option>
                                <option value="price_desc">Harga Tertinggi</option>
                                <option value="popular">Terpopuler</option>
                            </select>
                        </div>

                        {(filters?.search || filters?.category) && (
                             <button onClick={clearFilters} className="mt-4 w-full py-2 text-sm text-[#843799] hover:text-[#60396A] font-medium">
                                Reset Filter
                            </button>
                        )}
                    </aside>

                    {/* Product Grid */}
                    <div className="flex-1">
                        {products.data.length === 0 ? (
                            <div className="text-center py-20">
                                <span className="text-5xl mb-4 block">🍪</span>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Tidak ada produk ditemukan</h3>
                                <p className="text-gray-500 text-sm mb-4">Coba ubah filter atau kata kunci pencarian</p>
                                 <button onClick={clearFilters} className="text-[#843799] font-medium text-sm hover:underline">
                                    Reset Filter
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                                    {products.data.map(product => {
                                        const effectivePrice = product.discount_price || product.price;
                                        const hasDiscount = product.discount_price && product.discount_price < product.price;
                                        return (
                                            <Link key={product.id} href={`/products/${product.slug}`} className="group block">
                                                <div className="relative rounded-2xl mb-3 aspect-square overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:shadow-[#F4C6FF]/30 group-hover:brightness-95">
                                                    {hasDiscount && (
                                                        <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                                                            -{Math.round(((product.price - product.discount_price) / product.price) * 100)}%
                                                        </div>
                                                    )}
                                                    {product.image ? (
                                                        <img src={`/storage/${product.image}`} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                                    ) : (
                                                         <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: '#FAE6FF' }}>
                                                            <div className="w-24 h-24 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #F4C6FF, #843799)' }}>
                                                                <span className="text-3xl">🍪</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                                 <h3 className="font-semibold text-gray-900 text-sm mb-1 group-hover:text-[#843799] transition-colors">{product.name}</h3>
                                                <StarRating rating={product.rating_avg} count={product.rating_count} />
                                                <div className="flex items-center justify-between mt-2">
                                                    <div>
                                                        <span className="font-bold text-gray-900 text-sm">Rp {Number(effectivePrice).toLocaleString('id-ID')}</span>
                                                        {hasDiscount && <span className="text-xs text-gray-400 line-through ml-1">Rp {Number(product.price).toLocaleString('id-ID')}</span>}
                                                    </div>
                                                     <button
                                                         onClick={e => {
                                                             e.preventDefault();
                                                             e.stopPropagation();
                                                             router.post('/cart', { product_id: product.id, quantity: 1 }, {
                                                                 preserveScroll: true,
                                                                 onSuccess: () => {
                                                                     window.dispatchEvent(new Event('cart-updated'));
                                                                 }
                                                             });
                                                         }}
                                                         className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110"
                                                         style={{ backgroundColor: '#FAE6FF', color: '#843799' }}
                                                         onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#843799'; e.currentTarget.style.color = 'white'; }}
                                                         onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#FAE6FF'; e.currentTarget.style.color = '#843799'; }}
                                                     >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>

                                {/* Pagination */}
                                {products.links && products.last_page > 1 && (
                                    <div className="flex justify-center gap-2 mt-10">
                                        {products.links.map((link, i) => (
                                            <Link
                                                key={i}
                                                href={link.url || '#'}
                                                 className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${link.active ? 'bg-[#843799] text-white' : link.url ? 'bg-gray-50 text-gray-700 hover:bg-[#FAE6FF]' : 'text-gray-300 cursor-not-allowed'}`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                                preserveScroll
                                            />
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </ShopLayout>
    );
}
