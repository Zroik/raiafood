<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MediaSeeder extends Seeder
{
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('media')->truncate();

        $data = array (
  0 => 
  array (
    'id' => 1,
    'filename' => 'BUAT ZOOM 4 (1)-no-bg.png',
    'path' => 'media/buat-zoom-4-1-no-bg-1787573623.png',
    'mime_type' => 'image/png',
    'size' => 976274,
    'created_at' => '2026-08-24 19:13:43',
    'updated_at' => '2026-08-24 19:13:43',
  ),
  1 => 
  array (
    'id' => 2,
    'filename' => '20260806_111414.jpg',
    'path' => 'media/20260806-111414-1787573643.jpg',
    'mime_type' => 'image/jpeg',
    'size' => 3637548,
    'created_at' => '2026-08-24 19:14:03',
    'updated_at' => '2026-08-24 19:14:03',
  ),
);

        foreach ($data as $item) {
            DB::table('media')->insert($item);
        }

        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}
