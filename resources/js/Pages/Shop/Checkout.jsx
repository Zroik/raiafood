import { Head, useForm, usePage } from '@inertiajs/react';
import ShopLayout from '@/Layouts/ShopLayout';
import { useState, useEffect } from 'react';

export default function Checkout({ cartItems, shippingCost, freeShippingMin, midtransClientKey, midtransSnapUrl }) {
    const { auth } = usePage().props;
    const [promoResult, setPromoResult] = useState(null);
    const [promoLoading, setPromoLoading] = useState(false);
    const [processing, setProcessing] = useState(false);

    // Shipping cost states
    const [cities, setCities] = useState([]);
    const [cityKeyword, setCityKeyword] = useState('');
    const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
    const [cityLoading, setCityLoading] = useState(false);

    const [couriers] = useState([
        { code: 'jne', name: 'JNE (Jalur Nugraha Ekakurir)' },
        { code: 'pos', name: 'POS Indonesia' },
        { code: 'tiki', name: 'TIKI (Titipan Kilat)' }
    ]);
    const [shippingCostOptions, setShippingCostOptions] = useState([]);
    const [shippingCostLoading, setShippingCostLoading] = useState(false);

    const subtotal = cartItems.reduce((sum, item) => {
        const price = item.product?.discount_price || item.product?.price || 0;
        return sum + (price * item.quantity);
    }, 0);

    const { data, setData, errors } = useForm({
        name: '',
        email: auth?.user?.email || '',
        phone: '',
        address: '',
        city: '',
        postal_code: '',
        notes: '',
        promo_code: '',
        destination_id: '',
        courier_code: '',
        courier_service: '',
        shipping_cost: 0,
    });

    const actualShipping = subtotal >= freeShippingMin ? 0 : data.shipping_cost;
    const discount = promoResult?.valid ? promoResult.discount : 0;
    const total = subtotal - discount + actualShipping;

    useEffect(() => {
        const script = document.createElement('script');
        script.src = midtransSnapUrl;
        script.setAttribute('data-client-key', midtransClientKey);
        script.async = true;
        document.head.appendChild(script);

        const handleClickOutside = (e) => {
            if (!e.target.closest('.relative')) {
                setCityDropdownOpen(false);
            }
        };
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.head.removeChild(script);
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    // Fetch cities autocomplete
    useEffect(() => {
        if (!cityKeyword || cityKeyword.length < 2) {
            setCities([]);
            return;
        }
        const delayDebounce = setTimeout(async () => {
            setCityLoading(true);
            try {
                const res = await fetch(`/checkout/cities?keyword=${encodeURIComponent(cityKeyword)}`);
                const result = await res.json();
                setCities(result);
                setCityDropdownOpen(true);
            } catch (err) {
                console.error('Failed fetching cities:', err);
            }
            setCityLoading(false);
        }, 300);

        return () => clearTimeout(delayDebounce);
    }, [cityKeyword]);

    const fetchShippingCost = async (destinationId, courierCode) => {
        if (!destinationId || !courierCode) return;
        setShippingCostLoading(true);
        setShippingCostOptions([]);
        setData(prev => ({
            ...prev,
            courier_service: '',
            shipping_cost: 0
        }));
        try {
            const res = await fetch('/checkout/shipping-cost', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json', 
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content 
                },
                body: JSON.stringify({
                    destination_id: destinationId,
                    courier: courierCode
                })
            });
            const result = await res.json();
            const costs = result[0]?.costs || [];
            setShippingCostOptions(costs);
        } catch (err) {
            console.error('Failed calculating shipping:', err);
            alert('Gagal mengambil biaya pengiriman.');
        }
        setShippingCostLoading(false);
    };

    const handleSelectCity = (city) => {
        setData(prev => ({
            ...prev,
            city: city.name,
            postal_code: city.postal_code,
            destination_id: city.id,
            courier_code: '',
            courier_service: '',
            shipping_cost: 0
        }));
        setCityKeyword(city.name);
        setCityDropdownOpen(false);
        setShippingCostOptions([]);
    };

    const handleSelectCourier = (courierCode) => {
        setData(prev => ({
            ...prev,
            courier_code: courierCode,
            courier_service: '',
            shipping_cost: 0
        }));
        fetchShippingCost(data.destination_id, courierCode);
    };

    const handleSelectService = (service) => {
        const costValue = service.cost[0]?.value || 0;
        setData(prev => ({
            ...prev,
            courier_service: service.service,
            shipping_cost: costValue
        }));
    };

    const applyPromo = async () => {
        if (!data.promo_code) return;
        setPromoLoading(true);
        try {
            const res = await fetch('/checkout/promo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content },
                body: JSON.stringify({ code: data.promo_code }),
            });
            const result = await res.json();
            setPromoResult(result);
        } catch { setPromoResult({ valid: false, message: 'Gagal memproses kode promo' }); }
        setPromoLoading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!data.destination_id) {
            alert('Silakan pilih kota pengiriman yang valid.');
            return;
        }
        if (subtotal < freeShippingMin && !data.courier_service) {
            alert('Silakan pilih kurir dan layanan pengiriman.');
            return;
        }
        setProcessing(true);
        try {
            const res = await fetch('/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content },
                body: JSON.stringify({ ...data }),
            });
            const result = await res.json();
            if (result.snap_token) {
                window.snap.pay(result.snap_token, {
                    onSuccess: () => {
                        if (auth?.user) {
                            window.location.href = `/orders/${result.order_number}`;
                        } else {
                            window.location.href = `/?order_success=${result.order_number}`;
                        }
                    },
                    onPending: () => {
                        if (auth?.user) {
                            window.location.href = `/orders/${result.order_number}`;
                        } else {
                            window.location.href = `/?order_pending=${result.order_number}`;
                        }
                    },
                    onError: () => {
                        alert('Pembayaran gagal. Silakan coba lagi.');
                        setProcessing(false);
                    },
                    onClose: () => {
                        if (auth?.user) {
                            window.location.href = `/orders/${result.order_number}`;
                        } else {
                            setProcessing(false);
                        }
                    },
                });
            }
        } catch { alert('Terjadi kesalahan. Silakan coba lagi.'); setProcessing(false); }
    };

    return (
        <ShopLayout>
            <Head title="Checkout - RaiaFood" />
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8" style={{ fontFamily: 'Outfit, sans-serif' }}>Checkout</h1>
                <form onSubmit={handleSubmit}>
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Shipping Form */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white rounded-2xl border border-gray-100 p-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">Alamat Pengiriman</h2>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="sm:col-span-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                                        <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-[#843799] focus:ring-2 focus:ring-purple-100 outline-none" required />
                                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                    </div>
                                    <div className="sm:col-span-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Telepon</label>
                                        <input type="tel" value={data.phone} onChange={e => setData('phone', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-[#843799] focus:ring-2 focus:ring-purple-100 outline-none" required />
                                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                                    </div>
                                    {!auth?.user && (
                                        <div className="sm:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                            <input type="email" value={data.email} onChange={e => setData('email', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-[#843799] focus:ring-2 focus:ring-purple-100 outline-none" placeholder="alamat-email@domain.com (untuk menerima info pesanan)" required />
                                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                        </div>
                                    )}
                                    <div className="sm:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Lengkap</label>
                                        <textarea value={data.address} onChange={e => setData('address', e.target.value)} rows={3} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-[#843799] focus:ring-2 focus:ring-purple-100 outline-none" required />
                                        {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                                    </div>

                                    {/* Autocomplete City Search */}
                                    <div className="sm:col-span-1 relative">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Kota / Kabupaten</label>
                                        <input 
                                            type="text" 
                                            value={cityKeyword} 
                                            onChange={e => {
                                                setCityKeyword(e.target.value);
                                                if (e.target.value === '') {
                                                    setData('city', '');
                                                    setData('destination_id', '');
                                                }
                                            }} 
                                            onFocus={() => { if (cities.length > 0) setCityDropdownOpen(true); }}
                                            placeholder="Ketik nama kota..." 
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-[#843799] focus:ring-2 focus:ring-purple-100 outline-none" 
                                            required 
                                        />
                                        {cityLoading && (
                                            <span className="absolute right-3 top-10 text-xs text-gray-400">Loading...</span>
                                        )}
                                        {cityDropdownOpen && cities.length > 0 && (
                                            <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-100 rounded-xl shadow-lg max-h-60 overflow-y-auto z-50">
                                                {cities.map(city => (
                                                    <div 
                                                        key={city.id} 
                                                        onClick={() => handleSelectCity(city)} 
                                                        className="px-4 py-2.5 text-sm hover:bg-[#FAE6FF] cursor-pointer transition-colors"
                                                    >
                                                        <span className="font-medium text-gray-900">{city.name}</span>
                                                        <span className="text-xs text-gray-400 block">{city.province} (Kode Pos: {city.postal_code})</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                                    </div>

                                    <div className="sm:col-span-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Kode Pos</label>
                                        <input type="text" value={data.postal_code} onChange={e => setData('postal_code', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-[#843799] focus:ring-2 focus:ring-purple-100 outline-none" required />
                                        {errors.postal_code && <p className="text-red-500 text-xs mt-1">{errors.postal_code}</p>}
                                    </div>

                                    {/* Courier Selection */}
                                    {data.destination_id && (
                                        <div className="sm:col-span-2 border-t border-gray-100 pt-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Pilih Ekspedisi</label>
                                            <div className="grid grid-cols-3 gap-3">
                                                {couriers.map(courier => (
                                                    <button
                                                        key={courier.code}
                                                        type="button"
                                                        onClick={() => handleSelectCourier(courier.code)}
                                                        className={`py-3 px-4 rounded-xl border text-sm font-semibold transition-all flex flex-col items-center justify-center gap-1 ${
                                                            data.courier_code === courier.code 
                                                                ? 'border-[#843799] bg-[#FAE6FF] text-[#843799] shadow-sm' 
                                                                : 'border-gray-200 hover:bg-gray-50 text-gray-600'
                                                        }`}
                                                    >
                                                        <span className="uppercase text-base">{courier.code}</span>
                                                        <span className="text-[10px] text-gray-400 font-normal">{courier.code === 'jne' ? 'Jalur Nugraha' : courier.code === 'pos' ? 'Pos Indonesia' : 'Titipan Kilat'}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Service / Cost Options */}
                                    {shippingCostLoading && (
                                        <div className="sm:col-span-2 py-4 text-center text-sm text-gray-500">
                                            Memuat biaya pengiriman...
                                        </div>
                                    )}

                                    {!shippingCostLoading && shippingCostOptions.length > 0 && (
                                        <div className="sm:col-span-2 border-t border-gray-100 pt-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Layanan Pengiriman</label>
                                            <div className="space-y-2">
                                                {shippingCostOptions.map(option => {
                                                    const cost = option.cost[0]?.value || 0;
                                                    const etd = option.cost[0]?.etd || '';
                                                    return (
                                                        <div
                                                            key={option.service}
                                                            onClick={() => handleSelectService(option)}
                                                            className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                                                                data.courier_service === option.service
                                                                    ? 'border-[#843799] bg-[#FAE6FF]/50 shadow-sm'
                                                                    : 'border-gray-150 hover:bg-gray-50'
                                                            }`}
                                                        >
                                                            <div>
                                                                <span className="font-semibold text-sm text-gray-900 block">{option.service}</span>
                                                                <span className="text-xs text-gray-400 block">{option.description}</span>
                                                                {etd && <span className="text-xs text-[#843799] block mt-0.5">Estimasi: {etd} Hari</span>}
                                                            </div>
                                                            <div className="text-right">
                                                                {subtotal >= freeShippingMin ? (
                                                                    <div>
                                                                        <span className="text-xs text-gray-400 line-through block">Rp {cost.toLocaleString('id-ID')}</span>
                                                                        <span className="text-sm font-bold text-emerald-600">Gratis Ongkir!</span>
                                                                    </div>
                                                                ) : (
                                                                    <span className="font-bold text-sm text-gray-900">Rp {cost.toLocaleString('id-ID')}</span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                    <div className="sm:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Catatan (opsional)</label>
                                        <textarea value={data.notes} onChange={e => setData('notes', e.target.value)} rows={2} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-[#843799] focus:ring-2 focus:ring-purple-100 outline-none" placeholder="Catatan tambahan..." />
                                    </div>
                                </div>
                            </div>

                            {/* Promo Code */}
                            <div className="bg-white rounded-2xl border border-gray-100 p-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">Kode Promo</h2>
                                <div className="flex gap-3">
                                    <input type="text" value={data.promo_code} onChange={e => setData('promo_code', e.target.value.toUpperCase())} placeholder="Masukkan kode promo" className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-[#843799] focus:ring-2 focus:ring-purple-100 outline-none uppercase" />
                                    <button type="button" onClick={applyPromo} disabled={promoLoading} className="px-6 py-3 bg-[#FAE6FF] text-[#843799] rounded-xl font-semibold text-sm hover:bg-[#F4C6FF] transition-colors disabled:opacity-50">
                                        {promoLoading ? '...' : 'Terapkan'}
                                    </button>
                                </div>
                                {promoResult && (
                                    <p className={`text-sm mt-2 ${promoResult.valid ? 'text-emerald-600' : 'text-red-500'}`}>{promoResult.message}</p>
                                )}
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div>
                            <div className="bg-[#FAE6FF] rounded-2xl p-6 sticky top-24">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">Ringkasan Pesanan</h2>
                                <div className="space-y-3 mb-6">
                                    {cartItems.map(item => (
                                        <div key={item.id} className="flex justify-between text-sm">
                                            <span className="text-gray-600 truncate mr-2">{item.product?.name} x{item.quantity}</span>
                                            <span className="font-medium text-gray-900 flex-shrink-0">Rp {Number((item.product?.discount_price || item.product?.price || 0) * item.quantity).toLocaleString('id-ID')}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="border-t border-purple-200 pt-4 space-y-2">
                                    <div className="flex justify-between text-sm"><span className="text-gray-600">Subtotal</span><span className="font-medium">Rp {subtotal.toLocaleString('id-ID')}</span></div>
                                    {discount > 0 && <div className="flex justify-between text-sm"><span className="text-emerald-600">Diskon</span><span className="text-emerald-600 font-medium">-Rp {discount.toLocaleString('id-ID')}</span></div>}
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Ongkir</span>
                                        <span className="font-medium">
                                            {subtotal >= freeShippingMin ? (
                                                <span className="text-emerald-600 font-semibold">Gratis!</span>
                                            ) : (
                                                data.courier_service ? `Rp ${actualShipping.toLocaleString('id-ID')}` : '-'
                                            )}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-lg font-bold pt-2 border-t border-purple-200"><span>Total</span><span className="text-[#843799]">Rp {total.toLocaleString('id-ID')}</span></div>
                                </div>
                                <button type="submit" disabled={processing} className="w-full mt-6 bg-[#843799] text-white py-3.5 rounded-xl font-semibold hover:bg-[#60396A] transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                                    {processing ? 'Memproses...' : 'Bayar Sekarang'}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </ShopLayout>
    );
}
