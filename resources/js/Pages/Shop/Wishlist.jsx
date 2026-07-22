import { Head, Link, router } from '@inertiajs/react';
import ShopLayout from '@/Layouts/ShopLayout';
import { useState } from 'react';

export default function Wishlist({ wishlistItems }) {
    const [items, setItems] = useState(wishlistItems);

    const removeItem = (productId) => {
        router.post('/wishlist', { product_id: productId }, {
            preserveScroll: true,
            onSuccess: () => {
                setItems(prev => prev.filter(item => item.product_id !== productId));
            }
        });
    };

    const addToCart = (productId) => {
        router.post('/cart', { product_id: productId, quantity: 1 }, {
            preserveScroll: true,
            onSuccess: () => {
                alert('Produk berhasil ditambahkan ke keranjang!');
            }
        });
    };

    return (
        <ShopLayout>
            <Head title="Favorit Saya - RaiaFood" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    Produk Favorit
                </h1>

                {items.length === 0 ? (
                    <div className="text-center py-20">
                        <span className="text-6xl mb-4 block">❤️</span>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Belum ada produk favorit</h3>
                        <p className="text-gray-500 text-sm mb-6">Jelajahi produk kami dan tandai produk yang Anda sukai!</p>
                        <Link href="/products" className="inline-flex items-center gap-2 bg-[#843799] text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-[#60396A] transition-colors">
                            Jelajahi Produk
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {items.map(item => {
                            const product = item.product;
                            if (!product) return null;
                            const price = product.discount_price || product.price || 0;
                            return (
                                <div key={item.id} className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-between">
                                    <div className="flex gap-4 sm:gap-6 items-center w-full sm:w-auto">
                                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-[#FAE6FF] flex items-center justify-center flex-shrink-0">
                                            {product.image ? (
                                                <img src={`/storage/${product.image}`} alt={product.name} className="w-full h-full object-contain p-2" />
                                            ) : (
                                                <span className="text-3xl">🍪</span>
                                            )}
                                        </div>
                                        <div className="min-w-0">
                                            <Link href={`/products/${product.slug}`} className="font-semibold text-gray-900 hover:text-[#843799] transition-colors truncate block text-base">
                                                {product.name}
                                            </Link>
                                            <p className="text-xs text-gray-500">{product.category?.name}</p>
                                            <p className="font-bold text-[#843799] mt-1 text-sm">Rp {Number(price).toLocaleString('id-ID')}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                                        <button 
                                            onClick={() => addToCart(product.id)} 
                                            disabled={product.stock <= 0}
                                            className="px-4 py-2.5 bg-[#843799] text-white text-xs font-semibold rounded-xl hover:bg-[#60396A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
                                        >
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                            </svg>
                                            {product.stock <= 0 ? 'Habis' : 'Ke Keranjang'}
                                        </button>
                                        <button 
                                            onClick={() => removeItem(product.id)} 
                                            className="w-10 h-10 rounded-xl text-gray-400 hover:bg-red-50 hover:text-red-500 flex items-center justify-center transition-colors border border-gray-100"
                                            title="Hapus dari Favorit"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </ShopLayout>
    );
}
