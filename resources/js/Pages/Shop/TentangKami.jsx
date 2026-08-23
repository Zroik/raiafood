import { Head, Link, usePage } from "@inertiajs/react";
import { useState, useRef } from "react";
import ShopLayout from "@/Layouts/ShopLayout";
import { ValueIconRender } from "@/Components/ValueIcon";

// ── Scaleable spacing (ref = 1280px) ─────────────────────────────────────────
// 40px side gap  → 3.125vw  | clamp(16px, 3.125vw, 64px)
// 26px card gap  → 2.03vw   | clamp(12px, 2.03vw, 40px)
// 15px white gap → 1.172vw  | clamp(8px, 1.172vw, 24px)
// r=15           → 1.172vw  | clamp(8px, 1.172vw, 20px)
// ─────────────────────────────────────────────────────────────────────────────

const SZ = (px) => `clamp(${Math.round(px * 0.5)}px, ${(px / 1280 * 100).toFixed(3)}vw, ${Math.round(px * 1.8)}px)`;

function IconHeart() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="#843799" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: SZ(20), height: SZ(20) }}>
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
    );
}
function IconSparkle() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="#843799" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: SZ(20), height: SZ(20) }}>
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    );
}
function IconBook() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="#843799" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: SZ(20), height: SZ(20) }}>
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
    );
}
function IconUser() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="#843799" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: SZ(20), height: SZ(20) }}>
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </svg>
    );
}
function IconEye() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: SZ(40), height: SZ(40) }}>
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    );
}
function IconTarget() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: SZ(40), height: SZ(40) }}>
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="6" />
            <circle cx="12" cy="12" r="2" />
        </svg>
    );
}
function IconCheck() {
    return (
        <svg viewBox="0 0 24 24" fill="#843799" style={{ width: SZ(16), height: SZ(16), flexShrink: 0 }}>
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    );
}

const ceritaItems = [
    { icon: <img src="/images/love.svg" alt="Love" style={{ width: SZ(20), height: SZ(20), objectFit: "contain" }} />, text: "Di Luxry Raia Food, kami percaya bahwa makanan bukan hanya sekedar rasa, melainkan juga warisan budaya yang bernilai." },
    { icon: <img src="/images/racikan.svg" alt="Racikan" style={{ width: SZ(20), height: SZ(20), objectFit: "contain" }} />, text: "Kami menghadirkan aneka makanan khas Jawa, mulai dari jenang autentik hingga inovasi modern tanpa menghilangkan nilai keasliannya." },
    { icon: <img src="/images/daun.svg" alt="Daun" style={{ width: SZ(20), height: SZ(20), objectFit: "contain" }} />, text: "Dengan bahan berkualitas dan resep yang diwariskan turun-temurun, kami berkomitmen menjaga otentisitas rasa dan kualitas produk." },
    { icon: <img src="/images/person.svg" alt="Person" style={{ width: SZ(20), height: SZ(20), objectFit: "contain" }} />, text: "Bagi kami, Luxury Raia Food adalah perjalanan untuk mengenang, merayakan, dan mewariskan kekayaan cita rasa Nusantara kepada dunia." },
];

const misiItems = [
    "Menghadirkan produk khas Jawa berkualitas tinggi.",
    "Melestarikan resep tradisional dengan inovasi modern.",
    "Memberdayakan bahan lokal dan mendukung ekonomi daerah.",
    "Memberikan pengalaman rasa yang berkesan bagi setiap pelanggan.",
];

// Row 1: 4 cards with side gaps
const nilaiRow1 = [
    { label: "Bahan Pilihan Terbaik", icon: <img src="/images/Bahan Pilihan Terbaik.svg" alt="Bahan Pilihan Terbaik" style={{ width: SZ(48), height: SZ(48), objectFit: "contain" }} /> },
    { label: "Bahan Tanpa Pengawet", icon: <img src="/images/Bahan Tanpa Pengawet.svg" alt="Bahan Tanpa Pengawet" style={{ width: SZ(48), height: SZ(48), objectFit: "contain" }} /> },
    { label: "Cita Rasa Khas Pulau Jawa", icon: <img src="/images/Cita Rasa Khas Pulau Jawa.svg" alt="Cita Rasa Khas Pulau Jawa" style={{ width: SZ(48), height: SZ(48), objectFit: "contain" }} /> },
    { label: "Cocok untuk Oleh - Oleh", icon: <img src="/images/Cocok untuk Oleh - Oleh.svg" alt="Cocok untuk Oleh - Oleh" style={{ width: SZ(48), height: SZ(48), objectFit: "contain" }} /> },
];

