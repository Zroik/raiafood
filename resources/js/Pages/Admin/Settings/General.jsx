import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, router, usePage } from '@inertiajs/react';
import { useState, useMemo, useEffect } from 'react';
import {
    Building2,
    Image as ImageIcon,
    Palette,
    RotateCcw,
    Eye,
    ShoppingCart,
    Package,
    Plus,
    Trash2,
    Pencil,
    X,
    CheckCircle2,
    AlertTriangle,
    Copy,
} from 'lucide-react';

export default function General({ settings }) {
    const { flash } = usePage().props;
    const { data, setData, post, processing, errors } = useForm({
        company_name: settings.company_name || 'Raia Food',
        company_tagline: settings.company_tagline || '',
        meta_description: settings.meta_description || '',
        primary_color: settings.primary_color || '#843799',
        secondary_color: settings.secondary_color || '#F4C6FF',
        soft_color: settings.soft_color || '#FAE6FF',
        dark_color: settings.dark_color || '#60396A',
        logo: null,
        favicon: null,
    });

    const [logoPreview, setLogoPreview] = useState(settings.site_logo ? `/storage/${settings.site_logo}` : '/images/raia-logo.webp');
    const [faviconPreview, setFaviconPreview] = useState(settings.site_favicon ? `/storage/${settings.site_favicon}` : '/images/raia-logo.webp');

    // Unified Modal State for Creating and Editing Theme Presets
    const [presetModal, setPresetModal] = useState({
        isOpen: false,
        mode: 'create', // 'create' | 'edit'
        id: null,
        name: '',
        badge: 'Kustom',
        primary: '#843799',
        secondary: '#F4C6FF',
        soft: '#FAE6FF',
        dark: '#60396A',
    });
    const [savingPreset, setSavingPreset] = useState(false);

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('logo', file);
            setLogoPreview(URL.createObjectURL(file));
        }
    };

    const handleFaviconChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('favicon', file);
            setFaviconPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.settings.general.update'), {
            forceFormData: true,
        });
    };

    const isValidHex = (hex) => /^#[0-9A-Fa-f]{6}$/.test(hex || '');
    const getPickerValue = (val, fallback) => (isValidHex(val) ? val : fallback);

    const handleHexChange = (field, value) => {
        let clean = value.trim();
        if (clean && !clean.startsWith('#')) {
            clean = '#' + clean;
        }
        setData(field, clean.toUpperCase());
    };

    const DEFAULT_PRESETS = [
        {
            id: 'default_raia',
            name: 'Ungu Khas Raia (Default)',
            badge: 'Official',
            primary: '#843799',
            secondary: '#F4C6FF',
            soft: '#FAE6FF',
            dark: '#60396A',
            is_default: true,
        },
        {
            id: 'default_emerald',
            name: 'Emerald Garden',
            badge: 'Segar & Alami',
            primary: '#166534',
            secondary: '#BBF7D0',
            soft: '#DCFCE7',
            dark: '#14532D',
            is_default: true,
        },
        {
            id: 'default_royal_gold',
            name: 'Royal Gold & Amber',
            badge: 'Mewah & Hangat',
            primary: '#B45309',
            secondary: '#FDE68A',
            soft: '#FEF3C7',
            dark: '#78350F',
            is_default: true,
        },
        {
            id: 'default_ocean',
            name: 'Ocean Breeze',
            badge: 'Modern & Segar',
            primary: '#0284C7',
            secondary: '#BAE6FD',
            soft: '#E0F2FE',
            dark: '#0369A1',
            is_default: true,
        },
        {
            id: 'default_ruby',
            name: 'Ruby Crimson',
            badge: 'Elegan & Manis',
            primary: '#BE123C',
            secondary: '#FECDD3',
            soft: '#FFE4E6',
            dark: '#881337',
            is_default: true,
        },
        {
            id: 'default_choco',
            name: 'Warm Choco & Coffee',
            badge: 'Klasik & Hangat',
            primary: '#78350F',
            secondary: '#E7D5C7',
            soft: '#F5EBE1',
            dark: '#451A03',
            is_default: true,
        },
    ];

    const customPresets = useMemo(() => {
        try {
            if (!settings?.custom_theme_presets) return [];
            const parsed = typeof settings.custom_theme_presets === 'string'
                ? JSON.parse(settings.custom_theme_presets)
                : settings.custom_theme_presets;
            return Array.isArray(parsed) ? parsed : [];
        } catch {
            return [];
        }
    }, [settings?.custom_theme_presets]);

    // Merge default presets with custom presets / overrides
    const allPresets = useMemo(() => {
        const customList = [...customPresets];
        const defaults = DEFAULT_PRESETS.map(def => {
            const overrideIdx = customList.findIndex(c => c.id === def.id);
            if (overrideIdx !== -1) {
                const override = customList[overrideIdx];
                customList.splice(overrideIdx, 1);
                return { ...def, ...override, is_default: true };
            }
            return def;
        });
        return [...defaults, ...customList];
    }, [customPresets]);

    // Explicit state for currently active selected preset ID (fixes bug where identical colors selected multiple cards)
    const [selectedPresetId, setSelectedPresetId] = useState('default_raia');

    // Get the currently selected preset object
    const selectedPreset = useMemo(() => {
        return allPresets.find(p => p.id === selectedPresetId) || allPresets[0] || null;
    }, [allPresets, selectedPresetId]);

    const applyPreset = (preset) => {
        setSelectedPresetId(preset.id);
        setData(prev => ({
            ...prev,
            primary_color: preset.primary,
            secondary_color: preset.secondary,
            soft_color: preset.soft,
            dark_color: preset.dark,
        }));
    };

    const resetToDefaultColors = () => {
        setSelectedPresetId('default_raia');
        setData(prev => ({
            ...prev,
            primary_color: '#843799',
            secondary_color: '#F4C6FF',
            soft_color: '#FAE6FF',
            dark_color: '#60396A',
        }));
    };

    // Open modal to create a new preset
    const handleOpenCreateNewPreset = () => {
        setPresetModal({
            isOpen: true,
            mode: 'create',
            id: null,
            name: '',
            badge: 'Kustom',
            primary: data.primary_color || '#843799',
            secondary: data.secondary_color || '#F4C6FF',
            soft: data.soft_color || '#FAE6FF',
            dark: data.dark_color || '#60396A',
        });
    };

    // Open modal to edit a specific preset
    const handleOpenEditPreset = (preset) => {
        setSelectedPresetId(preset.id);
        setPresetModal({
            isOpen: true,
            mode: 'edit',
            id: preset.id,
            name: preset.name,
            badge: preset.badge || '',
            primary: preset.primary,
            secondary: preset.secondary,
            soft: preset.soft,
            dark: preset.dark,
        });
    };

    // Open modal to edit currently selected preset
    const handleOpenEditSelectedPreset = () => {
        if (selectedPreset) {
            handleOpenEditPreset(selectedPreset);
        }
    };

    // Helper inside edit modal to copy colors from the current form on the page
    const handleCopyFromCurrentForm = () => {
        setPresetModal(prev => ({
            ...prev,
            primary: data.primary_color || prev.primary,
            secondary: data.secondary_color || prev.secondary,
            soft: data.soft_color || prev.soft,
            dark: data.dark_color || prev.dark,
        }));
    };

    const handleSavePreset = (e) => {
        e.preventDefault();
        if (!presetModal.name.trim()) return;

        setSavingPreset(true);

        const payload = {
            name: presetModal.name,
            badge: presetModal.badge,
            primary: presetModal.primary,
            secondary: presetModal.secondary,
            soft: presetModal.soft,
            dark: presetModal.dark,
        };

        if (presetModal.mode === 'edit' && presetModal.id) {
            router.put(route('admin.settings.custom-themes.update', presetModal.id), payload, {
                preserveScroll: true,
                onSuccess: () => {
                    setPresetModal(prev => ({ ...prev, isOpen: false }));
                    setSavingPreset(false);
                    // If this was the active preset, sync form colors too
                    if (selectedPresetId === presetModal.id) {
                        setData(prev => ({
                            ...prev,
                            primary_color: payload.primary,
                            secondary_color: payload.secondary,
                            soft_color: payload.soft,
                            dark_color: payload.dark,
                        }));
                    }
                },
                onError: () => {
                    setSavingPreset(false);
                },
            });
        } else {
            router.post(route('admin.settings.custom-themes.store'), payload, {
                preserveScroll: true,
                onSuccess: () => {
                    setPresetModal(prev => ({ ...prev, isOpen: false }));
                    setSavingPreset(false);
                },
                onError: () => {
                    setSavingPreset(false);
                },
            });
        }
    };

    const handleDeleteCustomPreset = (e, preset) => {
        e.stopPropagation();
        if (window.confirm(`Hapus template tema "${preset.name}" dari daftar Pilihan Tema Siap Pakai?`)) {
            router.delete(route('admin.settings.custom-themes.destroy', preset.id), {
                preserveScroll: true,
                onSuccess: () => {
                    if (selectedPresetId === preset.id) {
                        setSelectedPresetId('default_raia');
                    }
                },
            });
        }
    };

    return (
        <AdminLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Identitas & Tampilan Website</h2>}>
            <Head title="Identitas & Tampilan - Admin" />

            <div className="max-w-4xl mx-auto space-y-6">
                {flash?.success && (
                    <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span>{flash.success}</span>
                    </div>
                )}
                {flash?.error && (
                    <div className="bg-rose-50 border border-rose-200 text-rose-800 px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                        <span>{flash.error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Identitas Usaha */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                        <h3 className="text-base font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                            <Building2 className="w-5 h-5 text-gray-600" />
                            <span>Informasi Identitas Usaha</span>
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="sm:col-span-2">
                                <label className="block text-xs font-semibold text-gray-700 mb-1">Nama Usaha / Toko *</label>
                                <input
                                    type="text"
                                    value={data.company_name}
                                    onChange={e => setData('company_name', e.target.value)}
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#843799] focus:ring-2 focus:ring-[#FAE6FF] outline-none"
                                    required
                                />
                                {errors.company_name && <p className="text-red-500 text-xs mt-1">{errors.company_name}</p>}
                            </div>

                            <div className="sm:col-span-2">
                                <label className="block text-xs font-semibold text-gray-700 mb-1">Slogan / Tagline Usaha</label>
                                <input
                                    type="text"
                                    value={data.company_tagline}
                                    onChange={e => setData('company_tagline', e.target.value)}
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#843799] focus:ring-2 focus:ring-[#FAE6FF] outline-none"
                                    placeholder="Contoh: Camilan Enak & Gurih Khas Batu Malang"
                                />
                                {errors.company_tagline && <p className="text-red-500 text-xs mt-1">{errors.company_tagline}</p>}
                            </div>

                            <div className="sm:col-span-2">
                                <label className="block text-xs font-semibold text-gray-700 mb-1">Deskripsi Singkat (SEO Meta Description)</label>
                                <textarea
                                    value={data.meta_description}
                                    onChange={e => setData('meta_description', e.target.value)}
                                    rows={3}
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#843799] focus:ring-2 focus:ring-[#FAE6FF] outline-none"
                                    placeholder="Deskripsi ringkas yang tampil di pencarian Google..."
                                />
                                {errors.meta_description && <p className="text-red-500 text-xs mt-1">{errors.meta_description}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Logo & Favicon */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                        <h3 className="text-base font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                            <ImageIcon className="w-5 h-5 text-gray-600" />
                            <span>Upload Logo & Favicon</span>
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* Logo */}
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-2">Logo Utama Website</label>
                                <div className="flex items-center gap-4">
                                    <div className="w-24 h-16 rounded-xl border border-gray-200 bg-gray-50 flex items-center justify-center p-2 overflow-hidden">
                                        <img src={logoPreview} alt="Logo Preview" className="max-h-full max-w-full object-contain" />
                                    </div>
                                    <div className="flex-1">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleLogoChange}
                                            className="w-full text-xs text-gray-500 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-purple-50 file:text-[#843799] hover:file:bg-purple-100 cursor-pointer"
                                        />
                                        <p className="text-[11px] text-gray-400 mt-1">PNG/WebP transparan (Rekomendasi lebar 250px)</p>
                                    </div>
                                </div>
                                {errors.logo && <p className="text-red-500 text-xs mt-1">{errors.logo}</p>}
                            </div>

                            {/* Favicon */}
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-2">Favicon (Ikon Tab Browser)</label>
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-xl border border-gray-200 bg-gray-50 flex items-center justify-center p-2 overflow-hidden">
                                        <img src={faviconPreview} alt="Favicon Preview" className="max-h-full max-w-full object-contain" />
                                    </div>
                                    <div className="flex-1">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFaviconChange}
                                            className="w-full text-xs text-gray-500 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-purple-50 file:text-[#843799] hover:file:bg-purple-100 cursor-pointer"
                                        />
                                        <p className="text-[11px] text-gray-400 mt-1">Rasio 1:1 persegi (Format .ico / .png / .webp)</p>
                                    </div>
                                </div>
                                {errors.favicon && <p className="text-red-500 text-xs mt-1">{errors.favicon}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Skema Warna Tema */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-gray-100 gap-2">
                            <div>
                                <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                                    <Palette className="w-5 h-5 text-gray-600" />
                                    <span>Palet Warna Desain Toko</span>
                                </h3>
                                <p className="text-xs text-gray-500 mt-0.5">
                                    Pilih kombinasi warna toko online. Setiap perubahan otomatis tersinkron ke navbar, tombol, harga, dan seluruh komponen toko.
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={resetToDefaultColors}
                                className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all self-start sm:self-auto"
                            >
                                <RotateCcw className="w-3.5 h-3.5" />
                                <span>Reset Default Raia</span>
                            </button>
                        </div>

                        {/* Preset Tema Cepat & Custom Presets */}
                        <div className="space-y-3">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                                <div>
                                    <p className="text-xs font-bold text-gray-800">Pilihan Tema Siap Pakai (1-Klik):</p>
                                    <p className="text-[11px] text-gray-500">Pilih tema bawaan atau buat template warna kustom sendiri.</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={handleOpenEditSelectedPreset}
                                        disabled={!selectedPreset}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 bg-white text-gray-700 text-xs font-bold hover:bg-gray-50 hover:text-gray-900 transition-all cursor-pointer shadow-2xs disabled:opacity-50 disabled:cursor-not-allowed"
                                        title={selectedPreset ? `Edit palet warna untuk "${selectedPreset.name}"` : 'Pilih template terlebih dahulu'}
                                    >
                                        <Pencil className="w-3.5 h-3.5 text-gray-500" />
                                        <span>Edit Palet Template</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleOpenCreateNewPreset}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-900 text-white text-xs font-bold hover:bg-gray-800 transition-all cursor-pointer shadow-2xs"
                                    >
                                        <Plus className="w-3.5 h-3.5" />
                                        <span>Buat Template Baru</span>
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
                                {allPresets.map((preset) => {
                                    const isSelected = selectedPresetId === preset.id;
                                    return (
                                        <div
                                            key={preset.id || preset.name}
                                            onClick={() => applyPreset(preset)}
                                            className={`p-2.5 rounded-xl border text-left transition-all relative cursor-pointer group select-none ${
                                                isSelected
                                                    ? 'border-gray-900 ring-2 ring-gray-900/10 shadow-sm bg-gray-50/90'
                                                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                            }`}
                                        >
                                            {/* Action buttons: Edit on all presets, Delete on custom presets */}
                                            <div className="absolute top-1.5 right-1.5 flex items-center gap-0.5">
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleOpenEditPreset(preset);
                                                    }}
                                                    title={`Edit palet tema "${preset.name}"`}
                                                    className="p-1 rounded-md text-gray-400 hover:text-violet-600 hover:bg-violet-50 transition-colors opacity-70 group-hover:opacity-100 cursor-pointer"
                                                >
                                                    <Pencil className="w-3 h-3" />
                                                </button>

                                                {preset.is_custom && (
                                                    <button
                                                        type="button"
                                                        onClick={(e) => handleDeleteCustomPreset(e, preset)}
                                                        title={`Hapus template "${preset.name}"`}
                                                        className="p-1 rounded-md text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors opacity-70 group-hover:opacity-100 cursor-pointer"
                                                    >
                                                        <Trash2 className="w-3 h-3" />
                                                    </button>
                                                )}
                                            </div>

                                            <div className="flex items-center gap-1 mb-2 pr-8">
                                                <span className="w-3.5 h-3.5 rounded-full shadow-inner border border-black/10 flex-shrink-0" style={{ backgroundColor: preset.primary }} />
                                                <span className="w-3.5 h-3.5 rounded-full shadow-inner border border-black/10 flex-shrink-0" style={{ backgroundColor: preset.secondary }} />
                                                <span className="w-3.5 h-3.5 rounded-full shadow-inner border border-black/10 flex-shrink-0" style={{ backgroundColor: preset.soft }} />
                                                <span className="w-3.5 h-3.5 rounded-full shadow-inner border border-black/10 flex-shrink-0" style={{ backgroundColor: preset.dark }} />
                                            </div>
                                            <p className="text-[11px] font-bold text-gray-900 truncate leading-tight" title={preset.name}>
                                                {preset.name}
                                            </p>
                                            <div className="flex items-center gap-1 mt-0.5">
                                                {preset.is_custom ? (
                                                    <span className="px-1 py-0.2 text-[9px] font-bold uppercase rounded bg-violet-100 text-violet-700 leading-tight">
                                                        Kustom
                                                    </span>
                                                ) : null}
                                                <p className="text-[10px] text-gray-500 truncate">{preset.badge || 'Tema'}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Custom Color Inputs */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
                            {[
                                {
                                    field: 'primary_color',
                                    title: 'Warna Utama',
                                    badge: 'Primary',
                                    fallback: '#843799',
                                    desc: 'Tombol beli, navbar aktif, harga & badge keranjang.'
                                },
                                {
                                    field: 'secondary_color',
                                    title: 'Warna Sekunder',
                                    badge: 'Secondary',
                                    fallback: '#F4C6FF',
                                    desc: 'Badge promo, latar footer, dan highlight aksen.'
                                },
                                {
                                    field: 'soft_color',
                                    title: 'Warna Lembut',
                                    badge: 'Soft',
                                    fallback: '#FAE6FF',
                                    desc: 'Latar belakang promo card, icon box, dan pills aktif.'
                                },
                                {
                                    field: 'dark_color',
                                    title: 'Warna Gelap',
                                    badge: 'Dark',
                                    fallback: '#60396A',
                                    desc: 'Teks judul toko, hover tombol, dan kontras teks.'
                                },
                            ].map(item => {
                                const currentColor = data[item.field] || item.fallback;
                                return (
                                    <div key={item.field} className="bg-slate-50/80 rounded-2xl p-4 border border-gray-200/80 flex flex-col justify-between shadow-xs transition-all hover:border-gray-300">
                                        <div>
                                            <div className="flex items-center justify-between gap-1 mb-2">
                                                <span className="text-xs font-bold text-gray-900 truncate">{item.title}</span>
                                                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white border border-gray-200 text-gray-600 flex-shrink-0">
                                                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: currentColor }} />
                                                    {item.badge}
                                                </span>
                                            </div>

                                            {/* Integrated Color Input Control */}
                                            <div className="relative flex items-center w-full min-w-0 bg-white rounded-xl border border-gray-200 p-1.5 shadow-inner focus-within:border-gray-900 focus-within:ring-2 focus-within:ring-gray-900/10 transition-all">
                                                {/* Interactive Color Swatch with hidden color input */}
                                                <div
                                                    className="relative w-8 h-8 rounded-lg flex-shrink-0 shadow-sm border border-black/10 overflow-hidden cursor-pointer hover:scale-105 transition-transform"
                                                    style={{ backgroundColor: currentColor }}
                                                    title="Klik untuk membuka pemilih warna"
                                                >
                                                    <input
                                                        type="color"
                                                        value={getPickerValue(data[item.field], item.fallback)}
                                                        onChange={e => setData(item.field, e.target.value.toUpperCase())}
                                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                    />
                                                </div>

                                                {/* Text Hex Input with min-w-0 */}
                                                <div className="flex-1 min-w-0 px-2 flex items-center">
                                                    <input
                                                        type="text"
                                                        value={data[item.field] || ''}
                                                        onChange={e => handleHexChange(item.field, e.target.value)}
                                                        placeholder={item.fallback}
                                                        maxLength={7}
                                                        className="w-full min-w-0 p-0 text-xs font-mono font-bold text-gray-900 uppercase bg-transparent border-0 focus:ring-0 outline-none tracking-wider"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <p className="text-[11px] text-gray-500 mt-2.5 leading-relaxed">
                                            {item.desc}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Interactive Live Preview Component */}
                        <div className="rounded-2xl border border-gray-200 overflow-hidden bg-slate-50">
                            <div className="px-4 py-2.5 bg-slate-100/80 border-b border-gray-200 flex items-center justify-between text-xs">
                                <span className="font-bold text-gray-700 flex items-center gap-1.5">
                                    <Eye className="w-4 h-4 text-gray-600" />
                                    <span>Pratinjau Langsung Tampilan Toko (Live Preview)</span>
                                </span>
                                <span className="text-[11px] text-gray-500">Otomatis ter-update saat warna diubah</span>
                            </div>

                            <div className="p-4 sm:p-5 space-y-4">
                                {/* Simulated Navbar */}
                                <div className="bg-white rounded-xl p-3 border border-gray-200 shadow-sm flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white text-xs shadow-sm" style={{ backgroundColor: data.primary_color || '#843799' }}>
                                            RF
                                        </div>
                                        <span className="text-xs font-bold text-gray-900">{data.company_name || 'Raia Food'}</span>
                                    </div>
                                    <div className="hidden sm:flex items-center gap-4 text-xs font-semibold">
                                        <span className="pb-0.5 border-b-2" style={{ color: data.primary_color || '#843799', borderColor: data.primary_color || '#843799' }}>
                                            Beranda
                                        </span>
                                        <span className="text-gray-500">Produk</span>
                                        <span className="text-gray-500">Tentang Kami</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs relative" style={{ backgroundColor: data.soft_color || '#FAE6FF', color: data.primary_color || '#843799' }}>
                                            <ShoppingCart className="w-3.5 h-3.5" />
                                            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-white text-[9px] font-bold flex items-center justify-center" style={{ backgroundColor: data.primary_color || '#843799' }}>
                                                3
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Simulated Store Banner & Product Card */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    {/* Mini Promo Card */}
                                    <div className="sm:col-span-2 p-4 rounded-xl flex flex-col justify-between border border-black/5" style={{ backgroundColor: data.soft_color || '#FAE6FF' }}>
                                        <div>
                                            <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold mb-2" style={{ backgroundColor: data.secondary_color || '#F4C6FF', color: data.dark_color || '#60396A' }}>
                                                ★ Best Seller 2026
                                            </span>
                                            <h4 className="text-sm font-extrabold mb-1" style={{ color: data.dark_color || '#60396A' }}>
                                                Camilan Istimewa Khas Kota Batu Malang
                                            </h4>
                                            <p className="text-xs opacity-80" style={{ color: data.dark_color || '#60396A' }}>
                                                Renyah gurih, diproses higienis dari bahan baku pilihan petani lokal.
                                            </p>
                                        </div>
                                        <div className="mt-3 flex items-center gap-2">
                                            <button
                                                type="button"
                                                className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-white shadow-sm transition-all hover:opacity-95"
                                                style={{ backgroundColor: data.primary_color || '#843799' }}
                                            >
                                                Belanja Sekarang →
                                            </button>
                                        </div>
                                    </div>

                                    {/* Mini Product Card */}
                                    <div className="bg-white rounded-xl p-3 border border-gray-200 shadow-sm flex flex-col justify-between">
                                        <div>
                                            <div className="w-full h-20 rounded-lg flex items-center justify-center text-2xl mb-2" style={{ backgroundColor: data.soft_color || '#FAE6FF' }}>
                                                <Package className="w-8 h-8 opacity-70" />
                                            </div>
                                            <span className="text-[10px] font-bold uppercase tracking-wider block" style={{ color: data.primary_color || '#843799' }}>
                                                Cookies & Kue
                                            </span>
                                            <p className="text-xs font-bold text-gray-900 truncate">Almond Crispy Premium</p>
                                            <p className="text-xs font-extrabold mt-1" style={{ color: data.primary_color || '#843799' }}>
                                                Rp 45.000
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            className="w-full mt-2 py-1.5 rounded-lg text-[11px] font-bold text-white shadow-sm"
                                            style={{ backgroundColor: data.primary_color || '#843799' }}
                                        >
                                            + Keranjang
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            style={{ backgroundColor: data.primary_color || '#843799' }}
                            className="px-6 py-2.5 rounded-xl text-white font-bold text-sm shadow-md transition-all hover:opacity-90 disabled:opacity-50"
                        >
                            {processing ? 'Menyimpan...' : 'Simpan Pengaturan'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Modal Tambah & Edit Template Tema Siap Pakai */}
            {presetModal.isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 space-y-5 animate-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center">
                                    {presetModal.mode === 'edit' ? <Pencil className="w-4 h-4" /> : <Palette className="w-4 h-4" />}
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-gray-900">
                                        {presetModal.mode === 'edit' ? 'Edit Palet Template Tema' : 'Tambah Template Tema Baru'}
                                    </h3>
                                    <p className="text-xs text-gray-500">
                                        {presetModal.mode === 'edit'
                                            ? `Sesuaikan warna dan label untuk "${presetModal.name}"`
                                            : 'Buat tema baru yang dapat dipilih dengan 1-klik'}
                                    </p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setPresetModal(prev => ({ ...prev, isOpen: false }))}
                                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <form onSubmit={handleSavePreset} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1">
                                    Nama Template Tema *
                                </label>
                                <input
                                    type="text"
                                    value={presetModal.name}
                                    onChange={(e) => setPresetModal(prev => ({ ...prev, name: e.target.value }))}
                                    placeholder="Contoh: Sunset Citrus / Matcha Latte"
                                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-100 outline-none"
                                    required
                                    autoFocus
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1">
                                    Label / Badge Ringkas (Opsional)
                                </label>
                                <input
                                    type="text"
                                    value={presetModal.badge}
                                    onChange={(e) => setPresetModal(prev => ({ ...prev, badge: e.target.value }))}
                                    placeholder="Contoh: Spesial Promo / Segar"
                                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-100 outline-none"
                                />
                            </div>

                            {/* 4 Custom Color Inputs with Copy from Form Button */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label className="block text-xs font-bold text-gray-700">
                                        Pilihan 4 Warna Palet:
                                    </label>
                                    <button
                                        type="button"
                                        onClick={handleCopyFromCurrentForm}
                                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-violet-600 hover:text-violet-800 hover:underline cursor-pointer"
                                        title="Salin warna dari form yang sedang aktif di halaman"
                                    >
                                        <Copy className="w-3 h-3" />
                                        <span>Ambil Warna Form Saat Ini</span>
                                    </button>
                                </div>

                                <div className="grid grid-cols-2 gap-2.5">
                                    {[
                                        { field: 'primary', label: 'Warna Utama (Primary)' },
                                        { field: 'secondary', label: 'Warna Sekunder' },
                                        { field: 'soft', label: 'Warna Soft / Background' },
                                        { field: 'dark', label: 'Warna Gelap (Dark)' },
                                    ].map(item => (
                                        <div key={item.field} className="p-2.5 rounded-xl border border-gray-100 bg-gray-50/70 space-y-1.5">
                                            <span className="text-[11px] font-bold text-gray-700 block truncate">{item.label}</span>
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="color"
                                                    value={presetModal[item.field]}
                                                    onChange={(e) => setPresetModal(prev => ({ ...prev, [item.field]: e.target.value.toUpperCase() }))}
                                                    className="w-7 h-7 rounded-lg cursor-pointer border border-gray-200 p-0 bg-white shadow-2xs"
                                                />
                                                <input
                                                    type="text"
                                                    value={presetModal[item.field]}
                                                    onChange={(e) => {
                                                        let val = e.target.value.trim();
                                                        if (val && !val.startsWith('#')) val = '#' + val;
                                                        setPresetModal(prev => ({ ...prev, [item.field]: val.toUpperCase() }));
                                                    }}
                                                    className="w-full text-[11px] font-mono font-bold px-2 py-1 rounded border border-gray-200 uppercase bg-white outline-none"
                                                    maxLength={7}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Live mini preview */}
                            <div className="p-3 rounded-xl border border-gray-100 bg-gray-50 space-y-2">
                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Pratinjau Mini Tema</span>
                                <div className="p-3 rounded-lg flex items-center justify-between" style={{ backgroundColor: presetModal.soft }}>
                                    <span className="px-2 py-0.5 rounded text-[10px] font-bold" style={{ backgroundColor: presetModal.secondary, color: presetModal.dark }}>
                                        {presetModal.badge || 'Tema'}
                                    </span>
                                    <button
                                        type="button"
                                        className="px-2.5 py-1 rounded text-[11px] font-bold text-white shadow-2xs"
                                        style={{ backgroundColor: presetModal.primary }}
                                    >
                                        Beli Sekarang
                                    </button>
                                </div>
                            </div>

                            {/* Modal Actions */}
                            <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={() => setPresetModal(prev => ({ ...prev, isOpen: false }))}
                                    className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={savingPreset || !presetModal.name.trim()}
                                    className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-violet-600 hover:bg-violet-700 transition-colors disabled:opacity-50 shadow-sm cursor-pointer"
                                >
                                    {savingPreset ? 'Menyimpan...' : (presetModal.mode === 'edit' ? 'Perbarui Template' : 'Simpan Template')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
