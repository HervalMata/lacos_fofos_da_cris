<?php

namespace LacosFofos\Listeners;

use Illuminate\Support\Facades\Notification;
use LacosFofos\Events\UserCreatedEvent;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendMailToDefinePassword
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  UserCreatedEvent  $event
     * @return void
     */
    public function handle(UserCreatedEvent $event)
    {
        $user = $event->getUser();
        $token = \Password::broker()->createToken($user);
        $user->sendPasswordResetNotification($token);
        //$user->notify(new Notification($token));
    }
}
