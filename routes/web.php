<?php

use App\Http\Controllers\Admin\CategoryController as AdminCategoryController;
use App\Http\Controllers\Admin\BannerController as AdminBannerController;
use App\Http\Controllers\Admin\CertificateController as AdminCertificateController;
use App\Http\Controllers\Admin\MessageController as AdminMessageController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\OrderController as AdminOrderController;
use App\Http\Controllers\Admin\ProductController as AdminProductController;
use App\Http\Controllers\Admin\PromoController as AdminPromoController;
use App\Http\Controllers\Admin\WhatsappSettingController;
use App\Http\Controllers\Auth\GoogleController;
use App\Http\Controllers\Payment\MidtransController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Shop\CartController;
use App\Http\Controllers\Shop\CheckoutController;
use App\Http\Controllers\Shop\AboutController;
use App\Http\Controllers\Shop\ContactController;
use App\Http\Controllers\Shop\FaqController;
use App\Http\Controllers\Shop\HomeController;
use App\Http\Controllers\Shop\OrderController;
use App\Http\Controllers\Shop\ProductController;
use App\Http\Controllers\Shop\WishlistController;
use Illuminate\Support\Facades\Route;

// ============================================
// PUBLIC ROUTES (Shop)
// ============================================
Route::get('/', [HomeController::class, 'index'])->name('shop.home');
Route::get('/tentang-kami', [AboutController::class, 'index'])->name('shop.about');
Route::get('/hubungi-kami', [ContactController::class, 'index'])->name('shop.contact');
Route::post('/hubungi-kami', [ContactController::class, 'store'])->name('shop.contact.store');
Route::get('/faq', [FaqController::class, 'index'])->name('shop.faq');
Route::get('/products', [ProductController::class, 'index'])->name('shop.products');
Route::get('/products/{slug}', [ProductController::class, 'show'])->name('shop.products.show');

// Cart (Public access)
Route::get('/cart', [CartController::class, 'index'])->name('shop.cart');
Route::post('/cart', [CartController::class, 'store'])->name('shop.cart.store');
Route::patch('/cart/{cart}', [CartController::class, 'update'])->name('shop.cart.update');
Route::delete('/cart/{cart}', [CartController::class, 'destroy'])->name('shop.cart.destroy');
Route::get('/cart/count', [CartController::class, 'count'])->name('shop.cart.count');

// Wishlist (Public access)
Route::get('/wishlist', [WishlistController::class, 'index'])->name('shop.wishlist');
Route::post('/wishlist', [WishlistController::class, 'toggle'])->name('shop.wishlist.toggle');

// Checkout (Public access)
Route::get('/checkout', [CheckoutController::class, 'index'])->name('shop.checkout');
Route::post('/checkout', [CheckoutController::class, 'store'])->name('shop.checkout.store');
Route::get('/checkout/cities', [CheckoutController::class, 'searchCities'])->name('shop.checkout.cities');
Route::post('/checkout/shipping-cost', [CheckoutController::class, 'calculateShippingCost'])->name('shop.checkout.shipping-cost');
Route::post('/checkout/promo', [CheckoutController::class, 'applyPromo'])->name('shop.checkout.promo');

// ============================================
// GOOGLE OAUTH
// ============================================
Route::get('/auth/google', [GoogleController::class, 'redirect'])->name('google.redirect');
Route::get('/auth/google/callback', [GoogleController::class, 'callback'])->name('google.callback');

// ============================================
// MIDTRANS WEBHOOK (no auth needed)
// ============================================
Route::post('/midtrans/notification', [MidtransController::class, 'notification'])->name('midtrans.notification');

// ============================================
// AUTHENTICATED CUSTOMER ROUTES
// ============================================
Route::middleware('auth')->group(function () {
    // Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Orders
    Route::get('/orders', [OrderController::class, 'index'])->name('shop.orders');
    Route::get('/orders/{orderNumber}', [OrderController::class, 'show'])->name('shop.orders.show');
    Route::post('/orders/{orderNumber}/cancel', [OrderController::class, 'cancel'])->name('shop.orders.cancel');
});

// ============================================
// ADMIN ROUTES
// ============================================
Route::middleware(['auth', \App\Http\Middleware\AdminMiddleware::class])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        Route::get('/', [AdminDashboardController::class, 'index'])->name('dashboard');

        // Products
        Route::resource('products', AdminProductController::class);

        // Categories
        Route::resource('categories', AdminCategoryController::class)->except(['show', 'create', 'edit']);

        // Orders
        Route::get('/orders', [AdminOrderController::class, 'index'])->name('orders.index');
        Route::get('/orders/{order}', [AdminOrderController::class, 'show'])->name('orders.show');
        Route::patch('/orders/{order}/status', [AdminOrderController::class, 'updateStatus'])->name('orders.status');

        // Promos
        Route::resource('promos', AdminPromoController::class)->except(['show', 'create', 'edit']);

        // Banners (Beranda Carousel)
        Route::resource('banners', AdminBannerController::class)->except(['show', 'create', 'edit']);

        // Certificates & Awards (Tentang Kami Gallery)
        Route::resource('certificates', AdminCertificateController::class)->except(['show', 'create', 'edit']);

        // Nilai Kami (Tentang Kami Values CMS)
        Route::resource('values', \App\Http\Controllers\Admin\OurValueController::class)->except(['show', 'create', 'edit']);

        // Flash Sales (Batch Product Campaign & Countdown Sync)
        Route::resource('flash-sales', \App\Http\Controllers\Admin\FlashSaleController::class)->except(['show', 'create', 'edit']);

        // Messages (Hubungi Kami Inboxes)
        Route::resource('messages', AdminMessageController::class)->only(['index', 'show', 'destroy']);

        // FAQs (CMS Dinamis)
        Route::resource('faqs', \App\Http\Controllers\Admin\FaqController::class)->except(['show', 'create', 'edit']);

        // Users & Role Management
        Route::resource('users', \App\Http\Controllers\Admin\UserController::class)->except(['show', 'create', 'edit']);

        // Website Settings (CMS Dinamis)
        Route::prefix('settings')->name('settings.')->group(function () {
            Route::get('/general', [\App\Http\Controllers\Admin\SettingController::class, 'general'])->name('general');
            Route::post('/general', [\App\Http\Controllers\Admin\SettingController::class, 'updateGeneral'])->name('general.update');

            Route::get('/pages', [\App\Http\Controllers\Admin\SettingController::class, 'pages'])->name('pages');
            Route::post('/pages', [\App\Http\Controllers\Admin\SettingController::class, 'updatePages'])->name('pages.update');

            Route::get('/contact', [\App\Http\Controllers\Admin\SettingController::class, 'contact'])->name('contact');
            Route::post('/contact', [\App\Http\Controllers\Admin\SettingController::class, 'updateContact'])->name('contact.update');

            Route::get('/social', [\App\Http\Controllers\Admin\SettingController::class, 'social'])->name('social');
            Route::post('/social', [\App\Http\Controllers\Admin\SettingController::class, 'updateSocial'])->name('social.update');
        });

        // WhatsApp Settings
        Route::get('/whatsapp', [WhatsappSettingController::class, 'index'])->name('whatsapp.index');
        Route::post('/whatsapp', [WhatsappSettingController::class, 'update'])->name('whatsapp.update');
    });

require __DIR__.'/auth.php';
