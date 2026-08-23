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
        'countdown_enabled',
        'countdown_end',
        'countdown_pos_x',
        'countdown_pos_y',
        'countdown_scale',
        'sort_order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'countdown_enabled' => 'boolean',
        'countdown_end' => 'datetime:Y-m-d H:i:s',
        'countdown_pos_x' => 'float',
        'countdown_pos_y' => 'float',
        'countdown_scale' => 'float',
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
