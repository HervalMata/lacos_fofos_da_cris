<?php

namespace LacosFofos\Http\Controllers\Api;

use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use LacosFofos\Http\Controllers\Controller;
use LacosFofos\Http\Requests\ChatGroupCreateRequest;
use LacosFofos\Http\Requests\ChatGroupUpdateRequest;
use LacosFofos\Http\Resources\ChatGroupResource;
use LacosFofos\Models\ChatGroup;

class ChatGroupController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return AnonymousResourceCollection
     */
    public function index()
    {
        $chat_groups = ChatGroup::WithCount('users')->paginate();
        return ChatGroupResource::collection($chat_groups);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param ChatGroupCreateRequest $request
     * @return ChatGroupResource
     * @throws Exception
     */
    public function store(ChatGroupCreateRequest $request)
    {
        $chat_group = ChatGroup::createWhithPhoto($request->all());
        return new ChatGroupResource($chat_group);
    }

    /**
     * Display the specified resource.
     *
     * @param ChatGroup $chat_group
     * @return ChatGroupResource
     */
    public function show(ChatGroup $chat_group)
    {
        return new ChatGroupResource($chat_group);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param ChatGroupUpdateRequest $request
     * @param ChatGroup $chat_group
     * @return ChatGroupResource
     * @throws Exception
     */
    public function update(ChatGroupUpdateRequest $request, ChatGroup $chat_group)
    {
        $chat_group->updateWithPhoto($request->all());
        return new ChatGroupResource($chat_group);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param ChatGroup $chat_group
     * @return JsonResponse
     * @throws Exception
     */
    public function destroy(ChatGroup $chat_group)
    {
        $chat_group->delete();
        return response()->json([], 204);
    }
}
