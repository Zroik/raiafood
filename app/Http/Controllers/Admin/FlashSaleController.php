<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\FlashSale;
use App\Models\FlashSaleItem;
use App\Models\Product;
use App\Models\Banner;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FlashSaleController extends Controller
{
    public function index()
    {
        $campaigns = FlashSale::with(['banner', 'items.product'])
            ->orderBy('id', 'desc')
            ->get();

        $products = Product::active()
            ->select('id', 'name', 'price', 'discount_price', 'stock', 'image')
            ->orderBy('name')
            ->get();

        $banners = Banner::where('is_active', true)
            ->select('id', 'title', 'image', 'countdown_end', 'countdown_enabled')
            ->get();

        return Inertia::render('Admin/FlashSales/Index', [
            'campaigns' => $campaigns,
            'products' => $products,
            'banners' => $banners,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_time' => 'nullable|date',
            'end_time' => 'nullable|date',
            'is_active' => 'boolean',
            'banner_id' => 'nullable|exists:banners,id',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.discount_price' => 'required|numeric|min:0',
            'items.*.discount_percentage' => 'nullable|integer|min:1|max:99',
        ]);

        $campaign = FlashSale::create([
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'start_time' => $validated['start_time'] ?? null,
            'end_time' => $validated['end_time'] ?? null,
            'is_active' => $validated['is_active'] ?? true,
            'banner_id' => $validated['banner_id'] ?? null,
        ]);

        foreach ($validated['items'] as $item) {
            FlashSaleItem::create([
                'flash_sale_id' => $campaign->id,
                'product_id' => $item['product_id'],
                'discount_price' => $item['discount_price'],
                'discount_percentage' => $item['discount_percentage'] ?? null,
            ]);
        }

        // Sinkronisasi otomatis ke Banner jika banner_id dipilih dan target end_time tersedia
        if (!empty($validated['banner_id']) && !empty($validated['end_time'])) {
            $banner = Banner::find($validated['banner_id']);
            if ($banner) {
                $banner->update([
                    'countdown_end' => $validated['end_time'],
                    'countdown_enabled' => true,
                ]);
            }
        }

        return redirect()->back()->with('success', 'Campaign Flash Sale berhasil dibuat dan produk telah terdaftar batch!');
    }

    public function update(Request $request, FlashSale $flash_sale)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_time' => 'nullable|date',
            'end_time' => 'nullable|date',
            'is_active' => 'boolean',
            'banner_id' => 'nullable|exists:banners,id',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.discount_price' => 'required|numeric|min:0',
            'items.*.discount_percentage' => 'nullable|integer|min:1|max:99',
        ]);

        $flash_sale->update([
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'start_time' => $validated['start_time'] ?? null,
            'end_time' => $validated['end_time'] ?? null,
            'is_active' => $validated['is_active'] ?? true,
            'banner_id' => $validated['banner_id'] ?? null,
        ]);

        $flash_sale->items()->delete();

        foreach ($validated['items'] as $item) {
            FlashSaleItem::create([
                'flash_sale_id' => $flash_sale->id,
                'product_id' => $item['product_id'],
                'discount_price' => $item['discount_price'],
                'discount_percentage' => $item['discount_percentage'] ?? null,
            ]);
        }

        // Sinkronisasi otomatis ke Banner
        if (!empty($validated['banner_id']) && !empty($validated['end_time'])) {
            $banner = Banner::find($validated['banner_id']);
            if ($banner) {
                $banner->update([
                    'countdown_end' => $validated['end_time'],
                    'countdown_enabled' => true,
                ]);
            }
        }

        return redirect()->back()->with('success', 'Campaign Flash Sale dan daftar produk berhasil diperbarui!');
    }

    public function destroy(FlashSale $flash_sale)
    {
        $flash_sale->delete();
        return redirect()->back()->with('success', 'Campaign Flash Sale berhasil dihapus.');
    }
}
