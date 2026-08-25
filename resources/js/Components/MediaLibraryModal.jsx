import React, { useState, useEffect, useRef } from 'react';

export default function MediaLibraryModal({ isOpen, onClose, onSelectImage, title = 'Media Library' }) {
    const [mediaItems, setMediaItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [search, setSearch] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const fileInputRef = useRef(null);

    const fetchMedia = async (page = 1, searchQuery = '') => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                page: page,
                search: searchQuery,
            });
            const res = await fetch(`/admin/media?${params.toString()}`, {
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                }
            });
            const data = await res.json();
            setMediaItems(data.data || []);
            setCurrentPage(data.current_page || 1);
            setTotalPages(data.last_page || 1);
            setTotalItems(data.total || 0);
        } catch (error) {
            console.error('Error fetching media:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            fetchMedia(1, search);
            setSelectedItem(null);
        }
    }, [isOpen]);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchMedia(1, search);
    };

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        setUploading(true);
        try {
            const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
            const res = await fetch('/admin/media', {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': token || '',
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                },
                body: formData,
            });

            const result = await res.json();
            if (result.success && result.media) {
                // Auto refresh and select uploaded item
                await fetchMedia(1, search);
                setSelectedItem(result.media);
            } else {
                alert(result.message || 'Gagal mengupload gambar.');
            }
        } catch (error) {
            console.error('Upload error:', error);
            alert('Terjadi kesalahan saat upload.');
        } finally {
            setUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const handleDelete = async (item, e) => {
        e.stopPropagation();
        if (!confirm(`Apakah Anda yakin ingin menghapus gambar "${item.filename}" dari Media Library?`)) {
            return;
        }

        try {
            const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
            const res = await fetch(`/admin/media/${item.id}`, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': token || '',
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                }
            });
            const result = await res.json();
            if (result.success) {
                if (selectedItem?.id === item.id) {
                    setSelectedItem(null);
                }
                fetchMedia(currentPage, search);
            } else {
                alert(result.message || 'Gagal menghapus gambar.');
            }
        } catch (error) {
            console.error('Delete error:', error);
            alert('Gagal menghapus media.');
        }
    };

    const handleConfirmSelection = () => {
        if (!selectedItem) return;
        onSelectImage(selectedItem);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl h-[85vh] max-h-[750px] flex flex-col overflow-hidden border border-purple-100">
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-purple-50/50 to-white">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shadow-sm" style={{ backgroundColor: '#FAE6FF', color: '#843799' }}>
                            📁
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>{title}</h3>
                            <p className="text-xs text-gray-500">Pilih gambar dari pustaka media atau upload baru</p>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                        ✕
                    </button>
                </div>

                {/* Toolbar */}
                <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex flex-wrap items-center justify-between gap-3">
                    <form onSubmit={handleSearch} className="flex items-center gap-2 flex-1 max-w-md">
                        <div className="relative w-full">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Cari nama file gambar..."
                                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-gray-200 focus:border-[#843799] focus:ring-2 focus:ring-[#FAE6FF] outline-none"
                            />
                            <span className="absolute left-3 top-2.5 text-xs text-gray-400">🔍</span>
                        </div>
                        <button
                            type="submit"
                            className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                        >
                            Cari
                        </button>
                    </form>

                    <div className="flex items-center gap-2">
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleUpload}
                            accept="image/*"
                            className="hidden"
                        />
                        <button
                            type="button"
                            disabled={uploading}
                            onClick={() => fileInputRef.current?.click()}
                            className="px-4 py-2 text-xs font-bold rounded-xl text-white flex items-center gap-2 shadow-sm transition-all hover:opacity-90 disabled:opacity-50"
                            style={{ backgroundColor: '#843799' }}
                        >
                            {uploading ? (
                                <>
                                    <span className="animate-spin">⏳</span>
                                    <span>Mengupload...</span>
                                </>
                            ) : (
                                <>
                                    <span>📤</span>
                                    <span>Upload Gambar Baru</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Content Body: Grid & Details Sidebar */}
                <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
                    {/* Media Grid */}
                    <div className="flex-1 p-6 overflow-y-auto min-h-0 bg-gray-50/30">
                        {loading ? (
                            <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-3 py-20">
                                <span className="animate-spin text-3xl">🔄</span>
                                <p className="text-xs font-medium">Memuat pustaka media...</p>
                            </div>
                        ) : mediaItems.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center py-20">
                                <span className="text-5xl mb-3">🖼️</span>
                                <h4 className="text-sm font-bold text-gray-800 mb-1">Belum Ada Gambar</h4>
                                <p className="text-xs text-gray-500 max-w-xs mb-4">
                                    {search ? 'Tidak ada gambar yang cocok dengan pencarian.' : 'Silakan upload gambar pertama Anda ke Media Library.'}
                                </p>
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="px-4 py-2 text-xs font-bold rounded-xl text-[#843799] bg-[#FAE6FF] hover:bg-[#F4C6FF] transition-all"
                                >
                                    📤 Upload Sekarang
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {mediaItems.map((item) => {
                                    const isSelected = selectedItem?.id === item.id;
                                    return (
                                        <div
                                            key={item.id}
                                            onClick={() => setSelectedItem(item)}
                                            className={`group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 border-2 aspect-square flex flex-col bg-white ${
                                                isSelected
                                                    ? 'border-[#843799] ring-4 ring-[#FAE6FF] shadow-lg scale-[1.02]'
                                                    : 'border-gray-200/80 hover:border-[#843799]/50 hover:shadow-md'
                                            }`}
                                        >
                                            <div className="w-full flex-1 bg-gray-100 relative overflow-hidden flex items-center justify-center">
                                                <img
                                                    src={item.url}
                                                    alt={item.filename}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                    loading="lazy"
                                                />

                                                {isSelected && (
                                                    <div className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md animate-scaleUp" style={{ backgroundColor: '#843799' }}>
                                                        ✓
                                                    </div>
                                                )}

                                                <button
                                                    onClick={(e) => handleDelete(item, e)}
                                                    title="Hapus Gambar"
                                                    className="absolute top-2 left-2 w-6 h-6 rounded-full bg-red-500/80 hover:bg-red-600 text-white flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                                                >
                                                    🗑️
                                                </button>
                                            </div>

                                            <div className="p-2 text-center bg-white border-t border-gray-100">
                                                <p className="text-[11px] font-medium text-gray-800 truncate" title={item.filename}>
                                                    {item.filename}
                                                </p>
                                                <span className="text-[10px] text-gray-400">
                                                    {item.formatted_size}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Right Details Panel */}
                    <div className="w-full md:w-72 border-t md:border-t-0 md:border-l border-gray-100 p-5 bg-white flex flex-col justify-between overflow-y-auto">
                        {selectedItem ? (
                            <div className="space-y-4">
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Detail Gambar</h4>
                                <div className="rounded-2xl overflow-hidden border border-gray-200 aspect-video bg-gray-100 flex items-center justify-center shadow-inner">
                                    <img
                                        src={selectedItem.url}
                                        alt={selectedItem.filename}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <div className="space-y-2 text-xs">
                                    <div>
                                        <span className="text-gray-400 block text-[10px]">Nama File:</span>
                                        <span className="font-semibold text-gray-800 break-all">{selectedItem.filename}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-400 block text-[10px]">Ukuran File:</span>
                                        <span className="text-gray-700">{selectedItem.formatted_size}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-400 block text-[10px]">Tipe:</span>
                                        <span className="text-gray-700">{selectedItem.mime_type || 'image'}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-400 block text-[10px]">URL Path:</span>
                                        <span className="text-[10px] text-gray-500 font-mono break-all block bg-gray-50 p-2 rounded-lg border border-gray-200">
                                            {selectedItem.url}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 py-10">
                                <span className="text-3xl mb-2">👆</span>
                                <p className="text-xs">Klik salah satu gambar untuk melihat detail atau memilihnya</p>
                            </div>
                        )}

                        {/* Pagination if multiple pages */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-between border-t border-gray-100 pt-3 mt-4 text-xs">
                                <button
                                    disabled={currentPage <= 1}
                                    onClick={() => fetchMedia(currentPage - 1, search)}
                                    className="px-2.5 py-1 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 disabled:opacity-40"
                                >
                                    ◀ Prev
                                </button>
                                <span className="text-gray-500 text-[11px]">
                                    {currentPage} / {totalPages}
                                </span>
                                <button
                                    disabled={currentPage >= totalPages}
                                    onClick={() => fetchMedia(currentPage + 1, search)}
                                    className="px-2.5 py-1 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 disabled:opacity-40"
                                >
                                    Next ▶
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="px-6 py-4 border-t border-gray-100 bg-white flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                        {totalItems} total gambar tersimpan
                    </span>
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
                        >
                            Batal
                        </button>
                        <button
                            type="button"
                            disabled={!selectedItem}
                            onClick={handleConfirmSelection}
                            className="px-5 py-2.5 text-xs font-bold text-white rounded-xl shadow-md transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                            style={{ backgroundColor: '#843799' }}
                        >
                            ✓ Gunakan Gambar Ini
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
