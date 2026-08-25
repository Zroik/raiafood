<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\User;
use Illuminate\Database\Seeder;

class ArticleSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::where('role', 'admin')->first();

        Article::firstOrCreate(
            ['slug' => 'raia-food-raih-penghargaan-kuliner-sehat-nusantara-2026'],
            [
                'title' => 'Raia Food Raih Penghargaan Kuliner Sehat Nusantara 2026',
                'excerpt' => 'Sebuah dedikasi tanpa henti dalam menghadirkan camilan lezat berbasis bahan alami pilihan untuk seluruh keluarga Indonesia.',
                'content' => '<p>Kami dengan bangga mengumumkan bahwa <strong>Raia Food</strong> telah resmi meraih penghargaan bergengsi dalam ajang <em>Kuliner Sehat Nusantara 2026</em>. Penghargaan ini menjadi bukti komitmen kami dalam menghadirkan camilan berkualitas tinggi yang memadukan cita rasa lezat dengan kebaikan nutrisi alami.</p><h2>Komitmen Kualitas & Bahan Pilihan</h2><p>Setiap produk Raia Food diolah secara higienis menggunakan standar keamanan pangan internasional (HACCP dan Halal). Kami selalu memastikan bahan baku lokal terbaik diproses tanpa pengawet berbahaya.</p><blockquote>"Kepercayaan pelanggan adalah motivasi terbesar kami untuk terus berinovasi dan menyajikan yang terbaik di setiap gigitan."</blockquote><p>Terima kasih kepada seluruh pelanggan setia Raia Food yang selalu menjadi bagian dari perjalanan kami. Mari terus melangkah bersama menuju gaya hidup yang lebih sehat dan berenergi!</p>',
                'featured_image' => 'images/raia-logo.webp',
                'author_id' => $admin?->id,
                'status' => 'published',
                'published_at' => now()->subDays(2),
            ]
        );

        Article::firstOrCreate(
            ['slug' => '5-tips-memilih-camilan-sehat-dan-berenergi-untuk-bekal-anak'],
            [
                'title' => '5 Tips Memilih Camilan Sehat dan Berenergi untuk Bekal Anak',
                'excerpt' => 'Simak panduan praktis dari tim gizi Raia Food agar si kecil tetap berenergi dan fokus selama beraktivitas di sekolah.',
                'content' => '<p>Menjaga asupan gizi anak selama beraktivitas di sekolah sangatlah penting. Camilan sehat tidak hanya mengisi energi di antara jam makan utama, namun juga mendukung konsentrasi dan daya tahan tubuh mereka.</p><h2>1. Perhatikan Kandungan Serat dan Protein</h2><p>Pilihlah camilan yang mengandung gandum utuh atau kacang-kacangan untuk memberikan rasa kenyang yang lebih tahan lama.</p><h2>2. Hindari Pemanis Buatan Berlebih</h2><p>Gunakan camilan manis alami seperti buah kering atau biskuit sehat dengan pemanis alami.</p><p>Temukan berbagai pilihan camilan sehat favorit si kecil langsung di katalog produk Raia Food!</p>',
                'featured_image' => 'images/raia-logo.webp',
                'author_id' => $admin?->id,
                'status' => 'published',
                'published_at' => now(),
            ]
        );
    }
}
