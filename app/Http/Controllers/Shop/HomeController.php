<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Category;
use App\Models\Banner;
use App\Models\Setting;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        // Produk Terbaru (last created)
        $latestProducts = Product::with('category')
            ->withSum('orderItems as total_sold', 'quantity')
            ->active()
            ->inStock()
            ->orderBy('created_at', 'desc')
            ->take(6)
            ->get();

        // Produk Terlaris (terbanyak terjual / popular)
        $bestSellerProducts = Product::with('category')
            ->withSum('orderItems as total_sold', 'quantity')
            ->active()
            ->inStock()
            ->orderByDesc('total_sold')
            ->orderByDesc('rating_count')
            ->orderByDesc('is_featured')
            ->take(6)
            ->get();

        $categories = Category::active()
            ->withCount(['products' => fn($q) => $q->active()])
            ->orderBy('sort_order')
            ->get();

        $heroBanners = Banner::active()->hero()->get();
        $flashSaleBanner = Banner::active()->flashSale()->first();

        return Inertia::render('Shop/Home', [
            'latestProducts' => $latestProducts,
            'bestSellerProducts' => $bestSellerProducts,
            'categories' => $categories,
            'banners' => $heroBanners,
            'flashSaleBanner' => $flashSaleBanner,
            'settings' => [
                'store_name' => Setting::getValue('store_name', 'RaiaFood'),
                'store_tagline' => Setting::getValue('store_tagline', ''),
                'store_description' => Setting::getValue('store_description', ''),
                'free_shipping_min' => Setting::getValue('free_shipping_min', 150000),
            ],
        ]);
    }
}
