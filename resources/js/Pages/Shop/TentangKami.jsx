import { Head, Link } from "@inertiajs/react";
import { useState } from "react";
import ShopLayout from "@/Layouts/ShopLayout";

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

export default function TentangKami({ featuredProducts = [], certificates = [] }) {
    return (
        <ShopLayout>
            <Head title="Tentang Kami - RaiaFood" />

            {/* ── HERO BANNER ─────────────────────────────────────────── */}
            <section className="w-full relative overflow-hidden flex items-center aspect-[1912/630]" style={{ backgroundColor: "#FAE6FF" }}>
                <img src="/images/hero.webp" alt="Tentang Kami Hero" className="absolute inset-0 w-full h-full object-cover object-center" />
                <div className="w-[48%] z-10 relative pl-[6%] pr-[2%] py-[2%] flex flex-col justify-center">
                    <div className="w-full">
                        {/* Outfit Bold 45 at 1280px ref */}
                        <h1 className="leading-tight" style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: SZ(45), color: "#60396B", marginBottom: SZ(6) }}>
                            Tentang Kami
                        </h1>
                        {/* Inter Bold 20 at 1280px ref */}
                        <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: SZ(20), color: "#843799", lineHeight: 1.4, marginBottom: SZ(8) }}>
                            Menghadirkan cita rasa khas Jawa<br />
                            dengan kualitas terbaik dan sentuhan modern.
                        </p>
                        {/* Inter Medium 16 at 1280px ref */}
                        <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: SZ(16), color: "#843799", lineHeight: 1.6 }}>
                            Raia Food hadir untuk memperkenalkan kembali kelezatan makanan khas Jawa kepada generasi masa kini dan mendatang.
                            Kami menggabungkan resep turun-temurun dengan inovasi modern untuk pengalaman rasa yang autentik dan berkesan.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── WHITE GAP ────────────────────────────────────────────── */}
            <div style={{ height: SZ(15), backgroundColor: "#ffffff" }} />

            {/* ── CERITA KAMI ─────────────────────────────────────────── */}
            {/* 40px side gap, r=15, image aspect 1200:314, text on right */}
            <section style={{ width: "100%", backgroundColor: "#ffffff", paddingLeft: SZ(40), paddingRight: SZ(40) }}>
                <div style={{
                    width: "100%",
                    borderRadius: SZ(15),
                    overflow: "hidden",
                    position: "relative",
                    backgroundColor: "#FAE6FF",
                    aspectRatio: "1200 / 314",
                }}>
                    {/* Image template: place /images/cerita-kami.webp (1200x314) */}
                    <img
                        src="/images/cerita-kami.webp"
                        alt="Cerita Kami"
                        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
                        onError={(e) => { e.currentTarget.style.display = "none"; }}
                    />

                    {/* Text panel on right side */}
                    <div style={{
                        position: "absolute",
                        top: 0, right: 0, bottom: 0,
                        width: "52%",
                        background: "linear-gradient(to right, rgba(250,230,255,0) 0%, rgba(250,230,255,0.95) 18%, #FAE6FF 100%)",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        paddingLeft: "clamp(8px,1.5vw,24px)",
                        paddingRight: SZ(32),
                    }}>
                        <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: SZ(20), color: "#843799", marginBottom: SZ(4) }}>Cerita Kami</p>
                        <h2 style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: SZ(17), color: "#60396B", marginBottom: SZ(10), lineHeight: 1.3 }}>
                            Lebih dari Sekedar Makanan,<br />Ini adalah Warisan
                        </h2>
                        <div style={{ display: "flex", flexDirection: "column", gap: SZ(8) }}>
                            {ceritaItems.map((item, i) => (
                                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: SZ(6) }}>
                                    <div style={{ flexShrink: 0, marginTop: SZ(2) }}>
                                        {item.icon}
                                    </div>
                                    <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: SZ(11), color: "#60396A", lineHeight: 1.5 }}>{item.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── WHITE GAP ────────────────────────────────────────────── */}
            <div style={{ height: SZ(15), backgroundColor: "#ffffff" }} />

            {/* ── VISI & MISI ─────────────────────────────────────────── */}
            <section style={{
                width: "100%",
                backgroundColor: "#ffffff",
                paddingLeft: SZ(40),
                paddingRight: SZ(40),
            }}>
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

            {/* ── WHITE GAP ────────────────────────────────────────────── */}
            <div style={{ height: SZ(15), backgroundColor: "#ffffff" }} />

            {/* ── NILAI KAMI ──────────────────────────────────────────── */}
            <section style={{ width: "100%", backgroundColor: "#FFFFFF" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: SZ(16), marginBottom: SZ(16), paddingLeft: SZ(40), paddingRight: SZ(40) }}>
                    <div style={{ flex: 1, height: "1px", backgroundColor: "#E4A0F7" }} />
                    <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: SZ(32), color: "#843799", whiteSpace: "nowrap" }}>Nilai Kami</h2>
                    <div style={{ flex: 1, height: "1px", backgroundColor: "#E4A0F7" }} />
                </div>

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: SZ(10),
                    paddingLeft: SZ(40),
                    paddingRight: SZ(40),
                    marginBottom: SZ(10),
                }}>
                    {nilaiRow1.map((item, i) => (
                        <div
                            key={i}
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                gap: SZ(12),
                                padding: SZ(20),
                                borderRadius: SZ(15),
                                backgroundColor: "#FAE6FF",
                                transition: "transform 0.2s, box-shadow 0.2s",
                                cursor: "default",
                            }}
                            onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.03)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(132,55,153,0.15)"; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}
                        >
                            <div style={{ flexShrink: 0 }}>{item.icon}</div>
                            <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: SZ(20), color: "#843799", lineHeight: 1.3 }}>{item.label}</span>
                        </div>
                    ))}
                </div>

                {/* Row 2: full-width edge-to-edge, no side padding */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: 0,
                }}>
                    {nilaiRow2.map((item, i) => (
                        <div
                            key={i}
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                gap: SZ(12),
                                padding: `${SZ(20)} ${SZ(40)}`,
                                backgroundColor: "#FAE6FF",
                                transition: "transform 0.2s, box-shadow 0.2s",
                                cursor: "default",
                            }}
                            onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.02)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(132,55,153,0.15)"; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}
                        >
                            <div style={{ flexShrink: 0 }}>{item.icon}</div>
                            <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: SZ(20), color: "#843799", lineHeight: 1.3 }}>{item.label}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── WHITE GAP ────────────────────────────────────────────── */}
            <div style={{ height: SZ(15), backgroundColor: "#ffffff" }} />

            {/* ── SERTIFIKASI & PENCAPAIAN ────────────────────────────── */}
            {certificates && certificates.length > 0 && (
                <>
                    <section style={{ width: "100%", paddingLeft: SZ(40), paddingRight: SZ(40), backgroundColor: "#ffffff" }}>
                        <div className="max-w-3xl mx-auto">
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: SZ(16), marginBottom: SZ(40) }}>
                                <div style={{ flex: 1, height: "1px", backgroundColor: "#C57FDC" }} />
                                <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: SZ(32), color: "#843799", whiteSpace: "nowrap" }}>Sertifikasi &amp; Pencapaian</h2>
                                <div style={{ flex: 1, height: "1px", backgroundColor: "#C57FDC" }} />
                            </div>
                            <SertifikatCarousel certificates={certificates} />
                        </div>
                    </section>

                    {/* ── WHITE GAP ────────────────────────────────────────────── */}
                    <div style={{ height: SZ(15), backgroundColor: "#ffffff" }} />
                </>
            )}

            {/* ── JELAJAHI PRODUK KAMI ─────────────────────────────────── */}
            {/* ref 1200x131, side gaps SZ(40), rounded SZ(15) */}
            <section style={{ width: "100%", backgroundColor: "#ffffff", paddingLeft: SZ(40), paddingRight: SZ(40) }}>
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

            {/* ── WHITE GAP (before footer) ─────────────────────────── */}
            <div style={{ height: SZ(15), backgroundColor: "#ffffff" }} />

            <style>{`
                @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
                .animate-fade-in { animation: fadeIn 0.3s ease-out; }
            `}</style>
        </ShopLayout>
    );
}