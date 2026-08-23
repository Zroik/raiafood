<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\OurValue;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OurValueController extends Controller
{
    public function index()
    {
        $values = OurValue::orderBy('sort_order')->get();
        return Inertia::render('Admin/Values/Index', [
            'values' => $values,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'icon_type' => 'required|string|in:lucide,heroicon,tabler,svg,emoji',
            'icon_value' => 'required|string|max:255',
            'font_size' => 'required|string|in:xs,sm,base,lg',
            'sort_order' => 'integer',
            'is_active' => 'boolean',
        ]);

        OurValue::create($validated);

        return redirect()->route('admin.values.index')
            ->with('success', 'Nilai Kami berhasil ditambahkan!');
    }

    public function update(Request $request, OurValue $value)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'icon_type' => 'required|string|in:lucide,heroicon,tabler,svg,emoji',
            'icon_value' => 'required|string|max:255',
            'font_size' => 'required|string|in:xs,sm,base,lg',
            'sort_order' => 'integer',
            'is_active' => 'boolean',
        ]);

        $value->update($validated);

        return redirect()->route('admin.values.index')
            ->with('success', 'Nilai Kami berhasil diperbarui!');
    }

    public function destroy(OurValue $value)
    {
        $value->delete();

        return redirect()->route('admin.values.index')
            ->with('success', 'Nilai Kami berhasil dihapus!');
    }
}
