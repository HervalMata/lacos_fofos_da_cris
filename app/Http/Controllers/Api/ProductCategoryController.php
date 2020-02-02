<?php

namespace LacosFofos\Http\Controllers\Api;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use LacosFofos\Http\Controllers\Controller;
use LacosFofos\Models\Category;
use LacosFofos\Models\Product;

class ProductCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index(Product $product)
    {
        return $product->categories;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @param Product $product
     * @return array|JsonResponse
     */
    public function store(Request $request, Product $product)
    {
        $changed = $product->categories()->sync($request->categories);
        $categoriesAttachedIds = $changed['attached'];
        /** @var Collection $categories */
        $categories = Category::whereIn('id', $categoriesAttachedIds)->get();
        return $categories->count() ? \response()->json($categories, 201) : [];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        //
    }
}
