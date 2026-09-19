<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SettingSeeder extends Seeder
{
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('settings')->truncate();

        $data = array (
  0 => 
  array (
    'id' => 1,
    'key' => 'store_name',
    'value' => 'RaiaFood',
    'group' => 'general',
    'created_at' => NULL,
    'updated_at' => NULL,
  ),
  1 => 
  array (
    'id' => 2,
    'key' => 'store_tagline',
    'value' => 'Cookies Premium untuk Setiap Momen',
    'group' => 'general',
    'created_at' => NULL,
    'updated_at' => NULL,
  ),
  2 => 
  array (
    'id' => 3,
    'key' => 'store_description',
    'value' => 'Dibuat dengan bahan pilihan berkualitas tinggi, dipanggang sempurna untuk rasa yang tak terlupakan.',
    'group' => 'general',
    'created_at' => NULL,
    'updated_at' => NULL,
  ),
  3 => 
  array (
    'id' => 4,
    'key' => 'store_email',
    'value' => 'hello@raiafood.com',
    'group' => 'general',
    'created_at' => NULL,
    'updated_at' => NULL,
  ),
  4 => 
  array (
    'id' => 5,
    'key' => 'store_phone',
    'value' => '+62 812-3456-7890',
    'group' => 'general',
    'created_at' => NULL,
    'updated_at' => NULL,
  ),
  5 => 
  array (
    'id' => 6,
    'key' => 'store_address',
    'value' => 'Jl. Cookies Premium No. 12, Jakarta Selatan',
    'group' => 'general',
    'created_at' => NULL,
    'updated_at' => NULL,
  ),
  6 => 
  array (
    'id' => 7,
    'key' => 'free_shipping_min',
    'value' => '150000',
    'group' => 'shipping',
    'created_at' => NULL,
    'updated_at' => NULL,
  ),
  7 => 
  array (
    'id' => 8,
    'key' => 'shipping_cost',
    'value' => '15000',
    'group' => 'shipping',
    'created_at' => NULL,
    'updated_at' => NULL,
  ),
  8 => 
  array (
    'id' => 9,
    'key' => 'instagram',
    'value' => 'https://instagram.com/raiafood',
    'group' => 'social',
    'created_at' => NULL,
    'updated_at' => NULL,
  ),
  9 => 
  array (
    'id' => 10,
    'key' => 'whatsapp',
    'value' => '6281234567890',
    'group' => 'social',
    'created_at' => NULL,
    'updated_at' => NULL,
  ),
  10 => 
  array (
    'id' => 11,
    'key' => 'whatsapp_button_enabled',
    'value' => '1',
    'group' => 'general',
    'created_at' => NULL,
    'updated_at' => '2026-09-19 14:34:05',
  ),
  11 => 
  array (
    'id' => 12,
    'key' => 'whatsapp_number',
    'value' => '6281222777468',
    'group' => 'general',
    'created_at' => NULL,
    'updated_at' => '2026-09-19 14:34:05',
  ),
  12 => 
  array (
    'id' => 13,
    'key' => 'whatsapp_message',
    'value' => 'Halo Raia Food, saya ingin bertanya tentang produk Anda.',
    'group' => 'general',
    'created_at' => NULL,
    'updated_at' => '2026-09-19 14:34:05',
  ),
  13 => 
  array (
    'id' => 14,
    'key' => 'company_name',
    'value' => 'Raia Food',
    'group' => 'general',
    'created_at' => '2026-09-19 14:34:05',
    'updated_at' => '2026-09-19 14:34:05',
  ),
  14 => 
  array (
    'id' => 15,
    'key' => 'company_tagline',
    'value' => 'Camilan Enak & Gurih Khas Batu Malang',
    'group' => 'general',
    'created_at' => '2026-09-19 14:34:05',
    'updated_at' => '2026-09-19 14:34:05',
  ),
  15 => 
  array (
    'id' => 16,
    'key' => 'meta_description',
    'value' => 'Toko resmi Raia Food Pusat oleh-oleh camilan, kue kering, dan keripik berkualitas dari Kota Batu Malang.',
    'group' => 'general',
    'created_at' => '2026-09-19 14:34:05',
    'updated_at' => '2026-09-19 14:34:05',
  ),
  16 => 
  array (
    'id' => 17,
    'key' => 'primary_color',
    'value' => '#843799',
    'group' => 'general',
    'created_at' => '2026-09-19 14:34:05',
    'updated_at' => '2026-09-19 14:36:11',
  ),
  17 => 
  array (
    'id' => 18,
    'key' => 'secondary_color',
    'value' => '#F4C6FF',
    'group' => 'general',
    'created_at' => '2026-09-19 14:34:05',
    'updated_at' => '2026-09-19 14:36:11',
  ),
  18 => 
  array (
    'id' => 19,
    'key' => 'soft_color',
    'value' => '#FAE6FF',
    'group' => 'general',
    'created_at' => '2026-09-19 14:34:05',
    'updated_at' => '2026-09-19 14:36:11',
  ),
  19 => 
  array (
    'id' => 20,
    'key' => 'dark_color',
    'value' => '#60396A',
    'group' => 'general',
    'created_at' => '2026-09-19 14:34:05',
    'updated_at' => '2026-09-19 14:36:11',
  ),
  20 => 
  array (
    'id' => 21,
    'key' => 'phone',
    'value' => '+62 812-2277-7468',
    'group' => 'general',
    'created_at' => '2026-09-19 14:34:05',
    'updated_at' => '2026-09-19 14:34:05',
  ),
  21 => 
  array (
    'id' => 22,
    'key' => 'email',
    'value' => 'raiafoodcentre@gmail.com',
    'group' => 'general',
    'created_at' => '2026-09-19 14:34:05',
    'updated_at' => '2026-09-19 14:34:05',
  ),
  22 => 
  array (
    'id' => 23,
    'key' => 'address',
    'value' => 'Jl. Diponegoro Gg. IV, Junrejo, Kec. Junrejo, Kota Batu, Jawa Timur 65321, Indonesia',
    'group' => 'general',
    'created_at' => '2026-09-19 14:34:05',
    'updated_at' => '2026-09-19 14:34:05',
  ),
  23 => 
  array (
    'id' => 24,
    'key' => 'maps_link',
    'value' => 'https://maps.google.com/?q=Jl.+Diponegoro+Gg.+IV,+Junrejo',
    'group' => 'general',
    'created_at' => '2026-09-19 14:34:05',
    'updated_at' => '2026-09-19 14:34:05',
  ),
  24 => 
  array (
    'id' => 25,
    'key' => 'maps_iframe',
    'value' => 'https://maps-api-ssl.google.com/maps?hl=en&ll=-7.912333,112.559333&output=embed&q=Jl.+Diponegoro+Gg.+IV,+Junrejo,+Kec.+Junrejo,+Kota+Batu,+Jawa+Timur+65321,+Indonesia+(Jl.+Diponegoro+Gg.+IV)&z=16',
    'group' => 'general',
    'created_at' => '2026-09-19 14:34:05',
    'updated_at' => '2026-09-19 14:34:05',
  ),
  25 => 
  array (
    'id' => 26,
    'key' => 'operating_hours',
    'value' => 'Respon setiap hari 08:00 - 20:00 WIB',
    'group' => 'general',
    'created_at' => '2026-09-19 14:34:05',
    'updated_at' => '2026-09-19 14:34:05',
  ),
  26 => 
  array (
    'id' => 27,
    'key' => 'instagram_url',
    'value' => 'https://instagram.com/raiafood.id',
    'group' => 'general',
    'created_at' => '2026-09-19 14:34:05',
    'updated_at' => '2026-09-19 14:34:05',
  ),
  27 => 
  array (
    'id' => 28,
    'key' => 'tiktok_url',
    'value' => 'https://tiktok.com/@raiafood.id',
    'group' => 'general',
    'created_at' => '2026-09-19 14:34:05',
    'updated_at' => '2026-09-19 14:34:05',
  ),
  28 => 
  array (
    'id' => 29,
    'key' => 'facebook_url',
    'value' => 'https://facebook.com/raiafood',
    'group' => 'general',
    'created_at' => '2026-09-19 14:34:05',
    'updated_at' => '2026-09-19 14:34:05',
  ),
  29 => 
  array (
    'id' => 30,
    'key' => 'youtube_url',
    'value' => '',
    'group' => 'general',
    'created_at' => '2026-09-19 14:34:05',
    'updated_at' => '2026-09-19 14:34:05',
  ),
  30 => 
  array (
    'id' => 31,
    'key' => 'shopee_url',
    'value' => 'https://shopee.co.id/raiafood',
    'group' => 'general',
    'created_at' => '2026-09-19 14:34:05',
    'updated_at' => '2026-09-19 14:34:05',
  ),
  31 => 
  array (
    'id' => 32,
    'key' => 'tokopedia_url',
    'value' => 'https://tokopedia.com/raiafood',
    'group' => 'general',
    'created_at' => '2026-09-19 14:34:05',
    'updated_at' => '2026-09-19 14:34:05',
  ),
  32 => 
  array (
    'id' => 33,
    'key' => 'about_title',
    'value' => 'Kisah & Dedikasi Raia Food',
    'group' => 'general',
    'created_at' => '2026-09-19 14:34:05',
    'updated_at' => '2026-09-19 14:34:05',
  ),
  33 => 
  array (
    'id' => 34,
    'key' => 'about_description',
    'value' => 'Raia Food hadir sebagai wujud cinta dan dedikasi kami dalam menghadirkan aneka olahan camilan khas Kota Batu Malang berkualitas tinggi. Diproses secara higienis menggunakan bahan-bahan pilihan dengan resep istimewa.',
    'group' => 'general',
    'created_at' => '2026-09-19 14:34:05',
    'updated_at' => '2026-09-19 14:34:05',
  ),
  34 => 
  array (
    'id' => 35,
    'key' => 'about_vision',
    'value' => 'Menjadi pelopor makanan ringan premium yang menjaga dan melestarikan keaslian rasa serta tradisi kuliner Jawa, menghubungkan generasi masa kini dengan warisan budaya yang kaya dan otentik.',
    'group' => 'general',
    'created_at' => '2026-09-19 14:34:05',
    'updated_at' => '2026-09-19 14:34:05',
  ),
  35 => 
  array (
    'id' => 36,
    'key' => 'about_mission',
    'value' => 'Menghadirkan produk khas Jawa berkualitas tinggi.
Melestarikan resep tradisional dengan inovasi modern.
Memberdayakan bahan lokal dan mendukung ekonomi daerah.
Memberikan pengalaman rasa yang berkesan bagi setiap pelanggan.',
    'group' => 'general',
    'created_at' => '2026-09-19 14:34:05',
    'updated_at' => '2026-09-19 14:34:05',
  ),
  36 => 
  array (
    'id' => 37,
    'key' => 'custom_theme_presets',
    'value' => '[{"id":"custom_1789803349_e50d13","name":"black","badge":"Kustom","primary":"#FAFA","secondary":"#F2F2F2","soft":"#FAFAFA","dark":"#FF","is_custom":true}]',
    'group' => 'general',
    'created_at' => '2026-09-19 14:35:49',
    'updated_at' => '2026-09-19 14:35:49',
  ),
  37 => 
  array (
    'id' => 38,
    'key' => 'navbar_menu',
    'value' => '[{"id":"1","name":"Beranda","href":"\\/"},{"id":"2","name":"Produk","href":"\\/products"},{"id":"3","name":"Berita","href":"\\/news"},{"id":"4","name":"Tentang Kami","href":"\\/tentang-kami"},{"id":"5","name":"FaQ","href":"\\/faq"},{"id":"6","name":"Hubungi Kami","href":"\\/hubungi-kami"}]',
    'group' => 'navigation',
    'created_at' => '2026-09-19 17:28:51',
    'updated_at' => '2026-09-19 17:28:51',
  ),
);

        foreach ($data as $item) {
            DB::table('settings')->insert($item);
        }

        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}
