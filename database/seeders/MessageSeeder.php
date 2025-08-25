<?php
namespace Database\Seeders;

use App\Models\ChatMessage;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class MessageSeeder extends Seeder
{
    public function run()
    {
        // Certifique-se que existam usuários
        if (User::count() < 2) {
            $this->command->warn('Você precisa de pelo menos 2 usuários para gerar mensagens.');
            return;
        }

        $users = User::all();

        // Vamos pegar os dois primeiros usuários para exemplo
        $sender   = $users[0];
        $receiver = $users[1];

        // Criar mensagens simuladas entre eles
        $messages = [
            ['sender_id' => $sender->id, 'receiver_id' => $receiver->id, 'content' => 'Oi, tudo bem?', 'created_at' => Carbon::now()->subMinutes(10)],
            ['sender_id' => $sender->id, 'receiver_id' => $receiver->id, 'content' => 'Como você está?', 'created_at' => Carbon::now()->subMinutes(10)],
            ['sender_id' => $receiver->id, 'receiver_id' => $sender->id, 'content' => 'Tudo sim! E você?', 'created_at' => Carbon::now()->subMinutes(9)],
            ['sender_id' => $sender->id, 'receiver_id' => $receiver->id, 'content' => 'Também estou bem, obrigado.', 'created_at' => Carbon::now()->subMinutes(8)],
            ['sender_id' => $receiver->id, 'receiver_id' => $sender->id, 'content' => 'Que bom!', 'created_at' => Carbon::now()->subMinutes(7)],
        ];

        foreach ($messages as $messageData) {
            ChatMessage::create($messageData);
        }

        $this->command->info('Mensagens de teste adicionadas com sucesso.');
    }
}
