<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Classic Cookies',
                'slug' => 'classic-cookies',
                'description' => 'Koleksi cookies klasik yang selalu menjadi favorit.',
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'name' => 'Chocolate Series',
                'slug' => 'chocolate-series',
                'description' => 'Cookies dengan berbagai varian cokelat premium.',
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'name' => 'Nutty Cookies',
                'slug' => 'nutty-cookies',
                'description' => 'Cookies dengan campuran kacang-kacangan pilihan.',
                'is_active' => true,
                'sort_order' => 3,
            ],
            [
                'name' => 'Premium Collection',
                'slug' => 'premium-collection',
                'description' => 'Cookies premium dengan bahan-bahan terbaik.',
                'is_active' => true,
                'sort_order' => 4,
            ],
            [
                'name' => 'Paket Hampers',
                'slug' => 'paket-hampers',
                'description' => 'Paket hampers untuk hadiah dan berbagai momen spesial.',
                'is_active' => true,
                'sort_order' => 5,
            ],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
