<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CertificateSeeder extends Seeder
{
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('certificates')->truncate();

        $data = array (
  0 => 
  array (
    'id' => 3,
    'title' => 'saaw',
    'type' => 'certificate',
    'image' => 'certificates/gDxjcnylC8vfvjaKV50uw6jXYUwlVGlgQhsWWi95.jpg',
    'sort_order' => 2,
    'is_active' => 1,
    'created_at' => NULL,
    'updated_at' => NULL,
  ),
  1 => 
  array (
    'id' => 4,
    'title' => 'sr',
    'type' => 'certificate',
    'image' => 'certificates/O0woj8AzyMCUxFtOSbODm59xpniVilNWRgaB9CSC.webp',
    'sort_order' => 1,
    'is_active' => 1,
    'created_at' => NULL,
    'updated_at' => NULL,
  ),
  2 => 
  array (
    'id' => 5,
    'title' => 'sdawdas',
    'type' => 'certificate',
    'image' => 'certificates/0MFHSiwQ8k0LtMYUE7HcmtX2I1NoOjP77R5SlQDu.png',
    'sort_order' => 3,
    'is_active' => 1,
    'created_at' => NULL,
    'updated_at' => NULL,
  ),
);

        foreach ($data as $item) {
            DB::table('certificates')->insert($item);
        }

        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}
