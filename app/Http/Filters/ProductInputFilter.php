<?php


namespace LacosFofos\Http\Filters;


use Mnabialek\LaravelEloquentFilter\Filters\SimpleQueryFilter;

class ProductInputFilter extends SimpleQueryFilter
{
    protected $simpleFilters = ['search'];
    protected $simpleSorts = ['id', 'product.name', 'created_at'];

    public function apply($query)
    {
        $query = $query->select('product_inputs.*')
            ->join('products', 'products.id', '=', 'product_inputs.product_id');
        return parent::apply($query);
    }

    protected function ApplySortProductName($order)
    {
        $this->query->orderBy('name', $order);
    }

    protected function ApplySortCreatedAt($order)
    {
        $this->query->orderBy('product_inputs.created_at', $order);
    }

    protected function applySearch($value)
    {
        $this->query->where('name', 'LIKE', '%$value%');
    }
}
