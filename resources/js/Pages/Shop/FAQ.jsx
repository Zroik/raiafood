import { Head, Link, usePage } from "@inertiajs/react";
import { useState, useMemo } from "react";
import ShopLayout from "@/Layouts/ShopLayout";

// Scalable spacing (ref = 1280px)
const SZ = (px) => `clamp(${Math.round(px * 0.75)}px, ${(px / 1280 * 100 * 0.8).toFixed(3)}vw, ${Math.round(px * 1.5)}px)`;

const fallbackFaqs = [
    {
        id: 1,
        category: "Pemesanan",
        title: "Cara Pemesanan Produk",
        iconPath: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z",
        content: "Anda dapat melakukan pemesanan langsung melalui website resmi RaiaFood dengan memilih produk ke keranjang belanja, atau melalui chat WhatsApp resmi kami, serta melalui marketplace resmi seperti Shopee dan Tokopedia.",
    },
    {
        id: 2,
        category: "Pengiriman",
        title: "Ketentuan & Ekspedisi Pengiriman",
        iconPath: "M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11a2 2 0 012 2v3m0 0h2l3 5v3h-2m-3-8H8m5 8a2 2 0 100 4 2 2 0 000-4zm-8 0a2 2 0 100 4 2 2 0 000-4z",
        content: "Kami melayani pengiriman ke seluruh wilayah Indonesia menggunakan ekspedisi terpercaya (JNE, POS Indonesia, TIKI). Setiap pesanan dikemas dengan bubble wrap tebal dan kardus khusus agar kue dan camilan tiba dalam kondisi utuh dan renyah.",
    },
    {
        id: 3,
        category: "Sertifikasi",
        title: "Perizinan & Sertifikasi Halal",
        iconPath: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622C17.176 19.29 21 14.591 21 9a12.02 12.02 0 00-.382-3.016z",
        content: "Seluruh produk dari RaiaFood telah memiliki Izin Edar resmi dan tersertifikasi Halal oleh BPJPH/MUI. Anda dapat menikmati setiap gigitan dengan rasa aman, halal, dan terjamin higienitasnya.",
    },
    {
        id: 4,
        category: "Produk",
        title: "Kualitas Bahan & Ketahanan Produk",
        iconPath: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
        content: "Setiap produk RaiaFood menggunakan bahan baku pilihan berkualitas tinggi tanpa bahan pengawet berbahaya. Untuk menjamin mutu, kami bekerjasama dengan Disperindag Kota Batu, BPOM RI, dan PLUT Kota Batu. Daya tahan produk berkisar antara 3 hingga 6 bulan dalam kemasan kedap udara.",
    },
    {
        id: 5,
        category: "Layanan",
        title: "Layanan Konsumen & Bantuan Pelanggan",
        iconPath: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z",
        content: "Tim Customer Service kami siap melayani dan mendampingi pesanan Anda setiap hari:\n• WhatsApp: 0812-2277-7468 (08.00 - 20.00 WIB)\n• Email: raiafoodcentre@gmail.com\n• Instagram: @raiafood.id",
    },
];

const defaultIcon = "M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z";

