import { Head, Link } from "@inertiajs/react";
import { useState } from "react";
import ShopLayout from "@/Layouts/ShopLayout";

// SZ: min=px*0.75, preferred=vw*0.8, max=px*1.5
const SZ = (px) => `clamp(${Math.round(px * 0.75)}px, ${(px / 1280 * 100 * 0.8).toFixed(3)}vw, ${Math.round(px * 1.5)}px)`;

const fallbackFaqs = [
    {
        id: 1,
        category: "Pemesanan",
        title: "Cara Pemesanan",
        iconPath: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z",
        content: "Anda dapat melakukan pesanan melalui WhatsApp dan juga melalui marketplace seperti Shopee dan Tokopedia.",
    },
    {
        id: 2,
        category: "Pengiriman",
        title: "Pengiriman",
        iconPath: "M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11a2 2 0 012 2v3m0 0h2l3 5v3h-2m-3-8H8m5 8a2 2 0 100 4 2 2 0 000-4zm-8 0a2 2 0 100 4 2 2 0 000-4z",
        content: "Kami melayani pengiriman melalui kurir dan ekspedisi, serta menyediakan opsi COD untuk area tertentu.",
    },
    {
        id: 3,
        category: "Sertifikasi",
        title: "Perizinan dan Sertifikasi",
        iconPath: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622C17.176 19.29 21 14.591 21 9a12.02 12.02 0 00-.382-3.016z",
        content: "Produk dari Raia Food sudah mendapatkan Izin Edar dan juga Sertifikasi Halal.",
    },
    {
        id: 4,
        category: "Produk",
        title: "Kualitas Produk",
        iconPath: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
        content: "Setiap produk dari Raia Food menggunakan bahan-bahan berkualitas tinggi. Dan untuk menjamin kualitas produk terus terjaga, kami menjalin kerjasama dengan instansi-instansi terkait, diantaranya:\n• Disperindag Kota Batu\n• BPOM RI\n• PLUT Kota Batu",
    },
    {
        id: 5,
        category: "Layanan",
        title: "Layanan Konsumen",
        iconPath: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z",
        content: "Kami siap melayani anda melalui:\n• WhatsApp: 081.222.777.468 (Jam 08.00 - 19.00)\n• Email: raiafoodcentre@gmail.com\n• Instagram: @raiafood.id",
    },
];

const defaultIcon = "M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z";

function FaqItem({ item, index, isOpen, onToggle }) {
    return (
        <div style={{
            border: "1px solid #E4A0F7",
            borderRadius: "14px",
            backgroundColor: isOpen ? "#FAE6FF" : "#ffffff",
            transition: "background-color 0.2s",
            overflow: "hidden",
        }}>
            <button onClick={onToggle} style={{
                width: "100%", display: "flex", alignItems: "center",
                gap: "14px", padding: "16px 20px",
                background: "none", border: "none", cursor: "pointer", textAlign: "left",
            }}>
                {/* Icon circle */}
                <div style={{
                    flexShrink: 0, width: "38px", height: "38px", borderRadius: "50%",
                    backgroundColor: isOpen ? "#F4C6FF" : "#FAE6FF",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "background-color 0.2s",
                }}>
                    <svg fill="none" stroke="#843799" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
                        style={{ width: "18px", height: "18px" }} viewBox="0 0 24 24">
                        <path d={item.iconPath || defaultIcon} />
                    </svg>
                </div>
                {/* Title */}
                <span style={{ flex: 1, fontFamily: "Outfit, sans-serif", fontWeight: 600, fontSize: "16px", color: "#60396A", lineHeight: 1.3 }}>
                    {index + 1}. {item.title}
                </span>
                {/* Toggle +/- */}
                <div style={{
                    flexShrink: 0, width: "26px", height: "26px", borderRadius: "50%",
                    backgroundColor: isOpen ? "#843799" : "#F4C6FF",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "background-color 0.2s",
                }}>
                    <svg fill="none" stroke={isOpen ? "#ffffff" : "#843799"} strokeWidth="2.5"
                        viewBox="0 0 24 24" style={{ width: "11px", height: "11px" }}>
                        {isOpen
                            ? <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                            : <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16M4 12h16" />
                        }
                    </svg>
                </div>
            </button>
            {/* Collapsible content */}
            {isOpen && (
                <div style={{ paddingLeft: "72px", paddingRight: "24px", paddingBottom: "18px" }}>
                    <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: "14px", color: "#4B5563", lineHeight: 1.65, whiteSpace: "pre-line" }}>
                        {item.content}
                    </p>
                </div>
            )}
        </div>
    );
}

