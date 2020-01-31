<?php

namespace LacosFofos\Models;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;

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

    public function categories(){
        return $this->belongsToMany(Category::class);
    }

}
