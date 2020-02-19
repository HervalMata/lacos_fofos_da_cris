<?php

namespace LacosFofos\Rules;

use Illuminate\Contracts\Validation\Rule;
use LacosFofos\Firebase\Auth as FirebaseAuth;
use LacosFofos\Models\UserProfile;

class PhoneNumberUnique implements Rule
{
    /**
     * @var null
     */
    private $ignoreUserId;

    /**
     * Create a new rule instance.
     *
     * @param null $ignoreUserId
     */
    public function __construct($ignoreUserId = null)
    {
        //
        $this->ignoreUserId = $ignoreUserId;
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param string $attribute
     * @param mixed $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        $firebaseAuth = app(FirebaseAuth::class);
        try {
            $phoneNumber = $firebaseAuth->phoneNumber($value);
            $profile = UserProfile::where('phone_number', $phoneNumber)->first();
            return $profile == null || $this->ignoreUserId != null && $this->ignoreUserId == $profile->user->id;
        } catch (Exception $e) {
            return false;
        }
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'Phone number has used.';
    }
}
