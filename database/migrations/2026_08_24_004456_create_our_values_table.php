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
        Schema::create('our_values', function (Blueprint $table) {
            $table->id();
            $table->string('title'); // e.g. "R" - Reverence (Penghormatan)
            $table->text('description'); // e.g. Menghormati alam, petani lokal...
            $table->string('icon_type')->default('lucide'); // 'lucide', 'svg', 'image', 'emoji'
            $table->string('icon_value')->default('CheckCircle2'); // icon name or image path
            $table->string('font_size')->default('sm'); // 'xs', 'sm', 'base', 'lg'
            $table->integer('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('our_values');
    }
};
