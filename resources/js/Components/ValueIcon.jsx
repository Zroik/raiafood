import React from 'react';
import * as LucideIcons from 'lucide-react';
import * as HeroSolidIcons from '@heroicons/react/24/solid';
import * as TablerIcons from '@tabler/icons-react';
import { 
    AVAILABLE_LUCIDE_ICONS, 
    AVAILABLE_HERO_ICONS, 
    AVAILABLE_TABLER_ICONS 
} from './iconCatalogs';

export { AVAILABLE_LUCIDE_ICONS, AVAILABLE_HERO_ICONS, AVAILABLE_TABLER_ICONS };

// ==========================================
// ASET SVG LOKAL & KOLEKSI EMOJI LENGKAP (50+)
// ==========================================
export const AVAILABLE_LOCAL_SVGS = [
    { value: 'Bahan Pilihan Terbaik.svg', label: 'Bahan Pilihan Terbaik' },
    { value: 'Bahan Tanpa Pengawet.svg', label: 'Bahan Tanpa Pengawet' },
    { value: 'Cita Rasa Khas Pulau Jawa.svg', label: 'Cita Rasa Khas Pulau Jawa' },
    { value: 'Cocok untuk Oleh - Oleh.svg', label: 'Cocok untuk Oleh - Oleh' },
    { value: 'resep-turun-temurun.svg', label: 'Resep Turun-Menurun' },
    { value: 'produk-lokal-kota-batu.svg', label: 'Produk Lokal Kota Batu' },
    { value: 'kualitas-terjaga.svg', label: 'Kualitas Terjaga' },
    { value: 'checklist-misi.svg', label: 'Checklist Misi' },
    { value: 'target-misi.svg', label: 'Target Misi' },
    { value: 'mata-visi.svg', label: 'Mata Visi' },
    { value: 'racikan.svg', label: 'Racikan Bumbu' },
    { value: 'daun.svg', label: 'Daun Alami' },
    { value: 'love.svg', label: 'Love Hati' },
];

export const AVAILABLE_EMOJIS = [
    // Makanan & Camilan
    { value: '🍪', label: '🍪 Kue / Cookie' },
    { value: '🥨', label: '🥨 Pretzel / Camilan' },
    { value: '🥖', label: '🥖 Roti Tradisional' },
    { value: '🥞', label: '🥞 Panekuk' },
    { value: '🍯', label: '🍯 Madu Murni' },
    { value: '🍎', label: '🍎 Apel Batu' },
    { value: '🍓', label: '🍓 Stroberi' },
    { value: '☕', label: '☕ Kopi Hangat' },
    { value: '🍵', label: '🍵 Teh Tradisi' },
    { value: '🥥', label: '🥥 Kelapa / Santan' },
    { value: '🌾', label: '🌾 Padi / Pertanian' },
    { value: '🌰', label: '🌰 Kacang Gurih' },

    // Prestasi, Kualitas & Keaslian
    { value: '✨', label: '✨ Sparkle Kemilau' },
    { value: '💎', label: '💎 Diamond Premium' },
    { value: '👑', label: '👑 Mahkota Raja' },
    { value: '🏆', label: '🏆 Piala Juara' },
    { value: '🥇', label: '🥇 Medali Emas #1' },
    { value: '🌟', label: '🌟 Bintang Bersinar' },
    { value: '⭐', label: '⭐ Bintang Favorit' },
    { value: '🎖️', label: '🎖️ Bintang Jasa' },
    { value: '🛡️', label: '🛡️ Perlindungan Mutu' },
    { value: '💯', label: '💯 Kualitas 100%' },
    { value: '🎯', label: '🎯 Target Tepat' },
    { value: '🏅', label: '🏅 Lencana Mutu' },

    // Kasih Sayang, Alami & Emosi
    { value: '❤️', label: '❤️ Hati Merah' },
    { value: '💜', label: '💜 Hati Ungu Raia' },
    { value: '💖', label: '💖 Hati Berkilau' },
    { value: '🌿', label: '🌿 Daun Herbal Alami' },
    { value: '🍃', label: '🍃 Daun Melayang' },
    { value: '🌱', label: '🌱 Bibit Tumbuh' },
    { value: '🌸', label: '🌸 Bunga Sakura' },
    { value: '☀️', label: '☀️ Matahari Pagi' },
    { value: '🔥', label: '🔥 Semangat Membara' },
    { value: '🌈', label: '🌈 Pelangi Harapan' },
    { value: '🤝', label: '🤝 Jabat Tangan Kemitraan' },
    { value: '🥰', label: '🥰 Bahagia & Senang' },
    { value: '😊', label: '😊 Senyuman Tulus' },
    { value: '👍', label: '👍 Jempol Mantap' },

    // Toko, Hadiah & Pengiriman
    { value: '🎁', label: '🎁 Kado & Oleh-Oleh' },
    { value: '🛍️', label: '🛍️ Tas Belanja' },
    { value: '📦', label: '📦 Paket Kemasan' },
    { value: '🏬', label: '🏬 Outlet Toko' },
    { value: '🚚', label: '🚚 Pengiriman Kilat' },
    { value: '🏡', label: '🏡 Rumah Tradisi' },
    { value: '📍', label: '📍 Titik Lokasi Batu' },
    { value: '🏷️', label: '🏷️ Label Harga Jujur' },
];

// Fallback Generic Icon
function FallbackCheck({ className }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <circle cx="12" cy="12" r="10" />
            <path d="m9 12 2 2 4-4" />
        </svg>
    );
}

// ==========================================
// UNIVERSAL SAFE VALUE ICON RENDERER
// ==========================================
export function ValueIconRender({ type = 'lucide', value, className = "w-6 h-6 text-white" }) {
    if (type === 'svg') {
        return (
            <img 
                src={`/images/${value}`} 
                alt={value} 
                className="w-full h-full object-contain drop-shadow-sm" 
            />
        );
    }

    if (type === 'emoji') {
        return (
            <span className="text-xl select-none leading-none">{value}</span>
        );
    }

    if (type === 'heroicon') {
        const HeroComponent = HeroSolidIcons[value] || HeroSolidIcons.CheckBadgeIcon || null;
        if (HeroComponent) {
            return React.createElement(HeroComponent, { className });
        }
        return <FallbackCheck className={className} />;
    }

    if (type === 'tabler') {
        const TablerComponent = TablerIcons[value] || TablerIcons.IconCircleCheck || null;
        if (TablerComponent) {
            return React.createElement(TablerComponent, { className, stroke: 2.2 });
        }
        return <FallbackCheck className={className} />;
    }

    // Default: Lucide Icons
    const LucideComponent = LucideIcons[value] || LucideIcons.CheckCircle2 || null;
    if (LucideComponent) {
        return React.createElement(LucideComponent, { className, strokeWidth: 2.2 });
    }

    return <FallbackCheck className={className} />;
}
