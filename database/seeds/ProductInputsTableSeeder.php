<?php

use Illuminate\Database\Seeder;
use LacosFofos\Models\Product;
use LacosFofos\Models\ProductInput;

class ProductInputsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $products = Product::all();
        factory(ProductInput::class, 200)
                ->make()
                ->each(function ($input) use($products) {
                    $product = $products->random();
                    $input->product_id = $products->random()->id;
                    $input->save();
                });
    }
}
