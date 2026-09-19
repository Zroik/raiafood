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

        // Decode navbar_menu with fallback
        $defaultNavbar = [
            ['id' => '1', 'name' => 'Beranda', 'href' => '/'],
            ['id' => '2', 'name' => 'Produk', 'href' => '/products'],
            ['id' => '3', 'name' => 'Tentang Kami', 'href' => '/tentang-kami'],
            ['id' => '4', 'name' => 'Hubungi Kami', 'href' => '/hubungi-kami'],
        ];
        $navbarMenu = isset($settings['navbar_menu']) ? json_decode($settings['navbar_menu'], true) : null;
        if (!is_array($navbarMenu) || empty($navbarMenu)) {
            $navbarMenu = $defaultNavbar;
        }

        // Decode footer_columns with fallback
        $defaultFooterColumns = [
            [
                'id' => 'col_1',
                'title' => 'Informasi',
                'links' => [
                    ['id' => '1', 'name' => 'Home', 'href' => '/'],
                    ['id' => '2', 'name' => 'Produk', 'href' => '/products'],
                    ['id' => '3', 'name' => 'News', 'href' => '/news'],
                    ['id' => '4', 'name' => 'Tentang Kami', 'href' => '/tentang-kami'],
                    ['id' => '5', 'name' => 'FAQ', 'href' => '/faq'],
                ]
            ],
            [
                'id' => 'col_2',
                'title' => 'Layanan',
                'links' => [
                    ['id' => '6', 'name' => 'Cara Pemesanan', 'href' => '/faq'],
                    ['id' => '7', 'name' => 'Pengiriman', 'href' => '/faq'],
                    ['id' => '8', 'name' => 'Sertifikasi', 'href' => '/tentang-kami'],
                    ['id' => '9', 'name' => 'Hubungi Kami', 'href' => '/hubungi-kami'],
                ]
            ]
        ];
        $footerColumns = isset($settings['footer_columns']) ? json_decode($settings['footer_columns'], true) : null;
        if (!is_array($footerColumns) || empty($footerColumns)) {
            $footerColumns = $defaultFooterColumns;
        }

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
                // Dynamic Navigation & Footer
                'navbar_menu' => $navbarMenu,
                'footer_columns' => $footerColumns,
                'footer_copyright' => $settings['footer_copyright'] ?? '',
                // Top Announcement Bar
                'announcement_bar' => [
                    'enabled' => ($settings['announcement_enabled'] ?? '0') === '1',
                    'text' => $settings['announcement_text'] ?? '',
                    'link' => $settings['announcement_link'] ?? '',
                ],
                // Dynamic Home Texts
                'home_settings' => [
                    'hero_greeting' => $settings['home_hero_greeting'] ?? 'Selamat datang di',
                    'hero_title' => $settings['home_hero_title'] ?? ($settings['company_name'] ?? 'Raia Food'),
                    'hero_motto' => $settings['home_hero_motto'] ?? 'Pusat Makanan Khas Batu',
                    'hero_cta_text' => $settings['home_hero_cta_text'] ?? 'Belanja Sekarang',
                    'hero_cta_link' => $settings['home_hero_cta_link'] ?? '/products',
                    'hero_cta_sec_text' => $settings['home_hero_cta_sec_text'] ?? 'Tentang Kami',
                    'hero_cta_sec_link' => $settings['home_hero_cta_sec_link'] ?? '/tentang-kami',
                    'section_latest_title' => $settings['home_section_latest_title'] ?? 'Produk Terbaru',
                    'section_popular_title' => $settings['home_section_popular_title'] ?? 'Produk Terlaris',
                ],
                // Dynamic About CTA Banner
                'about_settings' => [
                    'cta_title' => $settings['about_cta_title'] ?? 'Jelajahi Produk Kami',
                    'cta_subtitle' => $settings['about_cta_subtitle'] ?? "Rasakan kelezatan khas Jawa dalam setiap gigitan.\nTemukan favoritmu sekarang!",
                    'cta_btn_text' => $settings['about_cta_btn_text'] ?? 'Lihat Produk',
                    'cta_btn_link' => $settings['about_cta_btn_link'] ?? '/products',
                ],
                // Dynamic Contact Hero
                'contact_settings' => [
                    'hero_title' => $settings['contact_hero_title'] ?? 'Kami Siap Membantu Anda',
                    'hero_subtitle' => $settings['contact_hero_subtitle'] ?? "Punya pertanyaan, saran, atau ingin bekerja sama?\nJangan ragu untuk menghubungi kami.\nTim RAIA Food akan dengan senang hati membantu anda",
                ],
                // Store & Shipping Settings
                'store_settings' => [
                    'shipping_cost' => (float) ($settings['shipping_cost'] ?? 15000),
                    'free_shipping_min' => (float) ($settings['free_shipping_min'] ?? 150000),
                    'bank_name' => $settings['payment_bank_name'] ?? 'BCA',
                    'bank_account' => $settings['payment_bank_account'] ?? '123-456-7890',
                    'bank_holder' => $settings['payment_bank_holder'] ?? 'Raia Food Official',
                    'payment_instructions' => $settings['payment_instructions'] ?? 'Silakan lakukan transfer sesuai total pesanan dan konfirmasi via WhatsApp.',
                ],
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

