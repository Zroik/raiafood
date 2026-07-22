import { Head, Link, router } from '@inertiajs/react';
import ShopLayout from '@/Layouts/ShopLayout';
import { useState } from 'react';

export default function ProductDetail({ product, relatedProducts, inWishlist }) {
    const [quantity, setQuantity] = useState(1);
    const [isFav, setIsFav] = useState(inWishlist);
    const effectivePrice = product.discount_price || product.price;
    const hasDiscount = product.discount_price && product.discount_price < product.price;

    const addToCart = () => {
        router.post('/cart', { product_id: product.id, quantity }, { preserveScroll: true });
    };

    const toggleWishlist = () => {
        router.post('/wishlist', { product_id: product.id }, {
            preserveScroll: true,
            onSuccess: () => {
                setIsFav(!isFav);
            },
            onError: () => {
                router.visit('/login');
            }
        });
    };

    return (
        <ShopLayout>
            <Head title={`${product.name} - RaiaFood`} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">


                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Image */}
                    <div className="rounded-3xl aspect-square overflow-hidden">
                        {product.image ? (
                            <img src={`/storage/${product.image}`} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: '#FAE6FF' }}>
                                <div className="w-64 h-64 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #F4C6FF, #843799)' }}>
                                    <span className="text-8xl">🍪</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Details */}
                    <div className="space-y-6">
                        <div>
                            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#843799' }}>{product.category?.name}</span>
                            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mt-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                                {product.name}
                            </h1>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-3">
                            <div className="flex">
                                {[1,2,3,4,5].map(i => (
                                    <svg key={i} className={`w-5 h-5 ${i <= Math.round(product.rating_avg) ? 'text-amber-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <span className="text-sm text-gray-500">{product.rating_avg} ({product.rating_count} ulasan)</span>
                        </div>

                        {/* Price */}
                        <div className="flex items-baseline gap-3">
                            <span className="text-3xl font-bold" style={{ color: '#843799' }}>
                                Rp {Number(effectivePrice).toLocaleString('id-ID')}
                            </span>
                            {hasDiscount && (
                                <>
                                    <span className="text-lg text-gray-400 line-through">Rp {Number(product.price).toLocaleString('id-ID')}</span>
                                    <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded-full">
                                        -{Math.round(((product.price - product.discount_price) / product.price) * 100)}%
                                    </span>
                                </>
                            )}
                        </div>

                        <p className="text-gray-600 leading-relaxed">{product.description}</p>

                        {/* Stock & Weight */}
                        <div className="flex gap-6 text-sm">
                            <div className="flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${product.stock > 0 ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                                <span className="text-gray-600">{product.stock > 0 ? `Stok: ${product.stock}` : 'Stok Habis'}</span>
                            </div>
                            <div className="text-gray-600">Berat: {product.weight}g</div>
                        </div>

                        {/* Quantity & Add to Cart */}
                        {product.stock > 0 && (
                            <div className="flex items-center gap-4 pt-4">
                                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-12 h-12 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
                                    >−</button>
                                    <span className="w-12 h-12 flex items-center justify-center font-semibold text-gray-900 border-x border-gray-200">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                        className="w-12 h-12 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
                                    >+</button>
                                </div>
                                <button
                                    onClick={addToCart}
                                    style={{ backgroundColor: '#843799', color: 'white' }}
                                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#60396A'; }}
                                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#843799'; }}
                                    className="flex-1 py-3.5 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg flex items-center justify-center gap-2"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                    Tambah ke Keranjang
                                </button>
                                <button
                                    onClick={toggleWishlist}
                                    className="w-12 h-12 rounded-xl border border-gray-200 flex items-center justify-center transition-colors text-gray-400 hover:text-red-500 hover:border-red-200"
                                    style={isFav ? { color: '#843799', borderColor: '#FAE6FF', backgroundColor: '#FAE6FF' } : {}}
                                    title={isFav ? "Hapus dari Favorit" : "Tambah ke Favorit"}
                                >
                                    <svg className="w-5 h-5" fill={isFav ? "currentColor" : "none"} stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div className="mt-20">
                        <h2 className="text-2xl font-bold text-gray-900 mb-8" style={{ fontFamily: 'Outfit, sans-serif' }}>
                            Produk Terkait
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 lg:gap-6">
                            {relatedProducts.map(p => {
                                const ep = p.discount_price || p.price;
                                return (
                                    <Link key={p.id} href={`/products/${p.slug}`} className="group">
                                        <div className="rounded-2xl mb-3 aspect-square overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:brightness-95">
                                            {p.image ? (
                                                <img src={`/storage/${p.image}`} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: '#FAE6FF' }}><div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #F4C6FF, #843799)' }}><span className="text-3xl">🍪</span></div></div>
                                            )}
                                        </div>
                                        <h3 className="font-semibold text-gray-900 text-sm mb-1 group-hover:text-[#843799] transition-colors">{p.name}</h3>
                                        <span className="font-bold text-sm text-gray-900">Rp {Number(ep).toLocaleString('id-ID')}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </ShopLayout>
    );
}
