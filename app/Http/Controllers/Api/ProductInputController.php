<?php

namespace LacosFofos\Http\Controllers\Api;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use LacosFofos\Http\Controllers\Controller;
use LacosFofos\Http\Filters\ProductInputFilter;
use LacosFofos\Http\Requests\ProductInputRequest;
use LacosFofos\Http\Resources\ProductInputResource;
use LacosFofos\Models\ProductInput;

class ProductInputController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return AnonymousResourceCollection
     */
    public function index()
    {
        /** @var ProductInputFilter $filter */
        $filter = app(ProductInputFilter::class);
        /** @var Builder $filterQuery */
        $filterQuery = ProductInput::with('product')->filtered($filter);
        $inputs = $filterQuery->paginate();
        return ProductInputResource::collection($inputs);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param ProductInputRequest $request
     * @return ProductInputResource
     */
    public function store(ProductInputRequest $request)
    {
        $input = ProductInput::create($request->all());
        return new ProductInputResource($input);
    }

    /**
     * Display the specified resource.
     *
     * @param ProductInput $Input
     * @return ProductInputResource
     */
    public function show(ProductInput $input)
    {
        return new ProductInputResource($input);
    }
}
