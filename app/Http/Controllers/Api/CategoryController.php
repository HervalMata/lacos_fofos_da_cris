<?php

namespace LacosFofos\Http\Controllers\Api;

use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Database\Eloquent\Collection;
use LacosFofos\Http\Controllers\Controller;
use LacosFofos\Http\Requests\CategoryRequest;
use LacosFofos\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Collection|Category[]
     */
    public function index()
    {
        return Category::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param CategoryRequest $request
     * @return void
     */
    public function store(CategoryRequest $request)
    {
        $category = Category::create($request->all() + ['slug' => 'teste']);
        $category->refresh();
        return $category;
    }

    /**
     * Display the specified resource.
     *
     * @param Category $category
     * @return Category
     */
    public function show(Category $category)
    {
        return $category;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param CategoryRequest $request
     * @param Category $category
     * @return ResponseFactory|\Illuminate\Http\Response
     */
    public function update(CategoryRequest $request, Category $category)
    {
        $category->fill($request->all());
        $category->save();

        return response([], 204);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Category $category
     * @return \Illuminate\Http\Response
     */
    public function destroy(Category $category)
    {
        //
    }
}
