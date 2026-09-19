import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, router, Link } from '@inertiajs/react';
import { useState } from 'react';
import { Plus, ShieldCheck, User, X } from 'lucide-react';

export default function UserIndex({ users, filters }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    const { data, setData, post, put, reset, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        role: 'customer',
        phone: '',
        address: '',
    });

    const openCreateModal = () => {
        setEditingUser(null);
        reset();
        setData({
            name: '',
            email: '',
            password: '',
            role: 'admin',
            phone: '',
            address: '',
        });
        setModalOpen(true);
    };

    const openEditModal = (user) => {
        setEditingUser(user);
        setData({
            name: user.name,
            email: user.email,
            password: '',
            role: user.role,
            phone: user.phone || '',
            address: user.address || '',
        });
        setModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingUser) {
            put(route('admin.users.update', editingUser.id), {
                onSuccess: () => setModalOpen(false),
            });
        } else {
            post(route('admin.users.store'), {
                onSuccess: () => setModalOpen(false),
            });
        }
    };

    const handleDelete = (user) => {
        if (confirm(`Yakin ingin menghapus user "${user.name}"?`)) {
            router.delete(route('admin.users.destroy', user.id));
        }
    };

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            router.get(route('admin.users.index'), { ...filters, search: e.target.value }, { preserveState: true });
        }
    };

    const handleFilterRole = (role) => {
        const f = { ...filters };
        if (role) f.role = role;
        else delete f.role;
        router.get(route('admin.users.index'), f, { preserveState: true });
    };

    return (
        <AdminLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Manajemen Pengguna & Hak Akses</h2>}>
            <Head title="Hak Akses & Pengguna - Admin" />

            <div className="space-y-6">
                {/* Top Action Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <input
                            type="text"
                            defaultValue={filters?.search || ''}
                            onKeyDown={handleSearch}
                            placeholder="Cari nama, email, no hp..."
                            className="px-3.5 py-2 rounded-xl border border-gray-200 text-xs w-64 focus:border-[#843799] outline-none"
                        />
                        <div className="flex bg-gray-100 p-1 rounded-xl text-xs font-semibold">
                            <button
                                onClick={() => handleFilterRole('')}
                                className={`px-3 py-1 rounded-lg transition-all ${!filters?.role ? 'bg-white text-[#843799] shadow-sm' : 'text-gray-600'}`}
                            >
                                Semua
                            </button>
                            <button
                                onClick={() => handleFilterRole('admin')}
                                className={`px-3 py-1 rounded-lg transition-all ${filters?.role === 'admin' ? 'bg-white text-[#843799] shadow-sm' : 'text-gray-600'}`}
                            >
                                Admin
                            </button>
                            <button
                                onClick={() => handleFilterRole('customer')}
                                className={`px-3 py-1 rounded-lg transition-all ${filters?.role === 'customer' ? 'bg-white text-[#843799] shadow-sm' : 'text-gray-600'}`}
                            >
                                Customer
                            </button>
                        </div>
                    </div>

                    <button
                        onClick={openCreateModal}
                        className="px-4 py-2 rounded-xl bg-[#843799] text-white font-bold text-xs shadow-md hover:bg-[#60396A] transition-all flex items-center gap-2 self-start sm:self-auto"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Tambah User Baru</span>
                    </button>
                </div>

                {/* Users Table */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-gray-600">
                            <thead className="bg-[#FAE6FF]/40 text-xs font-bold text-[#843799] uppercase border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4">Pengguna</th>
                                    <th className="px-6 py-4">Kontak</th>
                                    <th className="px-6 py-4">Peran (Hak Akses)</th>
                                    <th className="px-6 py-4">Terdaftar</th>
                                    <th className="px-6 py-4 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {users.data.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center text-gray-400">
                                            Tidak ada user ditemukan.
                                        </td>
                                    </tr>
                                ) : (
                                    users.data.map(user => (
                                        <tr key={user.id} className="hover:bg-gray-50/70 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-full bg-[#FAE6FF] text-[#843799] font-bold flex items-center justify-center text-sm uppercase">
                                                        {user.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-gray-900">{user.name}</p>
                                                        <p className="text-xs text-gray-500">{user.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-xs">
                                                <p className="font-medium text-gray-800">{user.phone || '-'}</p>
                                                <p className="text-gray-400 truncate max-w-xs">{user.address || ''}</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                                                    user.role === 'admin'
                                                        ? 'bg-purple-100 text-[#843799] border border-purple-200'
                                                        : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                                                }`}>
                                                    {user.role === 'admin' ? (
                                                        <span className="inline-flex items-center gap-1.5">
                                                            <ShieldCheck className="w-3.5 h-3.5" /> Administrator
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1.5">
                                                            <User className="w-3.5 h-3.5" /> Customer
                                                        </span>
                                                    )}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-xs text-gray-400">
                                                {new Date(user.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                            </td>
                                            <td className="px-6 py-4 text-right space-x-2">
                                                <button
                                                    onClick={() => openEditModal(user)}
                                                    className="px-3 py-1.5 rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100 text-xs font-bold transition-colors"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(user)}
                                                    className="px-3 py-1.5 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 text-xs font-bold transition-colors"
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

                    {/* Pagination */}
                    {users.links && users.links.length > 3 && (
                        <div className="p-4 border-t border-gray-100 flex justify-center gap-1">
                            {users.links.map((link, idx) => (
                                <Link
                                    key={idx}
                                    href={link.url || '#'}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                                        link.active
                                            ? 'bg-[#843799] text-white'
                                            : link.url
                                            ? 'text-gray-600 hover:bg-gray-100'
                                            : 'text-gray-300 cursor-not-allowed'
                                    }`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Modal Form */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                            <h3 className="font-bold text-base text-gray-900">
                                {editingUser ? 'Edit Hak Akses User' : 'Tambah User Baru'}
                            </h3>
                            <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-3.5">
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">Nama Lengkap *</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:border-[#843799] outline-none"
                                    required
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">Email Akun *</label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:border-[#843799] outline-none"
                                    required
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">
                                    {editingUser ? 'Password Baru (Kosongkan jika tidak diubah)' : 'Password Akun *'}
                                </label>
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={e => setData('password', e.target.value)}
                                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:border-[#843799] outline-none"
                                    placeholder="Minimal 8 karakter"
                                    required={!editingUser}
                                />
                                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">Peran / Hak Akses *</label>
                                <select
                                    value={data.role}
                                    onChange={e => setData('role', e.target.value)}
                                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:border-[#843799] outline-none"
                                >
                                    <option value="admin">Administrator (Akses Penuh CMS)</option>
                                    <option value="customer">Customer (Pelanggan Toko)</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">No. WhatsApp / HP</label>
                                <input
                                    type="text"
                                    value={data.phone}
                                    onChange={e => setData('phone', e.target.value)}
                                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:border-[#843799] outline-none"
                                />
                            </div>

                            <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={() => setModalOpen(false)}
                                    className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-50 border border-gray-200"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-5 py-2 rounded-xl bg-[#843799] text-white text-xs font-bold hover:bg-[#60396A] transition-all disabled:opacity-50"
                                >
                                    {processing ? 'Menyimpan...' : 'Simpan User'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
