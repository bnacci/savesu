<?php

use App\Http\Controllers\Auth\SocialLoginController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::group([
    'prefix'     => LaravelLocalization::setLocale(),
    'middleware' => [
        'localizationRedirect',
        'localeSessionRedirect',
        'localeCookieRedirect',
    ]], function () {
    Route::get('/', function () {
        return Inertia::render('Welcome', [
            'canLogin'       => Route::has('login'),
            'canRegister'    => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion'     => PHP_VERSION,
        ]);
    })->name("index");

    Route::prefix("security")->group(function () {
        Route::get('/locked', function () {
            session(["user_locked" => true]);
            return inertia('auth/locked', [
                "back" => request()->back,
            ]);
        })->name("user.locked");
    });

    Route::get("/about", function () {
        seo()->title("About");
        return Inertia::render("About");
    })->name("about");

    Route::middleware([
        'auth:sanctum',
        config('jetstream.auth_session'),
        'verified',
    ])->group(function () {
        Route::get('/dashboard', function () {
            return Inertia::render('Dashboard');
        })->name('dashboard');
    });

    Route::get('/oauth/{provider}', [SocialLoginController::class, 'redirectToProvider'])->name("oauth");
    Route::get('/oauth/{provider}/callback', [SocialLoginController::class, 'handleProviderCallback']);

    require_once __DIR__ . "/fortify.php";
    require_once __DIR__ . "/jetstream.php";
});
