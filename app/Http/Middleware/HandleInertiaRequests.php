<?php

namespace App\Http\Middleware;

use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $settings = Setting::pluck('value', 'key')->all();

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'site_settings' => [
                'company_name' => $settings['company_name'] ?? 'Raia Food',
                'company_tagline' => $settings['company_tagline'] ?? 'Camilan Enak & Gurih Khas Batu Malang',
                'meta_description' => $settings['meta_description'] ?? 'Toko resmi Raia Food Pusat oleh-oleh camilan, kue kering, dan keripik berkualitas dari Kota Batu Malang.',
                'primary_color' => $settings['primary_color'] ?? '#843799',
                'secondary_color' => $settings['secondary_color'] ?? '#F4C6FF',
                'soft_color' => $settings['soft_color'] ?? '#FAE6FF',
                'dark_color' => $settings['dark_color'] ?? '#60396A',
                'site_logo' => isset($settings['site_logo']) ? '/storage/' . $settings['site_logo'] : '/images/raia-logo.webp',
                'site_favicon' => isset($settings['site_favicon']) ? '/storage/' . $settings['site_favicon'] : '/images/raia-logo.webp',
                'phone' => $settings['phone'] ?? '+62 812-2277-7468',
                'email' => $settings['email'] ?? 'raiafoodcentre@gmail.com',
                'address' => $settings['address'] ?? 'Jl. Diponegoro Gg. IV, Junrejo, Kec. Junrejo, Kota Batu, Jawa Timur 65321, Indonesia',
                'operating_hours' => $settings['operating_hours'] ?? 'Respon setiap hari 08:00 - 20:00 WIB',
                'maps_link' => $settings['maps_link'] ?? 'https://maps.google.com/?q=Jl.+Diponegoro+Gg.+IV,+Junrejo',
                'maps_iframe' => $settings['maps_iframe'] ?? 'https://maps-api-ssl.google.com/maps?hl=en&ll=-7.912333,112.559333&output=embed&q=Jl.+Diponegoro+Gg.+IV,+Junrejo,+Kec.+Junrejo,+Kota+Batu,+Jawa+Timur+65321,+Indonesia+(Jl.+Diponegoro+Gg.+IV)&z=16',
                'instagram_url' => $settings['instagram_url'] ?? 'https://instagram.com/raiafood.id',
                'tiktok_url' => $settings['tiktok_url'] ?? 'https://tiktok.com/@raiafood.id',
                'facebook_url' => $settings['facebook_url'] ?? 'https://facebook.com/raiafood',
                'shopee_url' => $settings['shopee_url'] ?? 'https://shopee.co.id/raiafood',
                'tokopedia_url' => $settings['tokopedia_url'] ?? 'https://tokopedia.com/raiafood',
                'youtube_url' => $settings['youtube_url'] ?? '',
                'about_title' => $settings['about_title'] ?? 'Kisah & Dedikasi Raia Food',
                'about_description' => $settings['about_description'] ?? 'Raia Food hadir sebagai wujud cinta dan dedikasi kami dalam menghadirkan aneka olahan camilan khas Kota Batu Malang berkualitas tinggi.',
                'about_vision' => $settings['about_vision'] ?? 'Menjadi produsen camilan dan oleh-oleh terpercaya di Indonesia yang dikenal karena kualitas, keaslian rasa, dan inovasi tiada henti.',
                'about_mission' => $settings['about_mission'] ?? 'Menjaga standar kualitas terbaik, memberdayakan potensi lokal, dan memberikan pelayanan sepenuh hati bagi setiap pelanggan.',
                'about_banner' => isset($settings['about_banner']) ? '/storage/' . $settings['about_banner'] : '/images/hero.webp',
                'products_banner' => isset($settings['products_banner']) ? '/storage/' . $settings['products_banner'] : null,
                'contact_banner' => isset($settings['contact_banner']) ? '/storage/' . $settings['contact_banner'] : '/images/hero.webp',
                'faq_banner' => isset($settings['faq_banner']) ? '/storage/' . $settings['faq_banner'] : '/images/faq.webp',
            ],
            'whatsapp' => [
                'enabled' => ($settings['whatsapp_button_enabled'] ?? '1') === '1',
                'number' => $settings['whatsapp_number'] ?? '6281222777468',
                'message' => $settings['whatsapp_message'] ?? 'Halo Raia Food, saya ingin bertanya tentang produk Anda.',
            ],
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
            ],
        ];
    }
}

