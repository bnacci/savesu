<?php
namespace App\Http\Middleware;

use App\Services\SloganService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Inertia\Middleware;
use LaravelLocalization;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    private function getTranslationsCollection(string $locale = 'en'): \Illuminate\Support\Collection
    {
        $path  = lang_path("{$locale}");
        $files = File::allFiles($path);

        return collect($files)->mapWithKeys(function ($file) {
            $key = $file->getFilenameWithoutExtension();
            return [$key => require $file->getRealPath()];
        });
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        // return [
        //      ...parent::share($request),
        //     //
        // ];

        $currenLocale = LaravelLocalization::getCurrentLocale();
        $file         = lang_path($currenLocale);

        return array_merge(parent::share($request),
            // Route::is(['login', 'register', 'two-factor.login', 'password.request', 'password.reset', 'verification.notice', 'verification.verify']) ? ["slogan" => SloganService::getWeeklySlogan()] : [],
            [
                'csrf'         => csrf_token(),
                'locale'       => $currenLocale,
                'locales'      => LaravelLocalization::getSupportedLocales(),
                'translations' => File::exists($file) ? json_encode($this->getTranslationsCollection($currenLocale)) : [],
                'slogan'       => SloganService::getWeeklySlogan(),
                'defaults'     => config('defaults'),
            ]);
    }
}
