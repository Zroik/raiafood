<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;
use Carbon\Carbon;

class Article extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'excerpt',
        'content',
        'featured_image',
        'author_id',
        'status',
        'published_at',
    ];

    protected $casts = [
        'published_at' => 'datetime',
    ];

    protected $appends = [
        'featured_image_url',
        'formatted_published_date',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($article) {
            if (empty($article->slug)) {
                $article->slug = Str::slug($article->title);
            }
        });
    }

    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    public function scopePublished($query)
    {
        return $query->where('status', 'published')
            ->whereNotNull('published_at')
            ->where('published_at', '<=', Carbon::now('Asia/Jakarta'));
    }

    public function getFeaturedImageUrlAttribute(): ?string
    {
        if (!$this->featured_image) {
            return null;
        }

        if (str_starts_with($this->featured_image, 'http://') || str_starts_with($this->featured_image, 'https://')) {
            return $this->featured_image;
        }

        if (str_starts_with($this->featured_image, 'images/')) {
            return '/' . $this->featured_image;
        }

        if (str_starts_with($this->featured_image, '/')) {
            return $this->featured_image;
        }

        return '/storage/' . $this->featured_image;
    }

    public function getFormattedPublishedDateAttribute(): string
    {
        if (!$this->published_at) {
            return '-';
        }

        return Carbon::parse($this->published_at)->locale('id')->isoFormat('D MMMM Y');
    }
}
