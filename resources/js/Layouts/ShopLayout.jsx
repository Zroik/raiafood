import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import FloatingWhatsApp from '@/Components/FloatingWhatsApp';

const SZ = (px) => `clamp(${Math.round(px * 0.75)}px, ${(px / 1280 * 100 * 0.8).toFixed(3)}vw, ${Math.round(px * 1.5)}px)`;

// Dynamic SVG Social Icons inheriting theme primary color
function IconInstagram({ style, className }) {
    return (
        <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" style={style} className={className}>
            <circle cx="22" cy="22" r="22" fill="var(--color-primary, #843799)" />
            <path d="M16.4001 8.66663H27.6001C31.8667 8.66663 35.3334 12.1333 35.3334 16.4V27.6C35.3334 29.651 34.5187 31.618 33.0684 33.0683C31.6181 34.5185 29.6511 35.3333 27.6001 35.3333H16.4001C12.1334 35.3333 8.66675 31.8666 8.66675 27.6V16.4C8.66675 14.349 9.48151 12.3819 10.9318 10.9317C12.3821 9.48139 14.3491 8.66663 16.4001 8.66663ZM16.1334 11.3333C14.8604 11.3333 13.6395 11.839 12.7393 12.7392C11.8391 13.6394 11.3334 14.8603 11.3334 16.1333V27.8666C11.3334 30.52 13.4801 32.6666 16.1334 32.6666H27.8667C29.1398 32.6666 30.3607 32.1609 31.2609 31.2607C32.161 30.3606 32.6667 29.1397 32.6667 27.8666V16.1333C32.6667 13.48 30.5201 11.3333 27.8667 11.3333H16.1334ZM29.0001 13.3333C29.4421 13.3333 29.866 13.5089 30.1786 13.8214C30.4912 14.134 30.6667 14.5579 30.6667 15C30.6667 15.442 30.4912 15.8659 30.1786 16.1785C29.866 16.491 29.4421 16.6666 29.0001 16.6666C28.5581 16.6666 28.1341 16.491 27.8216 16.1785C27.509 15.8659 27.3334 15.442 27.3334 15C27.3334 14.5579 27.509 14.134 27.8216 13.8214C28.1341 13.5089 28.5581 13.3333 29.0001 13.3333ZM22.0001 15.3333C23.7682 15.3333 25.4639 16.0357 26.7141 17.2859C27.9644 18.5362 28.6667 20.2318 28.6667 22C28.6667 23.7681 27.9644 25.4638 26.7141 26.714C25.4639 27.9642 23.7682 28.6666 22.0001 28.6666C20.232 28.6666 18.5363 27.9642 17.286 26.714C16.0358 25.4638 15.3334 23.7681 15.3334 22C15.3334 20.2318 16.0358 18.5362 17.286 17.2859C18.5363 16.0357 20.232 15.3333 22.0001 15.3333ZM22.0001 18C20.9392 18 19.9218 18.4214 19.1717 19.1715C18.4215 19.9217 18.0001 20.9391 18.0001 22C18.0001 23.0608 18.4215 24.0782 19.1717 24.8284C19.9218 25.5785 20.9392 26 22.0001 26C23.0609 26 24.0784 25.5785 24.8285 24.8284C25.5787 24.0782 26.0001 23.0608 26.0001 22C26.0001 20.9391 25.5787 19.9217 24.8285 19.1715C24.0784 18.4214 23.0609 18 22.0001 18Z" fill="white" />
        </svg>
    );
}

function IconFacebook({ style, className }) {
    return (
        <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" style={style} className={className}>
            <circle cx="22" cy="22" r="22" fill="var(--color-primary, #843799)" />
            <path d="M23.6666 24H26.9999L28.3333 18.6666H23.6666V16C23.6666 14.6266 23.6666 13.3333 26.3333 13.3333H28.3333V8.85329C27.8986 8.79596 26.2573 8.66663 24.5239 8.66663C20.9039 8.66663 18.3333 10.876 18.3333 14.9333V18.6666H14.3333V24H18.3333V35.3333H23.6666V24Z" fill="white" />
        </svg>
    );
}

function IconTikTok({ style, className }) {
    return (
        <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" style={style} className={className}>
            <circle cx="22" cy="22" r="22" fill="var(--color-primary, #843799)" />
            <path d="M29.5917 12.9725C28.5381 11.7693 27.9573 10.2243 27.9575 8.625H23.1937V27.7417C23.1578 28.7764 22.7213 29.7567 21.9763 30.4758C21.2314 31.1949 20.2362 31.5965 19.2008 31.5958C17.0117 31.5958 15.1925 29.8075 15.1925 27.5875C15.1925 24.9358 17.7517 22.9471 20.3879 23.7642V18.8925C15.0692 18.1833 10.4133 22.315 10.4133 27.5875C10.4133 32.7212 14.6683 36.375 19.1854 36.375C24.0262 36.375 27.9575 32.4438 27.9575 27.5875V17.8904C29.8892 19.2777 32.2084 20.022 34.5867 20.0179V15.2542C34.5867 15.2542 31.6883 15.3929 29.5917 12.9725Z" fill="white" />
        </svg>
    );
}

