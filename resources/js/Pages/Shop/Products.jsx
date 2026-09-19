import { Head, Link, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import ShopLayout from '@/Layouts/ShopLayout';

function StarRating({ rating = 0, soldCount = 0 }) {
    const numRating = Number(rating) || 5.0;
    const formattedRating = numRating.toFixed(1);

    const formatSold = (num) => {
        const count = Number(num) || 0;
        if (count >= 1000) {
            const inK = Math.floor(count / 1000);
            return `${inK}RB+ terjual`;
        }
        return `${count} terjual`;
    };

    return (
        <div className="flex items-center gap-1 text-xs text-gray-700 font-medium my-0.5">
            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-50/80 border border-amber-200/60">
                <svg className="w-3 h-3 text-amber-400 fill-amber-400" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-gray-900 font-semibold text-[10px] sm:text-[11px]">{formattedRating}</span>
            </div>
            <span className="text-gray-300 text-[10px]">|</span>
            <span className="text-gray-500 text-[10px] sm:text-[11px]">{formatSold(soldCount)}</span>
        </div>
    );
}

// Helper functions to format and parse thousand separator with dot (.)
const formatNumberWithDots = (val) => {
    if (!val && val !== 0) return '';
    const raw = String(val).replace(/\D/g, '');
    if (!raw) return '';
    return Number(raw).toLocaleString('id-ID');
};

const parseRawNumber = (val) => {
    if (!val) return '';
    return String(val).replace(/\D/g, '');
};

export default function Products({ products, categories, filters, flashSaleCount = 0 }) {
    const [minPrice, setMinPrice] = useState(formatNumberWithDots(filters?.min_price || ''));
    const [maxPrice, setMaxPrice] = useState(formatNumberWithDots(filters?.max_price || ''));
    const [priceOpen, setPriceOpen] = useState(true);

    useEffect(() => {
        setMinPrice(formatNumberWithDots(filters?.min_price || ''));
        setMaxPrice(formatNumberWithDots(filters?.max_price || ''));
    }, [filters?.min_price, filters?.max_price]);

    const handleFilter = (key, value) => {
        const newFilters = { ...filters, [key]: value };
        if (!value) delete newFilters[key];
        router.get('/products', newFilters, { preserveState: true, preserveScroll: true });
    };

    const toggleFlashSale = () => {
        const newFilters = { ...filters };
        if (newFilters.flash_sale) {
            delete newFilters.flash_sale;
        } else {
            newFilters.flash_sale = '1';
        }
        router.get('/products', newFilters, { preserveState: true, preserveScroll: true });
    };

    const handlePriceFilter = (e) => {
        if (e) e.preventDefault();
        const rawMin = parseRawNumber(minPrice);
        const rawMax = parseRawNumber(maxPrice);

        const newFilters = { ...filters };
        if (rawMin) newFilters.min_price = rawMin;
        else delete newFilters.min_price;

        if (rawMax) newFilters.max_price = rawMax;
        else delete newFilters.max_price;

        router.get('/products', newFilters, { preserveState: true, preserveScroll: true });
    };

    const handleMinPriceChange = (e) => {
        const raw = parseRawNumber(e.target.value);
        setMinPrice(formatNumberWithDots(raw));
    };

    const handleMaxPriceChange = (e) => {
        const raw = parseRawNumber(e.target.value);
        setMaxPrice(formatNumberWithDots(raw));
    };

    const clearFilters = () => {
        router.get('/products', {}, { preserveState: true });
    };

    const hasActiveFilters = Boolean(
        filters?.search || filters?.category || filters?.sort || filters?.min_price || filters?.max_price || filters?.flash_sale
    );

    return (
        <ShopLayout>
            <Head title="Produk - RaiaFood" />

            <div style={{ backgroundColor: 'var(--color-soft)' }} className="py-7">
                <div className="w-full max-w-[92vw] xl:max-w-[88vw] 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>Produk</h1>
                    <p className="text-gray-500 text-sm mt-0.5">Temukan Camilan Kesukaanmu</p>
                </div>
            </div>

            <div className="w-full max-w-[92vw] xl:max-w-[88vw] 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-7">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Sidebar */}
                    <aside className="w-full lg:w-52 flex-shrink-0 space-y-4">
                        {/* Search */}
                        <div>
                            <input
                                type="text"
                                placeholder="Cari"
                                defaultValue={filters?.search || ''}
                                onKeyDown={e => e.key === 'Enter' && handleFilter('search', e.target.value)}
                                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm placeholder-gray-400 focus:border-[#843799] focus:ring-2 focus:ring-[#FAE6FF] outline-none transition-all shadow-sm"
                            />
                        </div>

                        {/* Categories & Promo */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                            <h3 className="font-semibold text-gray-900 text-sm mb-3" style={{ fontFamily: 'Outfit, sans-serif' }}>Kategori</h3>
                            <ul className="space-y-1">
                                <li>
                                    <button
                                        onClick={() => { const f = {...filters}; delete f.category; delete f.flash_sale; router.get('/products', f, { preserveState: true }); }}
                                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors ${!filters?.category && !filters?.flash_sale ? 'bg-[#FAE6FF] text-[#843799] font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
                                    >
                                        Semua Produk
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={toggleFlashSale}
                                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between ${filters?.flash_sale === '1' ? 'bg-[#FAE6FF] text-[#843799] font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
                                    >
                                        <span className="flex items-center gap-1.5">
                                            <span>⚡</span>
                                            <span>Flash Sale</span>
                                        </span>
                                        {flashSaleCount > 0 && (
                                            <span className="text-[11px] text-gray-400 ml-1">{flashSaleCount}</span>
                                        )}
                                    </button>
                                </li>
                                {categories.map(cat => (
                                    <li key={cat.id}>
                                        <button
                                            onClick={() => { const f = {...filters}; delete f.flash_sale; f.category = cat.slug; router.get('/products', f, { preserveState: true }); }}
                                            className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between ${filters?.category === cat.slug && !filters?.flash_sale ? 'bg-[#FAE6FF] text-[#843799] font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
                                        >
                                            <span className="truncate">{cat.name}</span>
                                            <span className="text-[11px] text-gray-400 ml-1">{cat.products_count}</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Price Filter Section */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                            <button
                                type="button"
                                onClick={() => setPriceOpen(!priceOpen)}
                                className="w-full flex items-center justify-between font-semibold text-gray-900 text-sm focus:outline-none"
                                style={{ fontFamily: 'Outfit, sans-serif' }}
                            >
                                <span>Harga</span>
                                <svg
                                    className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${priceOpen ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {priceOpen && (
                                <form onSubmit={handlePriceFilter} className="mt-3 space-y-2.5">
                                    {/* Minimum Price */}
                                    <div className="flex rounded-xl border border-gray-200 overflow-hidden focus-within:border-[#843799] focus-within:ring-1 focus-within:ring-[#843799] transition-all bg-white">
                                        <div className="bg-gray-100/90 text-gray-600 px-3 py-2 text-xs font-semibold flex items-center justify-center border-r border-gray-200 select-none">
                                            Rp
                                        </div>
                                        <input
                                            type="text"
                                            inputMode="numeric"
                                            placeholder="Harga Minimum"
                                            value={minPrice}
                                            onChange={handleMinPriceChange}
                                            className="w-full px-2.5 py-1.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none border-none ring-0 focus:ring-0"
                                        />
                                    </div>

                                    {/* Maximum Price */}
                                    <div className="flex rounded-xl border border-gray-200 overflow-hidden focus-within:border-[#843799] focus-within:ring-1 focus-within:ring-[#843799] transition-all bg-white">
                                        <div className="bg-gray-100/90 text-gray-600 px-3 py-2 text-xs font-semibold flex items-center justify-center border-r border-gray-200 select-none">
                                            Rp
                                        </div>
                                        <input
                                            type="text"
                                            inputMode="numeric"
                                            placeholder="Harga Maksimum"
                                            value={maxPrice}
                                            onChange={handleMaxPriceChange}
                                            className="w-full px-2.5 py-1.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none border-none ring-0 focus:ring-0"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full py-1.5 rounded-lg text-xs font-semibold text-white transition-opacity hover:opacity-90 mt-1"
                                        style={{ backgroundColor: 'var(--color-primary)' }}
                                    >
                                        Terapkan
                                    </button>
                                </form>
                            )}
                        </div>

                        {/* Sort */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                            <h3 className="font-semibold text-gray-900 text-sm mb-2.5" style={{ fontFamily: 'Outfit, sans-serif' }}>Urutkan</h3>
                            <select
                                value={filters?.sort || ''}
                                onChange={e => handleFilter('sort', e.target.value)}
                                className="w-full px-2.5 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-700 focus:border-[#843799] focus:ring-2 focus:ring-[#FAE6FF] outline-none"
                            >
                                <option value="">Terbaru</option>
                                <option value="price_asc">Harga Terendah</option>
                                <option value="price_desc">Harga Tertinggi</option>
                                <option value="popular">Terpopuler</option>
                            </select>
                        </div>

                        {hasActiveFilters && (
                            <button onClick={clearFilters} className="w-full py-2 text-xs text-[#843799] hover:text-[#60396A] font-semibold transition-colors">
                                Reset Filter
                            </button>
                        )}
                    </aside>

                    {/* Product Grid (5 columns on lg and above) */}
                    <div className="flex-1 min-w-0">
                        {products.data.length === 0 ? (
                            <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                                <span className="text-5xl mb-3 block">🍪</span>
                                <h3 className="text-base font-semibold text-gray-900 mb-1.5" style={{ fontFamily: 'Outfit, sans-serif' }}>Tidak ada produk ditemukan</h3>
                                <p className="text-gray-500 text-xs mb-4">Coba ubah filter atau kata kunci pencarian</p>
                                <button onClick={clearFilters} className="text-[#843799] font-semibold text-xs hover:underline">
                                    Reset Filter
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                                    {products.data.map(product => {
                                        const effectivePrice = product.effective_price || product.discount_price || product.price;
                                        const discountPercentage = product.discount_percentage || (product.discount_price && product.discount_price < product.price ? Math.round(((product.price - product.discount_price) / product.price) * 100) : null);
                                        const hasDiscount = Boolean(discountPercentage && discountPercentage > 0 && effectivePrice < product.price);
                                        return (
                                            <Link key={product.id} href={`/products/${product.slug}`} className="group block">
                                                <div className="relative rounded-2xl mb-2.5 aspect-square overflow-hidden transition-all duration-300 group-hover:shadow-md group-hover:shadow-[#F4C6FF]/30 group-hover:brightness-95">
                                                    {hasDiscount && (
                                                        <div className="absolute top-2 left-2 bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10 shadow-sm flex items-center gap-0.5">
                                                            <span>⚡</span> -{discountPercentage}%
                                                        </div>
                                                    )}
                                                    {product.image ? (
                                                        <img src={`/storage/${product.image}`} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: 'var(--color-soft)' }}>
                                                            <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, var(--color-secondary), var(--color-primary))' }}>
                                                                <span className="text-2xl">🍪</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                                <h3 className="font-semibold text-gray-900 text-xs sm:text-sm mb-1 group-hover:text-[#843799] transition-colors line-clamp-1">{product.name}</h3>
                                                <StarRating rating={product.rating_avg} soldCount={product.total_sold ?? product.rating_count ?? 0} />
                                                <div className="flex items-center justify-between mt-1.5">
                                                    <div className="min-w-0 pr-1">
                                                        <span className="font-bold text-gray-900 text-xs sm:text-sm block truncate">Rp {Number(effectivePrice).toLocaleString('id-ID')}</span>
                                                        {hasDiscount && <span className="text-[10px] text-gray-400 line-through block truncate">Rp {Number(product.price).toLocaleString('id-ID')}</span>}
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
                                                        className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center transition-all duration-200 hover:scale-105"
                                                        style={{ backgroundColor: 'var(--color-soft)', color: 'var(--color-primary)' }}
                                                        onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'var(--color-primary)'; e.currentTarget.style.color = 'white'; }}
                                                        onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'var(--color-soft)'; e.currentTarget.style.color = 'var(--color-primary)'; }}
                                                    >
                                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                                    <div className="flex justify-center gap-1.5 mt-8">
                                        {products.links.map((link, i) => (
                                            <Link
                                                key={i}
                                                href={link.url || '#'}
                                                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${link.active ? 'bg-[#843799] text-white' : link.url ? 'bg-gray-50 text-gray-700 hover:bg-[#FAE6FF]' : 'text-gray-300 cursor-not-allowed'}`}
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
