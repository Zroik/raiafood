import { Head, Link } from "@inertiajs/react";
import { useState } from "react";
import ShopLayout from "@/Layouts/ShopLayout";
import axios from "axios";

// Scaleable spacing (ref = 1280px)
const SZ = (px) => `clamp(${Math.round(px * 0.5)}px, ${(px / 1280 * 100).toFixed(3)}vw, ${Math.round(px * 1.8)}px)`;

export default function HubungiKami() {
    const [form, setForm] = useState({ nama: "", email: "", whatsapp: "", deskripsi: "", pesan: "" });
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
    const handleSubmit = (e) => {
        e.preventDefault();
        setSending(true);
        axios.post(route('shop.contact.store'), form)
            .then(() => {
                setSending(false);
                setSent(true);
                setForm({ nama: "", email: "", whatsapp: "", deskripsi: "", pesan: "" });
            })
            .catch(() => {
                setSending(false);
                alert("Gagal mengirim pesan. Silakan coba lagi.");
            });
    };

    const inputBase = { width: "100%", border: "1px solid #E4A0F7", borderRadius: SZ(10), padding: `${SZ(10)} ${SZ(14)}`, fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: SZ(11), color: "rgba(0,0,0,0.4)", outline: "none", backgroundColor: "#ffffff", transition: "border-color 0.2s" };

    return (
        <ShopLayout>
            <Head title="Hubungi Kami - RaiaFood" />

            {/* HERO */}
            <section className="w-full relative overflow-hidden flex items-center aspect-[1912/630]" style={{ backgroundColor: "#FAE6FF" }}>
                <img src="/images/hero.webp" alt="Hubungi Kami Hero" className="absolute inset-0 w-full h-full object-cover object-center" />
                <div className="w-[48%] z-10 relative pl-[6%] pr-[2%] py-[2%] flex flex-col justify-center">
                    <h1 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 600, fontSize: SZ(45), color: "#843799", marginBottom: SZ(12), lineHeight: 1.2 }}>Kami Siap Membantu Anda</h1>
                    <p style={{ fontFamily: "Outfit, sans-serif", fontWeight: 400, fontSize: SZ(15), color: "#000000", lineHeight: 1.6 }}>
                        Punya pertanyaan, saran, atau ingin bekerja sama?<br />
                        Jangan ragu untuk menghubungi kami.<br />
                        Tim RAIA Food akan dengan senang hati membantu anda
                    </p>
                </div>
            </section>

            <div style={{ height: SZ(15), backgroundColor: "#ffffff" }} />

            {/* CONTACT CARDS */}
            <section style={{ width: "100%", backgroundColor: "#ffffff", paddingLeft: SZ(40), paddingRight: SZ(40) }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: SZ(20) }}>
                    {/* Alamat */}
                    <div style={{ backgroundColor: "#FAE6FF", borderRadius: SZ(15), padding: SZ(28), display: "flex", flexDirection: "column", gap: SZ(10) }}>
                        <div style={{ display: "flex", alignItems: "center", gap: SZ(14) }}>
                            <div style={{ flexShrink: 0, width: SZ(52), height: SZ(52), borderRadius: "50%", backgroundColor: "#F4C6FF", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <svg fill="none" stroke="#843799" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: SZ(26), height: SZ(26) }} viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            </div>
                            <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 600, fontSize: SZ(20), color: "#843799" }}>Alamat</h3>
                        </div>
                        <p style={{ fontFamily: "Outfit, sans-serif", fontWeight: 400, fontSize: SZ(15), color: "#000000", lineHeight: 1.55 }}>Jl. Diponegoro Gg. IV, Junrejo, Kec. Junrejo, Kota Batu, Jawa Timur 65321, Indonesia</p>
                        <a href="https://maps.google.com/?q=Jl.+Diponegoro+Gg.+IV,+Junrejo" target="_blank" rel="noreferrer" style={{ fontFamily: "Outfit, sans-serif", fontWeight: 400, fontSize: SZ(15), color: "#843799", display: "inline-flex", alignItems: "center", gap: SZ(4) }}>
                            Lihat di Peta <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ width: SZ(14), height: SZ(14) }}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                        </a>
                    </div>
                    {/* WhatsApp */}
                    <div style={{ backgroundColor: "#FAE6FF", borderRadius: SZ(15), padding: SZ(28), display: "flex", flexDirection: "column", gap: SZ(10) }}>
                        <div style={{ display: "flex", alignItems: "center", gap: SZ(14) }}>
                            <div style={{ flexShrink: 0, width: SZ(52), height: SZ(52), borderRadius: "50%", backgroundColor: "#F4C6FF", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <svg fill="#843799" style={{ width: SZ(26), height: SZ(26) }} viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                            </div>
                            <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 600, fontSize: SZ(20), color: "#843799" }}>WhatsApp</h3>
                        </div>
                        <p style={{ fontFamily: "Outfit, sans-serif", fontWeight: 500, fontSize: SZ(15), color: "#000000" }}>+62 812-2277-7468</p>
                        <p style={{ fontFamily: "Outfit, sans-serif", fontWeight: 400, fontSize: SZ(15), color: "#000000" }}>Respon setiap hari 08:00 - 20:00 WIB</p>
                        <a href="https://wa.me/6281222777468" target="_blank" rel="noreferrer" style={{ fontFamily: "Outfit, sans-serif", fontWeight: 400, fontSize: SZ(15), color: "#843799", display: "inline-flex", alignItems: "center", gap: SZ(4) }}>
                            Chat Sekarang <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ width: SZ(14), height: SZ(14) }}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                        </a>
                    </div>
                    {/* Email */}
                    <div style={{ backgroundColor: "#FAE6FF", borderRadius: SZ(15), padding: SZ(28), display: "flex", flexDirection: "column", gap: SZ(10) }}>
                        <div style={{ display: "flex", alignItems: "center", gap: SZ(14) }}>
                            <div style={{ flexShrink: 0, width: SZ(52), height: SZ(52), borderRadius: "50%", backgroundColor: "#F4C6FF", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <svg fill="none" stroke="#843799" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: SZ(26), height: SZ(26) }} viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                            </div>
                            <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 600, fontSize: SZ(20), color: "#843799" }}>Email</h3>
                        </div>
                        <p style={{ fontFamily: "Outfit, sans-serif", fontWeight: 500, fontSize: SZ(15), color: "#000000" }}>raiafoodcentre@gmail.com</p>
                        <p style={{ fontFamily: "Outfit, sans-serif", fontWeight: 400, fontSize: SZ(15), color: "#000000" }}>Kami akan membalas secepat mungkin</p>
                        <a href="mailto:raiafoodcentre@gmail.com" style={{ fontFamily: "Outfit, sans-serif", fontWeight: 400, fontSize: SZ(15), color: "#843799", display: "inline-flex", alignItems: "center", gap: SZ(4) }}>
                            Kirim Email <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ width: SZ(14), height: SZ(14) }}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                        </a>
                    </div>
                </div>
            </section>

            <div style={{ height: SZ(15), backgroundColor: "#ffffff" }} />

            {/* FORM + MAP */}
            <section style={{ width: "100%", backgroundColor: "#ffffff", paddingLeft: SZ(40), paddingRight: SZ(40) }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: SZ(26), alignItems: "start" }}>
                    {/* Form */}
                    <div style={{ backgroundColor: "#FCF3FF", borderRadius: SZ(15), padding: SZ(28) }}>
                        <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 600, fontSize: SZ(35), color: "#843799", marginBottom: SZ(8) }}>Kirim Pesan</h2>
                        <div style={{ width: SZ(40), height: "2px", backgroundColor: "#843799", marginBottom: SZ(12) }} />
                        <p style={{ fontFamily: "Outfit, sans-serif", fontWeight: 400, fontSize: SZ(15), color: "#000000", marginBottom: SZ(22) }}>Isi formulir di bawah ini dan tim kami akan segera merespon.</p>
                        {sent ? (
                            <div style={{ padding: SZ(24), borderRadius: SZ(15), backgroundColor: "#FAE6FF", border: "1px solid #E4A0F7", textAlign: "center" }}>
                                <p style={{ fontFamily: "Outfit, sans-serif", fontWeight: 600, fontSize: SZ(18), color: "#843799" }}>Pesan Terkirim!</p>
                                <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: SZ(13), color: "#000000", marginTop: SZ(8) }}>Terima kasih. Tim kami akan segera merespon.</p>
                                <button onClick={() => setSent(false)} style={{ marginTop: SZ(16), fontFamily: "Outfit, sans-serif", fontSize: SZ(13), color: "#843799", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>Kirim pesan lain</button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: SZ(12) }}>
                                {[
                                    { name: "nama", label: "Nama Lengkap*", type: "text", placeholder: "Nama Lengkap*" },
                                    { name: "email", label: "Email*", type: "email", placeholder: "Email*" },
                                    { name: "whatsapp", label: "No. WhatsApp*", type: "text", placeholder: "No. WhatsApp*" },
                                    { name: "deskripsi", label: "Deskripsi Singkat*", type: "text", placeholder: "Deskripsi Singkat*" },
                                ].map(f => (
                                    <div key={f.name}>
                                        <input name={f.name} type={f.type} value={form[f.name]} onChange={handleChange} required placeholder={f.placeholder} style={inputBase}
                                            onFocus={e => e.currentTarget.style.borderColor = "#843799"}
                                            onBlur={e => e.currentTarget.style.borderColor = "#E4A0F7"}
                                        />
                                    </div>
                                ))}
                                <div style={{ position: "relative" }}>
                                    <textarea name="pesan" value={form.pesan} onChange={handleChange} required placeholder="Pesan Anda*" rows={5} maxLength={500}
                                        style={{ ...inputBase, resize: "none", paddingBottom: SZ(28) }}
                                        onFocus={e => e.currentTarget.style.borderColor = "#843799"}
                                        onBlur={e => e.currentTarget.style.borderColor = "#E4A0F7"}
                                    />
                                    <span style={{ position: "absolute", bottom: SZ(8), right: SZ(12), fontFamily: "Inter, sans-serif", fontSize: SZ(10), color: "rgba(0,0,0,0.3)" }}>{form.pesan.length}/500</span>
                                </div>
                                <button type="submit" disabled={sending}
                                    style={{ width: "100%", padding: `${SZ(14)} ${SZ(24)}`, borderRadius: SZ(10), backgroundColor: "#843799", border: "none", cursor: sending ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: SZ(8), transition: "opacity 0.2s", opacity: sending ? 0.7 : 1 }}
                                    onMouseEnter={e => { if (!sending) e.currentTarget.style.opacity = "0.85"; }}
                                    onMouseLeave={e => e.currentTarget.style.opacity = sending ? "0.7" : "1"}
                                >
                                    <img src="/images/paper-plane.svg" alt="Send" style={{ width: SZ(16), height: SZ(16), objectFit: "contain" }} />
                                    <span style={{ fontFamily: "Outfit, sans-serif", fontWeight: 600, fontSize: SZ(15), color: "#ffffff" }}>{sending ? "Mengirim..." : "Kirim Pesan"}</span>
                                </button>
                                <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: SZ(11), color: "#000000", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: SZ(6) }}>
                                    <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ width: SZ(12), height: SZ(12), flexShrink: 0 }}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                                    Data anda aman bersama kami. Kami tidak akan membagikannya ke pihak lain
                                </p>
                            </form>
                        )}
                    </div>
                    {/* Map */}
                    <div style={{ borderRadius: SZ(15), overflow: "hidden", minHeight: SZ(480) }}>
                        <iframe
                            src="https://maps-api-ssl.google.com/maps?hl=en&ll=-7.912333,112.559333&output=embed&q=Jl.+Diponegoro+Gg.+IV,+Junrejo,+Kec.+Junrejo,+Kota+Batu,+Jawa+Timur+65321,+Indonesia+(Jl.+Diponegoro+Gg.+IV)&z=16"
                            width="100%" height="100%"
                            style={{ border: 0, display: "block", minHeight: SZ(480) }}
                            allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                            title="Lokasi RaiaFood"
                        />
                    </div>
                </div>
            </section>

            <div style={{ height: SZ(15), backgroundColor: "#ffffff" }} />
        </ShopLayout>
    );
}
