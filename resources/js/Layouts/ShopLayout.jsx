import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import FloatingWhatsApp from '@/Components/FloatingWhatsApp';

const SZ = (px) => `clamp(${Math.round(px * 0.75)}px, ${(px / 1280 * 100 * 0.8).toFixed(3)}vw, ${Math.round(px * 1.5)}px)`;

export default function ShopLayout({ children, logoScale = 100 }) {
    const { auth, whatsapp } = usePage().props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const [searchOpen, setSearchOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const updateCartCount = () => {
        fetch('/cart/count')
            .then(r => r.json())
            .then(data => setCartCount(data.count || 0))
            .catch(() => { });
    };

    useEffect(() => {
        updateCartCount();

        window.addEventListener('cart-updated', updateCartCount);
        return () => window.removeEventListener('cart-updated', updateCartCount);
    }, [auth?.user]);

    const navLinks = [
        { name: 'Beranda', href: '/', active: route().current('shop.home') },
        { name: 'Produk', href: '/products', active: route().current('shop.products') || route().current('shop.products.show') },
        { name: 'Tentang Kami', href: '/tentang-kami', active: route().current('shop.about') },
        { name: 'Hubungi Kami', href: '/hubungi-kami', active: route().current('shop.contact') },
        { name: 'FAQ', href: '/faq', active: route().current('shop.faq') },
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Announcement Bar */}
            <div style={{ backgroundColor: '#E4A0F7', color: '#843799' }} className="text-center py-2 px-4 text-sm font-medium">
                <span>&#x1F69A; Gratis ongkir untuk pembelian di atas Rp150.000</span>
            </div>

            {/* Navbar */}
            <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-white'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 lg:h-20">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
                            <img
                                src="/images/raia-logo.webp"
                                alt="RaiaFood Logo"
                                style={{ '--logo-scale': logoScale / 60 }}
                                className="w-auto object-contain h-[calc(40px*var(--logo-scale))] lg:h-[calc(48px*var(--logo-scale))]"
                            />
                        </Link>

                        {/* Desktop Nav */}
                        <nav className="hidden lg:flex items-center gap-8">
                            {navLinks.map(link => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    style={link.active ? { color: '#843799', borderBottomColor: '#843799' } : {}}
                                    className={`text-sm font-medium transition-colors ${link.active ? 'border-b-2 pb-1' : 'text-gray-700 hover:text-[#843799]'}`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </nav>

                        {/* Right Actions */}
                        <div className="flex items-center gap-3">
                            {/* User */}
                            {auth?.user ? (
                                <div className="relative group">
                                    <button className="w-9 h-9 rounded-full flex items-center justify-center transition-colors" style={{ backgroundColor: '#FAE6FF', color: '#843799' }}>
                                        {auth.user.avatar ? (
                                            <img src={auth.user.avatar.startsWith('http') ? auth.user.avatar : `/storage/${auth.user.avatar}`} alt="" className="w-9 h-9 rounded-full object-cover" />
                                        ) : (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        )}
                                    </button>
                                    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                        <div className="px-4 py-2 border-b border-gray-100">
                                            <p className="text-sm font-semibold text-gray-900 truncate">{auth.user.name}</p>
                                            <p className="text-xs text-gray-500 truncate">{auth.user.email}</p>
                                        </div>
                                        {auth.user.role === 'admin' && (
                                            <Link href="/admin" className="block px-4 py-2 text-sm hover:bg-[#FAE6FF]" style={{ color: '#843799' }}>
                                                Admin Panel
                                            </Link>
                                        )}
                                        <Link href="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                            Pesanan Saya
                                        </Link>
                                        <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                            Profil
                                        </Link>
                                        <Link href="/logout" method="post" as="button" className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                                            Keluar
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <Link href="/login" className="w-9 h-9 rounded-full flex items-center justify-center transition-colors" style={{ backgroundColor: '#FAE6FF', color: '#843799' }}>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </Link>
                            )}

                            {/* Wishlist */}
                            <Link
                                href="/wishlist"
                                className="w-9 h-9 rounded-full flex items-center justify-center transition-colors relative"
                                style={{ backgroundColor: '#FAE6FF', color: '#843799' }}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </Link>

                            {/* Cart */}
                            <Link
                                href="/cart"
                                className="w-9 h-9 rounded-full flex items-center justify-center transition-colors relative"
                                style={{ backgroundColor: '#FAE6FF', color: '#843799' }}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 w-5 h-5 text-white text-[10px] font-bold rounded-full flex items-center justify-center" style={{ backgroundColor: '#843799' }}>
                                        {cartCount > 99 ? '99+' : cartCount}
                                    </span>
                                )}
                            </Link>

                            {/* Mobile Menu */}
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="lg:hidden w-9 h-9 rounded-full flex items-center justify-center"
                                style={{ backgroundColor: '#FAE6FF', color: '#843799' }}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    {mobileMenuOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    {mobileMenuOpen && (
                        <div className="lg:hidden border-t border-gray-100 py-4 animate-fade-in">
                            {navLinks.map(link => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`block py-3 text-sm font-medium ${link.active ? '' : 'text-gray-700'}`}
                                    style={link.active ? { color: '#843799' } : {}}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </header>

            {/* Main Content */}
            <main>{children}</main>

            {/* Footer */}
            <footer style={{ backgroundColor: '#E4A0F7', color: '#60396A', paddingLeft: SZ(40), paddingRight: SZ(40) }}>
                <div className="max-w-7xl mx-auto pt-10 pb-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {/* Brand */}
                        <div>
                            <div className="mb-4">
                                <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: SZ(40), color: '#60396A' }}>RAIA FOOD</span>
                            </div>
                            <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: SZ(16), color: '#60396A', lineHeight: 1.5, marginBottom: SZ(20) }}>
                                Menyajikan produk berkualitas tinggi untuk hidup yang lebih sehat.
                            </p>
                            <div style={{ display: 'flex', gap: SZ(12) }}>
                                <a href="https://www.instagram.com/luxuryraiafood/" target="_blank" rel="noreferrer" style={{ display: 'inline-block', transition: 'opacity 0.2s' }}
                                    onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
                                    onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                                >
                                    <img src="/images/instagram.svg" alt="Instagram" style={{ width: SZ(44), height: SZ(44), display: 'block' }} />
                                </a>
                                <a href="https://facebook.com" target="_blank" rel="noreferrer" style={{ display: 'inline-block', transition: 'opacity 0.2s' }}
                                    onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
                                    onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                                >
                                    <img src="/images/facebook.svg" alt="Facebook" style={{ width: SZ(44), height: SZ(44), display: 'block' }} />
                                </a>
                                <a href="https://tiktok.com" target="_blank" rel="noreferrer" style={{ display: 'inline-block', transition: 'opacity 0.2s' }}
                                    onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
                                    onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                                >
                                    <img src="/images/tiktok.svg" alt="Tiktok" style={{ width: SZ(44), height: SZ(44), display: 'block' }} />
                                </a>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: SZ(24), color: '#60396A', marginBottom: SZ(16) }}>Informasi</h4>
                            <ul style={{ display: 'flex', flexDirection: 'column', gap: SZ(12), padding: 0, margin: 0, listStyle: 'none' }}>
                                {[
                                    { name: 'Home', href: '/' },
                                    { name: 'Produk', href: '/products' },
                                    { name: 'Tentang Kami', href: '/tentang-kami' },
                                    { name: 'FAQ', href: '/faq' }
                                ].map(link => (
                                    <li key={link.name}>
                                        <Link href={link.href} style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: SZ(16), color: '#60396A', textDecoration: 'none', transition: 'opacity 0.2s' }}
                                            onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
                                            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Layanan */}
                        <div>
                            <h4 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: SZ(24), color: '#60396A', marginBottom: SZ(16) }}>Layanan</h4>
                            <ul style={{ display: 'flex', flexDirection: 'column', gap: SZ(12), padding: 0, margin: 0, listStyle: 'none' }}>
                                {[
                                    { name: 'Cara Pemesanan', href: '/faq' },
                                    { name: 'Pengiriman', href: '/faq' },
                                    { name: 'Sertifikasi', href: '/tentang-kami' },
                                    { name: 'Hubungi Kami', href: '/hubungi-kami' }
                                ].map(link => (
                                    <li key={link.name}>
                                        <Link href={link.href} style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: SZ(16), color: '#60396A', textDecoration: 'none', transition: 'opacity 0.2s' }}
                                            onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
                                            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <h4 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: SZ(24), color: '#60396A', marginBottom: SZ(16) }}>Hubungi Kami</h4>
                            <ul style={{ display: 'flex', flexDirection: 'column', gap: SZ(12), padding: 0, margin: 0, listStyle: 'none' }}>
                                <li style={{ display: 'flex', alignItems: 'center', gap: SZ(10), fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: SZ(16), color: '#60396A' }}>
                                    <svg fill="none" stroke="#60396A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" style={{ width: SZ(18), height: SZ(18), flexShrink: 0 }}>
                                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                                    </svg>
                                    <a href="https://wa.me/6281222777468" target="_blank" rel="noreferrer" style={{ color: '#60396A', textDecoration: 'none' }}>0812-2277-7468</a>
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: SZ(10), fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: SZ(16), color: '#60396A' }}>
                                    <svg fill="none" stroke="#60396A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" style={{ width: SZ(18), height: SZ(18), flexShrink: 0 }}>
                                        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <a href="mailto:raiafoodcentre@gmail.com" style={{ color: '#60396A', textDecoration: 'underline' }}>raiafoodcentre@gmail.com</a>
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: SZ(10), fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: SZ(16), color: '#60396A' }}>
                                    <svg fill="none" stroke="#60396A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" style={{ width: SZ(18), height: SZ(18), flexShrink: 0 }}>
                                        <circle cx="12" cy="12" r="10" />
                                        <path d="M12 6v6l4 2" />
                                    </svg>
                                    08.00 - 19.00 (Setiap Hari)
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: SZ(10), fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: SZ(16), color: '#60396A' }}>
                                    <svg fill="none" stroke="#60396A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" style={{ width: SZ(18), height: SZ(18), flexShrink: 0 }}>
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                                        <circle cx="12" cy="10" r="3" />
                                    </svg>
                                    Kota Batu, Jawa Timur
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div style={{ borderTop: '1px solid rgba(96, 57, 106, 0.15)', marginTop: SZ(48), paddingTop: SZ(32), textAlign: 'center' }}>
                        <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: SZ(14), color: 'rgba(96, 57, 106, 0.8)', margin: 0 }}>
                            © 2026 RaiaFood. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>

            {/* Floating WhatsApp Button */}
            <FloatingWhatsApp
                number={whatsapp?.number}
                message={whatsapp?.message}
                enabled={whatsapp?.enabled}
            />
        </div>
    );
}
