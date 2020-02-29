<?php
declare(strict_types=1);
namespace LacosFofos\Models;

use DB;
use Exception;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use LacosFofos\Firebase\FirebaseSync;
use Mnabialek\LaravelEloquentFilter\Traits\Filterable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;
    use SoftDeletes;
    use Filterable;
    use FirebaseSync;

    const ROLE_SELLER = 1;
    const ROLE_CUSTOMER = 2;

    protected $dates = ['deleted_at'];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * @param array $data
     * @return User
     * @throws Exception
     */
    public static function createCustomer(array $data): User
    {
        try {
            UserProfile::uploadPhoto($data['photo']);
            DB::beginTransaction();
            $user = self::createCustomerUser($data);
            UserProfile::saveProfile($user, $data);
            DB::commit();
        } catch (Exception $e) {
            UserProfile::deleteFile($data['photo']);
            DB::rollBack();
            throw $e;
        }
    }

    /**
     * @param array $data
     * @return User
     */
    public static function createCustomerUser(array $data): User
    {
        $data['password'] = bcrypt(str_random(16));
        $user = User::create($data);
        $user->role = User::ROLE_CUSTOMER;
        $user->save();
        return $user;
    }

    /**
     * @param array $data
     * @return User
     * @throws Exception
     */
    public function updateWithProfile(array $data): User
    {
        try {
            if (isset($data['photo'])) {
                UserProfile::uploadPhoto($data['photo']);
            }
            DB::beginTransaction();
            $this->fill($data);
            $this->save();
            UserProfile::saveProfile($this, $data);
            DB::commit();
        } catch (Exception $e) {
            if (isset($data['photo'])) {
                UserProfile::deleteFile($data['photo']);
            }

            DB::rollBack();
            throw $e;
        }
        return $this;
    }

    /**
     * @param array $attributes
     * @return mixed
     */
    public function fill(array $attributes)
    {
        !isset($attributes['password']) ?: $attributes['password'] = bcrypt($attributes['password']);
        return parent::fill($attributes);
    }


    /**
     * @inheritDoc
     */
    public function getJWTIdentifier()
    {
        return $this->id;
    }

    /**
     * @inheritDoc
     */
    public function getJWTCustomClaims()
    {
        return [
            'email' => $this->email,
            'name' => $this->name,
            'role' => $this->role,
            'profile' => [
                'has_photo' => $this->profile->photo ? true : false,
                'photo_url' => $this->profile->photo_url,
                'phone_number' => $this->profile->phone_number,
                'firebase_uid' => $this->profile->firebase_uid
            ]
        ];
    }

    /**
     * @return HasOne
     */
    public function profile()
    {
        return $this->hasOne(UserProfile::class)->withDefault();
    }

    protected function syncFbCreate()
    {

    }

    protected function syncFbUpdate()
    {

    }

    protected function syncFbRemove()
    {

    }

    /**
     *
     */
    protected function syncFbSetCustom()
    {
        $this->profile->refresh();
        if ($this->profile->firebase_uid) {
            $database = $this->getFirebaseDatabase();
            $path = 'users/' . $this->profile->firebase_uid;
            $reference = $database->getReference($path);
            $reference->set([
                'name' => $this->name,
                'role' => $this->role,
                'photo_url' => $this->photo_url,
                'deleted_at' => $this->deleted_at
            ]);
        }
    }
}
