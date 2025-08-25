<?php
namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\ChatMessage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChatController extends Controller
{

    public function index()
    {
        return Inertia::render('user/chats');
    }

    public function getMessages(Request $request)
    {
        $authUserId = auth()->id();

        $messages = ChatMessage::where(function ($query) use ($authUserId, $request) {
            $query->where('sender_id', $authUserId)
                ->where('receiver_id', $request->userId);
        })->orWhere(function ($query) use ($authUserId, $request) {
            $query->where('sender_id', $request->userId)
                ->where('receiver_id', $authUserId);
        })->orderBy('created_at', 'asc')->get();

        // $grouped = $messages->reduce(function ($carry, $message) {
        //     if ($carry->isEmpty() || $carry->last()['sender_id'] !== $message->sender_id) {
        //         $carry->push([
        //             'sender_id'     => $message->sender_id,
        //             'sender_name'   => $message->sender->name,              // Inclui o nome do remetente
        //             'sender_avatar' => $message->sender->profile_photo_url, // Inclui o avatar do remetente
        //             'messages'      => [],
        //         ]);
        //     }

        //     // Atualiza o último grupo com a nova mensagem
        //     $lastGroup               = $carry->pop();
        //     $lastGroup['messages'][] = [
        //         'id'         => $message->id,
        //         'content'    => $message->content,
        //         'created_at' => $message->created_at,
        //     ];
        //     $carry->push($lastGroup);

        //     return $carry;
        // }, collect());

        return response()->json($messages);
    }
}
