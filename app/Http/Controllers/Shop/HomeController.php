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
        $featuredProducts = Product::with('category')
            ->active()
            ->featured()
            ->inStock()
            ->take(6)
            ->get();

        $categories = Category::active()
            ->withCount(['products' => fn($q) => $q->active()])
            ->orderBy('sort_order')
            ->get();

        $banners = Banner::active()->get();

        return Inertia::render('Shop/Home', [
            'featuredProducts' => $featuredProducts,
            'categories' => $categories,
            'banners' => $banners,
            'settings' => [
                'store_name' => Setting::getValue('store_name', 'RaiaFood'),
                'store_tagline' => Setting::getValue('store_tagline', ''),
                'store_description' => Setting::getValue('store_description', ''),
                'free_shipping_min' => Setting::getValue('free_shipping_min', 150000),
            ],
        ]);
    }
}
