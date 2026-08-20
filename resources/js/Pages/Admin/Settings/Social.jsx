import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Social({ settings }) {
    const { data, setData, post, processing, errors } = useForm({
        instagram_url: settings.instagram_url || '',
        tiktok_url: settings.tiktok_url || '',
        facebook_url: settings.facebook_url || '',
        youtube_url: settings.youtube_url || '',
        shopee_url: settings.shopee_url || '',
        tokopedia_url: settings.tokopedia_url || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.settings.social.update'));
    };

    return (
        <AdminLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Sosial Media & Tautan Marketplace</h2>}>
            <Head title="Sosial Media - Admin" />

            <div className="max-w-4xl mx-auto space-y-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Media Sosial */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                        <h3 className="text-base font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                            <span>🌐</span>
                            <span>Akun Sosial Media Resmi</span>
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">Instagram URL</label>
                                <input
                                    type="url"
                                    value={data.instagram_url}
                                    onChange={e => setData('instagram_url', e.target.value)}
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#843799] focus:ring-2 focus:ring-[#FAE6FF] outline-none"
                                    placeholder="https://instagram.com/raiafood.id"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">TikTok URL</label>
                                <input
                                    type="url"
                                    value={data.tiktok_url}
                                    onChange={e => setData('tiktok_url', e.target.value)}
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#843799] focus:ring-2 focus:ring-[#FAE6FF] outline-none"
                                    placeholder="https://tiktok.com/@raiafood.id"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">Facebook URL</label>
                                <input
                                    type="url"
                                    value={data.facebook_url}
                                    onChange={e => setData('facebook_url', e.target.value)}
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#843799] focus:ring-2 focus:ring-[#FAE6FF] outline-none"
                                    placeholder="https://facebook.com/raiafood"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">YouTube URL</label>
                                <input
                                    type="url"
                                    value={data.youtube_url}
                                    onChange={e => setData('youtube_url', e.target.value)}
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#843799] focus:ring-2 focus:ring-[#FAE6FF] outline-none"
                                    placeholder="https://youtube.com/@raiafood"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Marketplace Links */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                        <h3 className="text-base font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                            <span>🛍️</span>
                            <span>Toko Online di Marketplace</span>
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">Shopee Store URL</label>
                                <input
                                    type="url"
                                    value={data.shopee_url}
                                    onChange={e => setData('shopee_url', e.target.value)}
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#843799] focus:ring-2 focus:ring-[#FAE6FF] outline-none"
                                    placeholder="https://shopee.co.id/raiafood"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">Tokopedia Store URL</label>
                                <input
                                    type="url"
                                    value={data.tokopedia_url}
                                    onChange={e => setData('tokopedia_url', e.target.value)}
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#843799] focus:ring-2 focus:ring-[#FAE6FF] outline-none"
                                    placeholder="https://tokopedia.com/raiafood"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-6 py-2.5 rounded-xl bg-[#843799] text-white font-bold text-sm shadow-md hover:bg-[#60396A] transition-all disabled:opacity-50"
                        >
                            {processing ? 'Menyimpan...' : 'Simpan Tautan Sosial Media'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
