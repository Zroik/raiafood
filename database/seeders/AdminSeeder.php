<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('users')->truncate();

        $data = array (
  0 => 
  array (
    'id' => 1,
    'name' => 'Admin RaiaFood',
    'email' => 'admin@raiafood.com',
    'email_verified_at' => '2026-08-19 07:33:19',
    'password' => '$2y$12$3Odl3Y2Yjnn3U90jJnzVAeXC1nQ4R/Sw3xDMps4AAS1kOE6Q/pRda',
    'provider' => NULL,
    'provider_id' => NULL,
    'avatar' => NULL,
    'role' => 'admin',
    'phone' => NULL,
    'address' => NULL,
    'remember_token' => 'OxG3rBUCUirVHYtTwlhDJdgqHUezS2GIm4g3WYR8PXgnWK54GOPCwRnzxbcc',
    'created_at' => '2026-08-19 07:33:19',
    'updated_at' => '2026-08-19 07:33:19',
  ),
  1 => 
  array (
    'id' => 2,
    'name' => 'Customer Demo',
    'email' => 'customer@raiafood.com',
    'email_verified_at' => '2026-08-19 07:33:20',
    'password' => '$2y$12$UgXyxQwiMaOP9q6rXw94NulaF.SlaowezJfUrXiLWYGGB4cD.QbgW',
    'provider' => NULL,
    'provider_id' => NULL,
    'avatar' => NULL,
    'role' => 'customer',
    'phone' => NULL,
    'address' => NULL,
    'remember_token' => NULL,
    'created_at' => '2026-08-19 07:33:20',
    'updated_at' => '2026-08-19 07:33:20',
  ),
);

        foreach ($data as $item) {
            DB::table('users')->insert($item);
        }

        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}
