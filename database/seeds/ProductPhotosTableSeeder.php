<?php

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Seeder;
use LacosFofos\Models\Product;
use LacosFofos\Models\ProductPhoto;

class ProductPhotosTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        /** @var Collection $products */
        $products = Product::all();
        $this->deleteAllPhotosInProductsPath();
        $products->each(function ($product) {

        });
    }

    private function deleteAllPhotosInProductsPath()
    {
        $path = ProductPhoto::PRODUCTS_PATH;
        \File::deleteDirectory(storage_path($path), true);
    }
}
