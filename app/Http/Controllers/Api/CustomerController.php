<?php

namespace LacosFofos\Http\Controllers\Api;

use Auth;
use Exception;
use Illuminate\Http\JsonResponse;
use LacosFofos\Firebase\Auth as FirebaseAuth;
use LacosFofos\Http\Controllers\Controller;
use LacosFofos\Http\Requests\CustomerRequest;
use LacosFofos\Http\Requests\PhoneNumberToUpdateRequest;
use LacosFofos\Mail\PhoneNumberChangeMail;
use LacosFofos\Models\User;
use LacosFofos\Models\UserProfile;
use Mail;

class CustomerController extends Controller
{
    /**
     * @param CustomerRequest $request
     * @return array
     * @throws Exception
     */
    public function store(CustomerRequest $request)
    {
        $data = $request->all();
        $token = $request->token;
        $data['phone_number'] = $this->getPhoneNumber($token);
        $data['photo'] = $data['photo'] ?? null;
        $user = User::createCustomer($data);
        return [
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

    /**
     * @param PhoneNumberToUpdateRequest $request
     * @return JsonResponse
     */
    public function requestPhoneNumberUpdate(PhoneNumberToUpdateRequest $request)
    {
        $user = User::whereEmail($request->email)->first();
        $phoneNumber = $this->getPhoneNumber($request->token);
        $token = UserProfile::createTokenToChangePhoneNumber($user->profile, $phoneNumber);
        Mail::to($user)->send(new PhoneNumberChangeMail($user, $token));
        return response()->json([], 204);
    }

    /**
     * @param $token
     * @return JsonResponse
     */
    public function updatePhoneNumber($token)
    {
        UserProfile::updatePhoneNumber($token);
        return response()->json([], 204);
    }
}
