<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Banner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BannerController extends Controller
{
    public function index(Request $request)
    {
        $type = $request->query('type', 'all');
        $query = Banner::orderBy('sort_order');
        if ($type !== 'all') {
            $query->where('type', $type);
        }
        $banners = $query->get();

        return Inertia::render('Admin/Banners/Index', [
            'banners' => $banners,
            'currentType' => $type,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'type' => 'required|in:hero,flash_sale',
            'description' => 'nullable|string',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:4096',
            'link' => 'nullable|string|max:255',
            'countdown_enabled' => 'nullable|boolean',
            'countdown_end' => 'nullable|date',
            'countdown_pos_x' => 'nullable|numeric|between:0,100',
            'countdown_pos_y' => 'nullable|numeric|between:0,100',
            'countdown_scale' => 'nullable|numeric|between:0.3,3.0',
            'countdown_box_color' => 'nullable|string|max:50',
            'countdown_font_color' => 'nullable|string|max:50',
            'countdown_font_family' => 'nullable|string|max:100',
            'countdown_digit_bg' => 'nullable|string|max:50',
            'sort_order' => 'integer',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('banners', 'public');
        }

        Banner::create($validated);

        return redirect()->route('admin.banners.index')
            ->with('success', 'Banner berhasil ditambahkan!');
    }

    public function update(Request $request, Banner $banner)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'type' => 'required|in:hero,flash_sale',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:4096',
            'link' => 'nullable|string|max:255',
            'countdown_enabled' => 'nullable|boolean',
            'countdown_end' => 'nullable|date',
            'countdown_pos_x' => 'nullable|numeric|between:0,100',
            'countdown_pos_y' => 'nullable|numeric|between:0,100',
            'countdown_scale' => 'nullable|numeric|between:0.3,3.0',
            'countdown_box_color' => 'nullable|string|max:50',
            'countdown_font_color' => 'nullable|string|max:50',
            'countdown_font_family' => 'nullable|string|max:100',
            'countdown_digit_bg' => 'nullable|string|max:50',
            'sort_order' => 'integer',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            if ($banner->image && !str_starts_with($banner->image, 'images/')) {
                Storage::disk('public')->delete($banner->image);
            }
            $validated['image'] = $request->file('image')->store('banners', 'public');
        } else {
            unset($validated['image']);
        }

        $banner->update($validated);

        return redirect()->route('admin.banners.index')
            ->with('success', 'Banner berhasil diperbarui!');
    }

    public function destroy(Banner $banner)
    {
        if ($banner->image && !str_starts_with($banner->image, 'images/')) {
            Storage::disk('public')->delete($banner->image);
        }
        $banner->delete();

        return redirect()->route('admin.banners.index')
            ->with('success', 'Banner berhasil dihapus!');
    }
}
