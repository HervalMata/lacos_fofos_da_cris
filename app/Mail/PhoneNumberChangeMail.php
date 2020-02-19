<?php

namespace LacosFofos\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use LacosFofos\Models\User;

class PhoneNumberChangeMail extends Mailable
{
    use Queueable, SerializesModels;
    /**
     * @var User
     */
    public $user;
    public $url;
    private $token;

    /**
     * Create a new message instance.
     *
     * @param User $user
     * @param $token
     */
    public function __construct(User $user, $token)
    {
        $this->user = $user;
        $this->token = $token;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $this->route('customers.web_phone_number_update', ['token' => $this->token]);
        return $this->subject('Alteração do número de telefone')->markdown('mails.phone_number_change_email');
    }
}
