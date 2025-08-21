<?php
namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class BreadcrumbsServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application events.
     */
    public function boot(): void
    {
        require base_path('routes/breadcrumbs.php');
    }
}
