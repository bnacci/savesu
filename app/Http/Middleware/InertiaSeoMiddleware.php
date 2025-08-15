<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Symfony\Component\HttpFoundation\Response;

class InertiaSeoMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        seo()->title(config('app.name'))
            ->description(__("app.description"));

        if (auth()->check() && session()->get("user_locked") && ! Route::is("user.locked") && ! Route::is("user.unlock") && ! Route::is("page.locked-page") && ! Route::is("logout")) {
            return redirect()->route("user.locked", [
                "ref" => base64_encode(route("dashboard")),
            ]);
        }

        return $next($request);
    }
}
