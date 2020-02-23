<?php

namespace LacosFofos\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use LacosFofos\Models\User;

class ChatGroupUserResquest extends FormRequest
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
        $chatGroupId = $this->route('chat_group')->id;
        return [
            'users' => [
                'required',
                Rule::unique('chat_group_user', 'user_id')->where('chat_group_id', $chatGroupId),
                Rule::exists('users', 'id')->where('role', User::ROLE_CUSTOMER)
            ]
        ];
    }
}
