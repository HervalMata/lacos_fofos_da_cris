<?php


namespace LacosFofos\Http\Filters;


use Mnabialek\LaravelEloquentFilter\Filters\SimpleQueryFilter;

class UserFilter extends SimpleQueryFilter
{
    protected $simpleFilters = ['search'];
    protected $simpleSorts = ['id', 'name', 'email', 'created_at'];

    public function hasFilterParameter()
    {
        $contains = $this->parser->getFilters()->contains(function ($filter) {
            return $filter->getField() === 'search' && !empty($filter->getValue());
        });
        return $contains;
    }

    protected function applySearch($value)
    {
        $this->query->where('name', 'LIKE', "%$value$")
            ->orWhere('email', 'LIKE', "%$value$");
    }
}
