<?php

namespace LacosFofos\Models;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    use Sluggable;

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
