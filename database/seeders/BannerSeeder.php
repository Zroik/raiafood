<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BannerSeeder extends Seeder
{
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('banners')->truncate();

        $data = array (
  0 => 
  array (
    'id' => 1,
    'title' => 'Banner 1',
    'type' => 'hero',
    'description' => NULL,
    'image' => 'images/hero1.webp',
    'link' => NULL,
    'countdown_enabled' => 0,
    'countdown_end' => NULL,
    'countdown_pos_x' => '50.00',
    'countdown_pos_y' => '50.00',
    'countdown_scale' => '1.00',
    'countdown_box_color' => '#030712',
    'countdown_font_color' => '#ffffff',
    'countdown_font_family' => 'Outfit',
    'countdown_digit_bg' => NULL,
    'sort_order' => 1,
    'is_active' => 1,
    'created_at' => NULL,
    'updated_at' => NULL,
  ),
  1 => 
  array (
    'id' => 4,
    'title' => 'banner2',
    'type' => 'hero',
    'description' => NULL,
    'image' => 'banners/aek4UUVHrqJ2vxDmEREZCck6hovVum9lKkPUaYD5.webp',
    'link' => '/products',
    'countdown_enabled' => 0,
    'countdown_end' => NULL,
    'countdown_pos_x' => '50.00',
    'countdown_pos_y' => '50.00',
    'countdown_scale' => '1.00',
    'countdown_box_color' => '#030712',
    'countdown_font_color' => '#ffffff',
    'countdown_font_family' => 'Outfit',
    'countdown_digit_bg' => NULL,
    'sort_order' => 2,
    'is_active' => 1,
    'created_at' => NULL,
    'updated_at' => NULL,
  ),
  2 => 
  array (
    'id' => 5,
    'title' => 'banner3',
    'type' => 'hero',
    'description' => NULL,
    'image' => 'images/hero3.webp',
    'link' => '/products',
    'countdown_enabled' => 0,
    'countdown_end' => NULL,
    'countdown_pos_x' => '50.00',
    'countdown_pos_y' => '50.00',
    'countdown_scale' => '1.00',
    'countdown_box_color' => '#030712',
    'countdown_font_color' => '#ffffff',
    'countdown_font_family' => 'Outfit',
    'countdown_digit_bg' => NULL,
    'sort_order' => 3,
    'is_active' => 1,
    'created_at' => NULL,
    'updated_at' => NULL,
  ),
  3 => 
  array (
    'id' => 6,
    'title' => 'Flash Sale Spesial',
    'type' => 'flash_sale',
    'description' => NULL,
    'image' => 'images/flash-sale-banner.webp',
    'link' => '/products?flash_sale=1',
    'countdown_enabled' => 0,
    'countdown_end' => NULL,
    'countdown_pos_x' => '50.00',
    'countdown_pos_y' => '50.00',
    'countdown_scale' => '1.00',
    'countdown_box_color' => '#030712',
    'countdown_font_color' => '#ffffff',
    'countdown_font_family' => 'Outfit',
    'countdown_digit_bg' => NULL,
    'sort_order' => 1,
    'is_active' => 1,
    'created_at' => NULL,
    'updated_at' => NULL,
  ),
);

        foreach ($data as $item) {
            DB::table('banners')->insert($item);
        }

        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}
