<?php
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Team;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;
use Laravel\Socialite\Two\InvalidStateException;

class SocialLoginController extends Controller
{
    public function redirectToProvider($provider)
    {
        session(["oauth_error_back" => request()->back]);
        return Socialite::driver($provider)->redirect();
    }

    private function generateUsernameFromEmail(string $email): string
    {
        $base     = Str::slug(Str::before($email, '@'), '.'); // exemplo: "jose.silva"
        $username = $base;
        $count    = 1;

        // Checar se o username já existe
        while (User::where('username', $username)->exists()) {
            $username = $base . $count;
            $count++;
        }

        return $username;
    }

    public function handleProviderCallback($provider)
    {
        try {
            $socialUser = Socialite::driver($provider)->user();

            $nickname = $socialUser->getNickname() ? $socialUser->getNickname() : $socialUser->getName();
            $email    = $socialUser->getEmail() ? $socialUser->getEmail() : Str::slug($nickname, "_") . "@savesu.com";
            $explode  = explode(" ", $nickname);

            $username = $nickname ? (count($explode) <= 1 ? $nickname : Str::slug($nickname, "_")) : $this->generateUsernameFromEmail($email);

            $user = User::where("email", $email)
                ->where("provider", $provider)
                ->where("provider_id", $socialUser->getId())
                ->first();

            if ($user) {
                Auth::login($user);
            } else {

                if (User::where("email", $email)
                    ->orWhere("username", $username)
                    ->exists()) {
                    return redirect()->route(session("oauth_error_back"))
                        ->with('error', __('auth.errors.user_exists'));
                }

                $user = User::updateOrCreate(
                    [
                        'provider_id' => $socialUser->getId(),
                        'provider'    => $provider,
                    ],
                    [
                        'username'          => $username,
                        'email'             => $email,
                        'name'              => $socialUser->getName(),
                        'provider_id'       => $socialUser->getId(),
                        'provider'          => $provider,
                        'password'          => bcrypt($socialUser->getId()),
                        'avatar'            => $socialUser->getAvatar(),
                        'email_verified_at' => now(),
                        'settings'          => json_encode(config("user")),
                    ]
                );

                $user->ownedTeams()->save(Team::forceCreate([
                    'user_id'       => $user->id,
                    'name'          => $username . "'s Team",
                    'personal_team' => true,
                ]));

                Auth::login($user);
            }

            session()->forget("oauth_error_back");

            return redirect()->route('dashboard');
        } catch (InvalidStateException $e) {
            return redirect()->route(session("oauth_error_back"))->with('error', __('auth.errors.login_failed'));
        }
    }
}
