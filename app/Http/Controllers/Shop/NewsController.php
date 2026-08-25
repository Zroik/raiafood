<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class NewsController extends Controller
{
    public function index(Request $request)
    {
        $query = Article::with('author')
            ->published()
            ->orderBy('published_at', 'desc');

        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', "%{$request->search}%")
                  ->orWhere('excerpt', 'like', "%{$request->search}%");
            });
        }

        $articles = $query->paginate(9)->withQueryString();

        // Featured / Latest Top Article
        $heroArticle = Article::with('author')
            ->published()
            ->orderBy('published_at', 'desc')
            ->first();

        return Inertia::render('Shop/News/Index', [
            'articles' => $articles,
            'heroArticle' => $heroArticle,
            'filters' => $request->only(['search']),
            'settings' => [
                'store_name' => Setting::getValue('store_name', 'RaiaFood'),
                'store_tagline' => Setting::getValue('store_tagline', ''),
            ],
        ]);
    }

    public function show($slug)
    {
        $article = Article::with('author')
            ->where('slug', $slug)
            ->firstOrFail();

        // If not published or published in the future, only allow admins
        if ($article->status !== 'published' || ($article->published_at && Carbon::parse($article->published_at)->isFuture())) {
            $user = auth()->user();
            if (!$user || $user->role !== 'admin') {
                abort(404);
            }
        }

        // Previous Article
        $previousArticle = Article::published()
            ->where('published_at', '<', $article->published_at ?? $article->created_at)
            ->where('id', '!=', $article->id)
            ->orderBy('published_at', 'desc')
            ->select('id', 'title', 'slug', 'featured_image', 'published_at')
            ->first();

        // Next Article
        $nextArticle = Article::published()
            ->where('published_at', '>', $article->published_at ?? $article->created_at)
            ->where('id', '!=', $article->id)
            ->orderBy('published_at', 'asc')
            ->select('id', 'title', 'slug', 'featured_image', 'published_at')
            ->first();

        // Related Articles
        $recentArticles = Article::published()
            ->where('id', '!=', $article->id)
            ->orderBy('published_at', 'desc')
            ->take(3)
            ->get();

        return Inertia::render('Shop/News/Show', [
            'article' => $article,
            'previousArticle' => $previousArticle,
            'nextArticle' => $nextArticle,
            'recentArticles' => $recentArticles,
        ]);
    }
}
