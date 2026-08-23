import { Head, Link, router } from '@inertiajs/react';
import ShopLayout from '@/Layouts/ShopLayout';
import { useState, useEffect } from 'react';

// ─── Color Palette ────────────────────────────────────────────────────────────
// #FAE6FF  raia-lightest  Hero bg, section alt
// #F4C6FF  raia-light     Badge bg, hover states
// #843799  raia-primary   Buttons, sub-headings, icons
// #60396A  raia-dark      Main headings
// ─────────────────────────────────────────────────────────────────────────────

function StarRating({ rating = 0, soldCount = 0 }) {
    const numRating = Number(rating) || 5.0;
    const formattedRating = numRating.toFixed(1);

    // Format sold count (e.g. 3500 -> 3RB+, 120 -> 120)
    const formatSold = (num) => {
        const count = Number(num) || 0;
        if (count >= 1000) {
            const inK = Math.floor(count / 1000);
            return `${inK}RB+ terjual`;
        }
        return `${count} terjual`;
    };

    return (
        <div className="flex items-center gap-1.5 text-xs text-gray-700 font-medium">
            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-50/80 border border-amber-200/60">
                <svg className="w-3.5 h-3.5 text-amber-400 fill-amber-400" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-gray-900 font-semibold text-[11px]">{formattedRating}</span>
            </div>
            <span className="text-gray-300">|</span>
            <span className="text-gray-500 text-[11px]">{formatSold(soldCount)}</span>
        </div>
    );
}

function FlashSaleCountdown({ targetDate, posX = 50, posY = 50, scale = 1.0 }) {
    const parseLocalDate = (dateStr) => {
        if (!dateStr) return 0;
        // If string format is 'YYYY-MM-DD HH:mm:ss' or 'YYYY-MM-DDTHH:mm:ss'
        const clean = String(dateStr).replace(' ', 'T');
        const [dPart, tPart] = clean.split('T');
        if (!dPart) return new Date(dateStr).getTime();
        const [year, month, day] = dPart.split('-').map(Number);
        const [hours, minutes, seconds] = (tPart || '00:00:00').split(':').map(Number);
        return new Date(year, month - 1, day, hours || 0, minutes || 0, seconds || 0).getTime();
    };

    const calculateTimeLeft = () => {
        const targetTime = parseLocalDate(targetDate);
        const now = new Date().getTime();
        const difference = targetTime - now;
        let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0, isEnded: true };

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
                isEnded: false,
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    const formatNum = (n) => String(n).padStart(2, '0');

    return (
        <div
            style={{
                left: `${posX}%`,
                top: `${posY}%`,
                transform: `translate(-50%, -50%) scale(${scale})`,
                transformOrigin: 'center center',
            }}
            className="absolute z-20 pointer-events-none select-none flex items-center gap-[0.4cqi] p-[0.6cqi] rounded-[1cqi] bg-gray-950/85 backdrop-blur-md border border-white/20 shadow-2xl transition-all"
        >
            {[
                { val: formatNum(timeLeft.days), label: 'Hari' },
                { val: formatNum(timeLeft.hours), label: 'Jam' },
                { val: formatNum(timeLeft.minutes), label: 'Mnt' },
                { val: formatNum(timeLeft.seconds), label: 'Dtk' },
            ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-[0.3cqi]">
                    <div className="flex flex-col items-center justify-center bg-[#843799] text-white px-[0.7cqi] py-[0.3cqi] rounded-[0.6cqi] min-w-[3.2cqi] shadow-sm">
                        <span className="font-extrabold text-[1.4cqi] leading-tight font-mono tracking-tight">{item.val}</span>
                        <span className="text-[0.65cqi] uppercase font-semibold tracking-tighter opacity-80">{item.label}</span>
                    </div>
                    {idx < 3 && <span className="text-white font-bold text-[1.2cqi]">:</span>}
                </div>
            ))}
        </div>
    );
}

