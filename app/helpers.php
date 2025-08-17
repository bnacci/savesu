<?php

// function available_locales(): array
// {
//     return explode(',', config('app.available_locales', 'en'));
// }

if (! function_exists("minutesToMilliseconds")) {
    function minutesToMilliseconds(int $minutes): int
    {
        return $minutes * 60 * 1000;
    }
}
