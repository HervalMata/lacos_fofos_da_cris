<?php

namespace LacosFofos\Http\Controllers\Api;

use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use LacosFofos\Http\Controllers\Controller;
use LacosFofos\Http\Requests\ProductInputRequest;
use LacosFofos\Http\Resources\ProductInputResource;
use LacosFofos\Models\ProductInput;
use Illuminate\Http\Request;

class ProductInputController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return AnonymousResourceCollection
     */
    public function index()
    {
        $inputs = ProductInput::with('product')->paginate();
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
