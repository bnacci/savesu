<!DOCTYPE html>
<html lang="{{ LaravelLocalization::getCurrentLocale() }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
    <link rel="icon" type="image/x-icon" href="/favicon.ico" media="(prefers-color-scheme: light)">
    <link rel="icon" type="image/x-icon" href="/favicon_light.ico" media="(prefers-color-scheme: dark)">
    @metadata
    {{-- Scripts --}}
    @routes
    @viteReactRefresh
    @vite('resources/js/app.tsx')
    @inertiaHead
</head>

<body class="font-sans antialiased">
    @inertia
</body>

</html>
