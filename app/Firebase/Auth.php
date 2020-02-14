<?php

declare(strict_types=1);

namespace LacosFofos\Firebase;


use Kreait\Firebase;
use Kreait\Firebase\Auth\UserRecord;

class Auth
{
    /**
     * @var Firebase
     */
    private $firebase;

    /**
     * Auth constructor.
     * @param Firebase $firebase
     */
    public function __construct(Firebase $firebase)
    {
        $this->firebase = $firebase;
    }

    /**
     * @param $token
     * @return string
     */
    public function phoneNumber($token): string
    {
        $user = $this->user($token);
        return $user->phoneNumber;
    }

    /**
     * @param $token
     * @return UserRecord
     */
    public function user($token)
    {
        $verifiedIdToken = $this->firebase->getAuth()->verifyIdToken($token);
        $uid = $verifiedIdToken->getClaim('sub');
        return $this->firebase->getAuth()->getUser($uid);
    }
}
