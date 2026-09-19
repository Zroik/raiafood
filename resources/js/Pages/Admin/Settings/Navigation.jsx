import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import {
    Compass,
    Plus,
    Trash2,
    ArrowUp,
    ArrowDown,
    Save,
    Link as LinkIcon,
    Layers,
    Copyright,
    ExternalLink,
    AlertCircle,
    CheckCircle2
} from 'lucide-react';

export default function Navigation({ settings }) {
    // Initial data parsing
    const parsedNavbar = () => {
        try {
            if (settings.navbar_menu) {
                const parsed = typeof settings.navbar_menu === 'string' ? JSON.parse(settings.navbar_menu) : settings.navbar_menu;
                if (Array.isArray(parsed) && parsed.length > 0) return parsed;
            }
        } catch (e) {}
        return [
            { id: '1', name: 'Beranda', href: '/' },
            { id: '2', name: 'Produk', href: '/products' },
            { id: '3', name: 'Tentang Kami', href: '/tentang-kami' },
            { id: '4', name: 'Hubungi Kami', href: '/hubungi-kami' },
        ];
    };

    const parsedFooter = () => {
        try {
            if (settings.footer_columns) {
                const parsed = typeof settings.footer_columns === 'string' ? JSON.parse(settings.footer_columns) : settings.footer_columns;
                if (Array.isArray(parsed) && parsed.length > 0) return parsed;
            }
        } catch (e) {}
        return [
            {
                id: 'col_1',
                title: 'Informasi',
                links: [
                    { id: '1', name: 'Home', href: '/' },
                    { id: '2', name: 'Produk', href: '/products' },
                    { id: '3', name: 'News', href: '/news' },
                    { id: '4', name: 'Tentang Kami', href: '/tentang-kami' },
                    { id: '5', name: 'FAQ', href: '/faq' },
                ]
            },
            {
                id: 'col_2',
                title: 'Layanan',
                links: [
                    { id: '6', name: 'Cara Pemesanan', href: '/faq' },
                    { id: '7', name: 'Pengiriman', href: '/faq' },
                    { id: '8', name: 'Sertifikasi', href: '/tentang-kami' },
                    { id: '9', name: 'Hubungi Kami', href: '/hubungi-kami' },
                ]
            }
        ];
    };

    const [activeTab, setActiveTab] = useState('navbar');
    const [navbarLinks, setNavbarLinks] = useState(parsedNavbar);
    const [footerColumns, setFooterColumns] = useState(parsedFooter);
    const [footerCopyright, setFooterCopyright] = useState(settings.footer_copyright || '');
    const [saving, setSaving] = useState(false);
    const [savedNotice, setSavedNotice] = useState(false);

    // Temp state for adding new navbar link
    const [newNavLink, setNewNavLink] = useState({ name: '', href: '' });
    // Temp state for adding new footer column
    const [newColTitle, setNewColTitle] = useState('');
    // Temp state for adding link to specific footer col: { colId: '', name: '', href: '' }
    const [newFooterLink, setNewFooterLink] = useState({});

    // Navbar Handlers
    const addNavLink = () => {
        if (!newNavLink.name.trim() || !newNavLink.href.trim()) return;
        const updated = [
            ...navbarLinks,
            { id: Date.now().toString(), name: newNavLink.name.trim(), href: newNavLink.href.trim() }
        ];
        setNavbarLinks(updated);
        setNewNavLink({ name: '', href: '' });
    };

    const removeNavLink = (index) => {
        setNavbarLinks(navbarLinks.filter((_, i) => i !== index));
    };

    const moveNavLink = (index, direction) => {
        const newIndex = index + direction;
        if (newIndex < 0 || newIndex >= navbarLinks.length) return;
        const copy = [...navbarLinks];
        const [moved] = copy.splice(index, 1);
        copy.splice(newIndex, 0, moved);
        setNavbarLinks(copy);
    };

    const updateNavLink = (index, field, value) => {
        const copy = [...navbarLinks];
        copy[index] = { ...copy[index], [field]: value };
        setNavbarLinks(copy);
    };

    // Footer Column Handlers
    const addFooterColumn = () => {
        if (!newColTitle.trim()) return;
        const updated = [
            ...footerColumns,
            {
                id: 'col_' + Date.now().toString(),
                title: newColTitle.trim(),
                links: []
            }
        ];
        setFooterColumns(updated);
        setNewColTitle('');
    };

    const removeFooterColumn = (colId) => {
        setFooterColumns(footerColumns.filter(c => c.id !== colId));
    };

    const updateFooterColTitle = (colId, newTitle) => {
        setFooterColumns(footerColumns.map(c => c.id === colId ? { ...c, title: newTitle } : c));
    };

    const addFooterLink = (colId) => {
        const linkData = newFooterLink[colId];
        if (!linkData || !linkData.name?.trim() || !linkData.href?.trim()) return;

        setFooterColumns(footerColumns.map(col => {
            if (col.id === colId) {
                return {
                    ...col,
                    links: [
                        ...col.links,
                        { id: Date.now().toString(), name: linkData.name.trim(), href: linkData.href.trim() }
                    ]
                };
            }
            return col;
        }));

        setNewFooterLink(prev => ({ ...prev, [colId]: { name: '', href: '' } }));
    };

    const removeFooterLink = (colId, linkIndex) => {
        setFooterColumns(footerColumns.map(col => {
            if (col.id === colId) {
                return {
                    ...col,
                    links: col.links.filter((_, i) => i !== linkIndex)
                };
            }
            return col;
        }));
    };

    const moveFooterLink = (colId, linkIndex, direction) => {
        setFooterColumns(footerColumns.map(col => {
            if (col.id === colId) {
                const targetIdx = linkIndex + direction;
                if (targetIdx < 0 || targetIdx >= col.links.length) return col;
                const copy = [...col.links];
                const [moved] = copy.splice(linkIndex, 1);
                copy.splice(targetIdx, 0, moved);
                return { ...col, links: copy };
            }
            return col;
        }));
    };

    const updateFooterLink = (colId, linkIndex, field, value) => {
        setFooterColumns(footerColumns.map(col => {
            if (col.id === colId) {
                const copy = [...col.links];
                copy[linkIndex] = { ...copy[linkIndex], [field]: value };
                return { ...col, links: copy };
            }
            return col;
        }));
    };

    // Save All
    const handleSave = (e) => {
        e.preventDefault();
        setSaving(true);
        router.post(route('admin.settings.navigation.update'), {
            navbar_menu: JSON.stringify(navbarLinks),
            footer_columns: JSON.stringify(footerColumns),
            footer_copyright: footerCopyright,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setSaving(false);
                setSavedNotice(true);
                setTimeout(() => setSavedNotice(false), 4000);
            },
            onError: () => setSaving(false),
        });
    };

    return (
        <AdminLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Navigasi Header & Shortcut Footer</h2>}>
            <Head title="Navigasi & Menu - Admin" />

            <div className="max-w-5xl mx-auto space-y-6">
                {/* Header Card */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            <Compass className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
                            <span>Pengaturan Menu & Shortcut Navigasi</span>
                        </h1>
                        <p className="text-xs text-gray-500 mt-1">
                            Atur tautan menu navigasi header dan susunan kolom shortcut pada footer web toko secara dinamis.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleSave}
                        disabled={saving}
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs text-white shadow-sm transition-all duration-200 cursor-pointer disabled:opacity-50"
                        style={{ backgroundColor: 'var(--color-primary)' }}
                    >
                        {saving ? (
                            <span>Menyimpan...</span>
                        ) : (
                            <>
                                <Save className="w-4 h-4" />
                                <span>Simpan Semua Perubahan</span>
                            </>
                        )}
                    </button>
                </div>

                {savedNotice && (
                    <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl px-4 py-3 text-xs flex items-center gap-2 animate-fade-in">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span>Perubahan navigasi dan shortcut footer berhasil disimpan dan langsung aktif di web toko.</span>
                    </div>
                )}

                {/* Tab Navigation */}
                <div className="flex border-b border-gray-200 gap-2">
                    <button
                        type="button"
                        onClick={() => setActiveTab('navbar')}
                        className={`flex items-center gap-2 px-5 py-3 text-xs font-bold border-b-2 transition-all cursor-pointer ${
                            activeTab === 'navbar'
                                ? 'border-b-2 text-gray-900'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                        style={activeTab === 'navbar' ? { borderColor: 'var(--color-primary)', color: 'var(--color-primary)' } : {}}
                    >
                        <Compass className="w-4 h-4" />
                        <span>Menu Navigasi Header ({navbarLinks.length})</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => setActiveTab('footer')}
                        className={`flex items-center gap-2 px-5 py-3 text-xs font-bold border-b-2 transition-all cursor-pointer ${
                            activeTab === 'footer'
                                ? 'border-b-2 text-gray-900'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                        style={activeTab === 'footer' ? { borderColor: 'var(--color-primary)', color: 'var(--color-primary)' } : {}}
                    >
                        <Layers className="w-4 h-4" />
                        <span>Kolom Shortcut Footer ({footerColumns.length})</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => setActiveTab('copyright')}
                        className={`flex items-center gap-2 px-5 py-3 text-xs font-bold border-b-2 transition-all cursor-pointer ${
                            activeTab === 'copyright'
                                ? 'border-b-2 text-gray-900'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                        style={activeTab === 'copyright' ? { borderColor: 'var(--color-primary)', color: 'var(--color-primary)' } : {}}
                    >
                        <Copyright className="w-4 h-4" />
                        <span>Hak Cipta Footer</span>
                    </button>
                </div>

                {/* TAB 1: NAVBAR MENU MANAGER */}
                {activeTab === 'navbar' && (
                    <div className="space-y-6 animate-fade-in">
                        {/* List of existing links */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-bold text-gray-900">Daftar Menu Header Saat Ini</h3>
                                <span className="text-xs text-gray-400">Gunakan panah untuk mengubah urutan</span>
                            </div>

                            {navbarLinks.length === 0 ? (
                                <div className="text-center py-8 text-gray-400 text-xs">
                                    Belum ada menu navigasi. Tambahkan tautan di bawah.
                                </div>
                            ) : (
                                <div className="divide-y divide-gray-100">
                                    {navbarLinks.map((item, idx) => (
                                        <div key={item.id || idx} className="py-3 flex items-center gap-3">
                                            <span className="w-6 text-center text-xs font-bold text-gray-400">{idx + 1}.</span>
                                            
                                            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                <input
                                                    type="text"
                                                    value={item.name}
                                                    onChange={e => updateNavLink(idx, 'name', e.target.value)}
                                                    placeholder="Nama Menu (misal: Produk)"
                                                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-gray-900 font-medium focus:ring-1 focus:ring-purple-400 outline-none"
                                                />
                                                <div className="relative">
                                                    <input
                                                        type="text"
                                                        value={item.href}
                                                        onChange={e => updateNavLink(idx, 'href', e.target.value)}
                                                        placeholder="URL / Path (misal: /products)"
                                                        className="w-full pl-7 pr-3 py-2 rounded-xl border border-gray-200 text-xs text-gray-900 focus:ring-1 focus:ring-purple-400 outline-none font-mono"
                                                    />
                                                    <LinkIcon className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
                                                </div>
                                            </div>

                                            {/* Reorder & Delete buttons */}
                                            <div className="flex items-center gap-1">
                                                <button
                                                    type="button"
                                                    onClick={() => moveNavLink(idx, -1)}
                                                    disabled={idx === 0}
                                                    title="Pindah ke Atas"
                                                    className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-20 cursor-pointer"
                                                >
                                                    <ArrowUp className="w-4 h-4" />
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => moveNavLink(idx, 1)}
                                                    disabled={idx === navbarLinks.length - 1}
                                                    title="Pindah ke Bawah"
                                                    className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-20 cursor-pointer"
                                                >
                                                    <ArrowDown className="w-4 h-4" />
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => removeNavLink(idx)}
                                                    title="Hapus Menu Ini"
                                                    className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 cursor-pointer ml-1"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Add new link card */}
                        <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-6 shadow-xs">
                            <h4 className="text-xs font-bold text-gray-900 mb-3 flex items-center gap-2">
                                <Plus className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
                                <span>Tambah Menu Header Baru</span>
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                                <div>
                                    <label className="block text-[11px] font-semibold text-gray-600 mb-1">Label Menu</label>
                                    <input
                                        type="text"
                                        placeholder="Contoh: Promo Spesial"
                                        value={newNavLink.name}
                                        onChange={e => setNewNavLink({ ...newNavLink, name: e.target.value })}
                                        className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:ring-1 focus:ring-purple-400 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-semibold text-gray-600 mb-1">URL / Tujuan Link</label>
                                    <input
                                        type="text"
                                        placeholder="Contoh: /products?promo=1 atau https://..."
                                        value={newNavLink.href}
                                        onChange={e => setNewNavLink({ ...newNavLink, href: e.target.value })}
                                        className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs font-mono focus:ring-1 focus:ring-purple-400 outline-none"
                                    />
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={addNavLink}
                                disabled={!newNavLink.name.trim() || !newNavLink.href.trim()}
                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white transition-all duration-150 disabled:opacity-40 cursor-pointer"
                                style={{ backgroundColor: 'var(--color-primary)' }}
                            >
                                <Plus className="w-3.5 h-3.5" />
                                <span>Tambahkan ke Menu</span>
                            </button>
                        </div>
                    </div>
                )}

                {/* TAB 2: FOOTER COLUMNS MANAGER */}
                {activeTab === 'footer' && (
                    <div className="space-y-6 animate-fade-in">
                        {/* Columns Container */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {footerColumns.map((col, cIdx) => (
                                <div key={col.id} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs flex flex-col justify-between">
                                    <div>
                                        {/* Column Header */}
                                        <div className="flex items-center justify-between gap-3 pb-3 border-b border-gray-100 mb-4">
                                            <div className="flex-1">
                                                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                                                    Judul Kolom {cIdx + 1}
                                                </label>
                                                <input
                                                    type="text"
                                                    value={col.title}
                                                    onChange={e => updateFooterColTitle(col.id, e.target.value)}
                                                    className="w-full px-3 py-1.5 rounded-lg border border-gray-200 text-sm font-bold text-gray-900 focus:ring-1 focus:ring-purple-400 outline-none"
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removeFooterColumn(col.id)}
                                                title="Hapus Kolom Ini"
                                                className="p-2 rounded-lg text-rose-500 hover:bg-rose-50 cursor-pointer mt-4"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>

                                        {/* Links in this column */}
                                        <div className="space-y-2 mb-4">
                                            {col.links.length === 0 ? (
                                                <p className="text-center py-4 text-xs text-gray-400 italic">Belum ada tautan di kolom ini.</p>
                                            ) : (
                                                col.links.map((link, lIdx) => (
                                                    <div key={link.id || lIdx} className="flex items-center gap-2 bg-gray-50/70 p-2 rounded-xl border border-gray-100">
                                                        <div className="flex-1 grid grid-cols-2 gap-2">
                                                            <input
                                                                type="text"
                                                                value={link.name}
                                                                onChange={e => updateFooterLink(col.id, lIdx, 'name', e.target.value)}
                                                                placeholder="Label Link"
                                                                className="px-2.5 py-1.5 rounded-lg border border-gray-200 text-xs bg-white text-gray-900 font-medium outline-none"
                                                            />
                                                            <input
                                                                type="text"
                                                                value={link.href}
                                                                onChange={e => updateFooterLink(col.id, lIdx, 'href', e.target.value)}
                                                                placeholder="/url"
                                                                className="px-2.5 py-1.5 rounded-lg border border-gray-200 text-xs bg-white text-gray-700 font-mono outline-none"
                                                            />
                                                        </div>
                                                        <div className="flex items-center gap-0.5">
                                                            <button
                                                                type="button"
                                                                onClick={() => moveFooterLink(col.id, lIdx, -1)}
                                                                disabled={lIdx === 0}
                                                                className="p-1 text-gray-400 hover:text-gray-700 disabled:opacity-20 cursor-pointer"
                                                            >
                                                                <ArrowUp className="w-3.5 h-3.5" />
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => moveFooterLink(col.id, lIdx, 1)}
                                                                disabled={lIdx === col.links.length - 1}
                                                                className="p-1 text-gray-400 hover:text-gray-700 disabled:opacity-20 cursor-pointer"
                                                            >
                                                                <ArrowDown className="w-3.5 h-3.5" />
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => removeFooterLink(col.id, lIdx)}
                                                                className="p-1 text-rose-500 hover:bg-rose-50 rounded cursor-pointer"
                                                            >
                                                                <Trash2 className="w-3.5 h-3.5" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </div>

                                    {/* Add Link to this column */}
                                    <div className="pt-3 border-t border-gray-100 bg-gray-50/50 p-3 rounded-xl">
                                        <p className="text-[11px] font-semibold text-gray-700 mb-2">+ Tambah Link ke Kolom Ini</p>
                                        <div className="grid grid-cols-2 gap-2 mb-2">
                                            <input
                                                type="text"
                                                placeholder="Label (e.g. FAQ)"
                                                value={newFooterLink[col.id]?.name || ''}
                                                onChange={e => setNewFooterLink({
                                                    ...newFooterLink,
                                                    [col.id]: { ...(newFooterLink[col.id] || {}), name: e.target.value }
                                                })}
                                                className="px-2.5 py-1.5 rounded-lg border border-gray-200 text-xs bg-white outline-none"
                                            />
                                            <input
                                                type="text"
                                                placeholder="URL (e.g. /faq)"
                                                value={newFooterLink[col.id]?.href || ''}
                                                onChange={e => setNewFooterLink({
                                                    ...newFooterLink,
                                                    [col.id]: { ...(newFooterLink[col.id] || {}), href: e.target.value }
                                                })}
                                                className="px-2.5 py-1.5 rounded-lg border border-gray-200 text-xs bg-white font-mono outline-none"
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => addFooterLink(col.id)}
                                            disabled={!newFooterLink[col.id]?.name?.trim() || !newFooterLink[col.id]?.href?.trim()}
                                            className="w-full py-1.5 rounded-lg text-xs font-semibold text-white disabled:opacity-40 cursor-pointer"
                                            style={{ backgroundColor: 'var(--color-primary)' }}
                                        >
                                            Tambah Link
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Add Column Card */}
                        <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-5 shadow-xs flex flex-col sm:flex-row items-center gap-3">
                            <input
                                type="text"
                                placeholder="Nama Kolom Baru (Contoh: Bantuan, Legal, atau Marketplace)"
                                value={newColTitle}
                                onChange={e => setNewColTitle(e.target.value)}
                                className="w-full sm:flex-1 px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs outline-none"
                            />
                            <button
                                type="button"
                                onClick={addFooterColumn}
                                disabled={!newColTitle.trim()}
                                className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-semibold text-white whitespace-nowrap disabled:opacity-40 cursor-pointer"
                                style={{ backgroundColor: 'var(--color-primary)' }}
                            >
                                <Plus className="w-4 h-4 inline mr-1" />
                                Tambah Kolom Footer Baru
                            </button>
                        </div>
                    </div>
                )}

                {/* TAB 3: COPYRIGHT */}
                {activeTab === 'copyright' && (
                    <div className="space-y-6 animate-fade-in">
                        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs space-y-4">
                            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                                <Copyright className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
                                <span>Teks Hak Cipta (Footer Copyright Notice)</span>
                            </h3>

                            <p className="text-xs text-gray-500">
                                Masukkan teks hak cipta khusus jika Anda ingin menampilkan kalimat custom. Jika dikosongkan, sistem akan otomatis menggunakan format default: <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-800">© {new Date().getFullYear()} {settings.company_name || 'Raia Food'}. All rights reserved.</code>
                            </p>

                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">Teks Hak Cipta Kustom</label>
                                <input
                                    type="text"
                                    value={footerCopyright}
                                    onChange={e => setFooterCopyright(e.target.value)}
                                    placeholder={`© ${new Date().getFullYear()} ${settings.company_name || 'Raia Food'}. All rights reserved.`}
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 outline-none focus:ring-1 focus:ring-purple-400"
                                />
                            </div>

                            {/* Live Preview */}
                            <div className="mt-4 p-4 rounded-xl border border-gray-100 bg-gray-50">
                                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-2">Tampilan Live di Footer:</span>
                                <div style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-dark)' }} className="p-4 rounded-xl text-center">
                                    <p className="text-xs font-medium opacity-90 m-0">
                                        {footerCopyright.trim() ? footerCopyright : `© ${new Date().getFullYear()} ${settings.company_name || 'Raia Food'}. All rights reserved.`}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
