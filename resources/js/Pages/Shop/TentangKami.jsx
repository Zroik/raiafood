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
        <svg viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: SZ(20), height: SZ(20) }}>
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
    );
}
function IconSparkle() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: SZ(20), height: SZ(20) }}>
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    );
}
function IconBook() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: SZ(20), height: SZ(20) }}>
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
    );
}
function IconUser() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: SZ(20), height: SZ(20) }}>
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </svg>
    );
}
function IconMataVisi({ style, className }) {
    return (
        <svg viewBox="0 0 114 114" fill="none" xmlns="http://www.w3.org/2000/svg" style={style} className={className}>
            <path d="M104.31 54.15C85.5 27.93 48.45 21.66 22.23 41.04C15.39 46.17 9.69001 53.01 5.13 60.42C6.27 62.7 7.98001 64.98 9.69001 67.26C28.5 93.48 64.41 99.18 90.63 80.94C95.76 76.95 100.32 72.96 104.31 67.26C106.02 64.98 107.16 62.7 108.87 60.42C107.16 58.14 106.02 55.86 104.31 54.15ZM57.57 41.04C60.42 38.19 64.98 38.19 67.83 41.04C70.68 43.89 70.68 48.45 67.83 51.3C64.98 54.15 60.42 54.15 57.57 51.3C54.72 48.45 54.72 43.89 57.57 41.04ZM57 84.93C39.33 84.93 22.8 75.81 13.11 60.99C19.95 51.3 29.07 44.46 39.9 41.04C35.91 45.6 34.2 50.73 34.2 56.43C34.2 68.97 43.89 79.8 57 79.8C69.54 79.8 80.37 70.11 80.37 57V56.43C80.37 50.73 78.09 45.03 74.1 41.04C84.93 44.46 94.05 51.3 100.89 60.99C91.2 75.81 74.67 84.93 57 84.93Z" fill="var(--color-primary, #843799)" />
        </svg>
    );
}
function IconTargetMisi({ style, className }) {
    return (
        <svg viewBox="0 0 108 108" fill="none" xmlns="http://www.w3.org/2000/svg" style={style} className={className}>
            <path d="M54 9C55.1935 9 56.3381 9.47411 57.182 10.318C58.0259 11.1619 58.5 12.3065 58.5 13.5C58.5 14.6935 58.0259 15.8381 57.182 16.682C56.3381 17.5259 55.1935 18 54 18C46.8799 18 39.9196 20.1114 33.9995 24.0671C28.0793 28.0228 23.4651 33.6453 20.7403 40.2234C18.0156 46.8015 17.3027 54.0399 18.6917 61.0233C20.0808 68.0066 23.5095 74.4212 28.5442 79.4558C33.5788 84.4905 39.9934 87.9192 46.9767 89.3083C53.9601 90.6973 61.1985 89.9844 67.7766 87.2597C74.3547 84.5349 79.9772 79.9207 83.9329 74.0005C87.8886 68.0804 90 61.1201 90 54C90 52.8065 90.4741 51.6619 91.318 50.818C92.1619 49.9741 93.3065 49.5 94.5 49.5C95.6935 49.5 96.8381 49.9741 97.682 50.818C98.5259 51.6619 99 52.8065 99 54C99 78.8535 78.8535 99 54 99C29.1465 99 9 78.8535 9 54C9 29.1465 29.1465 9 54 9ZM54 27C55.1935 27 56.3381 27.4741 57.182 28.318C58.0259 29.1619 58.5 30.3065 58.5 31.5C58.5 32.6935 58.0259 33.8381 57.182 34.682C56.3381 35.5259 55.1935 36 54 36C50.4399 36 46.9598 37.0557 43.9997 39.0335C41.0397 41.0114 38.7325 43.8226 37.3702 47.1117C36.0078 50.4008 35.6513 54.02 36.3459 57.5116C37.0404 61.0033 38.7547 64.2106 41.2721 66.7279C43.7894 69.2453 46.9967 70.9596 50.4884 71.6541C53.98 72.3487 57.5992 71.9922 60.8883 70.6298C64.1774 69.2675 66.9886 66.9603 68.9665 64.0003C70.9443 61.0402 72 57.5601 72 54C72 52.8065 72.4741 51.6619 73.318 50.818C74.1619 49.9741 75.3065 49.5 76.5 49.5C77.6935 49.5 78.8381 49.9741 79.682 50.818C80.5259 51.6619 81 52.8065 81 54C81 59.3401 79.4165 64.5603 76.4497 69.0004C73.4829 73.4405 69.2661 76.9012 64.3325 78.9447C59.3988 80.9883 53.9701 81.523 48.7326 80.4812C43.4951 79.4394 38.6841 76.8679 34.9081 73.0919C31.1321 69.3159 28.5606 64.5049 27.5188 59.2674C26.477 54.0299 27.0117 48.6012 29.0553 43.6675C31.0988 38.7339 34.5595 34.5171 38.9996 31.5503C43.4397 28.5835 48.6599 27 54 27ZM83.5695 9.45C84.1662 9.45 84.7385 9.68705 85.1605 10.109C85.5824 10.531 85.8195 11.1033 85.8195 11.7V19.935C85.8207 20.531 86.0583 21.1021 86.4801 21.5231C86.9019 21.9441 87.4735 22.1805 88.0695 22.1805H96.3C96.8967 22.1805 97.469 22.4176 97.891 22.8395C98.313 23.2615 98.55 23.8338 98.55 24.4305V28.548L90.054 37.044C88.3666 38.7319 86.0778 39.6805 83.691 39.681H74.691L57.186 57.1815C56.3373 58.0012 55.2006 58.4548 54.0207 58.4445C52.8408 58.4343 51.7122 57.961 50.8778 57.1267C50.0435 56.2923 49.5702 55.1637 49.56 53.9838C49.5497 52.8039 50.0033 51.6672 50.823 50.8185L68.328 33.318V24.318C68.3273 21.9319 69.2742 19.6432 70.9605 17.955L79.4655 9.45H83.5695Z" fill="var(--color-primary, #843799)" />
        </svg>
    );
}
function IconChecklistMisi({ style, className }) {
    return (
        <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={style} className={className}>
            <path d="M13.5348 1.66669H6.33699C3.68683 1.66669 1.53845 3.81506 1.53845 6.46522V13.663C1.53845 16.3132 3.68683 18.4616 6.33699 18.4616H13.5348C16.1849 18.4616 18.3333 16.3132 18.3333 13.663V6.46522C18.3333 3.81506 16.1849 1.66669 13.5348 1.66669Z" fill="var(--color-primary, #843799)" />
            <path d="M6.57715 10.0641L8.80727 12.2942C8.85222 12.3389 8.91303 12.364 8.97642 12.364C9.0398 12.364 9.10061 12.3389 9.14556 12.2942L13.1751 8.26465" stroke="white" strokeWidth="2" strokeLinecap="round" />
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
                <button onClick={prev} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow" style={{ backgroundColor: "var(--color-secondary)", color: "var(--color-primary)", border: "none" }} aria-label="Previous">
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

                <button onClick={next} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow" style={{ backgroundColor: "var(--color-secondary)", color: "var(--color-primary)", border: "none" }} aria-label="Next">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M9 18l6-6-6-6" /></svg>
                </button>
            </div>
            
            {/* Dots Indicators */}
            <div className="flex items-center gap-2 mt-5">
                {certificates.map((_, i) => (
                    <button key={i} onClick={() => setCurrent(i)} className="rounded-full transition-all duration-300 cursor-pointer border-0 p-0" style={{ width: i === current ? "20px" : "8px", height: "8px", backgroundColor: i === current ? "var(--color-primary)" : "var(--color-secondary)" }} aria-label={`Slide ${i + 1}`} />
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
    const aboutVision = site_settings?.about_vision || 'Menjadi pelopor makanan ringan premium yang menjaga dan melestarikan keaslian rasa serta tradisi kuliner Jawa, menghubungkan generasi masa kini dengan warisan budaya yang kaya dan otentik.';
    const aboutMission = site_settings?.about_mission ? site_settings.about_mission.split('\n').filter(Boolean) : misiItems;
    const aboutCta = site_settings?.about_settings || {};

    return (
        <ShopLayout>
            <Head title="Tentang Kami - RaiaFood" />

            {/* ── HERO BANNER (Rasio 3:1 konsisten dengan Beranda) ─────────────────────────────────────────── */}
            <div className="w-full max-w-[92vw] xl:max-w-[88vw] 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
                <section
                    className="w-full relative overflow-hidden flex items-center aspect-[3/1] rounded-2xl lg:rounded-3xl shadow-sm"
                    style={{ backgroundColor: "var(--color-soft)" }}
                >
                    <img src={bannerHero} alt="Tentang Kami Hero" className="absolute inset-0 w-full h-full object-cover object-center" />
                    <div className="w-[50%] h-full z-10 relative pl-[6%] pr-[2%] flex items-center">
                        <h1 className="leading-tight" style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: SZ(64), color: "var(--color-dark)", margin: 0 }}>
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
                        backgroundColor: "var(--color-soft)",
                    }}>
                        <div style={{
                            flexShrink: 0,
                            width: SZ(64),
                            height: SZ(64),
                            borderRadius: "50%",
                            backgroundColor: "#ffffff",
                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                            <img src={site_settings?.site_favicon || '/images/raia-logo.webp'} alt="RaiaFood Favicon" style={{ width: SZ(38), height: SZ(38), objectFit: "contain" }} />
                        </div>
                        <div>
                            <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: SZ(24), color: "var(--color-dark)", marginBottom: SZ(10) }}>
                                Sekilas tentang kami
                            </h3>
                            <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: SZ(16), color: "var(--color-dark)", lineHeight: 1.7 }}>
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
                        <div style={{ borderRadius: SZ(15), padding: SZ(32), display: "flex", alignItems: "flex-start", gap: SZ(20), backgroundColor: "var(--color-soft)" }}>
                            <div style={{
                                flexShrink: 0,
                                width: SZ(64),
                                height: SZ(64),
                                borderRadius: "50%",
                                backgroundColor: "var(--color-secondary)",
                                color: "var(--color-primary)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}>
                                <IconMataVisi style={{ width: SZ(40), height: SZ(40) }} />
                            </div>
                            <div>
                                <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: SZ(24), color: "var(--color-dark)", marginBottom: SZ(10) }}>Visi</h3>
                                <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: SZ(16), color: "var(--color-dark)", lineHeight: 1.7 }}>
                                    {aboutVision}
                                </p>
                            </div>
                        </div>

                        {/* Misi Card */}
                        <div style={{ borderRadius: SZ(15), padding: SZ(32), display: "flex", alignItems: "flex-start", gap: SZ(20), backgroundColor: "var(--color-soft)" }}>
                            <div style={{
                                flexShrink: 0,
                                width: SZ(64),
                                height: SZ(64),
                                borderRadius: "50%",
                                backgroundColor: "var(--color-secondary)",
                                color: "var(--color-primary)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}>
                                <IconTargetMisi style={{ width: SZ(40), height: SZ(40) }} />
                            </div>
                            <div>
                                <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: SZ(24), color: "var(--color-dark)", marginBottom: SZ(10) }}>Misi</h3>
                                <ul style={{ display: "flex", flexDirection: "column", gap: SZ(8) }}>
                                    {aboutMission.map((item, i) => (
                                        <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: SZ(8) }}>
                                            <IconChecklistMisi style={{ width: SZ(16), height: SZ(16), flexShrink: 0 }} />
                                            <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: SZ(12), color: "var(--color-dark)", lineHeight: 1.6 }}>{item}</span>
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
                        <div style={{ flex: 1, height: "1px", backgroundColor: "var(--color-secondary)" }} />
                        <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: SZ(32), color: "var(--color-primary)", whiteSpace: "nowrap" }}>Nilai-Nilai Kami</h2>
                        <div style={{ flex: 1, height: "1px", backgroundColor: "var(--color-secondary)" }} />
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
                            className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg border border-gray-200 cursor-pointer text-white"
                            style={{ backgroundColor: "var(--color-primary)" }}
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
                                    style={{ backgroundColor: "var(--color-soft)" }}
                                    className="flex-1 min-w-[260px] sm:min-w-[280px] lg:min-w-[calc(25%-18px)] max-w-full flex-shrink-0 rounded-2xl lg:rounded-3xl p-6 sm:p-7 flex flex-col items-center text-center transition-all duration-300 shadow-sm hover:shadow-md border border-black/5 snap-start group"
                                >
                                    {/* Circle Icon Badge di Bagian Atas */}
                                    <div 
                                        style={{ backgroundColor: "var(--color-primary)" }}
                                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-white mb-4 sm:mb-5 shadow-md group-hover:scale-110 transition-transform duration-300"
                                    >
                                        <ValueIconRender type={item.icon_type} value={item.icon_value} className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                                    </div>

                                    {/* Judul Nilai */}
                                    <h3
                                        style={{
                                            color: "var(--color-primary)",
                                            fontFamily: "Outfit, sans-serif",
                                            fontSize: "clamp(15px, 1.2vw, 19px)"
                                        }}
                                        className="font-bold mb-3 leading-snug"
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
                            className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg border border-gray-200 cursor-pointer text-white"
                            style={{ backgroundColor: "var(--color-primary)" }}
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
                                    <div style={{ flex: 1, height: "1px", backgroundColor: "var(--color-secondary)" }} />
                                    <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: SZ(32), color: "var(--color-primary)", whiteSpace: "nowrap" }}>Sertifikasi</h2>
                                    <div style={{ flex: 1, height: "1px", backgroundColor: "var(--color-secondary)" }} />
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
                                    <div style={{ flex: 1, height: "1px", backgroundColor: "var(--color-secondary)" }} />
                                    <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: SZ(32), color: "var(--color-primary)", whiteSpace: "nowrap" }}>Penghargaan</h2>
                                    <div style={{ flex: 1, height: "1px", backgroundColor: "var(--color-secondary)" }} />
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
                        backgroundColor: "var(--color-soft)",
                        display: "flex",
                        alignItems: "center",
                    }}>
                        {/* Background image */}
                        <img src="/images/jelajahi-produk.webp" alt="Jelajahi Produk" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
                        {/* Content positioned in the middle area (between left orchid and right brown sugar blocks) */}
                        <div style={{ position: "relative", zIndex: 10, width: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingLeft: "26%", paddingRight: "26%", gap: SZ(16) }}>
                            <div>
                                <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: SZ(32), color: "var(--color-primary)", marginBottom: SZ(4), lineHeight: 1.1 }}>
                                    {aboutCta.cta_title || 'Jelajahi Produk Kami'}
                                </h2>
                                <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: SZ(12), color: "var(--color-primary)", lineHeight: 1.4, whiteSpace: 'pre-line' }}>
                                    {aboutCta.cta_subtitle || 'Rasakan kelezatan khas Jawa dalam setiap gigitan.\nTemukan favoritmu sekarang!'}
                                </p>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: SZ(6), flexShrink: 0 }}>
                                <Link href={aboutCta.cta_btn_link || '/products'} style={{ display: "inline-flex", alignItems: "center", justifyContent: "space-between", gap: SZ(16), paddingLeft: SZ(16), paddingRight: SZ(16), paddingTop: SZ(8), paddingBottom: SZ(8), borderRadius: SZ(10), backgroundColor: "var(--color-primary)", transition: "opacity 0.2s", minWidth: SZ(160) }}
                                    onMouseEnter={e => { e.currentTarget.style.opacity = "0.85"; }}
                                    onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
                                >
                                    <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: SZ(12), color: "#ffffff" }}>
                                        {aboutCta.cta_btn_text || 'Belanja Sekarang'}
                                    </span>
                                    <svg style={{ width: SZ(14), height: SZ(14), color: "#ffffff" }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                </Link>
                                <Link href="#contact" style={{ display: "inline-flex", alignItems: "center", justifyContent: "space-between", gap: SZ(16), paddingLeft: SZ(16), paddingRight: SZ(16), paddingTop: SZ(8), paddingBottom: SZ(8), borderRadius: SZ(10), border: "1px solid var(--color-primary)", color: "var(--color-primary)", backgroundColor: "rgba(255,255,255,0.6)", transition: "background-color 0.2s, box-shadow 0.2s", minWidth: SZ(160) }}
                                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.9)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)"; }}
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