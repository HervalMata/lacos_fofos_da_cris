<?php

namespace LacosFofos\Http\Controllers\Api;

use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use LacosFofos\Http\Controllers\Controller;
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
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \LacosFofos\Models\ProductInput  $productInput
     * @return \Illuminate\Http\Response
     */
    public function show(ProductInput $productInput)
    {
        //
    }
}
