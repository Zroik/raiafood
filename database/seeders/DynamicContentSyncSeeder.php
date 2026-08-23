<?php

namespace Database\Seeders;

use App\Models\Faq;
use App\Models\Setting;
use App\Models\ContactMessage;
use Illuminate\Database\Seeder;

class DynamicContentSyncSeeder extends Seeder
{
    public function run(): void
    {
        // 1. FAQs Seed
        if (Faq::count() === 0) {
            Faq::create([
                'category' => 'Pemesanan',
                'title' => 'Cara Pemesanan',
                'content' => 'Anda dapat melakukan pesanan melalui WhatsApp dan juga melalui marketplace seperti Shopee dan Tokopedia.',
                'sort_order' => 1,
                'is_active' => true,
            ]);
            Faq::create([
                'category' => 'Pengiriman',
                'title' => 'Pengiriman',
                'content' => 'Kami melayani pengiriman melalui kurir dan ekspedisi, serta menyediakan opsi COD untuk area tertentu.',
                'sort_order' => 2,
                'is_active' => true,
            ]);
            Faq::create([
                'category' => 'Sertifikasi',
                'title' => 'Perizinan dan Sertifikasi',
                'content' => 'Produk dari Raia Food sudah mendapatkan Izin Edar dan juga Sertifikasi Halal.',
                'sort_order' => 3,
                'is_active' => true,
            ]);
            Faq::create([
                'category' => 'Produk',
                'title' => 'Kualitas Produk',
                'content' => "Setiap produk dari Raia Food menggunakan bahan-bahan berkualitas tinggi. Dan untuk menjamin kualitas produk terus terjaga, kami menjalin kerjasama dengan instansi-instansi terkait, diantaranya:\n• Disperindag Kota Batu\n• BPOM RI\n• PLUT Kota Batu",
                'sort_order' => 4,
                'is_active' => true,
            ]);
            Faq::create([
                'category' => 'Layanan',
                'title' => 'Layanan Konsumen',
                'content' => "Kami siap melayani anda melalui:\n• WhatsApp: 081.222.777.468 (Jam 08.00 - 19.00)\n• Email: raiafoodcentre@gmail.com\n• Instagram: @raiafood.id",
                'sort_order' => 5,
                'is_active' => true,
            ]);
        }

        // 2. Settings Synced
        $defaults = [
            'company_name' => 'Raia Food',
            'company_tagline' => 'Camilan Enak & Gurih Khas Batu Malang',
            'meta_description' => 'Toko resmi Raia Food Pusat oleh-oleh camilan, kue kering, dan keripik berkualitas dari Kota Batu Malang.',
            'primary_color' => '#843799',
            'secondary_color' => '#F4C6FF',
            'soft_color' => '#FAE6FF',
            'dark_color' => '#60396A',
            
            'phone' => '+62 812-2277-7468',
            'email' => 'raiafoodcentre@gmail.com',
            'address' => 'Jl. Diponegoro Gg. IV, Junrejo, Kec. Junrejo, Kota Batu, Jawa Timur 65321, Indonesia',
            'maps_link' => 'https://maps.google.com/?q=Jl.+Diponegoro+Gg.+IV,+Junrejo',
            'maps_iframe' => 'https://maps-api-ssl.google.com/maps?hl=en&ll=-7.912333,112.559333&output=embed&q=Jl.+Diponegoro+Gg.+IV,+Junrejo,+Kec.+Junrejo,+Kota+Batu,+Jawa+Timur+65321,+Indonesia+(Jl.+Diponegoro+Gg.+IV)&z=16',
            'operating_hours' => 'Respon setiap hari 08:00 - 20:00 WIB',
            'whatsapp_number' => '6281222777468',
            'whatsapp_message' => 'Halo Raia Food, saya ingin bertanya tentang produk Anda.',
            'whatsapp_button_enabled' => '1',
            
            'instagram_url' => 'https://instagram.com/raiafood.id',
            'tiktok_url' => 'https://tiktok.com/@raiafood.id',
            'facebook_url' => 'https://facebook.com/raiafood',
            'youtube_url' => '',
            'shopee_url' => 'https://shopee.co.id/raiafood',
            'tokopedia_url' => 'https://tokopedia.com/raiafood',
            
            'about_title' => 'Kisah & Dedikasi Raia Food',
            'about_description' => 'Raia Food hadir sebagai wujud cinta dan dedikasi kami dalam menghadirkan aneka olahan camilan khas Kota Batu Malang berkualitas tinggi. Diproses secara higienis menggunakan bahan-bahan pilihan dengan resep istimewa.',
            'about_vision' => 'Menjadi pelopor makanan ringan premium yang menjaga dan melestarikan keaslian rasa serta tradisi kuliner Jawa, menghubungkan generasi masa kini dengan warisan budaya yang kaya dan otentik.',
            'about_mission' => "Menghadirkan produk khas Jawa berkualitas tinggi.\nMelestarikan resep tradisional dengan inovasi modern.\nMemberdayakan bahan lokal dan mendukung ekonomi daerah.\nMemberikan pengalaman rasa yang berkesan bagi setiap pelanggan.",
        ];

        foreach ($defaults as $k => $v) {
            Setting::setValue($k, $v);
        }

        // 3. Sample Message
        if (ContactMessage::count() === 0) {
            ContactMessage::create([
                'name' => 'Budi Santoso',
                'email' => 'budi.santoso@example.com',
                'whatsapp' => '081298765432',
                'subject' => 'Tanya Pemesanan Jumlah Besar (Hampers)',
                'message' => 'Halo Raia Food, apakah melayani pemesanan hampers oleh-oleh khas Malang untuk acara kantor sebanyak 50 box? Mohon infonya, terima kasih.',
                'is_read' => false,
            ]);
        }
    }
}
