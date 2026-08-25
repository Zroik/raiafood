<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Media;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class MediaController extends Controller
{
    public function index(Request $request)
    {
        $query = Media::query()->latest();

        if ($request->filled('search')) {
            $query->where('filename', 'like', "%{$request->search}%");
        }

        $media = $query->paginate(24);

        if ($request->wantsJson()) {
            return response()->json($media);
        }

        return response()->json($media);
    }

    public function store(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp,svg|max:8192',
        ]);

        $file = $request->file('image');
        $originalName = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
        $safeName = Str::slug($originalName) . '-' . time() . '.' . $file->getClientOriginalExtension();
        
        $path = $file->storeAs('media', $safeName, 'public');

        $media = Media::create([
            'filename' => $file->getClientOriginalName(),
            'path' => $path,
            'mime_type' => $file->getMimeType(),
            'size' => $file->getSize(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Gambar berhasil diupload ke Media Library!',
            'media' => $media,
        ]);
    }

    public function destroy(Media $media)
    {
        if ($media->path && Storage::disk('public')->exists($media->path)) {
            Storage::disk('public')->delete($media->path);
        }

        $media->delete();

        return response()->json([
            'success' => true,
            'message' => 'Gambar berhasil dihapus dari Media Library!',
        ]);
    }
}
