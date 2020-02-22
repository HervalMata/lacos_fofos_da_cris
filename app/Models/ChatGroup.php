<?php
declare(strict_types=1);

namespace LacosFofos\Models;

use DB;
use Exception;
use File;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Http\UploadedFile;
use LacosFofos\Firebase\FirebaseSync;
use Storage;

class ChatGroup extends Model
{
    use SoftDeletes;
    use FirebaseSync;

    const BASE_PATH = 'app/public';
    const DIR_CHAT_GROUPS = 'chat_groups';
    const CHAT_GROUP_PHOTO_PATH = self::BASE_PATH . '/' . self::DIR_CHAT_GROUPS;

    protected $fillable = ['name', 'photo'];
    protected $dates = ['deleted_at'];

    /**
     * @param array $data
     * @return ChatGroup
     * @throws Exception
     */
    public static function createWhithPhoto(array $data): ChatGroup
    {
        try {
            self::uploadPhoto($data['photo']);
            $photo = $data['photo'];
            $data['photo'] = $data['photo']->hashName();
            DB::beginTransaction();
            $chatGroup = self::create($data);
            DB::commit();
        } catch (Exception $e) {
            self::deleteFile($photo);
            DB::rollBack();
            throw $e;
        }

        return $chatGroup;
    }

    /**
     * @param UploadedFile $photo
     */
    private static function uploadPhoto(UploadedFile $photo)
    {
        $dir = self::photoDir();
        $photo->store($dir, ['disk' => 'public']);
    }

    /**
     * @return string
     */
    private static function photoDir()
    {
        $dir = self::DIR_CHAT_GROUPS;
        return $dir;
    }

    /**
     * @param UploadedFile $photo
     */
    private static function deleteFile(UploadedFile $photo)
    {
        $path = self::photosPath();
        $photoPath = "{$path}/{$photo->hashName()}";
        if (file_exists($photoPath)) {
            File::delete($photoPath);
        }
    }

    /**
     * @return string
     */
    private static function photosPath()
    {
        $path = self::CHAT_GROUP_PHOTO_PATH;
        return storage_path($path);
    }

    /**
     * @return string
     */
    public function getPhotoUrlAttribute()
    {
        return asset("storage/{$this->photo_url_base}");
    }

    /**
     * @param array $data
     * @return ChatGroup
     * @throws Exception
     */
    public function updateWithPhoto(array $data): ChatGroup
    {
        try {
            if (isset($data['photo'])) {
                self::uploadPhoto($data['photo']);
                $this->deletePhoto();
                $data['photo'] = $data['photo']->hashName();
            }
            DB::beginTransaction();
            $this->fill($data)->save();
            DB::commit();
            return $this;
        } catch (Exception $e) {
            if (isset($data['photo'])) {
                self::deleteFile($data['photo']);
            }
            DB::rollBack();
            throw $e;
        }
        return $this;
    }

    /**
     *
     */
    private function deletePhoto()
    {
        $dir = self::photoDir();
        Storage::disk('public')->delete("{$dir}/{$this->photo}");
    }

    /**
     * @return BelongsToMany
     */
    public function users()
    {
        return $this->belongsToMany(User::class);
    }

    /**
     * @return string
     */
    public function getPhotoUrlBaseAttribute()
    {
        $path = self::photoDir();
        return "{$path}/{$this->photo}";
    }

    protected function syncFbRemove()
    {
        $this->syncFbSet();
    }

    protected function syncFbSet()
    {
        $data = $this->toArray();
        $data['photo_url'] = $this->photo_url_base;
        unset($data['photo']);
        $this->getModelReference()->update($data);
    }
}
