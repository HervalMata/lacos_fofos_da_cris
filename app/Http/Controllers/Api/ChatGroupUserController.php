<?php

namespace LacosFofos\Http\Controllers\Api;

use Illuminate\Http\JsonResponse;
use LacosFofos\Http\Controllers\Controller;
use LacosFofos\Http\Requests\ChatGroupUserResquest;
use LacosFofos\Http\Resources\ChatGroupUserResource;
use LacosFofos\Models\ChatGroup;
use LacosFofos\Models\User;

class ChatGroupUserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return ChatGroupUserResource
     */
    public function index(ChatGroup $chat_group)
    {
        return new ChatGroupUserResource($chat_group);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param ChatGroupUserResquest $request
     * @param ChatGroup $chat_group
     * @return JsonResponse
     */
    public function store(ChatGroupUserResquest $request, ChatGroup $chat_group)
    {
        $chat_group->users()->attach($request->users);
        $users = User::whereIn('id', $request->users)->get();

        return response()->json(new ChatGroupUserResource($chat_group));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param ChatGroup $chat_group
     * @param User $user
     * @return JsonResponse
     */
    public function destroy(ChatGroup $chat_group, User $user)
    {
        $chat_group->users()->detach($user->id);
        return response()->json([], 204);
    }
}
