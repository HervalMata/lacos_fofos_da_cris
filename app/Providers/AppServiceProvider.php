<?php

namespace LacosFofos\Providers;

use Illuminate\Support\ServiceProvider;
use LacosFofos\Models\ProductInput;
use LacosFofos\Models\ProductOutput;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        \Schema::defaultStringLength(191);
        ProductInput::created(function ($input) {
            $product = $input->product;
            $product->stock += $input->amount;
            $product->save();
        });

        ProductOutput::created(function ($output) {
            $product = $output->product;
            $product->stock -= $output->amount;
            if ($product->stock < 0) {
                throw new \Exception('Estoque de {$product->name} não pode ser negativo');
            }
            $product->save();
        });
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
