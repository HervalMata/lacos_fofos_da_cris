<?php

namespace LacosFofos\Http\Controllers\Api;

use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Collection;
use LacosFofos\Http\Controllers\Controller;
use LacosFofos\Http\Resources\ProductPhotoCollection;
use LacosFofos\Http\Resources\ProductPhotoResource;
use LacosFofos\Models\Product;
use LacosFofos\Models\ProductPhoto;
use Illuminate\Http\Request;

class ProductPhotoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param Product $product
     * @return AnonymousResourceCollection
     */
    public function index(Product $product)
    {
        $photos = $product->photos;
        return new ProductPhotoCollection($photos, $product);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return Collection
     */
    public function store(Request $request, Product $product)
    {
        return ProductPhoto::createWithPhotosFiles($product->id, $request->photos);
    }

    /**
     * Display the specified resource.
     *
     * @param Product $product
     * @param ProductPhoto $photo
     * @return ProductPhoto
     */
    public function show(Product $product, ProductPhoto $photo)
    {
        if ($photo->product_id != $product->id) {
            abort(404);
        }
        return new ProductPhotoCollection($photo);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param  \LacosFofos\Models\ProductPhoto  $productPhoto
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ProductPhoto $productPhoto)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \LacosFofos\Models\ProductPhoto  $productPhoto
     * @return \Illuminate\Http\Response
     */
    public function destroy(ProductPhoto $productPhoto)
    {
        //
    }
}
