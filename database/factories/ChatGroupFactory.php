<?php

use Faker\Generator as Faker;

$factory->define(LacosFofos\Models\ChatGroup::class, function (Faker $faker) {
    return [
        'name' => $faker->country
    ];
});
