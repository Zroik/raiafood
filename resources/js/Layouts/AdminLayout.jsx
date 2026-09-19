import { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import {
    LayoutDashboard,
    ShoppingBag,
    Package,
    FolderTree,
    Receipt,
    Tag,
    Zap,
    Home,
    Image as ImageIcon,
    BookOpen,
    FileText,
    Sparkles,
    Award,
    PhoneCall,
    Inbox,
    MapPin,
    HelpCircle,
    MessageSquare,
    Newspaper,
    PenTool,
    Settings,
    Palette,
    Share2,
    Users,
    Compass,
    Truck,
    LogOut,
    Menu,
    X,
    ExternalLink,
    ChevronDown,
} from 'lucide-react';

export default function AdminLayout({ children, header }) {
    const { auth, site_settings } = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const logoSrc = site_settings?.site_logo || '/images/raia-logo.webp';
    const companyName = site_settings?.company_name || 'Raia Food';

    // Inject active theme CSS variables into document :root
    useEffect(() => {
        if (!site_settings) return;
        const root = document.documentElement;
        if (site_settings.primary_color) root.style.setProperty('--color-primary', site_settings.primary_color);
        if (site_settings.secondary_color) root.style.setProperty('--color-secondary', site_settings.secondary_color);
        if (site_settings.soft_color) root.style.setProperty('--color-soft', site_settings.soft_color);
        if (site_settings.dark_color) root.style.setProperty('--color-dark', site_settings.dark_color);
    }, [site_settings?.primary_color, site_settings?.secondary_color, site_settings?.soft_color, site_settings?.dark_color]);

    // State for open collapsible folders
    const [openFolders, setOpenFolders] = useState({
        catalog: route().current('admin.products.*') || route().current('admin.categories.*') || route().current('admin.orders.*') || route().current('admin.promos.*') || route().current('admin.flash-sales.*'),
        home: route().current('admin.banners.*'),
        about: route().current('admin.certificates.*') || route().current('admin.values.*') || route().current('admin.settings.pages'),
        contact: route().current('admin.messages.*') || route().current('admin.settings.contact'),
        faq: route().current('admin.faqs.*'),
        news: route().current('admin.news.*'),
        settings: route().current('admin.settings.general') || route().current('admin.settings.social') || route().current('admin.settings.navigation') || route().current('admin.settings.store') || route().current('admin.users.*') || route().current('admin.whatsapp.*'),
    });

    const toggleFolder = (key) => {
        setOpenFolders(prev => ({ ...prev, [key]: !prev[key] }));
    };

    // Navigation Structure with Lucide Vector Icons
    const navStructure = [
        {
            type: 'link',
            name: 'Dashboard',
            href: route('admin.dashboard'),
            icon: LayoutDashboard,
            active: route().current('admin.dashboard'),
        },
        {
            type: 'folder',
            id: 'catalog',
            name: 'Katalog & Penjualan',
            icon: ShoppingBag,
            active: route().current('admin.products.*') || route().current('admin.categories.*') || route().current('admin.orders.*') || route().current('admin.promos.*') || route().current('admin.flash-sales.*'),
            children: [
                { name: 'Produk', href: route('admin.products.index'), icon: Package, active: route().current('admin.products.*') },
                { name: 'Kategori', href: route('admin.categories.index'), icon: FolderTree, active: route().current('admin.categories.*') },
                { name: 'Pesanan', href: route('admin.orders.index'), icon: Receipt, active: route().current('admin.orders.*') },
                { name: 'Promo & Diskon', href: route('admin.promos.index'), icon: Tag, active: route().current('admin.promos.*') },
                { name: 'Flash Sale Batch', href: route('admin.flash-sales.index'), icon: Zap, active: route().current('admin.flash-sales.*') },
            ]
        },
        {
            type: 'folder',
            id: 'home',
            name: 'Halaman Beranda',
            icon: Home,
            active: route().current('admin.banners.*'),
            children: [
                { name: 'Banner Hero & Promo', href: route('admin.banners.index'), icon: ImageIcon, active: route().current('admin.banners.*') },
            ]
        },
        {
            type: 'folder',
            id: 'about',
            name: 'Halaman Tentang Kami',
            icon: BookOpen,
            active: route().current('admin.certificates.*') || route().current('admin.values.*') || route().current('admin.settings.pages'),
            children: [
                { name: 'Teks & Banner Halaman', href: route('admin.settings.pages'), icon: FileText, active: route().current('admin.settings.pages') },
                { name: 'Nilai-Nilai Kami', href: route('admin.values.index'), icon: Sparkles, active: route().current('admin.values.*') },
                { name: 'Sertifikasi & Penghargaan', href: route('admin.certificates.index'), icon: Award, active: route().current('admin.certificates.*') },
            ]
        },
        {
            type: 'folder',
            id: 'contact',
            name: 'Halaman Hubungi Kami',
            icon: PhoneCall,
            active: route().current('admin.messages.*') || route().current('admin.settings.contact'),
            children: [
                { name: 'Pesan Masuk (Inbox)', href: route('admin.messages.index'), icon: Inbox, active: route().current('admin.messages.*') },
                { name: 'Info Kontak & Maps', href: route('admin.settings.contact'), icon: MapPin, active: route().current('admin.settings.contact') },
            ]
        },
        {
            type: 'folder',
            id: 'faq',
            name: 'Halaman FAQ',
            icon: HelpCircle,
            active: route().current('admin.faqs.*'),
            children: [
                { name: 'Kelola Tanya Jawab', href: route('admin.faqs.index'), icon: MessageSquare, active: route().current('admin.faqs.*') },
            ]
        },
        {
            type: 'folder',
            id: 'news',
            name: 'Halaman News / Blog',
            icon: Newspaper,
            active: route().current('admin.news.*'),
            children: [
                { name: 'Daftar Artikel', href: route('admin.news.index'), icon: FileText, active: route().current('admin.news.index') || route().current('admin.news.edit') },
                { name: 'Tulis Artikel Baru', href: route('admin.news.create'), icon: PenTool, active: route().current('admin.news.create') },
            ]
        },
        {
            type: 'folder',
            id: 'settings',
            name: 'Pengaturan Toko',
            icon: Settings,
            active: route().current('admin.settings.general') || route().current('admin.settings.social') || route().current('admin.settings.navigation') || route().current('admin.settings.store') || route().current('admin.users.*') || route().current('admin.whatsapp.*'),
            children: [
                { name: 'Identitas, Logo & Tema', href: route('admin.settings.general'), icon: Palette, active: route().current('admin.settings.general') },
                { name: 'Navigasi & Menu Toko', href: route('admin.settings.navigation'), icon: Compass, active: route().current('admin.settings.navigation') },
                { name: 'Pengiriman & Pengumuman', href: route('admin.settings.store'), icon: Truck, active: route().current('admin.settings.store') },
                { name: 'Sosial Media & Marketplace', href: route('admin.settings.social'), icon: Share2, active: route().current('admin.settings.social') },
                { name: 'Hak Akses & Admin', href: route('admin.users.index'), icon: Users, active: route().current('admin.users.*') },
            ]
        },
    ];

    const renderNavContent = () => (
        <div className="flex-1 py-3 px-3 space-y-1 overflow-y-auto">
            {navStructure.map((item) => {
                const ItemIcon = item.icon;
                if (item.type === 'link') {
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`group flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                                item.active
                                    ? 'shadow-xs'
                                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                            }`}
                            style={{
                                backgroundColor: item.active ? 'var(--color-soft, #FAE6FF)' : undefined,
                                color: item.active ? 'var(--color-primary, #843799)' : undefined,
                            }}
                        >
                            <ItemIcon
                                className={`w-4 h-4 transition-transform group-hover:scale-110 flex-shrink-0 ${
                                    item.active ? '' : 'text-slate-400 group-hover:text-slate-700'
                                }`}
                                style={{ color: item.active ? 'var(--color-primary, #843799)' : undefined }}
                            />
                            <span className="flex-1 truncate">{item.name}</span>
                            {item.active && (
                                <span
                                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                                    style={{ backgroundColor: 'var(--color-primary, #843799)' }}
                                />
                            )}
                        </Link>
                    );
                }

                // Collapsible Folder
                const isOpen = openFolders[item.id];
                return (
                    <div key={item.id} className="space-y-0.5">
                        {/* Folder Header */}
                        <button
                            type="button"
                            onClick={() => toggleFolder(item.id)}
                            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                                item.active && !isOpen
                                    ? 'shadow-xs'
                                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                            }`}
                            style={{
                                backgroundColor: item.active && !isOpen ? 'var(--color-soft, #FAE6FF)' : undefined,
                                color: item.active && !isOpen ? 'var(--color-primary, #843799)' : undefined,
                            }}
                        >
                            <div className="flex items-center gap-3 min-w-0">
                                <ItemIcon
                                    className={`w-4 h-4 transition-transform flex-shrink-0 ${
                                        item.active ? '' : 'text-slate-400'
                                    }`}
                                    style={{ color: item.active ? 'var(--color-primary, #843799)' : undefined }}
                                />
                                <span className="truncate">{item.name}</span>
                            </div>
                            <ChevronDown
                                className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 flex-shrink-0 ${
                                    isOpen ? 'rotate-180 text-slate-700' : ''
                                }`}
                            />
                        </button>

                        {/* Folder Submenu Children */}
                        {isOpen && (
                            <div className="pl-3.5 pr-1 py-1 space-y-0.5 ml-4 border-l-2 border-slate-200">
                                {item.children.map((sub) => {
                                    const SubIcon = sub.icon;
                                    return (
                                        <Link
                                            key={sub.name}
                                            href={sub.href}
                                            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                                                sub.active
                                                    ? 'shadow-xs font-bold'
                                                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100/60'
                                            }`}
                                            style={{
                                                backgroundColor: sub.active ? 'var(--color-soft, #FAE6FF)' : undefined,
                                                color: sub.active ? 'var(--color-primary, #843799)' : undefined,
                                            }}
                                        >
                                            <SubIcon
                                                className="w-3.5 h-3.5 flex-shrink-0"
                                                style={{ color: sub.active ? 'var(--color-primary, #843799)' : undefined }}
                                            />
                                            <span className="truncate">{sub.name}</span>
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar Desktop */}
            <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200/80 shadow-xs flex-shrink-0">
                {/* Brand Header */}
                <div className="h-16 flex items-center justify-between px-5 border-b border-slate-100 bg-white">
                    <Link href="/admin" className="flex items-center gap-2.5 min-w-0">
                        <img src={logoSrc} alt={companyName} className="h-8 w-auto object-contain flex-shrink-0" />
                        <span
                            className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white shadow-xs tracking-wider uppercase"
                            style={{ backgroundColor: 'var(--color-primary, #843799)' }}
                        >
                            Admin
                        </span>
                    </Link>
                </div>

                {/* Quick Live Store Status Bar */}
                <div className="px-3 pt-3 pb-1">
                    <div className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-between">
                        <div className="flex items-center gap-2 min-w-0">
                            <span className="relative flex h-2 w-2 flex-shrink-0">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <span className="text-[11px] font-semibold text-slate-600 truncate">{companyName}</span>
                        </div>
                        <Link
                            href="/"
                            target="_blank"
                            className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors flex-shrink-0"
                            title="Buka Halaman Depan Toko"
                        >
                            <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                </div>

                {/* Navigation Items */}
                {renderNavContent()}

                {/* User Profile Footer */}
                <div className="p-3 border-t border-slate-100 bg-slate-50/70">
                    <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                        <div className="flex items-center gap-2.5 min-w-0">
                            <div
                                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold uppercase shadow-xs flex-shrink-0"
                                style={{ backgroundColor: 'var(--color-primary, #843799)' }}
                            >
                                {auth.user.name.charAt(0)}
                            </div>
                            <div className="min-w-0">
                                <p className="text-xs font-bold text-slate-800 truncate">{auth.user.name}</p>
                                <p className="text-[10px] font-medium text-slate-400 truncate">Administrator</p>
                            </div>
                        </div>
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors flex-shrink-0"
                            title="Keluar (Logout)"
                        >
                            <LogOut className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Mobile Sidebar Backdrop & Drawer */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-50 md:hidden flex animate-fade-in">
                    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs" onClick={() => setSidebarOpen(false)}></div>
                    <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white shadow-2xl">
                        <div className="flex items-center justify-between px-5 h-16 border-b border-slate-100">
                            <img src={logoSrc} alt={companyName} className="h-7 w-auto object-contain" />
                            <button
                                onClick={() => setSidebarOpen(false)}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                                aria-label="Tutup Menu"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        {renderNavContent()}
                        <div className="p-3 border-t border-slate-100 bg-slate-50/70">
                            <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-white border border-slate-200/80">
                                <div className="flex items-center gap-2 min-w-0">
                                    <div
                                        className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold uppercase"
                                        style={{ backgroundColor: 'var(--color-primary, #843799)' }}
                                    >
                                        {auth.user.name.charAt(0)}
                                    </div>
                                    <p className="text-xs font-bold text-slate-800 truncate">{auth.user.name}</p>
                                </div>
                                <Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    className="p-1.5 text-slate-400 hover:text-rose-600"
                                >
                                    <LogOut className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Header / Topnav */}
                <header className="h-16 bg-white border-b border-slate-200/80 flex items-center justify-between px-6 z-10 sticky top-0 shadow-xs">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
                            aria-label="Buka Menu"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                        {header && <div className="text-base font-bold text-slate-800 tracking-tight">{header}</div>}
                    </div>
                    <div className="flex items-center gap-3">
                        <Link
                            href="/"
                            target="_blank"
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border shadow-xs hover:opacity-90"
                            style={{
                                color: 'var(--color-primary, #843799)',
                                borderColor: 'var(--color-secondary, #F4C6FF)',
                                backgroundColor: 'var(--color-soft, #FAE6FF)',
                            }}
                        >
                            <span>Lihat Toko</span>
                            <ExternalLink className="w-3.5 h-3.5" />
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
