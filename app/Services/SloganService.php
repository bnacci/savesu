<?php
namespace App\Services;

class SloganService
{
    public static function getWeeklySlogan(): array
    {
        $slogans = self::getAllSlogans();

        // Obtém o número da semana atual (1 a 52)
        $weekNumber = (int) now()->format('W');

                          // Garante que os slogans são embaralhados de forma consistente
        srand(date("Y")); // Define uma semente fixa para consistência anual
        shuffle($slogans);
        srand(); // Restaura o random padrão

        // Garante que a posição esteja dentro do array
        $index = ($weekNumber - 1) % count($slogans);

        return $slogans[$index];
    }

    private static function getAllSlogans(): array
    {
        return trans('slogans');
    }
}
