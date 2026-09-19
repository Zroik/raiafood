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
                $val = $request->input($field);
                if (in_array($field, ['primary_color', 'secondary_color', 'soft_color', 'dark_color']) && $val) {
                    $val = trim($val);
                    if (!str_starts_with($val, '#')) {
                        $val = '#' . $val;
                    }
                }
                Setting::setValue($field, $val, 'general');
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

            $file = $request->file('favicon');
            $uploadedPath = $file->getRealPath();
            $info = @getimagesize($uploadedPath);

            if ($info && function_exists('imagecreatetruecolor')) {
                $srcW = $info[0];
                $srcH = $info[1];
                $mime = $info['mime'] ?? '';

                $srcImg = match ($mime) {
                    'image/jpeg', 'image/jpg' => @imagecreatefromjpeg($uploadedPath),
                    'image/png' => @imagecreatefrompng($uploadedPath),
                    'image/webp' => @imagecreatefromwebp($uploadedPath),
                    default => null,
                };

                if ($srcImg) {
                    $targetSize = 512;
                    $canvas = imagecreatetruecolor($targetSize, $targetSize);
                    imagealphablending($canvas, false);
                    imagesavealpha($canvas, true);
                    $transparent = imagecolorallocatealpha($canvas, 0, 0, 0, 127);
                    imagefilledrectangle($canvas, 0, 0, $targetSize, $targetSize, $transparent);

                    // Fit proportionally within 512x512 without distortion
                    $scale = min($targetSize / $srcW, $targetSize / $srcH);
                    $dstW = (int) round($srcW * $scale);
                    $dstH = (int) round($srcH * $scale);
                    $dstX = (int) round(($targetSize - $dstW) / 2);
                    $dstY = (int) round(($targetSize - $dstH) / 2);

                    imagecopyresampled($canvas, $srcImg, $dstX, $dstY, 0, 0, $dstW, $dstH, $srcW, $srcH);

                    $fileName = 'settings/favicon_' . time() . '.png';
                    $fullSavePath = Storage::disk('public')->path($fileName);
                    imagepng($canvas, $fullSavePath);

                    // Also sync public/favicon.ico
                    $ico32 = imagecreatetruecolor(32, 32);
                    imagealphablending($ico32, false);
                    imagesavealpha($ico32, true);
                    imagefilledrectangle($ico32, 0, 0, 32, 32, $transparent);
                    imagecopyresampled($ico32, $canvas, 0, 0, 0, 0, 32, 32, $targetSize, $targetSize);
                    imagepng($ico32, public_path('favicon.ico'));

                    imagedestroy($canvas);
                    imagedestroy($srcImg);
                    imagedestroy($ico32);

                    Setting::setValue('site_favicon', $fileName, 'general');
                } else {
                    $path = $file->store('settings', 'public');
                    Setting::setValue('site_favicon', $path, 'general');
                }
            } else {
                $path = $file->store('settings', 'public');
                Setting::setValue('site_favicon', $path, 'general');
            }
        }

        return back()->with('success', 'Pengaturan identitas dan tampilan berhasil diperbarui.');
    }

    /**
     * Simpan template tema kustom baru ke daftar Pilihan Tema Siap Pakai
     */
    public function storeCustomTheme(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:50',
            'badge' => 'nullable|string|max:30',
            'primary' => 'required|string|max:20',
            'secondary' => 'required|string|max:20',
            'soft' => 'required|string|max:20',
            'dark' => 'required|string|max:20',
        ]);

        $presets = json_decode(Setting::getValue('custom_theme_presets') ?: '[]', true) ?: [];

        $newPreset = [
            'id' => 'custom_' . time() . '_' . substr(md5(uniqid()), 0, 6),
            'name' => trim($validated['name']),
            'badge' => trim($validated['badge'] ?: 'Kustom'),
            'primary' => str_starts_with($validated['primary'], '#') ? $validated['primary'] : ('#' . $validated['primary']),
            'secondary' => str_starts_with($validated['secondary'], '#') ? $validated['secondary'] : ('#' . $validated['secondary']),
            'soft' => str_starts_with($validated['soft'], '#') ? $validated['soft'] : ('#' . $validated['soft']),
            'dark' => str_starts_with($validated['dark'], '#') ? $validated['dark'] : ('#' . $validated['dark']),
            'is_custom' => true,
        ];

        $presets[] = $newPreset;
        Setting::setValue('custom_theme_presets', json_encode($presets), 'general');

        return back()->with('success', "Template tema \"{$newPreset['name']}\" berhasil ditambahkan ke Pilihan Tema!");
    }

    /**
     * Perbarui isian nama, badge, dan palet warna template tema
     */
    public function updateCustomTheme(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:50',
            'badge' => 'nullable|string|max:30',
            'primary' => 'required|string|max:20',
            'secondary' => 'required|string|max:20',
            'soft' => 'required|string|max:20',
            'dark' => 'required|string|max:20',
        ]);

        $presets = json_decode(Setting::getValue('custom_theme_presets') ?: '[]', true) ?: [];

        $cleanPrimary = str_starts_with($validated['primary'], '#') ? $validated['primary'] : ('#' . $validated['primary']);
        $cleanSecondary = str_starts_with($validated['secondary'], '#') ? $validated['secondary'] : ('#' . $validated['secondary']);
        $cleanSoft = str_starts_with($validated['soft'], '#') ? $validated['soft'] : ('#' . $validated['soft']);
        $cleanDark = str_starts_with($validated['dark'], '#') ? $validated['dark'] : ('#' . $validated['dark']);

        $found = false;
        foreach ($presets as &$p) {
            if (($p['id'] ?? '') === $id) {
                $p['name'] = trim($validated['name']);
                $p['badge'] = trim($validated['badge'] ?? '');
                $p['primary'] = $cleanPrimary;
                $p['secondary'] = $cleanSecondary;
                $p['soft'] = $cleanSoft;
                $p['dark'] = $cleanDark;
                $found = true;
                break;
            }
        }
        unset($p);

        if (!$found) {
            $presets[] = [
                'id' => $id,
                'name' => trim($validated['name']),
                'badge' => trim($validated['badge'] ?? ''),
                'primary' => $cleanPrimary,
                'secondary' => $cleanSecondary,
                'soft' => $cleanSoft,
                'dark' => $cleanDark,
                'is_default' => str_starts_with($id, 'default_'),
                'is_custom' => !str_starts_with($id, 'default_'),
            ];
        }

        Setting::setValue('custom_theme_presets', json_encode($presets), 'general');

        return back()->with('success', "Palet template tema \"{$validated['name']}\" berhasil diperbarui!");
    }

    /**
     * Hapus template tema kustom dari daftar
     */
    public function destroyCustomTheme($id)
    {
        $presets = json_decode(Setting::getValue('custom_theme_presets') ?: '[]', true) ?: [];
        $filtered = array_values(array_filter($presets, fn($p) => ($p['id'] ?? '') !== $id));

        Setting::setValue('custom_theme_presets', json_encode($filtered), 'general');

        return back()->with('success', 'Template tema kustom berhasil dihapus.');
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

        $textFields = [
            'about_title', 'about_description', 'about_vision', 'about_mission',
            'home_hero_greeting', 'home_hero_title', 'home_hero_motto',
            'home_hero_cta_text', 'home_hero_cta_link', 'home_hero_cta_sec_text', 'home_hero_cta_sec_link',
            'home_section_latest_title', 'home_section_popular_title',
            'about_cta_title', 'about_cta_subtitle', 'about_cta_btn_text', 'about_cta_btn_link',
            'contact_hero_title', 'contact_hero_subtitle',
        ];

        foreach ($textFields as $field) {
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

    /**
     * Menu Navigasi Header & Shortcut Footer
     */
    public function navigation()
    {
        $settings = Setting::pluck('value', 'key')->all();

        return Inertia::render('Admin/Settings/Navigation', [
            'settings' => $settings,
        ]);
    }

    public function updateNavigation(Request $request)
    {
        $request->validate([
            'navbar_menu' => 'nullable',
            'footer_columns' => 'nullable',
            'footer_copyright' => 'nullable|string|max:255',
        ]);

        if ($request->has('navbar_menu')) {
            $val = $request->input('navbar_menu');
            $encoded = is_array($val) ? json_encode($val) : $val;
            Setting::setValue('navbar_menu', $encoded, 'navigation');
        }

        if ($request->has('footer_columns')) {
            $val = $request->input('footer_columns');
            $encoded = is_array($val) ? json_encode($val) : $val;
            Setting::setValue('footer_columns', $encoded, 'navigation');
        }

        if ($request->has('footer_copyright')) {
            Setting::setValue('footer_copyright', $request->input('footer_copyright') ?? '', 'navigation');
        }

        return back()->with('success', 'Menu navigasi dan shortcut footer berhasil disimpan.');
    }

    /**
     * Pengaturan Toko, Pengiriman & Announcement Bar
     */
    public function storeSettings()
    {
        $settings = Setting::pluck('value', 'key')->all();

        return Inertia::render('Admin/Settings/Store', [
            'settings' => $settings,
        ]);
    }

    public function updateStoreSettings(Request $request)
    {
        $validated = $request->validate([
            'shipping_cost' => 'nullable|numeric|min:0',
            'free_shipping_min' => 'nullable|numeric|min:0',
            'announcement_enabled' => 'nullable|in:0,1',
            'announcement_text' => 'nullable|string|max:300',
            'announcement_link' => 'nullable|string|max:255',
            'payment_bank_name' => 'nullable|string|max:100',
            'payment_bank_account' => 'nullable|string|max:100',
            'payment_bank_holder' => 'nullable|string|max:150',
            'payment_instructions' => 'nullable|string',
        ]);

        foreach ($validated as $field => $val) {
            Setting::setValue($field, $val ?? '', 'store');
        }

        return back()->with('success', 'Pengaturan toko, pengiriman, dan pengumuman berhasil disimpan.');
    }
}
