import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm, router, usePage } from '@inertiajs/react';
import { useState, useRef, useEffect } from 'react';

export default function Index({ banners, currentType = 'all' }) {
    const { flash } = usePage().props;
    const [editMode, setEditMode] = useState(false);
    const [selectedBanner, setSelectedBanner] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [filterType, setFilterType] = useState(currentType || 'all');
    const fileInputRef = useRef(null);
    const previewContainerRef = useRef(null);

    const [imagePreview, setImagePreview] = useState(null);
    const [isDragging, setIsDragging] = useState(false);

    const { data, setData, post, reset, processing, errors } = useForm({
        _method: 'POST',
        title: '',
        type: 'hero',
        description: '',
        image: null,
        link: '',
        countdown_enabled: false,
        countdown_end: '',
        countdown_pos_x: 50.0,
        countdown_pos_y: 50.0,
        countdown_scale: 1.0,
        sort_order: 0,
        is_active: true,
    });

    const handleFilterChange = (type) => {
        setFilterType(type);
        router.get(route('admin.banners.index'), { type }, { preserveState: true, replace: true });
    };

    const openCreateModal = (defaultType = 'hero') => {
        reset();
        const initialType = filterType !== 'all' ? filterType : defaultType;
        setData({
            _method: 'POST',
            title: '',
            type: initialType,
            description: '',
            image: null,
            link: '',
            countdown_enabled: false,
            countdown_end: '',
            countdown_pos_x: 50.0,
            countdown_pos_y: 50.0,
            countdown_scale: 1.0,
            sort_order: 0,
            is_active: true,
        });
        setImagePreview(null);
        setEditMode(false);
        setSelectedBanner(null);
        setModalOpen(true);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const openEditModal = (banner) => {
        let formattedDate = '';
        if (banner.countdown_end) {
            // Standardize into 'YYYY-MM-DDTHH:mm' directly to preserve exact input time
            formattedDate = String(banner.countdown_end).replace(' ', 'T').slice(0, 16);
        }

        setData({
            _method: 'PUT',
            title: banner.title || '',
            type: banner.type || 'hero',
            description: banner.description || '',
            image: null,
            link: banner.link || '',
            countdown_enabled: Boolean(banner.countdown_enabled),
            countdown_end: formattedDate,
            countdown_pos_x: banner.countdown_pos_x !== null ? Number(banner.countdown_pos_x) : 50.0,
            countdown_pos_y: banner.countdown_pos_y !== null ? Number(banner.countdown_pos_y) : 50.0,
            countdown_scale: banner.countdown_scale !== null ? Number(banner.countdown_scale) : 1.0,
            sort_order: banner.sort_order ?? 0,
            is_active: banner.is_active ?? true,
        });

        const currentImg = banner.image.startsWith('images/') || banner.image.startsWith('/') 
            ? `/${banner.image}` 
            : `/storage/${banner.image}`;
        setImagePreview(currentImg);

        setEditMode(true);
        setSelectedBanner(banner);
        setModalOpen(true);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('image', file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleMouseDown = (e) => {
        setIsDragging(true);
        updatePosition(e);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        updatePosition(e);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const updatePosition = (e) => {
        if (!previewContainerRef.current) return;
        const rect = previewContainerRef.current.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        const x = ((clientX - rect.left) / rect.width) * 100;
        const y = ((clientY - rect.top) / rect.height) * 100;

        const clampedX = Math.max(5, Math.min(95, parseFloat(x.toFixed(1))));
        const clampedY = Math.max(5, Math.min(95, parseFloat(y.toFixed(1))));

        setData(prev => ({
            ...prev,
            countdown_pos_x: clampedX,
            countdown_pos_y: clampedY,
        }));
    };

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mouseup', handleMouseUp);
            window.addEventListener('touchend', handleMouseUp);
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('touchmove', handleMouseMove);
        }
        return () => {
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('touchend', handleMouseUp);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleMouseMove);
        };
    }, [isDragging]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editMode && selectedBanner) {
            post(route('admin.banners.update', selectedBanner.id), {
                onSuccess: () => {
                    setModalOpen(false);
                    reset();
                }
            });
        } else {
            post(route('admin.banners.store'), {
                onSuccess: () => {
                    setModalOpen(false);
                    reset();
                }
            });
        }
    };

    const handleDelete = (bannerId, bannerTitle) => {
        if (confirm(`Apakah Anda yakin ingin menghapus banner "${bannerTitle}"?`)) {
            router.delete(route('admin.banners.destroy', bannerId), {
                preserveScroll: true,
            });
        }
    };

    return (
        <AdminLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Kelola Banner Toko & Flash Sale</h2>}>
            <Head title="Kelola Banner & Flash Sale" />

            <div className="space-y-6">
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

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">Daftar Banner Beranda &amp; Promo</h3>
                        <p className="text-sm text-gray-500">Kelola banner slider utama dan banner promo Flash Sale dengan Countdown Timer interaktif.</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="flex bg-gray-100 p-1 rounded-xl">
                            <button
                                onClick={() => handleFilterChange('all')}
                                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${filterType === 'all' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                            >
                                Semua
                            </button>
                            <button
                                onClick={() => handleFilterChange('hero')}
                                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${filterType === 'hero' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                            >
                                🖼️ Slider Hero
                            </button>
                            <button
                                onClick={() => handleFilterChange('flash_sale')}
                                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${filterType === 'flash_sale' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                            >
                                ⚡ Flash Sale
                            </button>
                        </div>
                        <button
                            onClick={() => openCreateModal('hero')}
                            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#843799] hover:bg-[#60396A] text-white rounded-xl text-xs font-semibold transition-all shadow-md"
                        >
                            ➕ Tambah Banner
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                                    <th className="py-4 px-6 w-20">Urutan</th>
                                    <th className="py-4 px-6 w-32">Kategori</th>
                                    <th className="py-4 px-6 w-48">Gambar</th>
                                    <th className="py-4 px-6">Informasi Banner</th>
                                    <th className="py-4 px-6 w-40">Countdown Timer</th>
                                    <th className="py-4 px-6 w-28">Status</th>
                                    <th className="py-4 px-6 w-36 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-sm">
                                {banners.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="py-12 text-center text-gray-400">Belum ada banner yang ditambahkan.</td>
                                    </tr>
                                ) : (
                                    banners.map((banner) => (
                                        <tr key={banner.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="py-4 px-6 font-semibold text-gray-700">{banner.sort_order}</td>
                                            <td className="py-4 px-6">
                                                <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold ${banner.type === 'flash_sale' ? 'bg-amber-100 text-amber-800' : 'bg-purple-100 text-purple-800'}`}>
                                                    {banner.type === 'flash_sale' ? '⚡ Flash Sale' : '🖼️ Slider Hero'}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className={`rounded-lg overflow-hidden bg-gray-100 border border-gray-200 ${banner.type === 'flash_sale' ? 'w-48 aspect-[4/1]' : 'w-40 aspect-[190/63]'}`}>
                                                    <img
                                                        src={banner.image.startsWith('images/') || banner.image.startsWith('/') ? `/${banner.image}` : `/storage/${banner.image}`}
                                                        alt={banner.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="font-bold text-gray-900">{banner.title}</div>
                                                <div className="text-xs text-gray-400 mt-1 max-w-sm line-clamp-1">{banner.description || '-'}</div>
                                                <div className="text-[11px] text-purple-700 font-mono mt-1">{banner.link || '-'}</div>
                                            </td>
                                            <td className="py-4 px-6">
                                                {banner.type === 'flash_sale' ? (
                                                    banner.countdown_enabled ? (
                                                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                                            ⏳ Aktif ({banner.countdown_end ? String(banner.countdown_end).slice(0, 16).replace('T', ' ') : '-'})
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium text-gray-400 bg-gray-50 border border-gray-200">
                                                            Mati
                                                        </span>
                                                    )
                                                ) : (
                                                    <span className="text-xs text-gray-400">-</span>
                                                )}
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${banner.is_active ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                                                    {banner.is_active ? 'Aktif' : 'Nonaktif'}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-right space-x-3">
                                                <button onClick={() => openEditModal(banner)} className="text-violet-600 hover:text-violet-900 font-semibold">Edit</button>
                                                <button onClick={() => handleDelete(banner.id, banner.title)} className="text-red-600 hover:text-red-900 font-semibold">Hapus</button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {modalOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl max-w-2xl w-full border border-gray-100 shadow-2xl overflow-hidden animate-fade-in my-8">
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                            <h3 className="text-lg font-bold text-gray-900">
                                {editMode ? 'Edit Banner' : 'Tambah Banner Baru'}
                            </h3>
                            <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-lg">
                                ✕
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Tipe Banner</label>
                                    <select
                                        value={data.type}
                                        onChange={e => setData('type', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none transition-all"
                                    >
                                        <option value="hero">🖼️ Slider Beranda (Hero)</option>
                                        <option value="flash_sale">⚡ Banner Flash Sale (Rasio 4:1)</option>
                                    </select>
                                    {errors.type && <p className="text-xs text-red-500 mt-1">{errors.type}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Judul Banner</label>
                                    <input
                                        type="text"
                                        value={data.title}
                                        onChange={e => setData('title', e.target.value)}
                                        placeholder="Contoh: Flash Sale Akhir Bulan..."
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none transition-all"
                                        required
                                    />
                                    {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Deskripsi Banner (Opsional)</label>
                                <input
                                    type="text"
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    placeholder="Contoh: Dapatkan diskon hingga 50%..."
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none transition-all"
                                />
                                {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Unggah Gambar Banner</label>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    accept="image/*"
                                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 cursor-pointer"
                                />
                                <p className="text-[10px] text-gray-400 mt-1">
                                    {data.type === 'flash_sale' 
                                        ? 'Rekomendasi Flash Sale: 1920x480 px (Rasio 4:1).' 
                                        : 'Rekomendasi Hero Slider: 1920x630 px (Rasio ~3:1).'}
                                </p>
                                {errors.image && <p className="text-xs text-red-500 mt-1">{errors.image}</p>}
                            </div>
                            {data.type === 'flash_sale' && (
                                <div className="bg-amber-50/60 rounded-2xl border border-amber-200/80 p-5 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xl">⏳</span>
                                            <div>
                                                <h4 className="text-sm font-bold text-gray-900">Countdown Timer Flash Sale</h4>
                                                <p className="text-xs text-gray-500">Aktifkan jam hitung mundur dan atur posisinya.</p>
                                            </div>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={data.countdown_enabled}
                                                onChange={e => setData('countdown_enabled', e.target.checked)}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#843799]"></div>
                                        </label>
                                    </div>
                                    {data.countdown_enabled && (
                                        <div className="space-y-4 pt-2 border-t border-amber-200/60">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs font-bold text-gray-700 mb-1">Target Waktu Berakhir *</label>
                                                    <input
                                                        type="datetime-local"
                                                        value={data.countdown_end}
                                                        onChange={e => setData('countdown_end', e.target.value)}
                                                        className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none bg-white"
                                                        required={data.countdown_enabled}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-bold text-gray-700 mb-1">Ukuran Timer (Scale: {Number(data.countdown_scale).toFixed(1)}x)</label>
                                                    <input
                                                        type="range"
                                                        min="0.4"
                                                        max="2.0"
                                                        step="0.05"
                                                        value={data.countdown_scale}
                                                        onChange={e => setData('countdown_scale', parseFloat(e.target.value))}
                                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#843799]"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex items-center justify-between mb-2">
                                                    <label className="text-xs font-bold text-gray-700">🎯 Drag &amp; Drop Posisi Timer di Banner:</label>
                                                    <span className="text-[11px] text-gray-500 font-mono">Posisi: X={data.countdown_pos_x}% | Y={data.countdown_pos_y}%</span>
                                                </div>
                                                <div
                                                    ref={previewContainerRef}
                                                    onMouseDown={handleMouseDown}
                                                    onTouchStart={handleMouseDown}
                                                    style={{ containerType: 'inline-size' }}
                                                    className="relative w-full aspect-[4/1] bg-gray-800 rounded-xl overflow-hidden cursor-crosshair select-none border-2 border-dashed border-purple-400 shadow-inner group"
                                                >
                                                    {imagePreview ? (
                                                        <img src={imagePreview} alt="Preview Banner" className="w-full h-full object-cover pointer-events-none" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs bg-gray-900">Banner Flash Sale (Unggah gambar untuk preview)</div>
                                                    )}
                                                    <div
                                                        style={{
                                                            left: `${data.countdown_pos_x}%`,
                                                            top: `${data.countdown_pos_y}%`,
                                                            transform: `translate(-50%, -50%) scale(${data.countdown_scale})`,
                                                            transformOrigin: 'center center',
                                                        }}
                                                        className="absolute flex items-center gap-[0.4cqi] p-[0.6cqi] rounded-[1cqi] bg-gray-950/85 backdrop-blur-md border border-white/20 shadow-2xl transition-shadow cursor-grab active:cursor-grabbing hover:border-amber-400"
                                                    >
                                                        {[ { val: '02', label: 'Hari' }, { val: '14', label: 'Jam' }, { val: '45', label: 'Mnt' }, { val: '30', label: 'Dtk' } ].map((item, idx) => (
                                                            <div key={idx} className="flex items-center gap-[0.3cqi]">
                                                                <div className="flex flex-col items-center justify-center bg-[#843799] text-white px-[0.7cqi] py-[0.3cqi] rounded-[0.6cqi] min-w-[3.2cqi] shadow-sm">
                                                                    <span className="font-extrabold text-[1.4cqi] leading-tight font-mono tracking-tight">{item.val}</span>
                                                                    <span className="text-[0.65cqi] uppercase font-semibold tracking-tighter opacity-80">{item.label}</span>
                                                                </div>
                                                                {idx < 3 && <span className="text-white font-bold text-[1.2cqi]">:</span>}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                                <p className="text-[11px] text-gray-500 mt-1 italic">💡 Klik atau geser badge countdown di atas untuk memindahkan posisinya sesuai desain banner Anda.</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Link Navigasi (Opsional)</label>
                                    <input
                                        type="text"
                                        value={data.link}
                                        onChange={e => setData('link', e.target.value)}
                                        placeholder="Contoh: /products?flash_sale=1"
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none transition-all"
                                    />
                                    {errors.link && <p className="text-xs text-red-500 mt-1">{errors.link}</p>}
                                </div>
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
                            </div>
                            <div className="flex items-center gap-2 pt-2">
                                <input
                                    type="checkbox"
                                    id="is_active"
                                    checked={data.is_active}
                                    onChange={e => setData('is_active', e.target.checked)}
                                    className="rounded border-gray-300 text-violet-600 focus:ring-violet-500"
                                />
                                <label htmlFor="is_active" className="text-sm font-semibold text-gray-700">Tampilkan Banner (Aktif)</label>
                            </div>
                            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                                <button type="button" onClick={() => setModalOpen(false)} className="px-5 py-2.5 text-sm font-bold text-gray-500 hover:text-gray-700 transition-colors">Batal</button>
                                <button type="submit" disabled={processing} className="px-6 py-2.5 bg-[#843799] hover:bg-[#60396A] text-white rounded-xl text-sm font-bold transition-all shadow-md disabled:opacity-50">
                                    {processing ? 'Menyimpan...' : 'Simpan Banner'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
