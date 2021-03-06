<?php

namespace LacosFofos\Http\Controllers\Api;

use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use LacosFofos\Common\OnlyTrashed;
use LacosFofos\Http\Controllers\Controller;
use LacosFofos\Http\Filters\ProductFilter;
use LacosFofos\Http\Requests\ProductRequest;
use LacosFofos\Http\Resources\ProductResource;
use LacosFofos\Models\Product;

class ProductController extends Controller
{
    use OnlyTrashed;
    /**
     * Display a listing of the resource.
     *
     * @return AnonymousResourceCollection
     */
    public function index(Request $request)
    {
        $filter = app(ProductFilter::class);
        $query = Product::query();
        $query = $this->onlyTrashedIfRequested($request, $query);
        $filterQuery = $query->filtered($filter);
        $products = $filter->hasFilterParameter() ? $filter->get() : $filterQuery->paginate(10);
        return ProductResource::collection($products);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param ProductRequest $request
     * @return ProductResource
     */
    public function store(ProductRequest $request)
    {
        $product = Product::create($request->all());
        $product->refresh();
        return new ProductResource($product);
    }

    /**
     * Display the specified resource.
     *
     * @param Product $product
     * @return ProductResource
     */
    public function show(Product $product)
    {
        return new ProductResource($product);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param ProductRequest $request
     * @param Product $product
     * @return ProductResource
     */
    public function update(ProductRequest $request, Product $product)
    {
        $product->fill($request->all());
        $product->save();

        return new ProductResource($product);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Product $product
     * @return JsonResponse
     * @throws Exception
     */
    public function destroy(Product $product)
    {
        $product->delete();

        return response()->json([], 204);
    }

    /**
     * @param Product $product
     * @return JsonResponse
     */
    public function restore(Product $product)
    {
        $product->restore();
        return response()->json([], 204);
    }
}
