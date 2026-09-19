<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('categories')->truncate();

        $data = array (
  0 => 
  array (
    'id' => 1,
    'name' => 'CassaFlan',
    'slug' => 'cassaflan',
    'description' => 'Koleksi cookies klasik yang selalu menjadi favorit.',
    'image' => NULL,
    'is_active' => 1,
    'sort_order' => 1,
    'created_at' => NULL,
    'updated_at' => NULL,
  ),
  1 => 
  array (
    'id' => 2,
    'name' => 'Cita Rempah',
    'slug' => 'cita-rempah',
    'description' => 'Cookies dengan berbagai varian cokelat premium.',
    'image' => NULL,
    'is_active' => 1,
    'sort_order' => 2,
    'created_at' => NULL,
    'updated_at' => NULL,
  ),
);

        foreach ($data as $item) {
            DB::table('categories')->insert($item);
        }

        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}
