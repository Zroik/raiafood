<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('banners', function (Blueprint $table) {
            $table->boolean('countdown_enabled')->default(false)->after('link');
            $table->dateTime('countdown_end')->nullable()->after('countdown_enabled');
            $table->decimal('countdown_pos_x', 5, 2)->default(50.00)->after('countdown_end'); // percentage (0 - 100)
            $table->decimal('countdown_pos_y', 5, 2)->default(50.00)->after('countdown_pos_x'); // percentage (0 - 100)
            $table->decimal('countdown_scale', 4, 2)->default(1.00)->after('countdown_pos_y'); // scale multiplier (0.4 - 3.0)
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('banners', function (Blueprint $table) {
            $table->dropColumn([
                'countdown_enabled',
                'countdown_end',
                'countdown_pos_x',
                'countdown_pos_y',
                'countdown_scale',
            ]);
        });
    }
};
