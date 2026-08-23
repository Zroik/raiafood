<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OurValue extends Model
{
    protected $fillable = [
        'title',
        'description',
        'icon_type',
        'icon_value',
        'font_size',
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
}
