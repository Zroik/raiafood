<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Product extends Model
{
    protected $fillable = [
        'category_id',
        'name',
        'slug',
        'description',
        'short_description',
        'price',
        'discount_price',
        'stock',
        'image',
        'gallery',
        'weight',
        'is_active',
        'is_featured',
        'rating_count',
        'rating_avg',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'discount_price' => 'decimal:2',
        'weight' => 'decimal:2',
        'rating_avg' => 'decimal:2',
        'is_active' => 'boolean',
        'is_featured' => 'boolean',
        'gallery' => 'array',
    ];

    protected $appends = [
        'effective_price',
        'discount_percentage',
    ];

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($product) {
            if (empty($product->slug)) {
                $product->slug = Str::slug($product->name);
            }
        });
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    public function flashSaleItems(): HasMany
    {
        return $this->hasMany(FlashSaleItem::class);
    }

    public function getActiveFlashSaleItemAttribute()
    {
        return $this->flashSaleItems()
            ->whereHas('flashSale', function ($q) {
                $q->currentlyActive();
            })
            ->latest()
            ->first();
    }

    public function getEffectivePriceAttribute(): float
    {
        $activeFs = $this->active_flash_sale_item;
        if ($activeFs && $activeFs->discount_price > 0 && $activeFs->discount_price < $this->price) {
            return (float) $activeFs->discount_price;
        }

        return (float) ($this->discount_price ?? $this->price);
    }

    public function getDiscountPercentageAttribute(): ?int
    {
        $effectivePrice = $this->effective_price;
        if ($effectivePrice < $this->price && $this->price > 0) {
            return round((($this->price - $effectivePrice) / $this->price) * 100);
        }
        return null;
    }

    public function getFormattedPriceAttribute(): string
    {
        return 'Rp ' . number_format($this->effective_price, 0, ',', '.');
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    public function scopeInStock($query)
    {
        return $query->where('stock', '>', 0);
    }
}
