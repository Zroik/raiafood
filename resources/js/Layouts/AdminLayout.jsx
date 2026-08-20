import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function AdminLayout({ children, header }) {
    const { auth } = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // State for open collapsible folders
    const [openFolders, setOpenFolders] = useState({
        catalog: route().current('admin.products.*') || route().current('admin.categories.*') || route().current('admin.orders.*') || route().current('admin.promos.*'),
        content: route().current('admin.banners.*') || route().current('admin.certificates.*') || route().current('admin.faqs.*') || route().current('admin.messages.*'),
        settings: route().current('admin.settings.*') || route().current('admin.users.*') || route().current('admin.whatsapp.*'),
    });

    const toggleFolder = (key) => {
        setOpenFolders(prev => ({ ...prev, [key]: !prev[key] }));
    };

    // Navigation Structure organized by Folders
    const navStructure = [
        {
            type: 'link',
            name: 'Dashboard',
            href: route('admin.dashboard'),
            icon: '📊',
            active: route().current('admin.dashboard'),
        },
        {
            type: 'folder',
            id: 'catalog',
            name: 'Katalog & Penjualan',
            icon: '🛍️',
            active: route().current('admin.products.*') || route().current('admin.categories.*') || route().current('admin.orders.*') || route().current('admin.promos.*'),
            children: [
                { name: 'Produk', href: route('admin.products.index'), icon: '🍪', active: route().current('admin.products.*') },
                { name: 'Kategori', href: route('admin.categories.index'), icon: '📁', active: route().current('admin.categories.*') },
                { name: 'Pesanan', href: route('admin.orders.index'), icon: '📦', active: route().current('admin.orders.*') },
                { name: 'Promo & Diskon', href: route('admin.promos.index'), icon: '🏷️', active: route().current('admin.promos.*') },
            ]
        },
        {
            type: 'folder',
            id: 'content',
            name: 'Konten & Halaman',
            icon: '📖',
            active: route().current('admin.banners.*') || route().current('admin.certificates.*') || route().current('admin.faqs.*') || route().current('admin.messages.*'),
            children: [
                { name: 'Banner Slider Hero', href: route('admin.banners.index'), icon: '🖼️', active: route().current('admin.banners.*') },
                { name: 'Sertifikasi', href: route('admin.certificates.index'), icon: '📜', active: route().current('admin.certificates.*') },
                { name: 'Kelola FAQ', href: route('admin.faqs.index'), icon: '❓', active: route().current('admin.faqs.*') },
                { name: 'Pesan Masuk', href: route('admin.messages.index'), icon: '📥', active: route().current('admin.messages.*') },
            ]
        },
        {
            type: 'folder',
            id: 'settings',
            name: 'Pengaturan Website',
            icon: '⚙️',
            active: route().current('admin.settings.*') || route().current('admin.users.*') || route().current('admin.whatsapp.*'),
            children: [
                { name: 'Identitas & Tampilan', href: route('admin.settings.general'), icon: '🏢', active: route().current('admin.settings.general') },
                { name: 'Banner & Teks Halaman', href: route('admin.settings.pages'), icon: '📑', active: route().current('admin.settings.pages') },
                { name: 'Kontak & Lokasi', href: route('admin.settings.contact'), icon: '📍', active: route().current('admin.settings.contact') },
                { name: 'Sosial Media', href: route('admin.settings.social'), icon: '🌐', active: route().current('admin.settings.social') },
                { name: 'Hak Akses & User', href: route('admin.users.index'), icon: '👥', active: route().current('admin.users.*') },
            ]
        },
    ];

    const renderNavContent = () => (
        <div className="flex-1 py-4 px-3 space-y-1.5 overflow-y-auto">
            {navStructure.map((item) => {
                if (item.type === 'link') {
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-bold transition-all`}
                            style={{
                                backgroundColor: item.active ? '#ffffff' : 'transparent',
                                color: item.active ? '#843799' : '#3B0D4A',
                                boxShadow: item.active ? '0 4px 12px rgba(132, 55, 153, 0.12)' : 'none'
                            }}
                            onMouseEnter={e => {
                                if (!item.active) e.currentTarget.style.backgroundColor = 'rgba(74, 21, 75, 0.08)';
                            }}
                            onMouseLeave={e => {
                                if (!item.active) e.currentTarget.style.backgroundColor = 'transparent';
                            }}
                        >
                            <span className="text-lg">{item.icon}</span>
                            <span>{item.name}</span>
                        </Link>
                    );
                }

                // Collapsible Folder
                const isOpen = openFolders[item.id];
                return (
                    <div key={item.id} className="space-y-1">
                        {/* Folder Header */}
                        <button
                            type="button"
                            onClick={() => toggleFolder(item.id)}
                            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-bold transition-all"
                            style={{
                                backgroundColor: item.active && !isOpen ? 'rgba(255, 255, 255, 0.5)' : 'transparent',
                                color: '#3B0D4A',
                            }}
                            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(74, 21, 75, 0.08)'}
                            onMouseLeave={e => {
                                e.currentTarget.style.backgroundColor = item.active && !isOpen ? 'rgba(255, 255, 255, 0.5)' : 'transparent';
                            }}
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-lg">{item.icon}</span>
                                <span>{item.name}</span>
                            </div>
                            <svg
                                className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {/* Folder Submenu Children */}
                        {isOpen && (
                            <div className="pl-6 pr-1 py-1 space-y-1 border-l-2 border-[#843799]/30 ml-4">
                                {item.children.map((sub) => (
                                    <Link
                                        key={sub.name}
                                        href={sub.href}
                                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all"
                                        style={{
                                            backgroundColor: sub.active ? '#ffffff' : 'transparent',
                                            color: sub.active ? '#843799' : '#4A154B',
                                            boxShadow: sub.active ? '0 2px 8px rgba(132, 55, 153, 0.1)' : 'none'
                                        }}
                                        onMouseEnter={e => {
                                            if (!sub.active) e.currentTarget.style.backgroundColor = 'rgba(74, 21, 75, 0.08)';
                                        }}
                                        onMouseLeave={e => {
                                            if (!sub.active) e.currentTarget.style.backgroundColor = 'transparent';
                                        }}
                                    >
                                        <span className="text-sm">{sub.icon}</span>
                                        <span>{sub.name}</span>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );

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

                {renderNavContent()}

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

            {/* Mobile Sidebar Backdrop & Drawer */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-50 md:hidden flex">
                    <div className="fixed inset-0 bg-black/40" onClick={() => setSidebarOpen(false)}></div>
                    <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4" style={{ backgroundColor: '#F4C6FF' }}>
                        <div className="flex items-center justify-between px-4 border-b pb-3" style={{ borderColor: 'rgba(74, 21, 75, 0.12)' }}>
                            <img src="/images/raia-logo.webp" alt="RaiaFood Logo" className="h-7 w-auto object-contain" />
                            <button onClick={() => setSidebarOpen(false)} className="text-[#3B0D4A] font-bold p-1">✕</button>
                        </div>
                        {renderNavContent()}
                    </div>
                </div>
            )}

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
                            className="text-sm font-medium text-[#843799] hover:underline flex items-center gap-1"
                        >
                            <span>Lihat Toko</span>
                            <span>↗</span>
                        </Link>
                    </div>
                </header>

                {/* Content */}
                <main className="flex-1 p-6 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
