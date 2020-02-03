<?php

namespace LacosFofos\Rules;

use Illuminate\Contracts\Validation\Rule;
use LacosFofos\Models\Product;

class HasStock implements Rule
{
    /**
     * @var Product
     */
    private $product;

    /**
     * Create a new rule instance.
     *
     * @param Product $product
     */
    public function __construct(Product $product)
    {
        //
        $this->product = $product;
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        return $this->product->stock - $value <= 0;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return "The product {$this->product->name} Doesn't have sufficient stock to output.";
    }
}
