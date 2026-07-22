<?php

namespace Database\Seeders;

use App\Models\Banner;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BannerSeeder extends Seeder
{
    public function run(): void
    {
        // Disable foreign key checks
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('banners')->truncate();

        $data = [
  0 => [
    'id' => 1,
    'title' => 'Banner 1',
    'description' => NULL,
    'image' => 'images/hero1.webp',
    'link' => NULL,
    'sort_order' => 1,
    'is_active' => 1,
  ],
  1 => [
    'id' => 4,
    'title' => 'banner2',
    'description' => NULL,
    'image' => 'banners/aek4UUVHrqJ2vxDmEREZCck6hovVum9lKkPUaYD5.webp',
    'link' => '/products',
    'sort_order' => 2,
    'is_active' => 1,
  ],
  2 => [
    'id' => 5,
    'title' => 'banner3',
    'description' => NULL,
    'image' => 'banners/8mctIEXQxoSIs15Mk29C8BxzV4zQJv8HE0PCtgGO.webp',
    'link' => '/products',
    'sort_order' => 3,
    'is_active' => 1,
  ],
];

        foreach ($data as $item) {
            DB::table('banners')->insert($item);
        }

        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}