// Row 2: 3 cards full width
const nilaiRow2 = [
    {
        label: "Resep Turun-Menurun",
        icon: <img src="/images/resep-turun-temurun.svg" alt="Resep Turun-Menurun" style={{ width: SZ(48), height: SZ(48), objectFit: "contain" }} />,
    },
    {
        label: "Produk Lokal Kota Batu",
        icon: <img src="/images/produk-lokal-kota-batu.svg" alt="Produk Lokal Kota Batu" style={{ width: SZ(48), height: SZ(48), objectFit: "contain" }} />,
    },
    {
        label: "Kualitas Terjaga",
        icon: <img src="/images/kualitas-terjaga.svg" alt="Kualitas Terjaga" style={{ width: SZ(48), height: SZ(48), objectFit: "contain" }} />,
    },
];

function SertifikatCarousel({ certificates = [] }) {
    const [current, setCurrent] = useState(0);

    const prev = () => setCurrent((c) => (c === 0 ? certificates.length - 1 : c - 1));
    const next = () => setCurrent((c) => (c === certificates.length - 1 ? 0 : c + 1));

    if (!certificates || certificates.length === 0) return null;

    const currentCert = certificates[current];
    const imageSrc = currentCert.image.startsWith('images/') || currentCert.image.startsWith('/') 
        ? (currentCert.image.startsWith('/') ? currentCert.image : `/${currentCert.image}`) 
        : `/storage/${currentCert.image}`;

    return (
        <div className="relative flex flex-col items-center">
            <div className="relative w-full max-w-lg mx-auto">
                <button onClick={prev} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow" style={{ backgroundColor: "#F4C6FF", color: "#843799", border: "none" }} aria-label="Previous">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M15 18l-6-6 6-6" /></svg>
                </button>
                
                {/* Certificate Container: aspect-[4/3] with white background and fit-contain image without rounded corners */}
                <div className="overflow-hidden aspect-[4/3] bg-white flex items-center justify-center border border-gray-100" style={{ width: "100%" }}>
                    <img 
                        src={imageSrc} 
                        alt={currentCert.title} 
                        style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "0" }}
                    />
                </div>

                <button onClick={next} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow" style={{ backgroundColor: "#F4C6FF", color: "#843799", border: "none" }} aria-label="Next">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M9 18l6-6-6-6" /></svg>
                </button>
            </div>
            
            {/* Dots Indicators */}
            <div className="flex items-center gap-2 mt-5">
                {certificates.map((_, i) => (
                    <button key={i} onClick={() => setCurrent(i)} className="rounded-full transition-all duration-300 cursor-pointer border-0 p-0" style={{ width: i === current ? "20px" : "8px", height: "8px", backgroundColor: i === current ? "#843799" : "#F4C6FF" }} aria-label={`Slide ${i + 1}`} />
                ))}
            </div>
        </div>
    );
}

