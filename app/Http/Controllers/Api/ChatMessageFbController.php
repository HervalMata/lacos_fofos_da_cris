<?php

namespace LacosFofos\Http\Controllers\Api;

use Illuminate\Http\Request;
use LacosFofos\Firebase\ChatMessageFb;
use LacosFofos\Http\Controllers\Controller;
use LacosFofos\Http\Requests\ChatMessageFbRequest;
use LacosFofos\Models\ChatGroup;

class ChatMessageFbController extends Controller
{

    /**
     * Store a newly created resource in storage.
     *
     * @param ChatMessageFbRequest $request
     * @param ChatGroup $chat_group
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(ChatMessageFbRequest $request, ChatGroup $chat_group)
    {
        $firebaseUid = \Auth::guard('api')->user()->profile->firebase_uid;
        $chatMessageFb = new ChatMessageFb();
        $chatMessageFb->create([
            'firebase_uid' => $firebaseUid,
            'chat_group' => $chat_group
        ] + $request->all);

        return response()->json([], 204);
    }
}
