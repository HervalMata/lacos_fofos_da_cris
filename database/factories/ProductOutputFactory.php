<?php

use Faker\Generator as Faker;

$factory->define(LacosFofos\Models\ProductOutput::class, function (Faker $faker) {
    return [
        'amount' => $faker->numberBetween(1, 2)
    ];
});
