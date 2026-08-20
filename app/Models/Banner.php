<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Banner extends Model
{
    protected $fillable = [
        'title',
        'type',
        'description',
        'image',
        'link',
        'sort_order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function scopeActive($query)
    {
        return $query->where('is_active', true)->orderBy('sort_order');
    }

    public function scopeHero($query)
    {
        return $query->where('type', 'hero');
    }

    public function scopeFlashSale($query)
    {
        return $query->where('type', 'flash_sale');
    }
}
