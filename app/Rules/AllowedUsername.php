<?php
namespace App\Rules;

use Closure;
use Illuminate\Config\Repository;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Routing\Router;

class AllowedUsername implements ValidationRule
{
    private Router $router;
    private Filesystem $files;
    private Repository $config;

    public function __construct(Router $router, Filesystem $files, Repository $config)
    {
        $this->router = $router;
        $this->files  = $files;
        $this->config = $config;
    }

    /**
     * Run the validation rule.
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $username = trim(strtolower($value));

        if ($this->isReservedUsername($username)) {
            $fail('Este nome de usuário está reservado.');
            return;
        }

        if ($this->matchesRoute($username)) {
            $fail('Este nome de usuário entra em conflito com uma rota do sistema.');
            return;
        }

        if ($this->matchesPublicFileOrDirectory($username)) {
            $fail('Este nome de usuário entra em conflito com arquivos ou diretórios públicos.');
            return;
        }
    }

    private function isReservedUsername(string $username): bool
    {
        $reserved = $this->config->get('auth.reserved_usernames', []);

        return in_array($username, $reserved);
    }

    private function matchesRoute(string $username): bool
    {
        foreach ($this->router->getRoutes() as $route) {
            if (strtolower(trim($route->uri(), '/')) === $username) {
                return true;
            }
        }

        return false;
    }

    private function matchesPublicFileOrDirectory(string $username): bool
    {
        $paths = $this->files->glob(public_path() . '/*');

        foreach ($paths as $path) {
            if (strtolower(basename($path)) === $username) {
                return true;
            }
        }

        return false;
    }
}
