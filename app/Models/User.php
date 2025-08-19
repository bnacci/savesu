<?php
namespace App\Models;

use App\Casts\TimezoneAwareDateTime;
use App\Traits\HasSettings;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Laravel\Jetstream\HasProfilePhoto;
use Laravel\Jetstream\HasTeams;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens;
    use HasFactory;
    use HasProfilePhoto {
        HasProfilePhoto::profilePhotoUrl as getPhotoUrl;
    }
    use HasTeams;
    use Notifiable;
    use TwoFactorAuthenticatable;
    use HasSettings;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'username',
        'provider',
        'provider_id',
        'email_verified_at',
        'avatar',
        'lock_screen_wallpaper',
        'settings',
        'timezone',
        'country',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'two_factor_recovery_codes',
        'two_factor_secret',
        'avatar',
        'settings',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => TimezoneAwareDateTime::class,
        'created_at'        => TimezoneAwareDateTime::class,
        'updated_at'        => TimezoneAwareDateTime::class,
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array<int, string>
     */
    protected $appends = [
        'profile_photo_url',
    ];

    protected function defaultProfilePhotoUrl()
    {
        $name = trim(collect(explode(' ', $this->name))->map(function ($segment) {
            return mb_substr($segment, 0, 1);
        })->join(' '));

        return 'https://ui-avatars.com/api/?name=' . urlencode($name) . '&background=random';
    }

    /**
     * Get the URL to the user's profile photo.
     */
    protected function profilePhotoUrl(): Attribute
    {
        if ($this->avatar && ! $this->profile_photo_path) {
            return Attribute::get(fn() => $this->avatar);
        }

        return filter_var($this->profile_photo_path, FILTER_VALIDATE_URL)
        ? Attribute::get(fn() => $this->profile_photo_path)
        : $this->getPhotoUrl();
    }
}
