<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Laravel\Jetstream\Jetstream;

class TermsAndPolicyView extends Controller
{
    /**
     * Show the terms of service for the application.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Inertia\Response
     */
    public function terms(Request $request)
    {
        seo()->title(__("common.terms_of_service"));
        $termsFile = Jetstream::localizedMarkdownPath('terms.md');

        return Inertia::render('terms-of-service', [
            'terms' => Str::markdown(file_get_contents($termsFile)),
        ]);
    }

    /**
     * Show the privacy policy for the application.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Inertia\Response
     */
    public function policy(Request $request)
    {
        seo()->title(__("common.privacy_policy"));
        $policyFile = Jetstream::localizedMarkdownPath('policy.md');

        return Inertia::render('privacy-policy', [
            'policy' => Str::markdown(file_get_contents($policyFile)),
        ]);
    }
}
