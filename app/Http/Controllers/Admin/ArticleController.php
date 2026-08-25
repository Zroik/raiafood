<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\User;
use App\Models\Media;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Carbon\Carbon;
use Inertia\Inertia;

class ArticleController extends Controller
{
    public function index(Request $request)
    {
        $query = Article::with('author')->latest();

        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', "%{$request->search}%")
                  ->orWhere('excerpt', 'like', "%{$request->search}%");
            });
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $articles = $query->paginate(12)->withQueryString();

        return Inertia::render('Admin/News/Index', [
            'articles' => $articles,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    public function create()
    {
        $authors = User::where('role', 'admin')
            ->select('id', 'name', 'email')
            ->get();

        return Inertia::render('Admin/News/Create', [
            'authors' => $authors,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:articles,slug',
            'excerpt' => 'nullable|string|max:1000',
            'content' => 'required|string',
            'featured_image' => 'nullable|string',
            'author_id' => 'nullable|exists:users,id',
            'status' => 'required|in:draft,published',
            'published_at' => 'nullable|date',
        ]);

        if ($validated['status'] === 'published' && empty($validated['published_at'])) {
            $validated['published_at'] = Carbon::now('Asia/Jakarta');
        }

        if (empty($validated['author_id'])) {
            $validated['author_id'] = $request->user()?->id;
        }

        $article = Article::create($validated);

        return redirect()->route('admin.news.index')
            ->with('success', 'Artikel berhasil dibuat!');
    }

    public function edit(Article $news)
    {
        $authors = User::where('role', 'admin')
            ->select('id', 'name', 'email')
            ->get();

        return Inertia::render('Admin/News/Edit', [
            'article' => $news->load('author'),
            'authors' => $authors,
        ]);
    }

    public function update(Request $request, Article $news)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => [
                'required',
                'string',
                'max:255',
                Rule::unique('articles', 'slug')->ignore($news->id),
            ],
            'excerpt' => 'nullable|string|max:1000',
            'content' => 'required|string',
            'featured_image' => 'nullable|string',
            'author_id' => 'nullable|exists:users,id',
            'status' => 'required|in:draft,published',
            'published_at' => 'nullable|date',
        ]);

        if ($validated['status'] === 'published' && empty($validated['published_at'])) {
            $validated['published_at'] = $news->published_at ?? Carbon::now('Asia/Jakarta');
        }

        $news->update($validated);

        return redirect()->route('admin.news.index')
            ->with('success', 'Artikel berhasil diperbarui!');
    }

    public function destroy(Article $news)
    {
        $news->delete();

        return redirect()->route('admin.news.index')
            ->with('success', 'Artikel berhasil dihapus!');
    }
}
