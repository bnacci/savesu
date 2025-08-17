<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Symfony\Component\HttpFoundation\Response;

class LockScreenCheck
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (auth()->check() && session()->get("user_locked")
            && ! in_array(Route::currentRouteName(), config("app.lock_screen_available_routes"))) {
            return redirect()->route("user.locked", [
                "ref" => base64_encode(route("dashboard")),
            ]);
        }

        return $next($request);
    }
}
