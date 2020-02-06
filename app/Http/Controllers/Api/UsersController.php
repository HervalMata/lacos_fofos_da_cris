<?php

namespace LacosFofos\Http\Controllers\Api;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use LacosFofos\Common\OnlyTrashed;
use LacosFofos\Events\UserCreatedEvent;
use LacosFofos\Http\Controllers\Controller;
use LacosFofos\Http\Requests\UserRequest;
use LacosFofos\Http\Resources\UserResource;
use LacosFofos\Models\User;

class UsersController extends Controller
{
    use OnlyTrashed;
    /**
     * Display a listing of the resource.
     *
     * @return AnonymousResourceCollection
     */
    public function index(Request $request)
    {
        $query = User::query();
        $query = $this->onlyTrashedIfRequested($request, $query);
        $users = UserResource::collection($query->paginate(10));
        return $users;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param UserRequest $request
     * @return UserResource
     */
    public function store(UserRequest $request)
    {
        $user = User::create($request->all());
        event(new UserCreatedEvent($user));
        return new UserResource($user);
    }

    /**
     * Display the specified resource.
     *
     * @param User $user
     * @return UserResource
     */
    public function show(User $user)
    {
        return new UserResource($user);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UserRequest $request
     * @param User $user
     * @return UserResource
     */
    public function update(UserRequest $request, User $user)
    {
        $user->fill($request->all());
        $user->save();
        return new UserResource($user);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param User $user
     * @return JsonResponse
     * @throws \Exception
     */
    public function destroy(User $user)
    {
        $user->delete();
        return response()->json([], 204);
    }

    /**
     * @param User $user
     * @return JsonResponse
     */
    public function restore(User $user)
    {
        $user->restore();
        return response()->json([], 204);
    }
}
