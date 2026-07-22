import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create({ categories }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        category_id: '',
        description: '',
        short_description: '',
        price: '',
        discount_price: '',
        stock: '',
        weight: '',
        image: null,
        is_active: true,
        is_featured: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.products.store'));
    };

    return (
        <AdminLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Tambah Produk Cookies Baru</h2>}>
            <Head title="Tambah Produk" />

            <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                    <h3 className="text-md font-bold text-gray-800">Form Detail Produk</h3>
                    <Link href={route('admin.products.index')} className="text-xs font-semibold text-gray-500 hover:text-gray-700">
                        Kembali
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Name */}
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Nama Cookies *</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none"
                                required
                            />
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Kategori *</label>
                            <select
                                value={data.category_id}
                                onChange={e => setData('category_id', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none bg-white"
                                required
                            >
                                <option value="">Pilih Kategori</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                            {errors.category_id && <p className="text-red-500 text-xs mt-1">{errors.category_id}</p>}
                        </div>

                        {/* Weight */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Berat (gram) *</label>
                            <input
                                type="number"
                                value={data.weight}
                                onChange={e => setData('weight', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none"
                                required
                            />
                            {errors.weight && <p className="text-red-500 text-xs mt-1">{errors.weight}</p>}
                        </div>

                        {/* Price */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Harga Utama (Rp) *</label>
                            <input
                                type="number"
                                value={data.price}
                                onChange={e => setData('price', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none"
                                required
                            />
                            {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
                        </div>

                        {/* Discount Price */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Harga Diskon (Rp - Opsional)</label>
                            <input
                                type="number"
                                value={data.discount_price}
                                onChange={e => setData('discount_price', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none"
                            />
                            {errors.discount_price && <p className="text-red-500 text-xs mt-1">{errors.discount_price}</p>}
                        </div>

                        {/* Stock */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Stok Awal (pcs) *</label>
                            <input
                                type="number"
                                value={data.stock}
                                onChange={e => setData('stock', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none"
                                required
                            />
                            {errors.stock && <p className="text-red-500 text-xs mt-1">{errors.stock}</p>}
                        </div>

                        {/* Image */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Foto Cookies</label>
                            <div className="flex items-center gap-4 mb-2">
                                {data.image ? (
                                    <div className="w-16 h-16 rounded-xl border border-gray-200 overflow-hidden bg-gray-50 flex items-center justify-center">
                                        <img src={URL.createObjectURL(data.image)} alt="Preview" className="w-full h-full object-contain p-1" />
                                    </div>
                                ) : (
                                    <div className="w-16 h-16 rounded-xl border border-gray-200 border-dashed bg-gray-50 flex items-center justify-center text-xl">
                                        🍪
                                    </div>
                                )}
                                <div className="flex-1">
                                    <input
                                        type="file"
                                        onChange={e => setData('image', e.target.files[0])}
                                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 cursor-pointer"
                                        accept="image/*"
                                    />
                                </div>
                            </div>
                            {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
                        </div>

                        {/* Short Description */}
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Deskripsi Singkat</label>
                            <input
                                type="text"
                                value={data.short_description}
                                onChange={e => setData('short_description', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none"
                                placeholder="Tampil singkat pada kartu produk..."
                            />
                            {errors.short_description && <p className="text-red-500 text-xs mt-1">{errors.short_description}</p>}
                        </div>

                        {/* Description */}
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Deskripsi Lengkap</label>
                            <textarea
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                rows={4}
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none"
                                placeholder="Informasi detail komposisi, rasa, dll..."
                            />
                            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                        </div>

                        {/* Toggles */}
                        <div className="sm:col-span-2 flex flex-wrap gap-8 py-2">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={data.is_active}
                                    onChange={e => setData('is_active', e.target.checked)}
                                    className="w-4.5 h-4.5 text-violet-600 focus:ring-violet-500 rounded border-gray-300"
                                />
                                <span className="text-sm font-semibold text-gray-750">Aktifkan & Tampilkan Produk</span>
                            </label>

                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={data.is_featured}
                                    onChange={e => setData('is_featured', e.target.checked)}
                                    className="w-4.5 h-4.5 text-violet-600 focus:ring-violet-500 rounded border-gray-300"
                                />
                                <span className="text-sm font-semibold text-gray-750">Produk Unggulan (Featured)</span>
                            </label>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-gray-50 flex items-center justify-end gap-3">
                        <Link
                            href={route('admin.products.index')}
                            className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-500 hover:bg-gray-50 transition-colors"
                        >
                            Batal
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-6 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-sm font-semibold transition-all shadow-md shadow-violet-100"
                        >
                            {processing ? 'Menyimpan...' : 'Simpan Produk'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
