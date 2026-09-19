<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FlashSaleSeeder extends Seeder
{
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('flash_sale_items')->truncate();
        DB::table('flash_sales')->truncate();

        $sales = array (
  0 => 
  array (
    'id' => 1,
    'title' => 'Flash Sale Spesial Hari Ini',
    'description' => 'Diskon kilat produk pilihan terbatas waktu!',
    'start_time' => NULL,
    'end_time' => '2026-09-07 07:42:00',
    'is_active' => 1,
    'banner_id' => 1,
    'created_at' => '2026-09-06 16:43:38',
    'updated_at' => '2026-09-06 16:43:38',
  ),
);
        foreach ($sales as $sale) {
            DB::table('flash_sales')->insert($sale);
        }

        $items = array (
  0 => 
  array (
    'id' => 1,
    'flash_sale_id' => 1,
    'product_id' => 27,
    'discount_price' => '40000.00',
    'discount_percentage' => 20,
    'created_at' => '2026-09-06 16:43:38',
    'updated_at' => '2026-09-06 16:43:38',
  ),
  1 => 
  array (
    'id' => 2,
    'flash_sale_id' => 1,
    'product_id' => 5,
    'discount_price' => '38400.00',
    'discount_percentage' => 20,
    'created_at' => '2026-09-06 16:43:38',
    'updated_at' => '2026-09-06 16:43:38',
  ),
  2 => 
  array (
    'id' => 3,
    'flash_sale_id' => 1,
    'product_id' => 26,
    'discount_price' => '40000.00',
    'discount_percentage' => 20,
    'created_at' => '2026-09-06 16:43:38',
    'updated_at' => '2026-09-06 16:43:38',
  ),
);
        foreach ($items as $item) {
            DB::table('flash_sale_items')->insert($item);
        }

        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}
