<?php

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;
use Illuminate\Http\UploadedFile;
use LacosFofos\Models\User;
use LacosFofos\Models\UserProfile;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        File::deleteDirectory(UserProfile::photosPath(), true);
        factory(User::class, 1)->create([
            'email' => 'admin@user.com',
            'role' => User::ROLE_SELLER
        ])->each(function ($user) {
            Model::reguard();
            $user->updateWithProfile([
                'phone_number' => '+16505551234',
                'photo' => $this->getAdminPhoto()
            ]);
            Model::unguard();
            $user->profile->firebase_uid = 'nn3h2N2HukhvtxLIkGhT8JwgWhL2';
            $user->save();
        });
        factory(User::class, 1)->create([
            'email' => 'customer@user.com',
            'role' => User::ROLE_CUSTOMER
        ])->each(function ($user) {
            Model::reguard();
            $user->updateWithProfile([
                'phone_number' => '+16505551235'
            ]);
            Model::unguard();
            $user->profile->firebase_uid = 'OrIN6XYdDMVeehXsPy1sJ0VX73S2';
            $user->save();
        });
        factory(User::class, 50)->create([
            'role' => User::ROLE_CUSTOMER
        ]);
    }

    /**
     * @return UploadedFile
     */
    private function getAdminPhoto()
    {
        return new UploadedFile(
            storage_path('app/faker/users/1624_mod.png'),
            str_random(16) . '.jpg'
        );
    }
}
