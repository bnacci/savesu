<?php
namespace App\Settings;

class UserSettings
{
    protected array $attributes = [];

    protected $model;

    public function __construct(array $settings = [], $model = null)
    {
        $this->attributes = array_merge(config("user"), $settings);
        $this->model      = $model;
    }

    public function get($key, $default = null)
    {
        $value = data_get($this->attributes, $key, $default);

        return is_array($value) ? json_decode(json_encode($value)) : $value;
    }

    public function set($key, $value)
    {
        data_set($this->attributes, $key, $value);

        if ($this->model) {
            $this->model->attributes['settings'] = $this->attributes;
            $this->model->save();
        }

        return $this;
    }

    public function all()
    {
        return $this->attributes;
    }

    public function __get($key)
    {
        return $this->get($key);
    }

    public function __set($key, $value)
    {
        return $this->set($key, $value);
    }
}
