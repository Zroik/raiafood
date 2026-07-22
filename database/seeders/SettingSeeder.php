<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
            ['key' => 'store_name', 'value' => 'RaiaFood', 'group' => 'general'],
            ['key' => 'store_tagline', 'value' => 'Cookies Premium untuk Setiap Momen', 'group' => 'general'],
            ['key' => 'store_description', 'value' => 'Dibuat dengan bahan pilihan berkualitas tinggi, dipanggang sempurna untuk rasa yang tak terlupakan.', 'group' => 'general'],
            ['key' => 'store_email', 'value' => 'hello@raiafood.com', 'group' => 'general'],
            ['key' => 'store_phone', 'value' => '+62 812-3456-7890', 'group' => 'general'],
            ['key' => 'store_address', 'value' => 'Jl. Cookies Premium No. 12, Jakarta Selatan', 'group' => 'general'],
            ['key' => 'free_shipping_min', 'value' => '150000', 'group' => 'shipping'],
            ['key' => 'shipping_cost', 'value' => '15000', 'group' => 'shipping'],
            ['key' => 'instagram', 'value' => 'https://instagram.com/raiafood', 'group' => 'social'],
            ['key' => 'whatsapp', 'value' => '6281234567890', 'group' => 'social'],
            ['key' => 'whatsapp_button_enabled', 'value' => '1', 'group' => 'whatsapp'],
            ['key' => 'whatsapp_number', 'value' => '6281234567890', 'group' => 'whatsapp'],
            ['key' => 'whatsapp_message', 'value' => 'Halo RaiaFood! Saya tertarik dengan produk cookies kalian. Boleh info lebih lanjut?', 'group' => 'whatsapp'],
        ];

        foreach ($settings as $setting) {
            Setting::updateOrCreate(['key' => $setting['key']], $setting);
        }
    }
}
