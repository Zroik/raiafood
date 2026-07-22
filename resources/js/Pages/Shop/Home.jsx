import { Head, Link, router } from '@inertiajs/react';
import ShopLayout from '@/Layouts/ShopLayout';
import { useState, useEffect } from 'react';

// ─── Color Palette ────────────────────────────────────────────────────────────
// #FAE6FF  raia-lightest  Hero bg, section alt
// #F4C6FF  raia-light     Badge bg, hover states
// #843799  raia-primary   Buttons, sub-headings, icons
// #60396A  raia-dark      Main headings
// ─────────────────────────────────────────────────────────────────────────────

function StarRating({ rating, count }) {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(
            <svg key={i} className={`w-4 h-4 ${i <= Math.round(rating) ? 'text-amber-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        );
    }
    return (
        <div className="flex items-center gap-1">
            <div className="flex">{stars}</div>
            <span className="text-xs text-gray-400 ml-1">({count})</span>
        </div>
    );
}

function ProductCard({ product }) {
    const effectivePrice = product.discount_price || product.price;
    const hasDiscount = product.discount_price && product.discount_price < product.price;

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
            <div className="relative rounded-2xl mb-4 aspect-square overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:brightness-95" style={{ boxShadow: '0 0 0 0 transparent' }}>
                {hasDiscount && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                        -{Math.round(((product.price - product.discount_price) / product.price) * 100)}%
                    </div>
                )}
                {product.image ? (
                    <img
                        src={`/storage/${product.image}`}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: '#FAE6FF' }}>
                        <div className="w-32 h-32 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #F4C6FF, #843799)' }}>
                            <span className="text-4xl">&#x1F36A;</span>
                        </div>
                    </div>
                )}
            </div>

            <h3 className="font-semibold text-gray-900 text-sm mb-1 transition-colors group-hover:text-[#843799]">{product.name}</h3>
            <StarRating rating={product.rating_avg} count={product.rating_count} />

            <div className="flex items-center justify-between mt-2">
                <div>
                    <span className="font-bold text-gray-900">
                        Rp {Number(effectivePrice).toLocaleString('id-ID')}
                    </span>
                    {hasDiscount && (
                        <span className="text-xs text-gray-400 line-through ml-2">
                            Rp {Number(product.price).toLocaleString('id-ID')}
                        </span>
                    )}
                </div>
                <button
                    onClick={handleAddToCart}
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
}

// Badge icons as SVG paths for the hero feature badges
const featureBadges = [
    {
        label: <>Bahan Pilihan <br /> Terbaik</>,
        icon: <img src="/images/Bahan Pilihan Terbaik.svg" alt="Bahan Pilihan Terbaik" className="w-16 h-16 object-contain" />,
    },
    {
        label: <>Bahan Tanpa <br /> Pengawet</>,
        icon: <img src="/images/Bahan Tanpa Pengawet.svg" alt="Bahan Tanpa Pengawet" className="w-16 h-16 object-contain" />,
    },
    {
        label: <>Cita Rasa Khas <br /> Pulau Jawa</>,
        icon: <img src="/images/Cita Rasa Khas Pulau Jawa.svg" alt="Cita Rasa Khas Pulau Jawa" className="w-16 h-16 object-contain" />,
    },
    {
        label: <>Cocok untuk <br /> Oleh - Oleh</>,
        icon: <img src="/images/Cocok untuk Oleh - Oleh.svg" alt="Cocok untuk Oleh - Oleh" className="w-16 h-16 object-contain" />,
    },
];

export default function Home({ featuredProducts, categories, settings, banners = [] }) {
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
    return (
        <ShopLayout>
            <Head title="RaiaFood - Makanan Khas Batu" />

            {/* ── HERO SECTION ──────────────────────────────────────────────── */}
            <section
                className="w-full relative overflow-hidden flex items-center aspect-[1912/630]"
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

                {/* Left: Text Content styled to scale proportionally (Still / non-moving) */}
                <div className="w-[48%] z-10 relative pl-[6%] pr-[2%] py-[2%] flex flex-col justify-center pointer-events-none select-none">
                    <div className="w-full">
                        {/* "Selamat datang di" */}
                        <p className="leading-snug" style={{
                            fontFamily: 'Outfit, sans-serif',
                            fontWeight: 400,
                            fontSize: 'clamp(14px, 3vw, 76px)',
                            color: '#60396B',
                            marginBottom: '0.2vw',
                        }}>
                            Selamat datang di
                        </p>

                        {/* "Raia Food" */}
                        <h1 className="leading-none" style={{
                            fontFamily: 'Outfit, sans-serif',
                            fontWeight: 400,
                            fontSize: 'clamp(18px, 3.75vw, 96px)',
                            color: '#60396B',
                            marginBottom: '0.8vw',
                        }}>
                            Raia Food
                        </h1>

                        {/* "Pusat Makanan Khas Batu" */}
                        <p style={{
                            fontFamily: 'Inter, sans-serif',
                            fontWeight: 700,
                            fontSize: 'clamp(11px, 2vw, 50px)',
                            color: '#843799',
                            marginBottom: '0.4vw',
                        }}>
                            Pusat Makanan Khas Batu
                        </p>

                        {/* Description */}
                        <p style={{
                            fontFamily: 'Inter, sans-serif',
                            fontWeight: 500,
                            fontSize: 'clamp(8px, 1.25vw, 32px)',
                            color: '#843799',
                            lineHeight: 1.6,
                        }}>
                            {settings?.store_description || 'Dibuat dengan bahan pilihan berkualitas, di goreng dengan cita rasa berbeda.'}
                        </p>
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

            {/* ── POPULAR COLLECTION ────────────────────────────────────────── */}
            <section className="py-16 lg:py-20">
                <div className="w-full max-w-[92vw] xl:max-w-[88vw] 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-10">
                        <div className="flex items-center gap-3">
                            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
                                Koleksi Produk
                            </h2>
                        </div>
                        <Link
                            href="/products"
                            className="hidden sm:flex items-center gap-1 text-sm font-semibold transition-colors hover:opacity-80"
                            style={{ color: '#843799' }}
                        >
                            Lihat Semua Produk
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
                        {featuredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    <div className="sm:hidden text-center mt-8">
                        <Link href="/products" className="inline-flex items-center gap-1 text-sm font-semibold" style={{ color: '#843799' }}>
                            Lihat Semua Produk &#x2192;
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── PROMO BANNER ──────────────────────────────────────────────── */}
            <section className="py-10 lg:py-12 w-full" style={{ backgroundColor: '#F5E2FF' }}>
                <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 pl-[6%] pr-[6%]">

                    {/* Left: Text + CTA */}
                    <div className="flex-1 min-w-0">
                        <h2 style={{
                            fontFamily: 'Outfit, sans-serif',
                            fontWeight: 700,
                            fontSize: '32px',
                            color: '#843799',
                            lineHeight: 1.1,
                            marginBottom: '8px',
                        }}>
                            OLEH - OLEH SPESIAL KHAS BATU
                        </h2>
                        <p style={{
                            fontFamily: 'Outfit, sans-serif',
                            fontWeight: 400,
                            fontSize: '23px',
                            color: '#843799',
                            marginBottom: '12px',
                        }}>
                            Hadiah Manis untuk Orang Tersayang
                        </p>
                        <p style={{
                            fontFamily: 'Inter, sans-serif',
                            fontWeight: 500,
                            fontSize: '12px',
                            color: '#843799',
                            lineHeight: 1.6,
                            maxWidth: '380px',
                            marginBottom: '24px',
                        }}>
                            Pilihan oleh - oleh khas batu untuk berbagi momen spesial. Dikemas cantik dan siap membuat momen berkesan.
                        </p>
                        <Link
                            href="/products"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-200 hover:opacity-90 hover:shadow-lg hover:-translate-y-0.5"
                            style={{ backgroundColor: '#843799' }}
                        >
                            <span style={{
                                fontFamily: 'Inter, sans-serif',
                                fontWeight: 600,
                                fontSize: '16px',
                                color: '#ffffff',
                            }}>
                                Belanja Sekarang
                            </span>
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>

                    {/* Right: Feature badges */}
                    <div className="flex flex-row lg:flex-row items-center gap-0 flex-shrink-0">
                        {featureBadges.map((badge, i) => (
                            <div key={i} className="flex flex-row items-center">
                                <div className="flex flex-col items-center text-center px-9 py-3" style={{ minWidth: '150px' }}>
                                    <div className="mb-4 transform scale-150" style={{ color: '#843799' }}>
                                        {badge.icon}
                                    </div>
                                    <span style={{
                                        fontFamily: 'Inter, sans-serif',
                                        fontWeight: 700,
                                        fontSize: '24px',
                                        color: '#843799',
                                        lineHeight: 1.3,
                                        marginTop: '12px'
                                    }}>
                                        {badge.label}
                                    </span>
                                </div>
                                {i < featureBadges.length - 1 && (
                                    <div style={{ width: '1.5px', height: '90px', backgroundColor: '#843799', opacity: 0.3, flexShrink: 0 }} />
                                )}
                            </div>
                        ))}
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
