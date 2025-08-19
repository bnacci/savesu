<?php

use App\Http\Controllers\Auth\SocialLoginController;
use App\Http\Controllers\Pages\LockedPageController;
use App\Http\Controllers\User\SecurityController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::group([
    'prefix'     => LaravelLocalization::setLocale(),
    'middleware' => [
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

    Route::middleware(['auth:sanctum'])->prefix("security")->group(function () {
        Route::get('/locked', [SecurityController::class, "locked"])->name("user.locked");
        Route::post('/lock', [SecurityController::class, "lock"])->name("user.lock");
        Route::post('/unlock', [SecurityController::class, "unlock"])->name("user.unlock");
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
            // date_default_timezone_set(auth()->user()->timezone);
            // dd(auth()->user()->created_at instanceof Carbon);
            // return auth()->user()->created_at->format("d/m/Y H:i:s");
            // return auth()->user()->created_at->setTimezone(auth()->user()->timezone)->format("d-m-Y H:m:s");
            return Inertia::render('Dashboard');
        })->name('dashboard');
    });

    Route::get('/oauth/{provider}', [SocialLoginController::class, 'redirectToProvider'])->name("oauth");
    Route::get('/oauth/{provider}/callback', [SocialLoginController::class, 'handleProviderCallback']);

    Route::prefix("p")->name("page.")->group(function () {
        Route::get("locked-page", [LockedPageController::class, "show"])->name("locked-page");
    });

    Route::prefix("auth")->group(function () {
        require_once __DIR__ . "/fortify.php";
    });

    require_once __DIR__ . "/jetstream.php";
});
