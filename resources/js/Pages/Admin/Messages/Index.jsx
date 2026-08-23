import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router, usePage, Link } from '@inertiajs/react';
import { useState } from 'react';
import axios from 'axios';

export default function Index({ messages = { data: [] } }) {
    const { flash } = usePage().props;
    const [selectedMsg, setSelectedMsg] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [msgList, setMsgList] = useState(messages?.data || []);

    const openViewModal = (msg) => {
        // Quick fetch to mark read and show detail
        axios.get(route('admin.messages.show', msg.id))
            .then(res => {
                if (res.data.success) {
                    const updatedMsg = res.data.message;
                    setSelectedMsg(updatedMsg);
                    setModalOpen(true);
                    
                    // Update state of item to mark as read on front-end
                    setMsgList(prev => prev.map(m => m.id === msg.id ? { ...m, is_read: true } : m));
                }
            })
            .catch(() => {
                alert("Gagal memuat pesan.");
            });
    };

    const handleDelete = (msgId, msgName) => {
        if (confirm(`Apakah Anda yakin ingin menghapus pesan dari "${msgName}"?`)) {
            router.delete(route('admin.messages.destroy', msgId), {
                preserveScroll: true,
                onSuccess: () => {
                    setMsgList(prev => prev.filter(m => m.id !== msgId));
                }
            });
        }
    };

    return (
        <AdminLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Pesan Masuk (Hubungi Kami)</h2>}>
            <Head title="Pesan Masuk" />

            <div className="space-y-6">
                {/* Flash Messages */}
                {flash?.success && (
                    <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-5 py-3 rounded-xl text-sm font-medium flex items-center gap-2">
                        <span>✅</span> {flash.success}
                    </div>
                )}

                {/* Messages Panel */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                                    <th className="py-4 px-6 w-48">Pengirim</th>
                                    <th className="py-4 px-6">Kontak</th>
                                    <th className="py-4 px-6">Deskripsi / Subjek</th>
                                    <th className="py-4 px-6 w-40">Tanggal Masuk</th>
                                    <th className="py-4 px-6 w-32">Status</th>
                                    <th className="py-4 px-6 w-36 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-sm">
                                {msgList.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="py-12 text-center text-gray-400">
                                            Belum ada pesan masuk.
                                        </td>
                                    </tr>
                                ) : (
                                    msgList.map((msg) => (
                                        <tr key={msg.id} className={`hover:bg-gray-50/50 transition-colors ${!msg.is_read ? 'bg-violet-50/20 font-medium' : ''}`}>
                                            <td className="py-4 px-6">
                                                <div className="font-bold text-gray-900">{msg.name}</div>
                                            </td>
                                            <td className="py-4 px-6 space-y-0.5">
                                                <div className="text-gray-600 text-xs">{msg.email}</div>
                                                <div className="text-gray-500 font-mono text-[11px]">{msg.whatsapp}</div>
                                            </td>
                                            <td className="py-4 px-6 max-w-xs truncate">
                                                <span className="text-gray-800">{msg.subject}</span>
                                            </td>
                                            <td className="py-4 px-6 text-xs text-gray-400">
                                                {new Date(msg.created_at).toLocaleDateString('id-ID', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${msg.is_read ? 'bg-gray-100 text-gray-600' : 'bg-violet-100 text-violet-700'}`}>
                                                    {msg.is_read ? 'Sudah Dibaca' : 'Baru'}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-right space-x-3">
                                                <button
                                                    onClick={() => openViewModal(msg)}
                                                    className="text-violet-600 hover:text-violet-900 font-semibold"
                                                >
                                                    Baca
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(msg.id, msg.name)}
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

                {/* Pagination */}
                {messages.links && messages.links.length > 3 && (
                    <div className="flex items-center justify-center gap-1 mt-6">
                        {messages.links.map((link, idx) => (
                            <Link
                                key={idx}
                                href={link.url || '#'}
                                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                                    link.active
                                        ? 'bg-violet-600 text-white shadow-md'
                                        : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-100'
                                } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Read/Detail Modal */}
            {modalOpen && selectedMsg && (
                <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-600 bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-lg w-full border border-gray-100 shadow-xl overflow-hidden animate-fade-in">
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                            <h3 className="text-lg font-bold text-gray-900">Detail Pesan Masuk</h3>
                            <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-lg">
                                ✕
                            </button>
                        </div>
                        <div className="p-6 space-y-4 text-sm text-gray-700">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Nama Pengirim</span>
                                    <span className="font-semibold text-gray-900 text-base">{selectedMsg.name}</span>
                                </div>
                                <div>
                                    <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Tanggal Masuk</span>
                                    <span className="text-gray-700">
                                        {new Date(selectedMsg.created_at).toLocaleDateString('id-ID', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-2">
                                <div>
                                    <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Email</span>
                                    <a href={`mailto:${selectedMsg.email}`} className="text-violet-600 hover:underline">{selectedMsg.email}</a>
                                </div>
                                <div>
                                    <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">No. WhatsApp</span>
                                    <a href={`https://wa.me/${selectedMsg.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="text-violet-600 hover:underline">{selectedMsg.whatsapp}</a>
                                </div>
                            </div>

                            <div className="pt-2">
                                <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Subjek / Deskripsi Singkat</span>
                                <span className="font-semibold text-gray-900">{selectedMsg.subject}</span>
                            </div>

                            <div className="pt-2 border-t border-gray-100">
                                <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Isi Pesan</span>
                                <div className="bg-gray-50 p-4 rounded-xl text-gray-800 leading-relaxed whitespace-pre-line border border-gray-100">
                                    {selectedMsg.message}
                                </div>
                            </div>

                            <div className="flex items-center justify-end pt-4 border-t border-gray-100">
                                <button
                                    onClick={() => setModalOpen(false)}
                                    className="px-6 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-sm font-bold transition-all shadow-md shadow-violet-100"
                                >
                                    Tutup
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
