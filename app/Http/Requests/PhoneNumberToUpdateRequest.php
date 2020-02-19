<?php

namespace LacosFofos\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use LacosFofos\Rules\FirebaseTokenVerification;
use LacosFofos\Rules\PhoneNumberUnique;

class PhoneNumberToUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'email' => 'required|email|exists:users,email',
            'token' => [
                new FirebaseTokenVerification(),
                new PhoneNumberUnique()
            ]
        ];
    }
}
