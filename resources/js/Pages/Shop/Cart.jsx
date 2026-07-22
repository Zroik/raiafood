import { Head, Link, router } from '@inertiajs/react';
import ShopLayout from '@/Layouts/ShopLayout';

export default function Cart({ cartItems }) {
    const subtotal = cartItems.reduce((sum, item) => {
        const price = item.product?.discount_price || item.product?.price || 0;
        return sum + (price * item.quantity);
    }, 0);

    const updateQuantity = (cartId, qty) => {
        router.patch(`/cart/${cartId}`, { quantity: qty }, { preserveScroll: true });
    };

    const removeItem = (cartId) => {
        router.delete(`/cart/${cartId}`, { preserveScroll: true });
    };

    return (
        <ShopLayout>
            <Head title="Keranjang - RaiaFood" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    Keranjang Belanja
                </h1>

                {cartItems.length === 0 ? (
                    <div className="text-center py-20">
                        <span className="text-6xl mb-4 block">🛒</span>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Keranjang Anda kosong</h3>
                        <p className="text-gray-500 text-sm mb-6">Belum ada produk di keranjang. Yuk mulai belanja!</p>
                        <Link href="/products" className="inline-flex items-center gap-2 bg-[#843799] text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-[#60396A] transition-colors">
                            Mulai Belanja
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {cartItems.map(item => {
                            const price = item.product?.discount_price || item.product?.price || 0;
                            return (
                                <div key={item.id} className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6 flex gap-4 sm:gap-6 items-center">
                                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-[#FAE6FF] flex items-center justify-center flex-shrink-0">
                                        {item.product?.image ? (
                                            <img src={`/storage/${item.product.image}`} alt="" className="w-full h-full object-contain p-2" />
                                        ) : (
                                            <span className="text-3xl">🍪</span>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <Link href={`/products/${item.product?.slug}`} className="font-semibold text-gray-900 hover:text-[#843799] transition-colors truncate block">
                                            {item.product?.name}
                                        </Link>
                                        <p className="text-sm text-gray-500">{item.product?.category?.name}</p>
                                        <p className="font-bold text-[#843799] mt-1">Rp {Number(price).toLocaleString('id-ID')}</p>
                                    </div>
                                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                                        <button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} className="w-9 h-9 flex items-center justify-center text-gray-500 hover:bg-gray-50">−</button>
                                        <span className="w-10 h-9 flex items-center justify-center font-semibold text-sm border-x border-gray-200">{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-9 h-9 flex items-center justify-center text-gray-500 hover:bg-gray-50">+</button>
                                    </div>
                                    <div className="text-right hidden sm:block min-w-[100px]">
                                        <p className="font-bold text-gray-900">Rp {Number(price * item.quantity).toLocaleString('id-ID')}</p>
                                    </div>
                                    <button onClick={() => removeItem(item.id)} className="w-9 h-9 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500 flex items-center justify-center transition-colors">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            );
                        })}

                        {/* Summary */}
                        <div className="bg-[#FAE6FF] rounded-2xl p-6 mt-6">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-gray-600">Subtotal</span>
                                <span className="text-xl font-bold text-gray-900">Rp {subtotal.toLocaleString('id-ID')}</span>
                            </div>
                            <Link
                                href="/checkout"
                                className="block w-full bg-[#843799] text-white text-center py-3.5 rounded-xl font-semibold hover:bg-[#60396A] transition-all duration-200 hover:shadow-lg hover:shadow-purple-100"
                            >
                                Lanjutkan ke Checkout
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </ShopLayout>
    );
}