export default function TentangKami({ featuredProducts = [], certificates = [], awards = [], ourValues = [] }) {
    const { site_settings } = usePage().props;
    const valuesScrollRef = useRef(null);

    const bannerHero = site_settings?.about_banner || '/images/hero.webp';
    const aboutTitle = site_settings?.about_title || 'Kisah & Dedikasi Raia Food';
    const aboutDesc = site_settings?.about_description || 'Menyajikan produk berkualitas tinggi untuk hidup yang lebih sehat, dengan dedikasi penuh pada keaslian rasa Nusantara.';
    const aboutVision = site_settings?.about_vision || 'Menjadi produsen camilan terkemuka yang melestarikan cita rasa khas Nusantara dengan kualitas terbaik dan inovasi modern.';
    const aboutMission = site_settings?.about_mission ? site_settings.about_mission.split('\n').filter(Boolean) : misiItems;

    return (
        <ShopLayout>
            <Head title="Tentang Kami - RaiaFood" />

            {/* ── HERO BANNER (Rasio 3:1 konsisten dengan Beranda) ─────────────────────────────────────────── */}
            <div className="w-full max-w-[92vw] xl:max-w-[88vw] 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
                <section
                    className="w-full relative overflow-hidden flex items-center aspect-[3/1] rounded-2xl lg:rounded-3xl shadow-sm"
                    style={{ backgroundColor: "#FAE6FF" }}
                >
                    <img src={bannerHero} alt="Tentang Kami Hero" className="absolute inset-0 w-full h-full object-cover object-center" />
                    <div className="w-[50%] h-full z-10 relative pl-[6%] pr-[2%] flex items-center">
                        <h1 className="leading-tight" style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: SZ(64), color: "#60396B", margin: 0 }}>
                            Tentang Kami
                        </h1>
                    </div>
                </section>
            </div>

            {/* ── WHITE GAP ────────────────────────────────────────────── */}
            <div style={{ height: SZ(15), backgroundColor: "#ffffff" }} />

            {/* ── SEKILAS TENTANG KAMI ─────────────────────────────────── */}
            <div className="w-full max-w-[92vw] xl:max-w-[88vw] 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                <section style={{ width: "100%", backgroundColor: "#ffffff" }}>
                    <div style={{
                        borderRadius: SZ(15),
                        padding: `${SZ(32)} ${SZ(36)}`,
                        display: "flex",
                        alignItems: "flex-start",
                        gap: SZ(24),
                        backgroundColor: "#FAE6FF",
                    }}>
                        <div style={{
                            flexShrink: 0,
                            width: SZ(64),
                            height: SZ(64),
                            borderRadius: "50%",
                            backgroundColor: "#ffffff",
                            boxShadow: "0 2px 8px rgba(132, 55, 153, 0.08)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                            <img src={site_settings?.site_favicon || '/images/raia-logo.webp'} alt="RaiaFood Favicon" style={{ width: SZ(38), height: SZ(38), objectFit: "contain" }} />
                        </div>
                        <div>
                            <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: SZ(24), color: "#60396B", marginBottom: SZ(10) }}>
                                Sekilas tentang kami
                            </h3>
                            <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: SZ(16), color: "#60396A", lineHeight: 1.7 }}>
                                {site_settings?.about_description || 'luxury raiafood adalah toko online terpercaya yang menyediakan produk-produk berkualitas premium dengan Harga terbaik. kami berkomitmen untuk memberikan pengalaman belanja yang nyaman dan memuaskan bagi pelanggan.'}
                            </p>
                        </div>
                    </div>
                </section>
            </div>

            {/* ── WHITE GAP ────────────────────────────────────────────── */}
            <div style={{ height: SZ(15), backgroundColor: "#ffffff" }} />

            {/* ── VISI & MISI ─────────────────────────────────────────── */}
            <div className="w-full max-w-[92vw] xl:max-w-[88vw] 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                <section style={{ width: "100%", backgroundColor: "#ffffff" }}>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: SZ(26),
                    }}>
                        {/* Visi Card */}
                        <div style={{ borderRadius: SZ(15), padding: SZ(32), display: "flex", alignItems: "flex-start", gap: SZ(20), backgroundColor: "#FAE6FF" }}>
                            <div style={{
                                flexShrink: 0,
                                width: SZ(64),
                                height: SZ(64),
                                borderRadius: "50%",
                                backgroundColor: "#F4C6FF",
                                color: "#843799",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}>
                                <img src="/images/mata-visi.svg" alt="Visi" style={{ width: SZ(40), height: SZ(40), objectFit: "contain" }} />
                            </div>
                            <div>
                                <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: SZ(24), color: "#60396B", marginBottom: SZ(10) }}>Visi</h3>
                                <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: SZ(16), color: "#60396A", lineHeight: 1.7 }}>
                                    Menjadi pelopor makanan ringan premium yang menjaga dan melestarikan keaslian rasa serta tradisi kuliner Jawa, menghubungkan generasi masa kini dengan warisan budaya yang kaya dan otentik.
                                </p>
                            </div>
                        </div>

                        {/* Misi Card */}
                        <div style={{ borderRadius: SZ(15), padding: SZ(32), display: "flex", alignItems: "flex-start", gap: SZ(20), backgroundColor: "#FAE6FF" }}>
                            <div style={{
                                flexShrink: 0,
                                width: SZ(64),
                                height: SZ(64),
                                borderRadius: "50%",
                                backgroundColor: "#F4C6FF",
                                color: "#843799",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}>
                                <img src="/images/target-misi.svg" alt="Misi" style={{ width: SZ(40), height: SZ(40), objectFit: "contain" }} />
                            </div>
                            <div>
                                <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: SZ(24), color: "#60396B", marginBottom: SZ(10) }}>Misi</h3>
                                <ul style={{ display: "flex", flexDirection: "column", gap: SZ(8) }}>
                                    {misiItems.map((item, i) => (
                                        <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: SZ(8) }}>
                                            <img src="/images/checklist-misi.svg" alt="Checklist" style={{ width: SZ(16), height: SZ(16), flexShrink: 0, objectFit: "contain" }} />
                                            <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: SZ(12), color: "#60396A", lineHeight: 1.6 }}>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* ── WHITE GAP ────────────────────────────────────────────── */}
            <div style={{ height: SZ(15), backgroundColor: "#ffffff" }} />

            {/* ── NILAI KAMI (Card Vertikal, Dinamis CMS, Navigasi Swipe Kiri & Kanan Elegan) ─── */}
            <div className="w-full max-w-[92vw] xl:max-w-[88vw] 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                <section style={{ width: "100%", backgroundColor: "#FFFFFF" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: SZ(16), marginBottom: SZ(24) }}>
                        <div style={{ flex: 1, height: "1px", backgroundColor: "#E4A0F7" }} />
                        <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: SZ(32), color: "#843799", whiteSpace: "nowrap" }}>Nilai-Nilai Kami</h2>
                        <div style={{ flex: 1, height: "1px", backgroundColor: "#E4A0F7" }} />
                    </div>

                    {/* Container dengan Tombol Navigasi Kiri & Kanan */}
                    <div className="relative group/values-slider">
                        {/* Tombol Panah Kiri */}
                        <button
                            type="button"
                            onClick={() => {
                                if (valuesScrollRef.current) {
                                    valuesScrollRef.current.scrollBy({ left: -320, behavior: 'smooth' });
                                }
                            }}
                            className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg border border-purple-200 cursor-pointer bg-[#F4C6FF] text-[#843799] hover:bg-[#843799] hover:text-white"
                            aria-label="Scroll Nilai Kiri"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                <path d="M15 18l-6-6 6-6" />
                            </svg>
                        </button>

                        {/* Horizontal Scrollable Cards Container (Hidden Scrollbar) */}
                        <div 
                            ref={valuesScrollRef}
                            className="w-full overflow-x-auto pb-4 pt-2 snap-x flex gap-4 lg:gap-6 scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                        >
                            {(ourValues && ourValues.length > 0 ? ourValues : [
                                {
                                    id: 1,
                                    title: '"R" - Reverence (Penghormatan)',
                                    description: 'Menghormati alam, petani lokal, dan warisan kuliner leluhur Kota Batu. Kami percaya bahwa cita rasa sejati lahir dari penghormatan terhadap bumi dan tradisi.',
                                    icon_type: 'lucide',
                                    icon_value: 'CheckCircle2',
                                    font_size: 'sm',
                                },
                                {
                                    id: 2,
                                    title: '"A" - Authenticity (Keaslian)',
                                    description: 'Menjaga resep turun-temurun tanpa bahan pengawet buatan, mempertahankan cita rasa asli camilan khas Malang yang melegenda dan tak tergantikan.',
                                    icon_type: 'lucide',
                                    icon_value: 'Sparkles',
                                    font_size: 'sm',
                                },
                                {
                                    id: 3,
                                    title: '"I" - Innovation (Inovasi)',
                                    description: 'Mengembangkan teknik pengolahan higienis modern dan kemasan menarik agar produk tradisional kami dapat dinikmati lintas generasi dan ke berbagai daerah.',
                                    icon_type: 'lucide',
                                    icon_value: 'Lightbulb',
                                    font_size: 'sm',
                                },
                                {
                                    id: 4,
                                    title: '"A" - Affection (Kasih Sayang)',
                                    description: 'Dibuat dengan sepenuh hati untuk menghadirkan kebahagiaan dan kehangatan keluarga di setiap gigitan camilan renyah dan lezat kami.',
                                    icon_type: 'lucide',
                                    icon_value: 'Heart',
                                    font_size: 'sm',
                                }
                            ]).map((item, i) => (
                                <div
                                    key={item.id || i}
                                    className="flex-1 min-w-[260px] sm:min-w-[280px] lg:min-w-[calc(25%-18px)] max-w-full flex-shrink-0 bg-[#FAF0FC] hover:bg-[#F6E2FA] rounded-2xl lg:rounded-3xl p-6 sm:p-7 flex flex-col items-center text-center transition-all duration-300 shadow-sm hover:shadow-md border border-purple-100/80 snap-start group"
                                >
                                    {/* Circle Icon Badge di Bagian Atas */}
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#843799] flex items-center justify-center text-white mb-4 sm:mb-5 shadow-md shadow-purple-200 group-hover:scale-110 transition-transform duration-300">
                                        <ValueIconRender type={item.icon_type} value={item.icon_value} className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                                    </div>

                                    {/* Judul Nilai */}
                                    <h3
                                        className="font-bold text-[#843799] mb-3 leading-snug"
                                        style={{
                                            fontFamily: "Outfit, sans-serif",
                                            fontSize: "clamp(15px, 1.2vw, 19px)"
                                        }}
                                    >
                                        {item.title}
                                    </h3>

                                    {/* Deskripsi Nilai dengan Font Size yang dapat di-adjust */}
                                    <p
                                        className={`text-gray-700 font-normal leading-relaxed ${
                                            item.font_size === 'xs' ? 'text-xs sm:text-[13px]' :
                                            item.font_size === 'sm' ? 'text-xs sm:text-sm' :
                                            item.font_size === 'base' ? 'text-sm sm:text-base' :
                                            'text-base sm:text-lg'
                                        }`}
                                        style={{ fontFamily: "Inter, sans-serif" }}
                                    >
                                        {item.description}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Tombol Panah Kanan */}
                        <button
                            type="button"
                            onClick={() => {
                                if (valuesScrollRef.current) {
                                    valuesScrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
                                }
                            }}
                            className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg border border-purple-200 cursor-pointer bg-[#F4C6FF] text-[#843799] hover:bg-[#843799] hover:text-white"
                            aria-label="Scroll Nilai Kanan"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                <path d="M9 18l6-6-6-6" />
                            </svg>
                        </button>
                    </div>
                </section>
            </div>

            {/* ── WHITE GAP ────────────────────────────────────────────── */}
            <div style={{ height: SZ(15), backgroundColor: "#ffffff" }} />

            {/* ── SERTIFIKASI (Gallery 1: Atas) ────────────────────────────── */}
            {certificates && certificates.length > 0 && (
                <>
                    <div className="w-full max-w-[92vw] xl:max-w-[88vw] 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                        <section style={{ width: "100%", backgroundColor: "#ffffff" }}>
                            <div className="max-w-3xl mx-auto">
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: SZ(16), marginBottom: SZ(40) }}>
                                    <div style={{ flex: 1, height: "1px", backgroundColor: "#C57FDC" }} />
                                    <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: SZ(32), color: "#843799", whiteSpace: "nowrap" }}>Sertifikasi</h2>
                                    <div style={{ flex: 1, height: "1px", backgroundColor: "#C57FDC" }} />
                                </div>
                                <SertifikatCarousel certificates={certificates} />
                            </div>
                        </section>
                    </div>

                    {/* ── WHITE GAP ────────────────────────────────────────────── */}
                    <div style={{ height: SZ(15), backgroundColor: "#ffffff" }} />
                </>
            )}

            {/* ── PENGHARGAAN (Gallery 2: Bawah) ────────────────────────────── */}
            {awards && awards.length > 0 && (
                <>
                    <div className="w-full max-w-[92vw] xl:max-w-[88vw] 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                        <section style={{ width: "100%", backgroundColor: "#ffffff" }}>
                            <div className="max-w-3xl mx-auto">
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: SZ(16), marginBottom: SZ(40) }}>
                                    <div style={{ flex: 1, height: "1px", backgroundColor: "#C57FDC" }} />
                                    <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: SZ(32), color: "#843799", whiteSpace: "nowrap" }}>Penghargaan</h2>
                                    <div style={{ flex: 1, height: "1px", backgroundColor: "#C57FDC" }} />
                                </div>
                                <SertifikatCarousel certificates={awards} />
                            </div>
                        </section>
                    </div>

                    {/* ── WHITE GAP ────────────────────────────────────────────── */}
                    <div style={{ height: SZ(15), backgroundColor: "#ffffff" }} />
                </>
            )}

            {/* ── JELAJAHI PRODUK KAMI ─────────────────────────────────── */}
            <div className="w-full max-w-[92vw] xl:max-w-[88vw] 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                <section style={{ width: "100%", backgroundColor: "#ffffff" }}>
                    <div style={{
                        width: "100%",
                        position: "relative",
                        overflow: "hidden",
                        borderRadius: SZ(15),
                        aspectRatio: "1200 / 131",
                        backgroundColor: "#FAE6FF",
                        display: "flex",
                        alignItems: "center",
                    }}>
                        {/* Background image */}
                        <img src="/images/jelajahi-produk.webp" alt="Jelajahi Produk" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
                        {/* Content positioned in the middle area (between left orchid and right brown sugar blocks) */}
                        <div style={{ position: "relative", zIndex: 10, width: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingLeft: "26%", paddingRight: "26%", gap: SZ(16) }}>
                            <div>
                                <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: SZ(32), color: "#843799", marginBottom: SZ(4), lineHeight: 1.1 }}>Jelajahi Produk Kami</h2>
                                <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: SZ(12), color: "#843799", lineHeight: 1.4 }}>
                                    Rasakan kelezatan khas Jawa dalam setiap gigitan.<br />Temukan favoritmu sekarang!
                                </p>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: SZ(6), flexShrink: 0 }}>
                                <Link href="/products" style={{ display: "inline-flex", alignItems: "center", justifyContent: "space-between", gap: SZ(16), paddingLeft: SZ(16), paddingRight: SZ(16), paddingTop: SZ(8), paddingBottom: SZ(8), borderRadius: SZ(10), backgroundColor: "#843799", transition: "opacity 0.2s", minWidth: SZ(160) }}
                                    onMouseEnter={e => { e.currentTarget.style.opacity = "0.85"; }}
                                    onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
                                >
                                    <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: SZ(12), color: "#ffffff" }}>Belanja Sekarang</span>
                                    <svg style={{ width: SZ(14), height: SZ(14), color: "#ffffff" }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                </Link>
                                <Link href="#contact" style={{ display: "inline-flex", alignItems: "center", justifyContent: "space-between", gap: SZ(16), paddingLeft: SZ(16), paddingRight: SZ(16), paddingTop: SZ(8), paddingBottom: SZ(8), borderRadius: SZ(10), border: "1px solid #843799", color: "#843799", backgroundColor: "rgba(255,255,255,0.6)", transition: "background-color 0.2s, box-shadow 0.2s", minWidth: SZ(160) }}
                                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.9)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(132,55,153,0.15)"; }}
                                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.6)"; e.currentTarget.style.boxShadow = "none"; }}
                                >
                                    <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: SZ(12) }}>Hubungi Kami</span>
                                    <svg style={{ width: SZ(14), height: SZ(14) }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* ── WHITE GAP (before footer) ─────────────────────────── */}
            <div style={{ height: SZ(15), backgroundColor: "#ffffff" }} />

            <style>{`
                @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
                .animate-fade-in { animation: fadeIn 0.3s ease-out; }
            `}</style>
        </ShopLayout>
    );
}