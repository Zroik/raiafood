<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FaqSeeder extends Seeder
{
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('faqs')->truncate();

        $data = array (
  0 => 
  array (
    'id' => 1,
    'category' => 'Pemesanan',
    'title' => 'Cara Pemesanan',
    'content' => 'Anda dapat melakukan pesanan melalui WhatsApp dan juga melalui marketplace seperti Shopee dan Tokopedia.',
    'icon' => NULL,
    'sort_order' => 1,
    'is_active' => 1,
    'created_at' => '2026-08-20 04:00:22',
    'updated_at' => '2026-08-20 04:00:22',
  ),
  1 => 
  array (
    'id' => 2,
    'category' => 'Pengiriman',
    'title' => 'Pengiriman',
    'content' => 'Kami melayani pengiriman melalui kurir dan ekspedisi, serta menyediakan opsi COD untuk area tertentu.',
    'icon' => NULL,
    'sort_order' => 2,
    'is_active' => 1,
    'created_at' => '2026-08-20 04:00:22',
    'updated_at' => '2026-08-20 04:00:22',
  ),
  2 => 
  array (
    'id' => 3,
    'category' => 'Sertifikasi',
    'title' => 'Perizinan dan Sertifikasi',
    'content' => 'Produk dari Raia Food sudah mendapatkan Izin Edar dan juga Sertifikasi Halal.',
    'icon' => NULL,
    'sort_order' => 3,
    'is_active' => 1,
    'created_at' => '2026-08-20 04:00:22',
    'updated_at' => '2026-08-20 04:00:22',
  ),
  3 => 
  array (
    'id' => 4,
    'category' => 'Produk',
    'title' => 'Kualitas Produk',
    'content' => 'Setiap produk dari Raia Food menggunakan bahan-bahan berkualitas tinggi. Dan untuk menjamin kualitas produk terus terjaga, kami menjalin kerjasama dengan instansi-instansi terkait, diantaranya:
• Disperindag Kota Batu
• BPOM RI
• PLUT Kota Batu',
    'icon' => NULL,
    'sort_order' => 4,
    'is_active' => 1,
    'created_at' => '2026-08-20 04:00:22',
    'updated_at' => '2026-08-20 04:00:22',
  ),
  4 => 
  array (
    'id' => 5,
    'category' => 'Layanan',
    'title' => 'Layanan Konsumen',
    'content' => 'Kami siap melayani anda melalui:
• WhatsApp: 081.222.777.468 (Jam 08.00 - 19.00)
• Email: raiafoodcentre@gmail.com
• Instagram: @raiafood.id',
    'icon' => NULL,
    'sort_order' => 5,
    'is_active' => 1,
    'created_at' => '2026-08-20 04:00:22',
    'updated_at' => '2026-08-20 04:00:22',
  ),
  5 => 
  array (
    'id' => 6,
    'category' => 'return',
    'title' => 'return',
    'content' => 'return',
    'icon' => NULL,
    'sort_order' => 6,
    'is_active' => 1,
    'created_at' => '2026-09-19 13:46:08',
    'updated_at' => '2026-09-19 13:46:08',
  ),
);

        foreach ($data as $item) {
            DB::table('faqs')->insert($item);
        }

        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}
