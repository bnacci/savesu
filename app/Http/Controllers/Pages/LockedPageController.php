<?php
namespace App\Http\Controllers\Pages;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Laravel\Jetstream\Jetstream;

class LockedPageController extends Controller
{
    /**
     * Show the privacy policy for the application.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Inertia\Response
     */
    public function show(Request $request)
    {
        $lockedPageFile = Jetstream::localizedMarkdownPath('locked-page.md');

        return Inertia::render('locked-page', [
            'locked_page' => Str::markdown(file_get_contents($lockedPageFile)),
        ]);
    }
}
