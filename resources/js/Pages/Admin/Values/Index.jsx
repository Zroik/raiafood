import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { 
    AVAILABLE_LUCIDE_ICONS, 
    AVAILABLE_HERO_ICONS,
    AVAILABLE_TABLER_ICONS,
    AVAILABLE_LOCAL_SVGS, 
    AVAILABLE_EMOJIS, 
    ValueIconRender 
} from '@/Components/ValueIcon';

export default function Index({ values = [] }) {
    const { flash } = usePage().props;
    const [editMode, setEditMode] = useState(false);
    const [selectedValue, setSelectedValue] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [iconSearch, setIconSearch] = useState('');

    const { data, setData, post, put, reset, processing, errors } = useForm({
        title: '',
        description: '',
        icon_type: 'lucide', // 'lucide', 'svg', 'emoji'
        icon_value: 'CheckCircle2',
        font_size: 'sm', // 'xs', 'sm', 'base', 'lg'
        sort_order: 0,
        is_active: true,
    });

    const openCreateModal = () => {
        reset();
        setData({
            title: '',
            description: '',
            icon_type: 'lucide',
            icon_value: 'CheckCircle2',
            font_size: 'sm',
            sort_order: values.length + 1,
            is_active: true,
        });
        setEditMode(false);
        setSelectedValue(null);
        setIconSearch('');
        setModalOpen(true);
    };

    const openEditModal = (item) => {
        setData({
            title: item.title || '',
            description: item.description || '',
            icon_type: item.icon_type || 'lucide',
            icon_value: item.icon_value || 'CheckCircle2',
            font_size: item.font_size || 'sm',
            sort_order: item.sort_order ?? 0,
            is_active: item.is_active ?? true,
        });
        setEditMode(true);
        setSelectedValue(item);
        setIconSearch('');
        setModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editMode && selectedValue) {
            put(route('admin.values.update', selectedValue.id), {
                onSuccess: () => {
                    setModalOpen(false);
                    reset();
                }
            });
        } else {
            post(route('admin.values.store'), {
                onSuccess: () => {
                    setModalOpen(false);
                    reset();
                }
            });
        }
    };

    const handleDelete = (id, title) => {
        if (confirm(`Apakah Anda yakin ingin menghapus nilai "${title}"?`)) {
            router.delete(route('admin.values.destroy', id), {
                preserveScroll: true,
            });
        }
    };

    // Filter Lucide icons by search
    const filteredLucide = AVAILABLE_LUCIDE_ICONS.filter(i => 
        i.name.toLowerCase().includes(iconSearch.toLowerCase()) || 
        i.label.toLowerCase().includes(iconSearch.toLowerCase())
    );

    // Font size descriptions
    const FONT_SIZES = [
        { id: 'xs', name: 'Extra Small (12px)', desc: 'Ukuran kompak, muat banyak teks' },
        { id: 'sm', name: 'Small (14px) - Rekomendasi', desc: 'Standar proporsional & nyaman dibaca' },
        { id: 'base', name: 'Medium (16px)', desc: 'Sedikit lebih besar dan jelas' },
        { id: 'lg', name: 'Large (18px)', desc: 'Sangat menonjol untuk teks ringkas' },
    ];

    return (
        <AdminLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Kelola Nilai-Nilai Kami</h2>}>
            <Head title="Kelola Nilai-Nilai Kami" />

            <div className="space-y-6">
                {/* Flash Messages */}
                {flash?.success && (
                    <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-5 py-3 rounded-xl text-sm font-medium flex items-center gap-2">
                        <span>✅</span> {flash.success}
                    </div>
                )}
                {flash?.error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-3 rounded-xl text-sm font-medium flex items-center gap-2">
                        <span>⚠️</span> {flash.error}
                    </div>
                )}

                {/* Header Actions */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">Daftar Kotak Nilai-Nilai Kami (Tentang Kami)</h3>
                        <p className="text-sm text-gray-500">Kelola item kartu nilai filosofi toko (icon di atas, judul & deskripsi di bawah). Tampilan otomatis bisa di-scroll horizontal jika melebihi 4 kotak.</p>
                    </div>
                    <button
                        onClick={openCreateModal}
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#843799] hover:bg-[#60396A] text-white rounded-xl text-xs font-semibold transition-all shadow-md"
                    >
                        ➕ Tambah Nilai Baru
                    </button>
                </div>

                {/* Live Preview Cards */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Live Preview Tampilan Di Halaman Toko ({values.length} Kotak):</h4>
                        <span className="text-xs text-purple-700 font-semibold">👉 Scroll ke samping jika lebih dari 4 kotak</span>
                    </div>

                    <div className="flex gap-4 overflow-x-auto pb-4 pt-1 snap-x scrollbar-thin">
                        {values.filter(v => v.is_active).map((item) => (
                            <div
                                key={item.id}
                                className="min-w-[260px] max-w-[280px] flex-shrink-0 bg-[#FAF0FC] rounded-3xl p-6 flex flex-col items-center text-center transition-all shadow-sm border border-purple-100 snap-start"
                            >
                                {/* Circle Icon Badge */}
                                <div className="w-12 h-12 rounded-full bg-[#843799] flex items-center justify-center text-white mb-4 shadow-md shadow-purple-200">
                                    <ValueIconRender type={item.icon_type} value={item.icon_value} className="w-6 h-6 text-white" />
                                </div>

                                {/* Title */}
                                <h4 className="font-bold text-gray-900 text-sm mb-2 leading-snug">
                                    {item.title}
                                </h4>

                                {/* Description with dynamic font size */}
                                <p className={`text-gray-600 font-medium leading-relaxed ${
                                    item.font_size === 'xs' ? 'text-xs' :
                                    item.font_size === 'sm' ? 'text-[13px]' :
                                    item.font_size === 'base' ? 'text-sm' : 'text-base'
                                }`}>
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Values Table */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                                    <th className="py-4 px-6 w-20">Urutan</th>
                                    <th className="py-4 px-6 w-24 text-center">Icon</th>
                                    <th className="py-4 px-6">Judul Nilai</th>
                                    <th className="py-4 px-6">Deskripsi</th>
                                    <th className="py-4 px-6 w-28">Font Size</th>
                                    <th className="py-4 px-6 w-28">Status</th>
                                    <th className="py-4 px-6 w-36 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-sm">
                                {values.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="py-12 text-center text-gray-400">
                                            Belum ada nilai yang ditambahkan.
                                        </td>
                                    </tr>
                                ) : (
                                    values.map((val) => (
                                        <tr key={val.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="py-4 px-6 font-semibold text-gray-700">{val.sort_order}</td>
                                            <td className="py-4 px-6 text-center">
                                                <div className="w-10 h-10 mx-auto rounded-full bg-[#843799] flex items-center justify-center text-white shadow-sm">
                                                    <ValueIconRender type={val.icon_type} value={val.icon_value} className="w-5 h-5 text-white" />
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 font-bold text-gray-900">{val.title}</td>
                                            <td className="py-4 px-6 text-gray-500 text-xs max-w-xs line-clamp-2">{val.description}</td>
                                            <td className="py-4 px-6 font-mono text-xs text-purple-700 font-bold uppercase">{val.font_size}</td>
                                            <td className="py-4 px-6">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${val.is_active ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                                                    {val.is_active ? 'Aktif' : 'Nonaktif'}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-right space-x-3">
                                                <button
                                                    onClick={() => openEditModal(val)}
                                                    className="text-violet-600 hover:text-violet-900 font-semibold"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(val.id, val.title)}
                                                    className="text-red-600 hover:text-red-900 font-semibold"
                                                >
                                                    Hapus
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Create/Edit Modal */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl max-w-xl w-full border border-gray-100 shadow-2xl overflow-hidden animate-fade-in my-8">
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                            <h3 className="text-lg font-bold text-gray-900">
                                {editMode ? 'Edit Nilai Kami' : 'Tambah Nilai Baru'}
                            </h3>
                            <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-lg">
                                ✕
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[82vh] overflow-y-auto">
                            {/* Title */}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Judul Nilai *</label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                    placeholder='Contoh: "R" - Reverence (Penghormatan)'
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none transition-all"
                                    required
                                />
                                {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Deskripsi Teks *</label>
                                <textarea
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    placeholder="Tuliskan penjelasan nilai filosofi..."
                                    rows="4"
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none transition-all resize-none"
                                    required
                                />
                                {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
                            </div>

                            {/* Icon Selection Section with Search & Tabs */}
                            <div className="bg-purple-50/50 rounded-2xl p-4 border border-purple-100 space-y-3">
                                <div className="flex items-center justify-between">
                                    <label className="text-xs font-bold uppercase tracking-wider text-gray-700">Pilih Icon Kartu (3 Icon Libraries + SVG Toko + Emoji)</label>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-gray-500">Preview:</span>
                                        <div className="w-8 h-8 rounded-full bg-[#843799] flex items-center justify-center text-white shadow-sm">
                                            <ValueIconRender type={data.icon_type} value={data.icon_value} className="w-4 h-4 text-white" />
                                        </div>
                                    </div>
                                </div>

                                {/* Icon Type Tab Selection (5 Tabs: Lucide, Heroicons, Tabler, SVG, Emoji) */}
                                <div className="grid grid-cols-5 gap-1.5 bg-gray-100 p-1 rounded-xl">
                                    <button
                                        type="button"
                                        onClick={() => { setData('icon_type', 'lucide'); setData('icon_value', 'CheckCircle2'); setIconSearch(''); }}
                                        className={`py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all ${data.icon_type === 'lucide' ? 'bg-white text-[#843799] shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                                    >
                                        ✨ Lucide
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => { setData('icon_type', 'heroicon'); setData('icon_value', 'CheckBadgeIcon'); setIconSearch(''); }}
                                        className={`py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all ${data.icon_type === 'heroicon' ? 'bg-white text-[#843799] shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                                    >
                                        🛡️ Heroicons
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => { setData('icon_type', 'tabler'); setData('icon_value', 'IconCircleCheck'); setIconSearch(''); }}
                                        className={`py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all ${data.icon_type === 'tabler' ? 'bg-white text-[#843799] shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                                    >
                                        📐 Tabler
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => { setData('icon_type', 'svg'); setData('icon_value', 'Bahan Pilihan Terbaik.svg'); }}
                                        className={`py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all ${data.icon_type === 'svg' ? 'bg-white text-[#843799] shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                                    >
                                        📁 SVG Toko
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => { setData('icon_type', 'emoji'); setData('icon_value', '✨'); }}
                                        className={`py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all ${data.icon_type === 'emoji' ? 'bg-white text-[#843799] shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                                    >
                                        😊 Emoji
                                    </button>
                                </div>

                                {/* Lucide Search & Grid */}
                                {data.icon_type === 'lucide' && (
                                    <div className="space-y-2">
                                        <input
                                            type="text"
                                            value={iconSearch}
                                            onChange={e => setIconSearch(e.target.value)}
                                            placeholder="🔍 Ketik cari icon Lucide (contoh: check, star, heart, leaf, cookie, chef)..."
                                            className="w-full px-3 py-1.5 rounded-xl border border-gray-200 text-xs focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none bg-white"
                                        />
                                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 h-44 overflow-y-auto p-1 bg-white rounded-xl border border-gray-200">
                                            {filteredLucide.map(item => (
                                                <button
                                                    key={item.name}
                                                    type="button"
                                                    onClick={() => setData('icon_value', item.name)}
                                                    className={`p-2 rounded-lg flex items-center gap-2 transition-all text-left ${data.icon_value === item.name ? 'bg-purple-100 border-2 border-[#843799] text-[#843799]' : 'hover:bg-gray-100 text-gray-600 border border-transparent'}`}
                                                    title={item.label}
                                                >
                                                    <div className="w-7 h-7 bg-[#843799] rounded-full flex items-center justify-center flex-shrink-0 text-white">
                                                        <ValueIconRender type="lucide" value={item.name} className="w-4 h-4 text-white" />
                                                    </div>
                                                    <span className="text-[11px] truncate font-medium">{item.name}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Heroicons Search & Grid */}
                                {data.icon_type === 'heroicon' && (
                                    <div className="space-y-2">
                                        <input
                                            type="text"
                                            value={iconSearch}
                                            onChange={e => setIconSearch(e.target.value)}
                                            placeholder="🔍 Ketik cari icon Heroicons (contoh: badge, star, shield, heart, shopping)..."
                                            className="w-full px-3 py-1.5 rounded-xl border border-gray-200 text-xs focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none bg-white"
                                        />
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 h-44 overflow-y-auto p-1 bg-white rounded-xl border border-gray-200">
                                            {AVAILABLE_HERO_ICONS.filter(i => i.name.toLowerCase().includes(iconSearch.toLowerCase()) || i.label.toLowerCase().includes(iconSearch.toLowerCase())).map(item => (
                                                <button
                                                    key={item.name}
                                                    type="button"
                                                    onClick={() => setData('icon_value', item.name)}
                                                    className={`p-2 rounded-lg flex items-center gap-2 transition-all text-left ${data.icon_value === item.name ? 'bg-purple-100 border-2 border-[#843799] text-[#843799]' : 'hover:bg-gray-100 text-gray-600 border border-transparent'}`}
                                                    title={item.label}
                                                >
                                                    <div className="w-7 h-7 bg-[#843799] rounded-full flex items-center justify-center flex-shrink-0 text-white">
                                                        <ValueIconRender type="heroicon" value={item.name} className="w-4 h-4 text-white" />
                                                    </div>
                                                    <span className="text-[11px] truncate font-medium">{item.label.split(' ')[0]}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Tabler Icons Search & Grid */}
                                {data.icon_type === 'tabler' && (
                                    <div className="space-y-2">
                                        <input
                                            type="text"
                                            value={iconSearch}
                                            onChange={e => setIconSearch(e.target.value)}
                                            placeholder="🔍 Ketik cari icon Tabler (contoh: check, leaf, heart, trophy, bulb)..."
                                            className="w-full px-3 py-1.5 rounded-xl border border-gray-200 text-xs focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none bg-white"
                                        />
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 h-44 overflow-y-auto p-1 bg-white rounded-xl border border-gray-200">
                                            {AVAILABLE_TABLER_ICONS.filter(i => i.name.toLowerCase().includes(iconSearch.toLowerCase()) || i.label.toLowerCase().includes(iconSearch.toLowerCase())).map(item => (
                                                <button
                                                    key={item.name}
                                                    type="button"
                                                    onClick={() => setData('icon_value', item.name)}
                                                    className={`p-2 rounded-lg flex items-center gap-2 transition-all text-left ${data.icon_value === item.name ? 'bg-purple-100 border-2 border-[#843799] text-[#843799]' : 'hover:bg-gray-100 text-gray-600 border border-transparent'}`}
                                                    title={item.label}
                                                >
                                                    <div className="w-7 h-7 bg-[#843799] rounded-full flex items-center justify-center flex-shrink-0 text-white">
                                                        <ValueIconRender type="tabler" value={item.name} className="w-4 h-4 text-white" />
                                                    </div>
                                                    <span className="text-[11px] truncate font-medium">{item.name.replace('Icon', '')}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Local SVG List */}
                                {data.icon_type === 'svg' && (
                                    <div className="space-y-2">
                                        <input
                                            type="text"
                                            value={iconSearch}
                                            onChange={e => setIconSearch(e.target.value)}
                                            placeholder="🔍 Ketik cari Aset SVG Toko (contoh: bahan, resep, kualitas, produk)..."
                                            className="w-full px-3 py-1.5 rounded-xl border border-gray-200 text-xs focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none bg-white"
                                        />
                                        <div className="grid grid-cols-2 gap-2 h-44 overflow-y-auto p-1 bg-white rounded-xl border border-gray-200">
                                            {AVAILABLE_LOCAL_SVGS.filter(i => i.label.toLowerCase().includes(iconSearch.toLowerCase()) || i.value.toLowerCase().includes(iconSearch.toLowerCase())).map(item => (
                                                <button
                                                    key={item.value}
                                                    type="button"
                                                    onClick={() => setData('icon_value', item.value)}
                                                    className={`p-2 rounded-lg flex items-center gap-2 transition-all text-left ${data.icon_value === item.value ? 'bg-purple-100 border-2 border-[#843799] text-[#843799]' : 'hover:bg-gray-100 text-gray-600 border border-transparent'}`}
                                                >
                                                    <div className="w-7 h-7 bg-[#843799] rounded-full p-1.5 flex items-center justify-center flex-shrink-0">
                                                        <ValueIconRender type="svg" value={item.value} className="w-4 h-4" />
                                                    </div>
                                                    <span className="text-[11px] font-medium truncate">{item.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Emoji List */}
                                {data.icon_type === 'emoji' && (
                                    <div className="space-y-2">
                                        <input
                                            type="text"
                                            value={iconSearch}
                                            onChange={e => setIconSearch(e.target.value)}
                                            placeholder="🔍 Ketik cari Emoji (contoh: cookie, apel, hati, bintang, piala, kado)..."
                                            className="w-full px-3 py-1.5 rounded-xl border border-gray-200 text-xs focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none bg-white"
                                        />
                                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 h-44 overflow-y-auto p-1 bg-white rounded-xl border border-gray-200">
                                            {AVAILABLE_EMOJIS.filter(i => i.label.toLowerCase().includes(iconSearch.toLowerCase()) || i.value.includes(iconSearch)).map(item => (
                                                <button
                                                    key={item.value}
                                                    type="button"
                                                    onClick={() => setData('icon_value', item.value)}
                                                    className={`p-2 rounded-lg flex items-center gap-2 transition-all text-left ${data.icon_value === item.value ? 'bg-purple-100 border-2 border-[#843799]' : 'hover:bg-gray-100 border border-transparent'}`}
                                                >
                                                    <span className="text-xl flex-shrink-0 leading-none">{item.value}</span>
                                                    <span className="text-[11px] text-gray-700 font-medium truncate">{item.label.split(' ')[1] || item.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Font Size Adjustment */}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Ukuran Font Deskripsi</label>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                    {FONT_SIZES.map(fs => (
                                        <button
                                            key={fs.id}
                                            type="button"
                                            onClick={() => setData('font_size', fs.id)}
                                            className={`p-2.5 rounded-xl border text-center transition-all ${data.font_size === fs.id ? 'bg-[#843799] text-white border-[#843799] shadow-sm font-bold' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 font-medium'}`}
                                        >
                                            <div className="text-xs">{fs.name.split(' ')[0]}</div>
                                            <div className="text-[10px] opacity-75">{fs.name.match(/\((.*?)\)/)?.[1] || ''}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Urutan Tampil</label>
                                    <input
                                        type="number"
                                        value={data.sort_order}
                                        onChange={e => setData('sort_order', parseInt(e.target.value) || 0)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none transition-all"
                                    />
                                    {errors.sort_order && <p className="text-xs text-red-500 mt-1">{errors.sort_order}</p>}
                                </div>
                                <div className="flex items-center gap-2 pt-6">
                                    <input
                                        type="checkbox"
                                        id="is_active"
                                        checked={data.is_active}
                                        onChange={e => setData('is_active', e.target.checked)}
                                        className="rounded border-gray-300 text-violet-600 focus:ring-violet-500"
                                    />
                                    <label htmlFor="is_active" className="text-sm font-semibold text-gray-700">Aktifkan Nilai Ini</label>
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={() => setModalOpen(false)}
                                    className="px-5 py-2.5 text-sm font-bold text-gray-500 hover:text-gray-700 transition-colors"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-6 py-2.5 bg-[#843799] hover:bg-[#60396A] text-white rounded-xl text-sm font-bold transition-all shadow-md disabled:opacity-50"
                                >
                                    {processing ? 'Menyimpan...' : 'Simpan Nilai'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