function IconYouTube({ style, className }) {
    return (
        <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" style={style} className={className}>
            <circle cx="22" cy="22" r="22" fill="var(--color-primary, #843799)" />
            <path d="M31.2 16.8c-.3-1.1-1.2-2-2.3-2.3C26.9 14 22 14 22 14s-4.9 0-6.9.5c-1.1.3-2 1.2-2.3 2.3-.5 2-.5 6.2-.5 6.2s0 4.2.5 6.2c.3 1.1 1.2 2 2.3 2.3 2 .5 6.9.5 6.9.5s4.9 0 6.9-.5c1.1-.3 2-1.2 2.3-2.3.5-2 .5-6.2.5-6.2s0-4.2-.5-6.2zM20 26V18l7 4-7 4z" fill="white" />
        </svg>
    );
}

export default function ShopLayout({ children, logoScale = 100 }) {
    const { auth, whatsapp, site_settings } = usePage().props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const [searchOpen, setSearchOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const logoSrc = site_settings?.site_logo || '/images/raia-logo.webp';
    const companyName = site_settings?.company_name || 'Raia Food';

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

    useEffect(() => {
        if (!site_settings) return;
        const root = document.documentElement;
        if (site_settings.primary_color) root.style.setProperty('--color-primary', site_settings.primary_color);
        if (site_settings.secondary_color) root.style.setProperty('--color-secondary', site_settings.secondary_color);
        if (site_settings.soft_color) root.style.setProperty('--color-soft', site_settings.soft_color);
        if (site_settings.dark_color) root.style.setProperty('--color-dark', site_settings.dark_color);
    }, [site_settings?.primary_color, site_settings?.secondary_color, site_settings?.soft_color, site_settings?.dark_color]);

    // Top Announcement Bar dismissal state
    const [announcementDismissed, setAnnouncementDismissed] = useState(() => {
        if (typeof window !== 'undefined') {
            return sessionStorage.getItem('raia_announcement_dismissed') === '1';
        }
        return false;
    });

    const showAnnouncement = site_settings?.announcement_bar?.enabled && site_settings?.announcement_bar?.text && !announcementDismissed;

    const handleDismissAnnouncement = () => {
        setAnnouncementDismissed(true);
        if (typeof window !== 'undefined') {
            sessionStorage.setItem('raia_announcement_dismissed', '1');
        }
    };

    // Dynamic navbar links from CMS
    const rawNavLinks = site_settings?.navbar_menu || [
        { name: 'Beranda', href: '/' },
        { name: 'Produk', href: '/products' },
        { name: 'Tentang Kami', href: '/tentang-kami' },
        { name: 'Hubungi Kami', href: '/hubungi-kami' },
    ];

    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
    const navLinks = rawNavLinks.map(link => {
        const isExactMatch = link.href === '/' ? currentPath === '/' : currentPath === link.href;
        const isNestedMatch = link.href !== '/' && currentPath.startsWith(link.href);
        return {
            ...link,
            active: isExactMatch || isNestedMatch,
        };
    });

    return (
        <div className="min-h-screen bg-white">
            {/* Top Announcement Bar */}
            {showAnnouncement && (
                <div
                    style={{ backgroundColor: 'var(--color-primary, #843799)', color: '#ffffff' }}
                    className="relative z-50 text-xs py-2 px-4 sm:px-6 transition-all"
                >
                    <div className="w-full max-w-[92vw] xl:max-w-[88vw] 2xl:max-w-[1440px] mx-auto flex items-center justify-between gap-4">
                        <div className="w-6 hidden sm:block" />
                        <div className="flex-1 text-center font-medium">
                            {site_settings.announcement_bar.link ? (
                                <Link
                                    href={site_settings.announcement_bar.link}
                                    className="hover:underline inline-flex items-center gap-1.5"
                                >
                                    <span>{site_settings.announcement_bar.text}</span>
                                    <span className="text-[11px] opacity-80">&#x2192;</span>
                                </Link>
                            ) : (
                                <span>{site_settings.announcement_bar.text}</span>
                            )}
                        </div>
                        <button
                            type="button"
                            onClick={handleDismissAnnouncement}
                            title="Tutup pengumuman"
                            className="text-white/80 hover:text-white p-1 rounded transition-colors cursor-pointer"
                        >
                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}

            {/* Navbar */}
            <header className={`sticky top-0 z-40 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-white'}`}>
                <div className="w-full max-w-[92vw] xl:max-w-[88vw] 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 lg:h-20">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
                            <img
                                src={logoSrc}
                                alt={companyName}
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
                                    style={link.active ? { color: 'var(--color-primary, #843799)', borderBottomColor: 'var(--color-primary, #843799)' } : {}}
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
                                    <button className="w-9 h-9 rounded-full flex items-center justify-center transition-colors" style={{ backgroundColor: 'var(--color-soft, #FAE6FF)', color: 'var(--color-primary, #843799)' }}>
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
                                            <Link href="/admin" className="block px-4 py-2 text-sm hover:bg-[#FAE6FF]" style={{ color: 'var(--color-primary, #843799)' }}>
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
                                <Link href="/login" className="w-9 h-9 rounded-full flex items-center justify-center transition-colors" style={{ backgroundColor: 'var(--color-soft, #FAE6FF)', color: 'var(--color-primary, #843799)' }}>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </Link>
                            )}

                            {/* Wishlist */}
                            <Link
                                href="/wishlist"
                                className="w-9 h-9 rounded-full flex items-center justify-center transition-colors relative"
                                style={{ backgroundColor: 'var(--color-soft, #FAE6FF)', color: 'var(--color-primary, #843799)' }}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </Link>

                            {/* Cart */}
                            <Link
                                href="/cart"
                                className="w-9 h-9 rounded-full flex items-center justify-center transition-colors relative"
                                style={{ backgroundColor: 'var(--color-soft, #FAE6FF)', color: 'var(--color-primary, #843799)' }}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 w-5 h-5 text-white text-[10px] font-bold rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color-primary, #843799)' }}>
                                        {cartCount > 99 ? '99+' : cartCount}
                                    </span>
                                )}
                            </Link>

                            {/* Mobile Menu */}
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="lg:hidden w-9 h-9 rounded-full flex items-center justify-center"
                                style={{ backgroundColor: 'var(--color-soft, #FAE6FF)', color: 'var(--color-primary, #843799)' }}
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
                                    style={link.active ? { color: 'var(--color-primary, #843799)' } : {}}
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
            <footer style={{ backgroundColor: 'var(--color-secondary, #F4C6FF)', color: 'var(--color-dark, #60396A)' }} className="px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-[92vw] xl:max-w-[88vw] 2xl:max-w-[1440px] mx-auto pt-6 pb-3">
                    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr 0.8fr 1fr', gap: SZ(28) }} className="footer-grid">
                        {/* Brand info */}
                        <div>
                            <img
                                src={logoSrc}
                                alt={companyName}
                                style={{ width: SZ(120), height: 'auto', marginBottom: SZ(12), objectFit: 'contain' }}
                            />
                            <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: SZ(14), color: 'var(--color-dark, #60396A)', lineHeight: 1.4, marginBottom: SZ(12) }}>
                                {site_settings?.company_tagline || 'Menyajikan produk berkualitas tinggi untuk hidup yang lebih sehat.'}
                            </p>
                            <div style={{ display: 'flex', gap: SZ(10) }}>
                                {site_settings?.instagram_url && (
                                    <a href={site_settings.instagram_url} target="_blank" rel="noreferrer" style={{ display: 'inline-block', transition: 'transform 0.2s, opacity 0.2s' }}
                                        onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'scale(1.08)'; }}
                                        onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1)'; }}
                                    >
                                        <IconInstagram style={{ width: SZ(32), height: SZ(32), display: 'block' }} />
                                    </a>
                                )}
                                {site_settings?.facebook_url && (
                                    <a href={site_settings.facebook_url} target="_blank" rel="noreferrer" style={{ display: 'inline-block', transition: 'transform 0.2s, opacity 0.2s' }}
                                        onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'scale(1.08)'; }}
                                        onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1)'; }}
                                    >
                                        <IconFacebook style={{ width: SZ(32), height: SZ(32), display: 'block' }} />
                                    </a>
                                )}
                                {site_settings?.tiktok_url && (
                                    <a href={site_settings.tiktok_url} target="_blank" rel="noreferrer" style={{ display: 'inline-block', transition: 'transform 0.2s, opacity 0.2s' }}
                                        onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'scale(1.08)'; }}
                                        onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1)'; }}
                                    >
                                        <IconTikTok style={{ width: SZ(32), height: SZ(32), display: 'block' }} />
                                    </a>
                                )}
                                {site_settings?.youtube_url && (
                                    <a href={site_settings.youtube_url} target="_blank" rel="noreferrer" style={{ display: 'inline-block', transition: 'transform 0.2s, opacity 0.2s' }}
                                        onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'scale(1.08)'; }}
                                        onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1)'; }}
                                    >
                                        <IconYouTube style={{ width: SZ(32), height: SZ(32), display: 'block' }} />
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Dynamic Footer Shortcut Columns */}
                        {(site_settings?.footer_columns || [
                            {
                                id: 'col_1',
                                title: 'Informasi',
                                links: [
                                    { name: 'Home', href: '/' },
                                    { name: 'Produk', href: '/products' },
                                    { name: 'News', href: '/news' },
                                    { name: 'Tentang Kami', href: '/tentang-kami' },
                                    { name: 'FAQ', href: '/faq' },
                                ]
                            },
                            {
                                id: 'col_2',
                                title: 'Layanan',
                                links: [
                                    { name: 'Cara Pemesanan', href: '/faq' },
                                    { name: 'Pengiriman', href: '/faq' },
                                    { name: 'Sertifikasi', href: '/tentang-kami' },
                                    { name: 'Hubungi Kami', href: '/hubungi-kami' },
                                ]
                            }
                        ]).map((col) => (
                            <div key={col.id || col.title}>
                                <h4 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: SZ(18), color: 'var(--color-dark, #60396A)', marginBottom: SZ(10) }}>
                                    {col.title}
                                </h4>
                                <ul style={{ display: 'flex', flexDirection: 'column', gap: SZ(6), padding: 0, margin: 0, listStyle: 'none' }}>
                                    {(col.links || []).map((link) => {
                                        const isExternal = link.href.startsWith('http://') || link.href.startsWith('https://');
                                        return (
                                            <li key={link.id || link.name}>
                                                {isExternal ? (
                                                    <a
                                                        href={link.href}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: SZ(14), color: 'var(--color-dark, #60396A)', textDecoration: 'none', transition: 'opacity 0.2s' }}
                                                        onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
                                                        onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                                                    >
                                                        {link.name}
                                                    </a>
                                                ) : (
                                                    <Link
                                                        href={link.href}
                                                        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: SZ(14), color: 'var(--color-dark, #60396A)', textDecoration: 'none', transition: 'opacity 0.2s' }}
                                                        onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
                                                        onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                                                    >
                                                        {link.name}
                                                    </Link>
                                                )}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        ))}

                        {/* Contact */}
                        <div>
                            <h4 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: SZ(18), color: 'var(--color-dark, #60396A)', marginBottom: SZ(10) }}>Hubungi Kami</h4>
                            <ul style={{ display: 'flex', flexDirection: 'column', gap: SZ(8), padding: 0, margin: 0, listStyle: 'none' }}>
                                <li style={{ display: 'flex', alignItems: 'center', gap: SZ(8), fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: SZ(14), color: 'var(--color-dark, #60396A)' }}>
                                    <svg fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" style={{ width: SZ(15), height: SZ(15), flexShrink: 0 }}>
                                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                                    </svg>
                                    <a href={`https://wa.me/${site_settings?.whatsapp_number || '6281222777468'}`} target="_blank" rel="noreferrer" style={{ color: 'var(--color-dark, #60396A)', textDecoration: 'none' }}>
                                        {site_settings?.phone || '0812-2277-7468'}
                                    </a>
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: SZ(8), fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: SZ(14), color: 'var(--color-dark, #60396A)' }}>
                                    <svg fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" style={{ width: SZ(15), height: SZ(15), flexShrink: 0 }}>
                                        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <a href={`mailto:${site_settings?.email || 'raiafoodcentre@gmail.com'}`} style={{ color: 'var(--color-dark, #60396A)', textDecoration: 'underline' }}>
                                        {site_settings?.email || 'raiafoodcentre@gmail.com'}
                                    </a>
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: SZ(8), fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: SZ(14), color: 'var(--color-dark, #60396A)' }}>
                                    <svg fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" style={{ width: SZ(15), height: SZ(15), flexShrink: 0 }}>
                                        <circle cx="12" cy="12" r="10" />
                                        <path d="M12 6v6l4 2" />
                                    </svg>
                                    {site_settings?.operating_hours || '08.00 - 19.00 (Setiap Hari)'}
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: SZ(8), fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: SZ(14), color: 'var(--color-dark, #60396A)' }}>
                                    <svg fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" style={{ width: SZ(15), height: SZ(15), flexShrink: 0 }}>
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                                        <circle cx="12" cy="10" r="3" />
                                    </svg>
                                    {site_settings?.address || 'Kota Batu, Jawa Timur'}
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div style={{ borderTop: '1px solid rgba(0, 0, 0, 0.1)', marginTop: SZ(20), paddingTop: SZ(12), textAlign: 'center' }}>
                        <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: SZ(13), color: 'var(--color-dark, #60396A)', opacity: 0.85, margin: 0 }}>
                            {site_settings?.footer_copyright?.trim() 
                                ? site_settings.footer_copyright 
                                : `© ${new Date().getFullYear()} ${companyName}. All rights reserved.`}
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
