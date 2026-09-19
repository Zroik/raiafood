<?php

namespace App\Providers;

use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        // Reverse proxy & ngrok support: ensure generated URLs match incoming scheme & host
        $forwardedProto = request()->server('HTTP_X_FORWARDED_PROTO') ?: request()->header('X-Forwarded-Proto');
        $forwardedHost = request()->server('HTTP_X_FORWARDED_HOST') ?: request()->header('X-Forwarded-Host');
        $host = request()->header('Host') ?? '';

        $isNgrok = str_contains($host, 'ngrok') || str_contains($forwardedHost ?? '', 'ngrok');
        $isHttps = $forwardedProto === 'https' || request()->isSecure() || $isNgrok;

        if ($isHttps) {
            URL::forceScheme('https');
        }

        $effectiveHost = $forwardedHost ?: ($isNgrok ? $host : null);
        if ($effectiveHost) {
            $scheme = $isHttps ? 'https' : 'http';
            URL::forceRootUrl("{$scheme}://{$effectiveHost}");
        }
    }
}