export default function FAQ({ faqs }) {
    const [openId, setOpenId] = useState(null);
    const toggle = (id) => setOpenId(prev => prev === id ? null : id);
    const list = faqs && faqs.length > 0 ? faqs : fallbackFaqs;

    return (
        <ShopLayout>
            <Head title="FAQ - RaiaFood" />

            {/* HERO (Rasio 3:1 konsisten dengan Beranda) */}
            <div className="w-full max-w-[92vw] xl:max-w-[88vw] 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
                <section
                    className="w-full relative overflow-hidden flex items-center aspect-[3/1] rounded-2xl lg:rounded-3xl shadow-sm"
                    style={{ backgroundColor: "#FAE6FF" }}
                >
                    <img src="/images/faq.webp" alt="FAQ Hero" className="absolute inset-0 w-full h-full object-cover object-center" />
                    <div className="w-full z-10 relative flex flex-col items-center justify-center text-center px-8 py-[3%]">
                        <h1 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: SZ(64), color: "#60396B", marginBottom: SZ(8), lineHeight: 1.1 }}>FAQ</h1>
                        <div style={{ width: SZ(60), height: "3px", backgroundColor: "#843799", marginBottom: SZ(16), borderRadius: "9999px" }} />
                        <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: SZ(20), color: "#843799", maxWidth: SZ(600), lineHeight: 1.5 }}>
                            Temukan jawaban cepat untuk pertanyaan seputar pemesanan, pengiriman, kualitas produk, dan layanan kami.
                        </p>
                    </div>
                </section>
            </div>

            {/* FAQ LIST overlapping hero */}
            <div className="w-full max-w-[92vw] xl:max-w-[88vw] 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-10 relative z-10">
                <div style={{ backgroundColor: "#FCF3FF", borderRadius: "18px", padding: "24px sm:32px" }} className="p-5 sm:p-7 shadow-sm">
                    <div className="flex flex-col gap-3">
                        {list.map((item, index) => (
                            <FaqItem key={item.id} item={item} index={index} isOpen={openId === item.id} onToggle={() => toggle(item.id)} />
                        ))}
                    </div>
                </div>
            </div>

            {/* MASIH BUTUH BANTUAN BANNER */}
            <div className="w-full max-w-[92vw] xl:max-w-[88vw] 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
                <div style={{ position: "relative", width: "100%", overflow: "hidden", borderRadius: "18px" }}>
                    {/* Banner image */}
                    <img src="/images/masih-butuh-bantuan.webp" alt="Masih Butuh Bantuan" style={{ width: "100%", display: "block", objectFit: "cover" }} />

                    {/* Overlay content - restored position & typography */}
                    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "flex-start", paddingLeft: "25%", paddingRight: SZ(32), gap: SZ(36) }}>
                        {/* Text - Original size */}
                        <div>
                            <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: SZ(32), color: "#60396A", marginBottom: SZ(8), lineHeight: 1.2 }}>
                                Masih Butuh Bantuan?
                            </h2>
                            <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: SZ(20), color: "#60396A", lineHeight: 1.5 }}>
                                Tim kami siap membantu menjawab pertanyaan Anda<br />dengan cepat dan ramah.
                            </p>
                        </div>
                        {/* Buttons - Slimmer, elegant & refined */}
                        <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", gap: SZ(10) }}>
                            <a href="https://wa.me/6281222777468" target="_blank" rel="noreferrer"
                                style={{ display: "inline-flex", alignItems: "center", gap: SZ(8), paddingLeft: SZ(20), paddingRight: SZ(20), paddingTop: SZ(10), paddingBottom: SZ(10), borderRadius: SZ(10), backgroundColor: "#843799", textDecoration: "none", whiteSpace: "nowrap", transition: "opacity 0.2s" }}
                                onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                                onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                            >
                                <svg fill="#ffffff" viewBox="0 0 24 24" style={{ width: SZ(18), height: SZ(18), flexShrink: 0 }}>
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: SZ(16), color: "#ffffff" }}>Chat WhatsApp</span>
                            </a>
                            <Link href="/hubungi-kami"
                                style={{ display: "inline-flex", alignItems: "center", gap: SZ(8), paddingLeft: SZ(20), paddingRight: SZ(20), paddingTop: SZ(10), paddingBottom: SZ(10), borderRadius: SZ(10), border: "1.5px solid #843799", backgroundColor: "rgba(255,255,255,0.75)", textDecoration: "none", whiteSpace: "nowrap", transition: "background-color 0.2s" }}
                                onMouseEnter={e => e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.97)"}
                                onMouseLeave={e => e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.75)"}
                            >
                                <svg fill="none" stroke="#843799" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" style={{ width: SZ(18), height: SZ(18), flexShrink: 0 }}>
                                    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: SZ(16), color: "#843799" }}>Hubungi Kami</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </ShopLayout>
    );
}
