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
        $self = $this;
        $products->each(function ($product) use ($self) {
            $self->createPhotosDir($product);
            $self->createPhotosModels($product);
        });
    }

    private function deleteAllPhotosInProductsPath()
    {
        $path = ProductPhoto::PRODUCTS_PATH;
        \File::deleteDirectory(storage_path($path), true);
    }

    /**
     * @param Product $product
     */
    private function createPhotosDir(Product $product)
    {
        $path = ProductPhoto::phothosPath($product->id);
        \File::makeDirectory($path, 0777, true);
    }

    /**
     * @param $product
     */
    private function createPhotosModels($product)
    {
        foreach (range(1, 5) as $r) {
            $this->createPhotoModel($product);
        }
    }

    /**
     * @param $product
     */
    private function createPhotoModel($product)
    {
        ProductPhoto::create([
            'product_id' => $product->id,
            'file_name' =>  'image.jpg'
        ]);
    }


}
