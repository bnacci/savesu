<?php
namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;

class SecurityController extends Controller
{

    private function hasRefValue(Request $request): bool
    {
        $ref   = $request->get("ref"); // Encoded url to redirect back
        $value = base64_decode($ref);  // Decode url

        $escapedAppUrl = preg_quote(config("app.url"), '/');
        $pattern       = "/{$escapedAppUrl}/";

        return request()->has("ref") && ! empty($ref) && preg_match($pattern, $value);
    }

    public function lock(Request $request)
    {
        session(["user_locked" => true]);

        return redirect()->route("user.locked", [
            "ref" => $request->ref,
        ]);
    }

    public function locked(Request $request)
    {
        seo()->title(__("common.lock_screen"));

        if (! session()->has("user_locked") || (! request()->has("ref") || ! $this->hasRefValue($request))) {
            abort(404);
        }

        return inertia('auth/locked', [
            "back"             => request()->ref,
            'canResetPassword' => Route::has('password.request'),
        ]);
    }

    public function unlock(Request $request)
    {
        if (! auth()->check()) {
            abort(403, 'Usuário não autenticado');
        }

        $request->validate([
            'password' => 'required',
        ]);

        if (Hash::check($request->password, auth()->user()->password)) {
            session()->forget("user_locked");

            // Verificar se o parâmetro 'ref' está presente e se é um valor base64 válido
            $ref = $request->input('ref');
            if ($ref && base64_decode($ref, true)) {
                return redirect(base64_decode($ref));
            } else {
                return redirect()->route('dashboard'); // Ou outra rota padrão
            }
        } else {
            return back()->withErrors([
                'password' => __("auth.errors.password_incorrect"),
            ]);
        }
    }
}
