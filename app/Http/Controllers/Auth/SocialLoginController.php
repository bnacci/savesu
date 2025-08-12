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

            // dd(count($explode) <= 1 ? $socialUser->getNickname() : Str::slug($socialUser->getNickname(), "_"));

            $username = $nickname ? (count($explode) <= 1 ? $nickname : Str::slug($nickname, "_")) : $this->generateUsernameFromEmail($email);

            $user = User::updateOrCreate(
                ['provider_id' => $socialUser->getId()],
                [
                    'username'          => $username,
                    'email'             => $email,
                    'name'              => $socialUser->getName(),
                    'provider_id'       => $socialUser->getId(),
                    'provider'          => $provider,
                    'password'          => bcrypt($socialUser->getId()),
                    'avatar'            => $socialUser->getAvatar(),
                    'email_verified_at' => now(),
                ]
            );

            $user->ownedTeams()->save(Team::forceCreate([
                'user_id'       => $user->id,
                'name'          => $username . "'s Team",
                'personal_team' => true,
            ]));

            Auth::login($user);

            return redirect()->route('dashboard');
        } catch (InvalidStateException $e) {
            return redirect()->route('login')->with('status', 'Login canceled or failed. Please try again.');
        }
    }
}
