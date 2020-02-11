<?php

namespace LacosFofos\Http\Controllers\Api;

use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use LacosFofos\Http\Controllers\Controller;
use LacosFofos\Http\Filters\CategoryFilter;
use LacosFofos\Http\Requests\CategoryRequest;
use LacosFofos\Http\Resources\CategoryResource;
use LacosFofos\Models\Category;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return AnonymousResourceCollection
     */
    public function index(Request $request)
    {
        $filter = app(CategoryFilter::class);
        $filterQuery = Category::filtered($filter);
        $categories = $request->has('all') ? $filterQuery->get() : $filterQuery->paginate(5);
        return CategoryResource::collection($categories);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param CategoryRequest $request
     * @return CategoryResource
     */
    public function store(CategoryRequest $request)
    {
        $category = Category::create($request->all());
        $category->refresh();
        return new CategoryResource($category);
    }

    /**
     * Display the specified resource.
     *
     * @param Category $category
     * @return CategoryResource
     */
    public function show(Category $category)
    {
        return new CategoryResource($category);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param CategoryRequest $request
     * @param Category $category
     * @return CategoryResource
     */
    public function update(CategoryRequest $request, Category $category)
    {
        $category->fill($request->all());
        $category->save();

        return new CategoryResource($category);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Category $category
     * @return JsonResponse
     * @throws Exception
     */
    public function destroy(Category $category)
    {
        $category->delete();

        return response()->json([], 204);
    }
}
