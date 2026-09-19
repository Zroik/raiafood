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
            $table->string('countdown_box_color', 50)->nullable()->default('#030712')->after('countdown_scale');
            $table->string('countdown_font_color', 50)->nullable()->default('#ffffff')->after('countdown_box_color');
            $table->string('countdown_font_family', 100)->nullable()->default('Outfit')->after('countdown_font_color');
            $table->string('countdown_digit_bg', 50)->nullable()->after('countdown_font_family');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('banners', function (Blueprint $table) {
            $table->dropColumn([
                'countdown_box_color',
                'countdown_font_color',
                'countdown_font_family',
                'countdown_digit_bg',
            ]);
        });
    }
};
