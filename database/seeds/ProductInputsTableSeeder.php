<?php

use Illuminate\Database\Seeder;
use LacosFofos\Models\Product;

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
        factory(\LacosFofos\Models\ProductInput::class, 159)
                ->make()
                ->each(function ($input) use($products) {
                    $product = $products->random();
                    $input->product_id = $product->id;
                    $input->save();
                    $product->stock = $input->amount;
                    $product->save();
                });
    }
}
