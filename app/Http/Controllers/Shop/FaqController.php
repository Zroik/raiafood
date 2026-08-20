<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\Controller;
use App\Models\Faq;
use Inertia\Inertia;

class FaqController extends Controller
{
    public function index()
    {
        $faqs = Faq::active()->get();

        return Inertia::render('Shop/FAQ', [
            'faqs' => $faqs,
        ]);
    }
}
