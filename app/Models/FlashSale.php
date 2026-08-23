<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Carbon\Carbon;

class FlashSale extends Model
{
    protected $fillable = [
        'title',
        'description',
        'start_time',
        'end_time',
        'is_active',
        'banner_id',
    ];

    protected $casts = [
        'start_time' => 'datetime:Y-m-d H:i:s',
        'end_time' => 'datetime:Y-m-d H:i:s',
        'is_active' => 'boolean',
    ];

    public function banner(): BelongsTo
    {
        return $this->belongsTo(Banner::class);
    }

    public function items(): HasMany
    {
        return $this->hasMany(FlashSaleItem::class);
    }

    public function scopeCurrentlyActive($query)
    {
        $now = Carbon::now('Asia/Jakarta');
        return $query->where('is_active', true)
            ->where(function ($q) use ($now) {
                $q->whereNull('start_time')->orWhere('start_time', '<=', $now);
            })
            ->where(function ($q) use ($now) {
                $q->whereNull('end_time')->orWhere('end_time', '>=', $now);
            });
    }

    public function getIsRunningAttribute(): bool
    {
        if (!$this->is_active) return false;
        $now = Carbon::now('Asia/Jakarta');
        $startOk = !$this->start_time || Carbon::parse($this->start_time)->lte($now);
        $endOk = !$this->end_time || Carbon::parse($this->end_time)->gte($now);
        return $startOk && $endOk;
    }
}
