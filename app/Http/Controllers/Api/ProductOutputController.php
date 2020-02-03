<?php

namespace LacosFofos\Http\Controllers\Api;

use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use LacosFofos\Http\Controllers\Controller;
use LacosFofos\Http\Requests\ProductOutputRequest;
use LacosFofos\Http\Resources\ProductOutputResource;
use LacosFofos\Models\ProductOutput;
use Illuminate\Http\Request;

class ProductOutputController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return AnonymousResourceCollection
     */
    public function index()
    {
        $outputs = ProductOutput::with('product')->paginate();
        return ProductOutputResource::collection($outputs);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param ProductOutputRequest $request
     * @return ProductOutputResource
     */
    public function store(ProductOutputRequest $request)
    {
        $output = ProductOutput::create($request->all());
        return new ProductOutputResource($output);
    }

    /**
     * Display the specified resource.
     *
     * @param ProductOutput $output
     * @return ProductOutputResource
     */
    public function show(ProductOutput $output)
    {
        return new ProductOutputResource($output);
    }
}
