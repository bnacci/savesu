<?php
namespace App\Providers;

use Illuminate\Support\Facades\Event;
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
        Event::listen(function (\SocialiteProviders\Manager\SocialiteWasCalled $event) {
            $event->extendSocialite('github', \SocialiteProviders\GitHub\Provider::class);
            $event->extendSocialite('google', \SocialiteProviders\Google\Provider::class);
            $event->extendSocialite('facebook', \SocialiteProviders\Facebook\Provider::class);
            $event->extendSocialite('discord', \SocialiteProviders\Discord\Provider::class);
            $event->extendSocialite('microsoft', \SocialiteProviders\Microsoft\Provider::class);
            $event->extendSocialite('twitch', \SocialiteProviders\Twitch\Provider::class);
            $event->extendSocialite('linkedin', \SocialiteProviders\LinkedIn\Provider::class);
            $event->extendSocialite('spotify', \SocialiteProviders\Spotify\Provider::class);
            $event->extendSocialite('reddit', \SocialiteProviders\Reddit\Provider::class);
        });
    }
}
