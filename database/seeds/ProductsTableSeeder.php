<?php

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Seeder;
use LacosFofos\Models\Category;
use LacosFofos\Models\Product;

class ProductsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        /** @var Collection $categories */
        $categories = Category::all();
        factory(Product::class, 50)
            ->create()
            ->each(function (Product $product) use ($categories) {
               $categoryId = $categories->random()->id;
               $product->categories()->attach($categoryId);
            });
    }
}
