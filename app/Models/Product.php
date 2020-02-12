<?php

namespace LacosFofos\Models;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Mnabialek\LaravelEloquentFilter\Traits\Filterable;

class Product extends Model
{
    use Sluggable;
    use SoftDeletes;
    use Filterable;

    protected $dates = ['deleted_at'];
    protected $fillable = ['name', 'description', 'price', 'active'];

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

    /**
     * @return BelongsToMany
     */
    public function categories(){
        return $this->belongsToMany(Category::class);
    }

    /**
     * @return HasMany
     */
    public function photos()
    {
        return $this->hasMany(ProductPhoto::class);
    }

}
