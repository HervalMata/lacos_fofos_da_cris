<?php

namespace LacosFofos\Providers;

use Exception;
use Illuminate\Support\ServiceProvider;
use Kreait\Firebase;
use LacosFofos\Models\ProductInput;
use LacosFofos\Models\ProductOutput;
use Schema;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Schema::defaultStringLength(191);
        ProductInput::created(function ($input) {
            $product = $input->product;
            $product->stock += $input->amount;
            $product->save();
        });

        ProductOutput::created(function ($input) {
            $product = $input->product;
            $product->stock -= $input->amount;
            if ($product->stock < 0) {
                throw new Exception('Estoque de {$product->name} não pode ser negativo');
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
        $this->app->bind(Firebase::class, function () {
            $serviceAccount = Firebase\ServiceAccount::fromJsonFile(base_path('firebase-admin.json'));
            return (new Firebase\Factory())->withServiceAccount($serviceAccount)->create();
        });
    }
}
