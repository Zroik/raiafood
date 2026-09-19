<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ContactMessageSeeder extends Seeder
{
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('contact_messages')->truncate();

        $data = array (
  0 => 
  array (
    'id' => 2,
    'name' => 'zv',
    'email' => 'raiafoodcentre@gmail.com',
    'whatsapp' => 'wa.me//081222777468',
    'subject' => 'vz',
    'message' => '50 Pcs Tray Mika Kotak Transparan + Tutup 60-80 gram Mooncake Nastar Mochi



Ukuran : 7,5 cm (60-80 gram mooncake/nastar)

Tinggi tanpa tutup : 3 cm, tinggi tray + tutup : 5 cm





Dijual 1 set (sekitar 45-50), kami tidak hitung satu2 sudah packingan dari pabrik

Mika sudah termasuk tutup, belum termasuk alas kertas tray, dijual terpisah, silakan klik di variasi Paper Tray (isi 100Pcs)

First hand supplier, jadi harga termurah cocok untuk jual lagi

#traymikatutup#traymooncake#traymochi',
    'is_read' => 0,
    'created_at' => '2026-09-19 13:41:57',
    'updated_at' => '2026-09-19 13:41:57',
  ),
);

        foreach ($data as $item) {
            DB::table('contact_messages')->insert($item);
        }

        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}
