<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Certificate;
use Inertia\Inertia;

class AboutController extends Controller
{
    public function index()
    {
        $featuredProducts = Product::with('category')
            ->active()
            ->featured()
            ->inStock()
            ->take(4)
            ->get();

        $certificates = Certificate::active()->certificates()->get();
        $awards = Certificate::active()->awards()->get();
        $ourValues = \App\Models\OurValue::active()->get();

        return Inertia::render('Shop/TentangKami', [
            'featuredProducts' => $featuredProducts,
            'certificates' => $certificates,
            'awards' => $awards,
            'ourValues' => $ourValues,
        ]);
    }
}
