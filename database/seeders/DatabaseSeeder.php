<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        $this->call([
            AdminSeeder::class,
            CategorySeeder::class,
            ProductSeeder::class,
            SettingSeeder::class,
            BannerSeeder::class,
            CertificateSeeder::class,
            OurValueSeeder::class,
            FaqSeeder::class,
            FlashSaleSeeder::class,
            ArticleSeeder::class,
            MediaSeeder::class,
            ContactMessageSeeder::class,
        ]);
    }
}
