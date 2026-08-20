<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SettingController extends Controller
{
    /**
     * Identitas & Tampilan (General & Theme)
     */
    public function general()
    {
        $settings = Setting::pluck('value', 'key')->all();

        return Inertia::render('Admin/Settings/General', [
            'settings' => $settings,
        ]);
    }

    public function updateGeneral(Request $request)
    {
        $validated = $request->validate([
            'company_name' => 'required|string|max:100',
            'company_tagline' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:500',
            'primary_color' => 'nullable|string|max:20',
            'secondary_color' => 'nullable|string|max:20',
            'soft_color' => 'nullable|string|max:20',
            'dark_color' => 'nullable|string|max:20',
            'logo' => 'nullable|image|max:3072',
            'favicon' => 'nullable|image|max:2048',
        ]);

        foreach (['company_name', 'company_tagline', 'meta_description', 'primary_color', 'secondary_color', 'soft_color', 'dark_color'] as $field) {
            if ($request->has($field)) {
                Setting::setValue($field, $request->input($field), 'general');
            }
        }

        if ($request->hasFile('logo')) {
            $oldLogo = Setting::getValue('site_logo');
            if ($oldLogo && Storage::disk('public')->exists($oldLogo)) {
                Storage::disk('public')->delete($oldLogo);
            }
            $path = $request->file('logo')->store('settings', 'public');
            Setting::setValue('site_logo', $path, 'general');
        }

        if ($request->hasFile('favicon')) {
            $oldFavicon = Setting::getValue('site_favicon');
            if ($oldFavicon && Storage::disk('public')->exists($oldFavicon)) {
                Storage::disk('public')->delete($oldFavicon);
            }
            $path = $request->file('favicon')->store('settings', 'public');
            Setting::setValue('site_favicon', $path, 'general');
        }

        return back()->with('success', 'Pengaturan identitas dan tampilan berhasil diperbarui.');
    }

    /**
     * Banner & Teks Halaman
     */
    public function pages()
    {
        $settings = Setting::pluck('value', 'key')->all();

        return Inertia::render('Admin/Settings/Pages', [
            'settings' => $settings,
        ]);
    }

    public function updatePages(Request $request)
    {
        $validated = $request->validate([
            'about_title' => 'nullable|string|max:150',
            'about_description' => 'nullable|string',
            'about_vision' => 'nullable|string',
            'about_mission' => 'nullable|string',
            'about_banner' => 'nullable|image|max:4096',
            'products_banner' => 'nullable|image|max:4096',
            'contact_banner' => 'nullable|image|max:4096',
            'faq_banner' => 'nullable|image|max:4096',
        ]);

        foreach (['about_title', 'about_description', 'about_vision', 'about_mission'] as $field) {
            if ($request->has($field)) {
                Setting::setValue($field, $request->input($field), 'pages');
            }
        }

        $imageFields = ['about_banner', 'products_banner', 'contact_banner', 'faq_banner'];
        foreach ($imageFields as $imgField) {
            if ($request->hasFile($imgField)) {
                $oldImg = Setting::getValue($imgField);
                if ($oldImg && Storage::disk('public')->exists($oldImg)) {
                    Storage::disk('public')->delete($oldImg);
                }
                $path = $request->file($imgField)->store('banners/pages', 'public');
                Setting::setValue($imgField, $path, 'pages');
            }
        }

        return back()->with('success', 'Konten halaman dan banner berhasil diperbarui.');
    }

    /**
     * Kontak & Lokasi
     */
    public function contact()
    {
        $settings = Setting::pluck('value', 'key')->all();

        return Inertia::render('Admin/Settings/Contact', [
            'settings' => $settings,
        ]);
    }

    public function updateContact(Request $request)
    {
        $validated = $request->validate([
            'phone' => 'nullable|string|max:50',
            'email' => 'nullable|email|max:100',
            'address' => 'nullable|string|max:500',
            'operating_hours' => 'nullable|string|max:150',
            'maps_link' => 'nullable|string|max:500',
            'maps_iframe' => 'nullable|string',
            'whatsapp_number' => 'nullable|string|max:30',
            'whatsapp_message' => 'nullable|string|max:300',
            'whatsapp_button_enabled' => 'nullable|in:0,1',
        ]);

        foreach ($validated as $field => $val) {
            Setting::setValue($field, $val ?? '', 'contact');
        }

        return back()->with('success', 'Pengaturan kontak dan lokasi berhasil disimpan.');
    }

    /**
     * Sosial Media & Marketplace
     */
    public function social()
    {
        $settings = Setting::pluck('value', 'key')->all();

        return Inertia::render('Admin/Settings/Social', [
            'settings' => $settings,
        ]);
    }

    public function updateSocial(Request $request)
    {
        $validated = $request->validate([
            'instagram_url' => 'nullable|string|max:255',
            'tiktok_url' => 'nullable|string|max:255',
            'facebook_url' => 'nullable|string|max:255',
            'youtube_url' => 'nullable|string|max:255',
            'shopee_url' => 'nullable|string|max:255',
            'tokopedia_url' => 'nullable|string|max:255',
        ]);

        foreach ($validated as $field => $val) {
            Setting::setValue($field, $val ?? '', 'social');
        }

        return back()->with('success', 'Tautan sosial media dan marketplace berhasil disimpan.');
    }
}