function FaqItem({ item, index, isOpen, onToggle }) {
    return (
        <div
            className={`group rounded-2xl transition-all duration-300 bg-white overflow-hidden ${
                isOpen
                    ? "border-2 shadow-md"
                    : "border border-slate-200/80 hover:border-slate-300 hover:shadow-xs"
            }`}
            style={{
                borderColor: isOpen ? "var(--color-primary, #843799)" : undefined,
            }}
        >
            <button
                type="button"
                onClick={onToggle}
                className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer transition-colors duration-300 outline-none select-none"
                style={{
                    backgroundColor: isOpen ? "var(--color-soft, #FAE6FF)" : "transparent",
                }}
            >
                <div className="flex items-center gap-3.5 sm:gap-4 flex-1">
                    {/* Icon Badge */}
                    <div
                        className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
                        style={{
                            backgroundColor: isOpen ? "var(--color-primary, #843799)" : "var(--color-soft, #FAE6FF)",
                            color: isOpen ? "#ffffff" : "var(--color-primary, #843799)",
                            boxShadow: isOpen ? "0 2px 8px -2px rgba(0, 0, 0, 0.15)" : "none",
                        }}
                    >
                        <svg
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-5 h-5 sm:w-5.5 sm:h-5.5"
                            viewBox="0 0 24 24"
                        >
                            <path d={item.iconPath || defaultIcon} />
                        </svg>
                    </div>

                    <div className="flex-1 min-w-0">
                        {item.category && (
                            <span
                                className="inline-block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md mb-1 transition-colors duration-300"
                                style={{
                                    backgroundColor: isOpen ? "#ffffff" : "var(--color-soft, #FAE6FF)",
                                    color: "var(--color-primary, #843799)",
                                    boxShadow: isOpen ? "0 1px 2px 0 rgba(0, 0, 0, 0.05)" : "none",
                                }}
                            >
                                {item.category}
                            </span>
                        )}
                        <h3
                            style={{
                                fontFamily: "Outfit, sans-serif",
                                color: "var(--color-dark, #1e1b4b)",
                            }}
                            className={`text-base sm:text-lg leading-snug tracking-tight transition-colors duration-200 ${
                                isOpen ? "font-bold" : "font-semibold text-slate-800"
                            }`}
                        >
                            {item.title}
                        </h3>
                    </div>
                </div>

                {/* Rotating Indicator */}
                <div
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ml-2"
                    style={{
                        backgroundColor: isOpen ? "var(--color-primary, #843799)" : "var(--color-soft, #FAE6FF)",
                        color: isOpen ? "#ffffff" : "var(--color-primary, #843799)",
                    }}
                >
                    <svg
                        className={`w-4 h-4 transition-transform duration-300 ease-in-out ${isOpen ? "rotate-180" : "rotate-0"}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </button>

            {/* Collapsible Answer Body with Smooth Grid Transition (Zero Snappiness) */}
            <div
                className="grid transition-all duration-300 ease-in-out"
                style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                }}
            >
                <div className="overflow-hidden min-h-0">
                    <div
                        className="px-5 py-5 sm:px-6 sm:py-6 sm:pl-[76px] transition-all duration-300 ease-in-out border-t border-slate-100/90"
                        style={{
                            opacity: isOpen ? 1 : 0,
                            transform: isOpen ? "translateY(0)" : "translateY(-4px)",
                        }}
                    >
                        <p
                            style={{
                                fontFamily: "Inter, sans-serif",
                                color: "#334155",
                                lineHeight: 1.8,
                            }}
                            className="text-sm sm:text-[15.5px] font-normal whitespace-pre-line m-0"
                        >
                            {item.content}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function FAQ({ faqs }) {
    const { site_settings } = usePage().props;
    const [openId, setOpenId] = useState(1); // First item open by default for immediate engagement
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("Semua");

    const toggle = (id) => setOpenId((prev) => (prev === id ? null : id));
    const list = faqs && faqs.length > 0 ? faqs : fallbackFaqs;

    // Extract unique categories
    const categories = useMemo(() => {
        const set = new Set();
        list.forEach((f) => {
            if (f.category) set.add(f.category);
        });
        return ["Semua", ...Array.from(set)];
    }, [list]);

    // Filter FAQs based on search and category
    const filteredFaqs = useMemo(() => {
        return list.filter((item) => {
            const matchesCategory = activeCategory === "Semua" || item.category === activeCategory;
            const query = searchQuery.toLowerCase().trim();
            const matchesSearch =
                !query ||
                item.title.toLowerCase().includes(query) ||
                item.content.toLowerCase().includes(query) ||
                (item.category && item.category.toLowerCase().includes(query));
            return matchesCategory && matchesSearch;
        });
    }, [list, activeCategory, searchQuery]);

    const whatsappNumber = site_settings?.whatsapp_number || "6281222777468";
    const bannerHero = site_settings?.faq_banner || "/images/faq.webp";

    return (
        <ShopLayout>
            <Head title="FAQ - Pertanyaan Umum - RaiaFood" />

            {/* ── HERO BANNER (Rasio 3:1 konsisten dengan Beranda) ─────────────────────────────────────────── */}
            <div className="w-full max-w-[92vw] xl:max-w-[88vw] 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
                <section
                    className="w-full relative overflow-hidden flex items-center aspect-[3/1] rounded-2xl lg:rounded-3xl shadow-sm"
                    style={{ backgroundColor: "var(--color-soft)" }}
                >
                    <img src={bannerHero} alt="FAQ Hero" className="absolute inset-0 w-full h-full object-cover object-center" />
                    <div className="w-full z-10 relative flex flex-col items-center justify-center text-center px-8 py-[3%] select-none">
                        <h1
                            style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: SZ(64), color: "var(--color-dark)", marginBottom: SZ(8), lineHeight: 1.1 }}
                        >
                            Pertanyaan Umum (FAQ)
                        </h1>
                        <div style={{ width: SZ(60), height: "3px", backgroundColor: "var(--color-primary)", marginBottom: SZ(14), borderRadius: "9999px" }} />
                        <p
                            style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: SZ(18), color: "var(--color-primary)", maxWidth: SZ(640), lineHeight: 1.5 }}
                        >
                            Temukan jawaban cepat seputar pemesanan, pengiriman, keaslian rasa, dan jaminan mutu camilan RaiaFood.
                        </p>
                    </div>
                </section>
            </div>

            {/* ── FAQ LIST CONTAINER (Modern, elevated, high-contrast) ────────────────────────────────────── */}
            <div className="w-full max-w-[92vw] xl:max-w-[88vw] 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-10 relative z-10">
                <div className="bg-white rounded-3xl border border-slate-200/90 shadow-md p-6 sm:p-10 space-y-6">
                    {/* Search & Category Filter Bar */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                        {/* Interactive Search Input */}
                        <div className="relative flex-1 max-w-md">
                            <svg
                                className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Cari topik atau pertanyaan..."
                                className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all"
                                style={{
                                    borderColor: searchQuery ? "var(--color-primary, #843799)" : undefined,
                                }}
                            />
                            {searchQuery && (
                                <button
                                    type="button"
                                    onClick={() => setSearchQuery("")}
                                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 text-xs cursor-pointer p-0.5"
                                >
                                    ✕
                                </button>
                            )}
                        </div>

                        {/* Category Filter Pills */}
                        {categories.length > 1 && (
                            <div className="flex items-center gap-1.5 flex-wrap">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        type="button"
                                        onClick={() => setActiveCategory(cat)}
                                        className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 cursor-pointer ${
                                            activeCategory === cat
                                                ? "text-white shadow-xs"
                                                : "bg-slate-100 text-slate-600 hover:bg-slate-200/80"
                                        }`}
                                        style={
                                            activeCategory === cat
                                                ? { backgroundColor: "var(--color-primary, #843799)" }
                                                : undefined
                                        }
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* FAQ Items List */}
                    {filteredFaqs.length === 0 ? (
                        <div className="text-center py-12 px-4">
                            <div
                                className="w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-3"
                                style={{ backgroundColor: "var(--color-soft, #FAE6FF)", color: "var(--color-primary, #843799)" }}
                            >
                                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                                    <line x1="12" y1="17" x2="12.01" y2="17" strokeWidth={2.5} />
                                </svg>
                            </div>
                            <h4 style={{ fontFamily: "Outfit, sans-serif" }} className="font-bold text-slate-800 text-base mb-1">
                                Pertanyaan Tidak Ditemukan
                            </h4>
                            <p style={{ fontFamily: "Inter, sans-serif" }} className="text-slate-500 text-xs sm:text-sm max-w-sm mx-auto mb-4">
                                Tidak ada FAQ yang cocok dengan kata kunci "{searchQuery}". Anda bisa langsung menanyakannya pada tim kami via WhatsApp.
                            </p>
                            <button
                                type="button"
                                onClick={() => {
                                    setSearchQuery("");
                                    setActiveCategory("Semua");
                                }}
                                className="text-xs font-semibold px-4 py-2 rounded-xl transition-all"
                                style={{
                                    backgroundColor: "var(--color-soft, #FAE6FF)",
                                    color: "var(--color-primary, #843799)",
                                }}
                            >
                                Reset Pencarian
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-3.5">
                            {filteredFaqs.map((item, index) => (
                                <FaqItem
                                    key={item.id || index}
                                    item={item}
                                    index={index}
                                    isOpen={openId === item.id}
                                    onToggle={() => toggle(item.id)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* ── MASIH BUTUH BANTUAN BANNER (Tombol diperbesar 25% sesuai permintaan) ───────────────────── */}
            <div className="w-full max-w-[92vw] xl:max-w-[88vw] 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
                <div style={{ position: "relative", width: "100%", overflow: "hidden", borderRadius: "20px" }}>
                    {/* Banner image */}
                    <img src="/images/masih-butuh-bantuan.webp" alt="Masih Butuh Bantuan" style={{ width: "100%", display: "block", objectFit: "cover" }} />

                    {/* Overlay content */}
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            paddingLeft: "25%",
                            paddingRight: SZ(32),
                            gap: SZ(36),
                        }}
                    >
                        {/* Text Content */}
                        <div>
                            <h2
                                style={{
                                    fontFamily: "Outfit, sans-serif",
                                    fontWeight: 700,
                                    fontSize: SZ(32),
                                    color: "var(--color-dark)",
                                    marginBottom: SZ(8),
                                    lineHeight: 1.2,
                                }}
                            >
                                Masih Butuh Bantuan?
                            </h2>
                            <p
                                style={{
                                    fontFamily: "Inter, sans-serif",
                                    fontWeight: 500,
                                    fontSize: SZ(20),
                                    color: "var(--color-dark)",
                                    lineHeight: 1.5,
                                }}
                            >
                                Tim kami siap membantu menjawab pertanyaan Anda<br />dengan cepat dan ramah.
                            </p>
                        </div>

                        {/* Buttons - DIPERBESAR 25% (Padding: 13x25px, Font: 20px, Icon: 23px, Radius: 13px) */}
                        <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", gap: SZ(12) }}>
                            {/* Tombol 1: Chat WhatsApp */}
                            <a
                                href={`https://wa.me/${whatsappNumber}`}
                                target="_blank"
                                rel="noreferrer"
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: SZ(10),
                                    paddingLeft: SZ(25),
                                    paddingRight: SZ(25),
                                    paddingTop: SZ(13),
                                    paddingBottom: SZ(13),
                                    borderRadius: SZ(13),
                                    backgroundColor: "var(--color-primary)",
                                    textDecoration: "none",
                                    whiteSpace: "nowrap",
                                    transition: "opacity 0.2s, transform 0.2s",
                                    minWidth: SZ(200),
                                    boxShadow: "0 4px 14px rgba(0,0,0,0.12)",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.opacity = "0.9";
                                    e.currentTarget.style.transform = "translateY(-1px)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.opacity = "1";
                                    e.currentTarget.style.transform = "translateY(0)";
                                }}
                            >
                                <svg fill="#ffffff" viewBox="0 0 24 24" style={{ width: SZ(23), height: SZ(23), flexShrink: 0 }}>
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: SZ(20), color: "#ffffff" }}>
                                    Chat WhatsApp
                                </span>
                            </a>

                            {/* Tombol 2: Hubungi Kami */}
                            <Link
                                href="/hubungi-kami"
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: SZ(10),
                                    paddingLeft: SZ(25),
                                    paddingRight: SZ(25),
                                    paddingTop: SZ(13),
                                    paddingBottom: SZ(13),
                                    borderRadius: SZ(13),
                                    border: "2px solid var(--color-primary)",
                                    backgroundColor: "rgba(255,255,255,0.85)",
                                    textDecoration: "none",
                                    whiteSpace: "nowrap",
                                    transition: "background-color 0.2s, transform 0.2s",
                                    minWidth: SZ(200),
                                    boxShadow: "0 4px 14px rgba(0,0,0,0.06)",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = "#ffffff";
                                    e.currentTarget.style.transform = "translateY(-1px)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.85)";
                                    e.currentTarget.style.transform = "translateY(0)";
                                }}
                            >
                                <svg
                                    fill="none"
                                    stroke="var(--color-primary)"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    viewBox="0 0 24 24"
                                    style={{ width: SZ(23), height: SZ(23), flexShrink: 0 }}
                                >
                                    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: SZ(20), color: "var(--color-primary)" }}>
                                    Hubungi Kami
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </ShopLayout>
    );
}
