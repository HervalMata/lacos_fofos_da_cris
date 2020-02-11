<?php
declare(strict_types=1);
namespace LacosFofos\Models;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;
use Mnabialek\LaravelEloquentFilter\Traits\Filterable;

class Category extends Model
{
    use Sluggable;
    use Filterable;
    protected $fillable = ['name', 'active'];

    /**
     * @inheritDoc
     */
    public function sluggable(): array
    {
        return ['slug' => [
                'source' => 'name'
            ]
        ];
    }

    public function products(){
        return $this->belongsToMany(Product::class);
    }
}