function ProductCard({ product }) {
    const effectivePrice = product.discount_price || product.price;
    const hasDiscount = product.discount_price && product.discount_price < product.price;
    const soldCount = product.total_sold ?? product.rating_count ?? 0;

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        router.post('/cart', { product_id: product.id, quantity: 1 }, {
            preserveScroll: true,
            onSuccess: () => {
                window.dispatchEvent(new Event('cart-updated'));
            },
        });
    };

    return (
        <Link href={`/products/${product.slug}`} className="group block">
            <div className="relative rounded-2xl mb-3 aspect-square overflow-hidden transition-all duration-300 group-hover:shadow-md group-hover:brightness-95" style={{ boxShadow: '0 0 0 0 transparent' }}>
                {hasDiscount && (
                    <div className="absolute top-2.5 left-2.5 bg-red-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-full z-10">
                        -{Math.round(((product.price - product.discount_price) / product.price) * 100)}%
                    </div>
                )}
                {product.image ? (
                    <img
                        src={product.image.startsWith('images/') || product.image.startsWith('/') ? `/${product.image}` : `/storage/${product.image}`}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: '#FAE6FF' }}>
                        <div className="w-24 h-24 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #F4C6FF, #843799)' }}>
                            <span className="text-3xl">&#x1F36A;</span>
                        </div>
                    </div>
                )}
            </div>

            <h3 className="font-semibold text-gray-900 text-sm mb-1 transition-colors group-hover:text-[#843799] line-clamp-1">{product.name}</h3>
            <StarRating rating={product.rating_avg} soldCount={soldCount} />

            <div className="flex items-center justify-between mt-2">
                <div className="min-w-0 pr-1">
                    <span className="font-bold text-gray-900 text-sm block truncate">
                        Rp {Number(effectivePrice).toLocaleString('id-ID')}
                    </span>
                    {hasDiscount && (
                        <span className="text-[11px] text-gray-400 line-through block truncate">
                            Rp {Number(product.price).toLocaleString('id-ID')}
                        </span>
                    )}
                </div>
                <button
                    onClick={handleAddToCart}
                    className="w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center transition-all duration-200 hover:scale-110"
                    style={{ backgroundColor: '#FAE6FF', color: '#843799' }}
                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#843799'; e.currentTarget.style.color = 'white'; }}
                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#FAE6FF'; e.currentTarget.style.color = '#843799'; }}
                    aria-label="Tambah ke keranjang"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                </button>
            </div>
        </Link>
    );
}

