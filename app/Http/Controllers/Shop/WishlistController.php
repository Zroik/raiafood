<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\Controller;
use App\Models\Wishlist;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WishlistController extends Controller
{
    public function index()
    {
        if (auth()->check()) {
            $wishlistItems = Wishlist::where('user_id', auth()->id())
                ->with(['product.category'])
                ->orderBy('created_at', 'desc')
                ->get();
        } else {
            $sessionWishlist = session('wishlist', []);
            $wishlistItems = [];
            foreach ($sessionWishlist as $productId) {
                $product = Product::with('category')->find($productId);
                if ($product) {
                    $wishlistItems[] = (object)[
                        'id' => 'guest_' . $productId,
                        'product_id' => $productId,
                        'product' => $product
                    ];
                }
            }
            $wishlistItems = collect($wishlistItems);
        }

        return Inertia::render('Shop/Wishlist', [
            'wishlistItems' => $wishlistItems,
        ]);
    }

    public function toggle(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
        ]);

        $productId = $request->product_id;

        if (auth()->check()) {
            $userId = auth()->id();
            $exists = Wishlist::where('user_id', $userId)
                ->where('product_id', $productId)
                ->first();

            if ($exists) {
                $exists->delete();
                $message = 'Produk dihapus dari favorit.';
                $inWishlist = false;
            } else {
                Wishlist::create([
                    'user_id' => $userId,
                    'product_id' => $productId,
                ]);
                $message = 'Produk ditambahkan ke favorit.';
                $inWishlist = true;
            }
        } else {
            $wishlist = session('wishlist', []);
            if (in_array($productId, $wishlist)) {
                $wishlist = array_values(array_diff($wishlist, [$productId]));
                $message = 'Produk dihapus dari favorit.';
                $inWishlist = false;
            } else {
                $wishlist[] = $productId;
                $message = 'Produk ditambahkan ke favorit.';
                $inWishlist = true;
            }
            session(['wishlist' => $wishlist]);
        }

        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'message' => $message,
                'inWishlist' => $inWishlist,
            ]);
        }

        return back()->with('success', $message);
    }

    public static function migrateSessionWishlistToDatabase($userId)
    {
        $sessionWishlist = session('wishlist', []);
        if (empty($sessionWishlist)) {
            return;
        }

        foreach ($sessionWishlist as $productId) {
            $exists = Wishlist::where('user_id', $userId)
                ->where('product_id', $productId)
                ->exists();

            if (!$exists) {
                Wishlist::create([
                    'user_id' => $userId,
                    'product_id' => $productId,
                ]);
            }
        }

        session()->forget('wishlist');
    }
}
