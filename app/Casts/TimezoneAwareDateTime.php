<?php
namespace App\Casts;

use Carbon\Carbon;
use Illuminate\Contracts\Database\Eloquent\CastsAttributes;
use Illuminate\Database\Eloquent\Model;

class TimezoneAwareDateTime implements CastsAttributes
{
    /**
     * Cast the given value.
     *
     * @param  \Illuminate\Database\Eloquent\Model  $model
     * @param  string  $key
     * @param  mixed  $value
     * @param  array  $attributes
     * @return \Carbon\Carbon|null
     */
    public function get(Model $model, string $key, mixed $value, array $attributes): ?Carbon
    {
        $timezone = request()->cookie('timezone') ? base64_decode(request()->cookie("timezone")) : config('app.timezone');

        if (is_null($value)) {
            return null;
        }

        // Assuming 'user_timezone' is a column on your model storing the user's timezone
        // Or, you could retrieve it from a session, config, etc.
        if (auth()->check()) {
            // $timezone = $model->timezone;
            $timezone = auth()->user()->timezone;
        }

        return Carbon::parse($value)->setTimezone($timezone);
    }

    /**
     * Prepare the given value for storage.
     *
     * @param  \Illuminate\Database\Eloquent\Model  $model
     * @param  string  $key
     * @param  mixed  $value
     * @param  array  $attributes
     * @return string|null
     */
    public function set(Model $model, string $key, mixed $value, array $attributes): ?string
    {
        if (is_null($value)) {
            return null;
        }

        // Ensure the value is a Carbon instance and convert it to UTC for storage
        return Carbon::parse($value)->setTimezone('UTC')->toDateTimeString();
    }
}
