<?php

use Faker\Generator as Faker;

$factory->define(LacosFofos\Models\ProductInput::class, function (Faker $faker) {
    return [
        'amount' => $faker->numberBetween(1, 20)
    ];
});
