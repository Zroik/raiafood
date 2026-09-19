<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OurValueSeeder extends Seeder
{
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('our_values')->truncate();

        $data = array (
  0 => 
  array (
    'id' => 1,
    'title' => '"R" - Reverence (Penghormatan)',
    'description' => 'Menghormati alam, petani lokal, dan warisan kuliner leluhur Kota Batu. Kami percaya bahwa cita rasa sejati lahir dari penghormatan terhadap bumi dan tradisi.',
    'icon_type' => 'lucide',
    'icon_value' => 'ArrowUpFromDot',
    'font_size' => 'sm',
    'sort_order' => 1,
    'is_active' => 1,
    'created_at' => '2026-08-24 00:46:02',
    'updated_at' => '2026-08-24 10:40:31',
  ),
  1 => 
  array (
    'id' => 2,
    'title' => '"A" - Authenticity (Keaslian)',
    'description' => 'Menjaga resep turun-temurun tanpa bahan pengawet buatan, mempertahankan cita rasa asli camilan khas Malang yang melegenda dan tak tergantikan.',
    'icon_type' => 'lucide',
    'icon_value' => 'Sparkles',
    'font_size' => 'sm',
    'sort_order' => 2,
    'is_active' => 1,
    'created_at' => '2026-08-24 00:46:02',
    'updated_at' => '2026-08-24 00:46:02',
  ),
  2 => 
  array (
    'id' => 3,
    'title' => '"I" - Innovation (Inovasi)',
    'description' => 'Mengembangkan teknik pengolahan higienis modern dan kemasan menarik agar produk tradisional kami dapat dinikmati lintas generasi dan ke berbagai daerah.',
    'icon_type' => 'lucide',
    'icon_value' => 'Lightbulb',
    'font_size' => 'sm',
    'sort_order' => 3,
    'is_active' => 1,
    'created_at' => '2026-08-24 00:46:02',
    'updated_at' => '2026-08-24 00:46:02',
  ),
  3 => 
  array (
    'id' => 4,
    'title' => '"A" - Affection (Kasih Sayang)',
    'description' => 'Dibuat dengan sepenuh hati untuk menghadirkan kebahagiaan dan kehangatan keluarga di setiap gigitan camilan renyah dan lezat kami.',
    'icon_type' => 'lucide',
    'icon_value' => 'Heart',
    'font_size' => 'sm',
    'sort_order' => 4,
    'is_active' => 1,
    'created_at' => '2026-08-24 00:46:02',
    'updated_at' => '2026-08-24 00:46:02',
  ),
);

        foreach ($data as $item) {
            DB::table('our_values')->insert($item);
        }

        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}