export default function Home({ latestProducts = [], bestSellerProducts = [], categories, settings, banners = [], flashSaleBanner = null }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Banners list fallback
    const bannerList = banners && banners.length > 0 ? banners : [
        { id: 1, title: 'Default 1', image: '/images/hero1.webp' },
        { id: 2, title: 'Default 2', image: '/images/hero2.webp' },
        { id: 3, title: 'Default 3', image: '/images/hero3.webp' }
    ];

    useEffect(() => {
        if (bannerList.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => {
                if (prev === bannerList.length - 1) {
                    return 0; // return to first banner by sliding back to the right
                } else {
                    return prev + 1; // go to next banner by sliding left
                }
            });
        }, 5000);
        return () => clearInterval(interval);
    }, [bannerList]);

    const activeFlashSale = flashSaleBanner || {
        id: 999,
        title: 'Flash Sale',
        image: '/images/flash-sale-banner.webp',
        link: '/products',
        is_active: true
    };

    return (
        <ShopLayout>
            <Head title="RaiaFood - Makanan Khas Batu" />

            {/* ── HERO SECTION (Rasio 3:1) ──────────────────────────────────── */}
            <div className="w-full max-w-[92vw] xl:max-w-[88vw] 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
                <section
                    className="w-full relative overflow-hidden flex items-center aspect-[3/1] rounded-2xl lg:rounded-3xl shadow-sm"
                    style={{ backgroundColor: '#FAE6FF' }}
                >
                    {/* Sliding Wrapper */}
                    <div 
                        className="absolute inset-0 h-full flex transition-transform duration-700 ease-in-out" 
                        style={{ transform: `translateX(-${currentIndex * (100 / bannerList.length)}%)`, width: `${bannerList.length * 100}%` }}
                    >
                        {bannerList.map((banner) => (
                            <div key={banner.id} className="h-full relative" style={{ width: `${100 / bannerList.length}%`, flexShrink: 0 }}>
                                <img
                                    src={banner.image.startsWith('images/') || banner.image.startsWith('/') ? `/${banner.image}` : `/storage/${banner.image}`}
                                    alt={banner.title}
                                    className="w-full h-full object-cover object-center"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Left: Text Content styled to scale proportionally */}
                    <div className="w-[50%] z-10 relative pl-[6%] pr-[2%] py-[2%] flex flex-col justify-center select-none">
                        <div className="w-full">
                            {/* "Selamat datang di" */}
                            <p className="leading-snug" style={{
                                fontFamily: 'Outfit, sans-serif',
                                fontWeight: 400,
                                fontSize: 'clamp(12px, 2.2vw, 40px)',
                                color: '#60396B',
                                marginBottom: '0.1vw',
                            }}>
                                Selamat datang di
                            </p>

                            {/* "Raia Food" */}
                            <h1 className="leading-none" style={{
                                fontFamily: 'Outfit, sans-serif',
                                fontWeight: 700,
                                fontSize: 'clamp(16px, 3.2vw, 60px)',
                                color: '#60396B',
                                marginBottom: '0.4vw',
                            }}>
                                Raia Food
                            </h1>

                            {/* "Pusat Makanan Khas Batu" */}
                            <p style={{
                                fontFamily: 'Inter, sans-serif',
                                fontWeight: 700,
                                fontSize: 'clamp(10px, 1.6vw, 30px)',
                                color: '#843799',
                                marginBottom: '0.3vw',
                            }}>
                                Pusat Makanan Khas Batu
                            </p>

                            {/* Description */}
                            <p style={{
                                fontFamily: 'Inter, sans-serif',
                                fontWeight: 500,
                                fontSize: 'clamp(8px, 1.1vw, 18px)',
                                color: '#843799',
                                lineHeight: 1.5,
                                marginBottom: '1vw',
                            }}>
                                {settings?.store_description || 'Dibuat dengan bahan pilihan berkualitas, di goreng dengan cita rasa berbeda.'}
                            </p>

                            {/* CTA Action Buttons */}
                            <div className="flex items-center gap-2 sm:gap-3 md:gap-3.5 flex-wrap">
                                <Link
                                    href="/products"
                                    className="inline-flex items-center justify-center rounded-lg sm:rounded-xl font-bold transition-all duration-200 shadow-sm whitespace-nowrap"
                                    style={{
                                        backgroundColor: '#843799',
                                        color: '#ffffff',
                                        padding: 'clamp(4px, 0.6vw, 11px) clamp(11px, 1.5vw, 28px)',
                                        fontSize: 'clamp(9px, 1vw, 17px)',
                                    }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.opacity = '0.9';
                                        e.currentTarget.style.transform = 'translateY(-1px)';
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.opacity = '1';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                    }}
                                >
                                    Belanja Sekarang
                                </Link>

                                <Link
                                    href="/tentang-kami"
                                    className="inline-flex items-center justify-center rounded-lg sm:rounded-xl font-bold transition-all duration-200 border-2 whitespace-nowrap"
                                    style={{
                                        borderColor: '#843799',
                                        backgroundColor: 'rgba(255, 255, 255, 0.85)',
                                        color: '#843799',
                                        padding: 'clamp(4px, 0.6vw, 11px) clamp(11px, 1.5vw, 28px)',
                                        fontSize: 'clamp(9px, 1vw, 17px)',
                                    }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.backgroundColor = '#ffffff';
                                        e.currentTarget.style.transform = 'translateY(-1px)';
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.85)';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                    }}
                                >
                                    Tentang Kami
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Dots Indicators at the bottom center overlay */}
                    {bannerList.length > 1 && (
                        <div className="absolute bottom-[6%] left-0 right-0 z-20 flex items-center justify-center gap-2">
                            {bannerList.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentIndex(i)}
                                    className="rounded-full transition-all duration-300 cursor-pointer p-0 border-0 outline-none"
                                    style={{
                                        width: i === currentIndex ? "20px" : "8px",
                                        height: "8px",
                                        backgroundColor: i === currentIndex ? "#843799" : "#F4C6FF",
                                    }}
                                    aria-label={`Slide ${i + 1}`}
                                />
                            ))}
                        </div>
                    )}
                </section>
            </div>

            {/* ── FLASH SALE BANNER SECTION (Ratio limit 3.5:1, recommended 4:1) ─── */}
            {activeFlashSale && activeFlashSale.is_active && (
                <div className="w-full max-w-[92vw] xl:max-w-[88vw] 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
                    <div 
                        style={{ containerType: 'inline-size' }}
                        className="relative w-full rounded-2xl lg:rounded-3xl overflow-hidden shadow-sm flex items-center justify-center max-h-[calc(92vw/3.5)] xl:max-h-[calc(88vw/3.5)] 2xl:max-h-[412px] group"
                    >
                        {activeFlashSale.link ? (
                            <Link href={activeFlashSale.link} className="block w-full h-full">
                                <img
                                    src={activeFlashSale.image.startsWith('images/') || activeFlashSale.image.startsWith('/') ? `/${activeFlashSale.image}` : `/storage/${activeFlashSale.image}`}
                                    alt={activeFlashSale.title || 'Flash Sale Banner'}
                                    className="w-full h-auto object-cover object-center block"
                                />
                            </Link>
                        ) : (
                            <img
                                src={activeFlashSale.image.startsWith('images/') || activeFlashSale.image.startsWith('/') ? `/${activeFlashSale.image}` : `/storage/${activeFlashSale.image}`}
                                alt={activeFlashSale.title || 'Flash Sale Banner'}
                                className="w-full h-auto object-cover object-center block"
                            />
                        )}

                        {/* Interactive Countdown Timer Badge */}
                        {activeFlashSale.countdown_enabled && activeFlashSale.countdown_end && (
                            <FlashSaleCountdown
                                targetDate={activeFlashSale.countdown_end}
                                posX={activeFlashSale.countdown_pos_x ?? 50}
                                posY={activeFlashSale.countdown_pos_y ?? 50}
                                scale={activeFlashSale.countdown_scale ?? 1.0}
                            />
                        )}
                    </div>
                </div>
            )}

            {/* ── PRODUK TERBARU ─────────────────────────────────────────── */}
            <section className="pt-12 sm:pt-14 pb-8 sm:pb-10">
                <div className="w-full max-w-[92vw] xl:max-w-[88vw] 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
                                Produk Terbaru
                            </h2>
                        </div>
                        <Link
                            href="/products?sort=newest"
                            className="hidden sm:flex items-center gap-1 text-sm font-semibold transition-colors hover:opacity-80"
                            style={{ color: '#843799' }}
                        >
                            Lihat Semua
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
                        {latestProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    <div className="sm:hidden text-center mt-8">
                        <Link href="/products?sort=newest" className="inline-flex items-center gap-1 text-sm font-semibold" style={{ color: '#843799' }}>
                            Lihat Semua &#x2192;
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── PRODUK TERLARIS ─────────────────────────────────────────── */}
            <section className="pt-4 sm:pt-6 pb-16 lg:pb-20">
                <div className="w-full max-w-[92vw] xl:max-w-[88vw] 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
                                Produk Terlaris
                            </h2>
                        </div>
                        <Link
                            href="/products?sort=popular"
                            className="hidden sm:flex items-center gap-1 text-sm font-semibold transition-colors hover:opacity-80"
                            style={{ color: '#843799' }}
                        >
                            Lihat Semua
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
                        {bestSellerProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    <div className="sm:hidden text-center mt-8">
                        <Link href="/products?sort=popular" className="inline-flex items-center gap-1 text-sm font-semibold" style={{ color: '#843799' }}>
                            Lihat Semua &#x2192;
                        </Link>
                    </div>
                </div>
            </section>

            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-12px); }
                }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
                .animate-fade-in { animation: fadeIn 0.3s ease-out; }
            `}</style>
        </ShopLayout>
    );
}
