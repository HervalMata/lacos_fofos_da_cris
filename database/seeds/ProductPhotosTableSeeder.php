<?php
declare(strict_types=1);

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Seeder;
use Illuminate\Http\UploadedFile;
use LacosFofos\Models\Product;
use LacosFofos\Models\ProductPhoto;

class ProductPhotosTableSeeder extends Seeder
{
    /**
     * @var \Illuminate\Support\Collection
     */
    private $allFakerPhotos;
    private $fakerPhotosPath = 'app/faker/product_photos';

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->allFakerPhotos = $this->getFakerPhotos();
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
        $photo = ProductPhoto::create([
            'product_id' => $product->id,
            'file_name' =>  'image.jpg'
        ]);
        $this->generatePhoto($photo);
    }

    /**
     * @return \Illuminate\Support\Collection
     */
    private function getFakerPhotos() : \Illuminate\Support\Collection
    {
        $path = storage_path($this->fakerPhotosPath);
        return collect(\File::allFiles($path));
    }

    private function generatePhoto(ProductPhoto $photo)
    {
        $photo->file_name = $this->uploadPhoto($photo->product_id);
        $photo->save();
    }

    private function uploadPhoto($productId) : string
    {
        /** @var SplFileInfo $photoFile */
        $photoFile = $this->allFakerPhotos->random();
        $uploadFile = new UploadedFile(
            $photoFile->getRealPath(),
            str_random(16) . '.' . $photoFile->getExtension()
        );
        ProductPhoto::uploadFiles($productId, [$uploadFile]);
        return $uploadFile->hashName();
    }


}
