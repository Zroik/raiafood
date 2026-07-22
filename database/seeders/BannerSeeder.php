<?php

namespace Database\Seeders;

use App\Models\Banner;
use Illuminate\Database\Seeder;

class BannerSeeder extends Seeder
{
    public function run(): void
    {
        Banner::create([
            'title' => 'Cookies Premium untuk Setiap Momen',
            'description' => 'Dibuat dengan bahan pilihan berkualitas tinggi, dipanggang sempurna untuk rasa yang tak terlupakan.',
            'image' => 'banners/hero-banner.jpg',
            'link' => '/products',
            'sort_order' => 1,
            'is_active' => true,
        ]);

        Banner::create([
            'title' => 'Promo Hampers Spesial Hari Raya',
            'description' => 'Bagikan kebahagiaan dengan paket hampers cookies eksklusif untuk orang tersayang.',
            'image' => 'banners/hampers-banner.jpg',
            'link' => '/products?category=paket-hampers',
            'sort_order' => 2,
            'is_active' => true,
        ]);
    }
}
