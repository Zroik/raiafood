<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            // Classic Cookies (category_id: 1)
            [
                'category_id' => 1,
                'name' => 'Classic Choco Chip',
                'slug' => 'classic-choco-chip',
                'description' => 'Cookies klasik dengan chocolate chip premium yang melimpah. Dipanggang sempurna dengan tekstur renyah di luar dan lembut di dalam.',
                'short_description' => 'Cookies klasik dengan chocolate chip premium',
                'price' => 45000,
                'stock' => 100,
                'weight' => 200,
                'is_active' => true,
                'is_featured' => true,
                'rating_count' => 120,
                'rating_avg' => 4.5,
            ],
            [
                'category_id' => 1,
                'name' => 'Butter Cookies',
                'slug' => 'butter-cookies',
                'description' => 'Cookies butter premium dengan rasa yang lembut dan meleleh di mulut. Dibuat dengan mentega Perancis pilihan.',
                'short_description' => 'Cookies butter premium lembut meleleh',
                'price' => 42000,
                'stock' => 80,
                'weight' => 200,
                'is_active' => true,
                'is_featured' => false,
                'rating_count' => 85,
                'rating_avg' => 4.3,
            ],
            [
                'category_id' => 1,
                'name' => 'Oatmeal Raisin',
                'slug' => 'oatmeal-raisin',
                'description' => 'Cookies oatmeal dengan kismis manis alami. Pilihan sehat yang tetap lezat untuk menemani hari Anda.',
                'short_description' => 'Cookies oatmeal sehat dengan kismis manis',
                'price' => 42000,
                'stock' => 60,
                'weight' => 200,
                'is_active' => true,
                'is_featured' => true,
                'rating_count' => 75,
                'rating_avg' => 4.2,
            ],

            // Chocolate Series (category_id: 2)
            [
                'category_id' => 2,
                'name' => 'Double Chocolate',
                'slug' => 'double-chocolate',
                'description' => 'Cookies cokelat ganda dengan dark chocolate dan milk chocolate chip. Surga bagi para pecinta cokelat.',
                'short_description' => 'Double chocolate untuk pecinta cokelat',
                'price' => 48000,
                'stock' => 90,
                'weight' => 200,
                'is_active' => true,
                'is_featured' => true,
                'rating_count' => 98,
                'rating_avg' => 4.6,
            ],
            [
                'category_id' => 2,
                'name' => 'Matcha White Choco',
                'slug' => 'matcha-white-choco',
                'description' => 'Perpaduan unik matcha Jepang premium dengan white chocolate. Rasa yang elegan dan tidak terlalu manis.',
                'short_description' => 'Matcha Jepang premium x white chocolate',
                'price' => 48000,
                'stock' => 70,
                'weight' => 200,
                'is_active' => true,
                'is_featured' => true,
                'rating_count' => 86,
                'rating_avg' => 4.4,
            ],
            [
                'category_id' => 2,
                'name' => 'Nutella Cookies',
                'slug' => 'nutella-cookies',
                'description' => 'Cookies lembut dengan isian Nutella yang melimpah di setiap gigitan. Favorit anak-anak dan dewasa.',
                'short_description' => 'Cookies lembut dengan isian Nutella',
                'price' => 50000,
                'stock' => 55,
                'weight' => 200,
                'is_active' => true,
                'is_featured' => true,
                'rating_count' => 64,
                'rating_avg' => 4.5,
            ],

            // Nutty Cookies (category_id: 3)
            [
                'category_id' => 3,
                'name' => 'Almond Cookies',
                'slug' => 'almond-cookies',
                'description' => 'Cookies renyah dengan potongan almond panggang yang gurih. Tekstur yang sempurna antara renyah dan lembut.',
                'short_description' => 'Cookies renyah dengan almond panggang',
                'price' => 42000,
                'stock' => 65,
                'weight' => 200,
                'is_active' => true,
                'is_featured' => true,
                'rating_count' => 58,
                'rating_avg' => 4.3,
            ],
            [
                'category_id' => 3,
                'name' => 'Peanut Butter Cookies',
                'slug' => 'peanut-butter-cookies',
                'description' => 'Cookies selai kacang yang gurih dan lezat. Dibuat dengan selai kacang alami tanpa pengawet.',
                'short_description' => 'Cookies selai kacang alami gurih',
                'price' => 44000,
                'stock' => 50,
                'weight' => 200,
                'is_active' => true,
                'is_featured' => false,
                'rating_count' => 42,
                'rating_avg' => 4.1,
            ],
            [
                'category_id' => 3,
                'name' => 'Cashew Cranberry',
                'slug' => 'cashew-cranberry',
                'description' => 'Cookies dengan kacang mete panggang dan cranberry kering. Perpaduan manis dan gurih yang sempurna.',
                'short_description' => 'Kacang mete panggang & cranberry kering',
                'price' => 52000,
                'stock' => 40,
                'weight' => 200,
                'is_active' => true,
                'is_featured' => false,
                'rating_count' => 35,
                'rating_avg' => 4.4,
            ],

            // Premium Collection (category_id: 4)
            [
                'category_id' => 4,
                'name' => 'Red Velvet Cookies',
                'slug' => 'red-velvet-cookies',
                'description' => 'Cookies red velvet premium dengan cream cheese frosting. Tampilan cantik dan rasa yang mewah.',
                'short_description' => 'Red velvet premium dengan cream cheese',
                'price' => 55000,
                'stock' => 45,
                'weight' => 200,
                'is_active' => true,
                'is_featured' => false,
                'rating_count' => 52,
                'rating_avg' => 4.7,
            ],
            [
                'category_id' => 4,
                'name' => 'Salted Caramel',
                'slug' => 'salted-caramel',
                'description' => 'Cookies dengan saus karamel homemade dan taburan sea salt. Keseimbangan manis dan asin yang adiktif.',
                'short_description' => 'Karamel homemade dengan sea salt',
                'price' => 55000,
                'stock' => 40,
                'weight' => 200,
                'is_active' => true,
                'is_featured' => false,
                'rating_count' => 47,
                'rating_avg' => 4.6,
            ],
            [
                'category_id' => 4,
                'name' => 'Tiramisu Cookies',
                'slug' => 'tiramisu-cookies',
                'description' => 'Cookies dengan cita rasa tiramisu klasik Italia. Perpaduan kopi, mascarpone, dan cocoa yang menggugah selera.',
                'short_description' => 'Cita rasa tiramisu klasik Italia',
                'price' => 58000,
                'stock' => 35,
                'weight' => 200,
                'is_active' => true,
                'is_featured' => false,
                'rating_count' => 38,
                'rating_avg' => 4.8,
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
