<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ArticleSeeder extends Seeder
{
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('articles')->truncate();

        $data = array (
  0 => 
  array (
    'id' => 1,
    'title' => 'Raia Food Raih Penghargaan Kuliner Sehat Nusantara 2026',
    'slug' => 'raia-food-raih-penghargaan-kuliner-sehat-nusantara-2026',
    'excerpt' => 'Sebuah dedikasi tanpa henti dalam menghadirkan camilan lezat berbasis bahan alami pilihan untuk seluruh keluarga Indonesia.',
    'content' => '<p>Kami dengan bangga mengumumkan bahwa <strong>Raia Food</strong> telah resmi meraih penghargaan bergengsi dalam ajang <em>Kuliner Sehat Nusantara 2026</em>. Penghargaan ini menjadi bukti komitmen kami dalam menghadirkan camilan berkualitas tinggi yang memadukan cita rasa lezat dengan kebaikan nutrisi alami.</p><h2>Komitmen Kualitas &amp; Bahan Pilihan</h2><img class="rounded-2xl max-w-full my-6 shadow-md border border-gray-100 object-cover mx-auto" src="/storage/media/20260806-111414-1787573643.jpg" alt="20260806_111414.jpg"><p>Setiap produk Raia Food diolah secara higienis menggunakan standar keamanan pangan internasional (HACCP dan Halal). Kami selalu memastikan bahan baku lokal terbaik diproses tanpa pengawet berbahaya.</p><blockquote><p>"Kepercayaan pelanggan adalah motivasi terbesar kami untuk terus berinovasi dan menyajikan yang terbaik di setiap gigitan."</p></blockquote><p>Terima kasih kepada seluruh pelanggan setia Raia Food yang selalu menjadi bagian dari perjalanan kami. Mari terus melangkah bersama menuju gaya hidup yang lebih sehat dan berenergi!</p>',
    'featured_image' => 'media/buat-zoom-4-1-no-bg-1787573623.png',
    'author_id' => 1,
    'status' => 'published',
    'published_at' => '2026-08-22 11:37:00',
    'created_at' => '2026-08-24 18:37:19',
    'updated_at' => '2026-08-24 19:14:12',
  ),
  1 => 
  array (
    'id' => 2,
    'title' => '5 Tips Memilih Camilan Sehat dan Berenergi untuk Bekal Anak',
    'slug' => '5-tips-memilih-camilan-sehat-dan-berenergi-untuk-bekal-anak',
    'excerpt' => 'Simak panduan praktis dari tim gizi Raia Food agar si kecil tetap berenergi dan fokus selama beraktivitas di sekolah.',
    'content' => '<p>Menjaga asupan gizi anak selama beraktivitas di sekolah sangatlah penting. Camilan sehat tidak hanya mengisi energi di antara jam makan utama, namun juga mendukung konsentrasi dan daya tahan tubuh mereka.</p><h2>1. Perhatikan Kandungan Serat dan Protein</h2><p>Pilihlah camilan yang mengandung gandum utuh atau kacang-kacangan untuk memberikan rasa kenyang yang lebih tahan lama.</p><h2>2. Hindari Pemanis Buatan Berlebih</h2><p>Gunakan camilan manis alami seperti buah kering atau biskuit sehat dengan pemanis alami.</p><p>Temukan berbagai pilihan camilan sehat favorit si kecil langsung di katalog produk Raia Food!</p>',
    'featured_image' => 'images/raia-logo.webp',
    'author_id' => 1,
    'status' => 'published',
    'published_at' => '2026-08-24 18:37:19',
    'created_at' => '2026-08-24 18:37:19',
    'updated_at' => '2026-08-24 18:37:19',
  ),
  2 => 
  array (
    'id' => 3,
    'title' => 'jeruk',
    'slug' => 'jeruk',
    'excerpt' => 'ke nastar eggtart motif Bunga Imlek/Box Karton Kotak Kue Mooncake 50/80gram',
    'content' => '<p>50 Pcs Tray Mika Kotak Transparan + Tutup 60-80 gram Mooncake Nastar Mochi</p><p><br></p><p>Ukuran : 7,5 cm (60-80 gram mooncake/nastar)</p><p>Tinggi tanpa tutup : 3 cm, tinggi tray + tutup : 5 cm</p><p><br></p><p><br></p><p>Dijual 1 set (sekitar 45-50), kami tidak hitung satu2 sudah packingan dari pabrik</p><p>Mika sudah termasuk tutup, belum termasuk alas kertas tray, dijual terpisah, silakan klik di variasi Paper Tray (isi 100Pcs)</p><p>First hand supplier, jadi harga termurah cocok untuk jual lagi</p><p>#traymikatutup#traymooncake#traymochi</p>',
    'featured_image' => NULL,
    'author_id' => 1,
    'status' => 'published',
    'published_at' => '2026-09-19 13:41:09',
    'created_at' => '2026-09-19 13:41:09',
    'updated_at' => '2026-09-19 13:41:09',
  ),
);

        foreach ($data as $item) {
            DB::table('articles')->insert($item);
        }

        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}
