<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WhatsappSettingController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/WhatsappSettings', [
            'settings' => [
                'whatsapp_button_enabled' => Setting::getValue('whatsapp_button_enabled', '1'),
                'whatsapp_number' => Setting::getValue('whatsapp_number', ''),
                'whatsapp_message' => Setting::getValue('whatsapp_message', ''),
            ],
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'whatsapp_button_enabled' => 'required|in:0,1',
            'whatsapp_number' => 'required|string|max:20',
            'whatsapp_message' => 'required|string|max:500',
        ]);

        Setting::setValue('whatsapp_button_enabled', $request->whatsapp_button_enabled, 'whatsapp');
        Setting::setValue('whatsapp_number', $request->whatsapp_number, 'whatsapp');
        Setting::setValue('whatsapp_message', $request->whatsapp_message, 'whatsapp');

        return back()->with('success', 'Pengaturan WhatsApp berhasil disimpan.');
    }
}
