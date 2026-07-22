import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function AdminLayout({ children, header }) {
    const { auth } = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navLinks = [
        { name: 'Dashboard', href: route('admin.dashboard'), icon: '📊', active: route().current('admin.dashboard') },
        { name: 'Produk', href: route('admin.products.index'), icon: '🍪', active: route().current('admin.products.*') },
        { name: 'Kategori', href: route('admin.categories.index'), icon: '📁', active: route().current('admin.categories.*') },
        { name: 'Pesanan', href: route('admin.orders.index'), icon: '📦', active: route().current('admin.orders.*') },
        { name: 'Promo & Diskon', href: route('admin.promos.index'), icon: '🏷️', active: route().current('admin.promos.*') },
        { name: 'Banner Beranda', href: route('admin.banners.index'), icon: '🖼️', active: route().current('admin.banners.*') },
        { name: 'Sertifikasi', href: route('admin.certificates.index'), icon: '📜', active: route().current('admin.certificates.*') },
        { name: 'Pesan Masuk', href: route('admin.messages.index'), icon: '📥', active: route().current('admin.messages.*') },
        { name: 'WhatsApp', href: route('admin.whatsapp.index'), icon: '💬', active: route().current('admin.whatsapp.*') },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar Desktop */}
            <aside className="hidden md:flex flex-col w-64 text-violet-950 flex-shrink-0" style={{ backgroundColor: '#F4C6FF' }}>
                <div className="h-16 flex items-center px-6 border-b" style={{ borderColor: 'rgba(74, 21, 75, 0.12)' }}>
                    <Link href="/" className="flex items-center gap-2">
                        <img src="/images/raia-logo.webp" alt="RaiaFood Logo" className="h-8 w-auto object-contain" />
                        <span className="text-xs text-white px-2 py-0.5 rounded font-semibold border" style={{ backgroundColor: '#843799', borderColor: '#843799' }}>Admin</span>
                    </Link>
                </div>
                <div className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all`}
                            style={{
                                backgroundColor: link.active ? '#ffffff' : 'transparent',
                                color: link.active ? '#843799' : '#3B0D4A',
                                boxShadow: link.active ? '0 4px 12px rgba(132, 55, 153, 0.12)' : 'none'
                            }}
                            onMouseEnter={e => {
                                if (!link.active) {
                                    e.currentTarget.style.backgroundColor = 'rgba(74, 21, 75, 0.08)';
                                }
                            }}
                            onMouseLeave={e => {
                                if (!link.active) {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                }
                            }}
                        >
                            <span className="text-lg">{link.icon}</span>
                            <span>{link.name}</span>
                        </Link>
                    ))}
                </div>
                <div className="p-4 border-t flex items-center justify-between" style={{ borderColor: 'rgba(74, 21, 75, 0.12)' }}>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold uppercase" style={{ backgroundColor: '#843799' }}>
                            {auth.user.name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                            <p className="text-sm font-bold truncate max-w-[120px]" style={{ color: '#3B0D4A' }}>{auth.user.name}</p>
                            <p className="text-xs truncate max-w-[120px]" style={{ color: '#6B2D80' }}>Admin</p>
                        </div>
                    </div>
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="transition-colors"
                        style={{ color: '#3B0D4A' }}
                        title="Logout"
                    >
                        🚪
                    </Link>
                </div>
            </aside>

            {/* Main Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Header / Topnav */}
                <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 z-10">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-50"
                        >
                            ☰
                        </button>
                        {header && <div className="text-lg font-semibold text-gray-800">{header}</div>}
                    </div>
                    <div className="flex items-center gap-4">
                        <Link
                            href="/"
                            className="text-sm font-medium text-violet-600 hover:text-violet-700 hover:underline"
                        >
                            Lihat Toko ↗
                        </Link>
                    </div>
                </header>

                {/* Sidebar Mobile Drawer */}
                {sidebarOpen && (
                    <div className="fixed inset-0 z-40 md:hidden flex">
                        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
                        <div className="relative flex-1 flex flex-col max-w-xs w-full text-violet-950" style={{ backgroundColor: '#F4C6FF' }}>
                            <div className="h-16 flex items-center justify-between px-6 border-b" style={{ borderColor: 'rgba(74, 21, 75, 0.12)' }}>
                                <span className="flex items-center gap-2">
                                    <img src="/images/raia-logo.webp" alt="RaiaFood Logo" className="h-8 w-auto object-contain" />
                                </span>
                                <button onClick={() => setSidebarOpen(false)} style={{ color: '#3B0D4A' }} className="text-xl">
                                    ✕
                                </button>
                            </div>
                            <div className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setSidebarOpen(false)}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all`}
                                        style={{
                                            backgroundColor: link.active ? '#ffffff' : 'transparent',
                                            color: link.active ? '#843799' : '#3B0D4A',
                                        }}
                                    >
                                        <span className="text-lg">{link.icon}</span>
                                        <span>{link.name}</span>
                                    </Link>
                                ))}
                            </div>
                            <div className="p-4 border-t flex items-center justify-between" style={{ borderColor: 'rgba(74, 21, 75, 0.12)' }}>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold uppercase" style={{ backgroundColor: '#843799' }}>
                                        {auth.user.name.charAt(0)}
                                    </div>
                                    <p className="text-sm font-bold truncate max-w-[120px] text-violet-950">{auth.user.name}</p>
                                </div>
                                <Link href={route('logout')} method="post" as="button" style={{ color: '#3B0D4A' }} className="font-bold text-sm">
                                    Logout
                                </Link>
                            </div>
                        </div>
                    </div>
                )}

                {/* Content */}
                <main className="flex-1 overflow-y-auto p-6 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
