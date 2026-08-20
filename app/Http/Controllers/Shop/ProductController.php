<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::with('category')
            ->withSum('orderItems as total_sold', 'quantity')
            ->active()
            ->inStock();

        if ($request->filled('category')) {
            $query->whereHas('category', fn($q) => $q->where('slug', $request->category));
        }

        if ($request->boolean('flash_sale') || $request->flash_sale === '1') {
            $query->whereNotNull('discount_price')
                  ->where('discount_price', '>', 0)
                  ->whereColumn('discount_price', '<', 'price');
        }

        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', "%{$request->search}%")
                  ->orWhere('description', 'like', "%{$request->search}%");
            });
        }

        if ($request->filled('min_price')) {
            $query->whereRaw('COALESCE(discount_price, price) >= ?', [(float) $request->min_price]);
        }

        if ($request->filled('max_price')) {
            $query->whereRaw('COALESCE(discount_price, price) <= ?', [(float) $request->max_price]);
        }

        if ($request->filled('sort')) {
            match ($request->sort) {
                'price_asc' => $query->orderByRaw('COALESCE(discount_price, price) ASC'),
                'price_desc' => $query->orderByRaw('COALESCE(discount_price, price) DESC'),
                'newest' => $query->orderBy('created_at', 'desc'),
                'popular' => $query->orderByDesc('total_sold')->orderByDesc('rating_count'),
                default => $query->orderBy('created_at', 'desc'),
            };
        } else {
            $query->orderBy('created_at', 'desc');
        }

        $products = $query->paginate(15)->withQueryString();

        $flashSaleCount = Product::active()->inStock()
            ->whereNotNull('discount_price')
            ->where('discount_price', '>', 0)
            ->whereColumn('discount_price', '<', 'price')
            ->count();

        $categories = Category::active()
            ->withCount(['products' => fn($q) => $q->active()])
            ->orderBy('sort_order')
            ->get();

        return Inertia::render('Shop/Products', [
            'products' => $products,
            'categories' => $categories,
            'flashSaleCount' => $flashSaleCount,
            'filters' => $request->only(['category', 'search', 'sort', 'min_price', 'max_price', 'flash_sale']),
        ]);
    }

    public function show(string $slug)
    {
        $product = Product::with('category')
            ->withSum('orderItems as total_sold', 'quantity')
            ->where('slug', $slug)
            ->active()
            ->firstOrFail();

        $relatedProducts = Product::with('category')
            ->active()
            ->inStock()
            ->where('category_id', $product->category_id)
            ->where('id', '!=', $product->id)
            ->take(4)
            ->get();

        $inWishlist = false;
        if (auth()->check()) {
            $inWishlist = \App\Models\Wishlist::where('user_id', auth()->id())
                ->where('product_id', $product->id)
                ->exists();
        }

        return Inertia::render('Shop/ProductDetail', [
            'product' => $product,
            'relatedProducts' => $relatedProducts,
            'inWishlist' => $inWishlist,
        ]);
    }
}
