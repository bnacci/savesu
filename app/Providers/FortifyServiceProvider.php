<?php
namespace App\Providers;

use App\Actions\Fortify\CreateNewUser;
use App\Actions\Fortify\ResetUserPassword;
use App\Actions\Fortify\UpdateUserPassword;
use App\Actions\Fortify\UpdateUserProfileInformation;
use App\Models\User;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Str;
use Laravel\Fortify\Actions\RedirectIfTwoFactorAuthenticatable;
use Laravel\Fortify\Fortify;

class FortifyServiceProvider extends ServiceProvider
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
        Fortify::ignoreRoutes();

        Fortify::createUsersUsing(CreateNewUser::class);
        Fortify::updateUserProfileInformationUsing(UpdateUserProfileInformation::class);
        Fortify::updateUserPasswordsUsing(UpdateUserPassword::class);
        Fortify::resetUserPasswordsUsing(ResetUserPassword::class);
        Fortify::redirectUserForTwoFactorAuthenticationUsing(RedirectIfTwoFactorAuthenticatable::class);

        RateLimiter::for('login', function (Request $request) {
            $throttleKey = Str::transliterate(Str::lower($request->input(Fortify::username())) . '|' . $request->ip());

            return Limit::perMinute(5)->by($throttleKey);
        });

        RateLimiter::for('two-factor', function (Request $request) {
            return Limit::perMinute(5)->by($request->session()->get('login.id'));
        });

        Fortify::authenticateUsing(function (Request $request) {
            $user = User::where('email', $request->username) // Try finding by email first
                ->orWhere('username', $request->username)        // Then by username
                ->first();

            if ($user && Hash::check($request->password, $user->password)) {
                return $user;
            }

            return null; // Return null if authentication fails
        });

        // Custom views
        Fortify::loginView(function (Request $request) {
            seo()->title(__("auth.login.title"))->description(__("auth.login.description"));
            return inertia('auth/login', [
                'canResetPassword' => Route::has('password.request'),
                'status'           => $request->session()->get('status'),
                'error'            => $request->session()->get('error'),
            ])->toResponse($request);
        });

        Fortify::registerView(function (Request $request) {
            seo()->title(__("auth.register.title"))->description(__("auth.register.description"));
            return inertia('auth/register', [
                'error' => $request->session()->get('error'),
            ])->toResponse($request);
        });

        Fortify::twoFactorChallengeView(function (Request $request) {
            seo()->title(__("auth.two_factor.title"))->description(__("auth.two_factor.description"));
            return inertia('auth/two-factor-challenge')->toResponse($request);
        });

        Fortify::requestPasswordResetLinkView(function (Request $request) {
            seo()->title(__("auth.forgot_password.title"))->description(__("auth.forgot_password.description"));
            return inertia('auth/forgot-password')->toResponse($request);
        });

        Fortify::resetPasswordView(function (Request $request) {
            seo()->title(__("auth.reset_password.title"))->description(__("auth.reset_password.description"));
            return inertia('auth/reset-password', ['request' => $request])->toResponse($request);
        });

        Fortify::verifyEmailView(function (Request $request) {
            seo()->title(__("auth.verify_email.title"))->description(__("auth.verify_email.description"));
            return inertia('auth/verify-email')->toResponse($request);
        });

        Fortify::confirmPasswordView(function () {
            seo()->title(__("auth.confirm_password.title"))->description(__("auth.confirm_password.description"));
            return inertia('auth/confirm-password');
        });
    }
}
