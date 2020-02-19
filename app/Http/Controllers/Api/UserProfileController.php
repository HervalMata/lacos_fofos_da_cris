<?php

namespace LacosFofos\Http\Controllers\Api;

use Auth;
use Illuminate\Http\Request;
use LacosFofos\Firebase\Auth as FirebaseAuth;
use LacosFofos\Http\Controllers\Controller;
use LacosFofos\Http\Requests\UserProfileUpdateRequest;
use LacosFofos\Http\Resources\UserResource;

class UserProfileController extends Controller
{
    /**
     * @param Request $request
     * @return UserResource
     */
    public function update(UserProfileUpdateRequest $request)
    {
        $data = $request->all();
        if ($request->has('token')) {
            $token = $request->token;
            $data["phone_number"] = $this->getPhoneNumber($token);
        }

        if ($request->has('remove_photo')) {
            $data['photo'] ?? null;
        }

        $user = Auth::guard('api')->user();
        $user->updateWithProfile($data);

        $resource = new UserResource($user);
        return [
            'user' => $resource->toArray($request),
            'token' => Auth::guard('api')->login($user)
        ];
    }

    /**
     * @param $token
     * @return mixed
     */
    private function getPhoneNumber($token)
    {
        $firebasseAuth = app(FirebaseAuth::class);
        return $firebasseAuth->phoneNumber($token);
    }
}
