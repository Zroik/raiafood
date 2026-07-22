<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SettingSeeder extends Seeder
{
    public function run(): void
    {
        // Disable foreign key checks
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('settings')->truncate();

        $data = [
  0 => [
    'id' => 1,
    'key' => 'store_name',
    'value' => 'RaiaFood',
    'group' => 'general',
  ],
  1 => [
    'id' => 2,
    'key' => 'store_tagline',
    'value' => 'Cookies Premium untuk Setiap Momen',
    'group' => 'general',
  ],
  2 => [
    'id' => 3,
    'key' => 'store_description',
    'value' => 'Dibuat dengan bahan pilihan berkualitas tinggi, dipanggang sempurna untuk rasa yang tak terlupakan.',
    'group' => 'general',
  ],
  3 => [
    'id' => 4,
    'key' => 'store_email',
    'value' => 'hello@raiafood.com',
    'group' => 'general',
  ],
  4 => [
    'id' => 5,
    'key' => 'store_phone',
    'value' => '+62 812-3456-7890',
    'group' => 'general',
  ],
  5 => [
    'id' => 6,
    'key' => 'store_address',
    'value' => 'Jl. Cookies Premium No. 12, Jakarta Selatan',
    'group' => 'general',
  ],
  6 => [
    'id' => 7,
    'key' => 'free_shipping_min',
    'value' => '150000',
    'group' => 'shipping',
  ],
  7 => [
    'id' => 8,
    'key' => 'shipping_cost',
    'value' => '15000',
    'group' => 'shipping',
  ],
  8 => [
    'id' => 9,
    'key' => 'instagram',
    'value' => 'https://instagram.com/raiafood',
    'group' => 'social',
  ],
  9 => [
    'id' => 10,
    'key' => 'whatsapp',
    'value' => '6281234567890',
    'group' => 'social',
  ],
  10 => [
    'id' => 11,
    'key' => 'whatsapp_button_enabled',
    'value' => '1',
    'group' => 'whatsapp',
  ],
  11 => [
    'id' => 12,
    'key' => 'whatsapp_number',
    'value' => '6281222777468',
    'group' => 'whatsapp',
  ],
  12 => [
    'id' => 13,
    'key' => 'whatsapp_message',
    'value' => 'Halo Luxury Raia Food! Saya tertarik dengan produk cookies kalian. Boleh tanya lebih lanjut?',
    'group' => 'whatsapp',
  ],
];

        foreach ($data as $item) {
            DB::table('settings')->insert($item);
        }

        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}
