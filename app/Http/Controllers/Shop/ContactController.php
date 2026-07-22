<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ContactMessage;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index()
    {
        return Inertia::render('Shop/HubungiKami');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'whatsapp' => 'required|string|max:50',
            'deskripsi' => 'required|string|max:255',
            'pesan' => 'required|string|max:2000',
        ]);

        ContactMessage::create([
            'name' => $validated['nama'],
            'email' => $validated['email'],
            'whatsapp' => $validated['whatsapp'],
            'subject' => $validated['deskripsi'],
            'message' => $validated['pesan'],
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Pesan Anda berhasil dikirim!'
        ]);
    }
}
