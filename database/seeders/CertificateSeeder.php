<?php

namespace Database\Seeders;

use App\Models\Certificate;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CertificateSeeder extends Seeder
{
    public function run(): void
    {
        // Disable foreign key checks
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('certificates')->truncate();

        $data = [
  0 => [
    'id' => 3,
    'title' => 'saaw',
    'image' => 'certificates/gDxjcnylC8vfvjaKV50uw6jXYUwlVGlgQhsWWi95.jpg',
    'sort_order' => 2,
    'is_active' => 1,
  ],
  1 => [
    'id' => 4,
    'title' => 'sr',
    'image' => 'certificates/O0woj8AzyMCUxFtOSbODm59xpniVilNWRgaB9CSC.webp',
    'sort_order' => 1,
    'is_active' => 1,
  ],
  2 => [
    'id' => 5,
    'title' => 'sdawdas',
    'image' => 'certificates/0MFHSiwQ8k0LtMYUE7HcmtX2I1NoOjP77R5SlQDu.png',
    'sort_order' => 3,
    'is_active' => 1,
  ],
];

        foreach ($data as $item) {
            DB::table('certificates')->insert($item);
        }

        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}
