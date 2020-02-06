<?php

namespace LacosFofos\Http\Controllers\Api;

use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use LacosFofos\Http\Controllers\Controller;
use LacosFofos\Http\Resources\UserResource;

class AuthController extends Controller
{
    use AuthenticatesUsers;

    /**
     * @param Request $request
     * @return array|JsonResponse
     */
    public function login(Request $request)
    {
        $this->validateLogin($request);
        $credentials = $this->credentials($request);
        $token = \JWTAuth::attempt($credentials);
        return $token ? ['token' => $token] : response()->json([
            'error' => \Lang::get('auth.failed')
        ], 400);
    }

    /**
     * @return JsonResponse
     */
    public function logout()
    {
        \Auth::guard('api')->logout();
        return response()->json([], 204);
    }

    /**
     * @return UserResource
     */
    public function me()
    {
        $user = \Auth::guard('api')->user();
        return new UserResource($user);
    }

    public function refresh()
    {
        $token = \Auth::guard('api')->refresh();
        return ['token' => $token];
    }
}
