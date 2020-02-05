<?php

namespace LacosFofos\Http\Controllers\Api;

use Illuminate\Http\JsonResponse;
use LacosFofos\Http\Controllers\Controller;
use LacosFofos\Http\Requests\ProductPhotoRequest;
use LacosFofos\Http\Resources\ProductPhotoCollection;
use LacosFofos\Http\Resources\ProductPhotoResource;
use LacosFofos\Models\Product;
use LacosFofos\Models\ProductPhoto;

class ProductPhotoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param Product $product
     * @return ProductPhotoCollection
     */
    public function index(Product $product)
    {
        $photos = $product->photos;
        return new ProductPhotoCollection($photos, $product);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param ProductPhotoRequest $request
     * @param Product $product
     * @return JsonResponse
     * @throws \Exception
     */
    public function store(ProductPhotoRequest $request, Product $product)
    {
        $photos = ProductPhoto::createWithPhotosFiles($product->id, $request->photos);
        return response()->json(new ProductPhotoCollection($photos, $product), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param Product $product
     * @param ProductPhoto $photo
     * @return ProductPhotoCollection
     */
    public function show(Product $product, ProductPhoto $photo)
    {
        $this->assertProductPhoto($photo, $product);
        return new ProductPhotoCollection($photo);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param ProductPhotoRequest $request
     * @param Product $product
     * @param ProductPhoto $photo
     * @return ProductPhotoResource
     * @throws \Exception
     */
    public function update(ProductPhotoRequest $request, Product $product, ProductPhoto $photo)
    {
        $this->assertProductPhoto($photo, $product);
        $photo = $photo->updateWithPhoto($request->photo);
        return new ProductPhotoResource($photo);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Product $product
     * @param ProductPhoto $photo
     * @return JsonResponse
     * @throws \Exception
     */
    public function destroy(Product $product, ProductPhoto $photo)
    {
        $this->assertProductPhoto($photo, $product);
        $photo->deleteWithPhoto();
        return response()->json([], 204);
    }

    /**
     * @param ProductPhoto $photo
     * @param Product $product
     */
    private function assertProductPhoto(ProductPhoto $photo, Product $product)
    {
        if ($photo->product_id != $product->id) {
            abort(404);
        }
    }
}
