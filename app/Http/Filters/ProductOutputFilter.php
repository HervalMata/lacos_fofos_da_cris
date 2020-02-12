<?php


namespace LacosFofos\Http\Filters;


use Mnabialek\LaravelEloquentFilter\Filters\SimpleQueryFilter;

class ProductOutputFilter extends SimpleQueryFilter
{
    protected $simpleFilters = ['search'];
    protected $simpleSorts = ['id', 'product.name', 'created_at'];

    public function apply($query)
    {
        $query = $query->select('product_outputs.*')
            ->join('products', 'products.id', '=', 'product_outputs.product_id');
        return parent::apply($query);
    }

    protected function ApplySortProductName($order)
    {
        $this->query->orderBy('name', $order);
    }

    protected function ApplySortCreatedAt($order)
    {
        $this->query->orderBy('product_outputs.created_at', $order);
    }

    protected function applySearch($value)
    {
        $this->query->where('name', 'LIKE', '%$value%');
    }
}
