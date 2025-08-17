<?php
namespace App\Traits;

use App\Settings\UserSettings;

trait HasSettings
{
    // protected $appends = ["preferences"];
    protected static function bootHasSettings()
    {
        static::retrieved(function ($model) {
            // Add 'settings' to the appends array if not already present
            if (! in_array('preferences', $model->getAppends())) {
                $model->append('preferences');
            }
        });
    }

    public function getSettingsAttribute($value)
    {
        return new UserSettings(json_decode($value, true) ?? [], $this);
    }

    protected function getPreferencesAttribute()
    {
        return new UserSettings(json_decode($this->attributes['settings'], true) ?? [], $this)->all();
    }
}
