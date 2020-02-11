<?php

// @formatter:off

/**
 * A helper file for your Eloquent Models
 * Copy the phpDocs from this file to the correct Model,
 * And remove them from this file, to prevent double declarations.
 *
 * @author Barry vd. Heuvel <barryvdh@gmail.com>
 */


namespace LacosFofos\Models {

    use Eloquent;
    use Illuminate\Database\Eloquent\Builder;
    use Illuminate\Support\Carbon;

    /**
     * LacosFofos\Models\Category
     *
     * @property int $id
     * @property string $name
     * @property string $slug
     * @property int $active
     * @property Carbon|null $created_at
     * @property Carbon|null $updated_at
     * @method static Builder|Category findSimilarSlugs($attribute, $config, $slug)
     * @method static Builder|Category newModelQuery()
     * @method static Builder|Category newQuery()
     * @method static Builder|Category query()
     * @method static Builder|Category whereActive($value)
     * @method static Builder|Category whereCreatedAt($value)
     * @method static Builder|Category whereId($value)
     * @method static Builder|Category whereName($value)
     * @method static Builder|Category whereSlug($value)
     * @method static Builder|Category whereUpdatedAt($value)
     */
    class Category extends Eloquent
    {
    }
}

namespace LacosFofos\Models {

    use Eloquent;
    use Illuminate\Database\Eloquent\Builder;
    use Illuminate\Notifications\DatabaseNotification;
    use Illuminate\Notifications\DatabaseNotificationCollection;
    use Illuminate\Support\Carbon;

    /**
     * LacosFofos\Models\User
     *
     * @property int $id
     * @property string $name
     * @property string $email
     * @property string $password
     * @property string|null $remember_token
     * @property Carbon|null $created_at
     * @property Carbon|null $updated_at
     * @property-read DatabaseNotificationCollection|DatabaseNotification[] $notifications
     * @property-read int|null $notifications_count
     * @method static Builder|User newModelQuery()
     * @method static Builder|User newQuery()
     * @method static Builder|User query()
     * @method static Builder|User whereCreatedAt($value)
     * @method static Builder|User whereEmail($value)
     * @method static Builder|User whereId($value)
     * @method static Builder|User whereName($value)
     * @method static Builder|User wherePassword($value)
     * @method static Builder|User whereRememberToken($value)
     * @method static Builder|User whereUpdatedAt($value)
     */
    class User extends Eloquent
    {
    }
}

