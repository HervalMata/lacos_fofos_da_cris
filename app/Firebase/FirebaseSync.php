<?php
declare(strict_types=1);

namespace LacosFofos\Firebase;

use Exception;
use Kreait\Firebase;
use Kreait\Firebase\Database;
use Kreait\Firebase\Database\Reference;

trait FirebaseSync
{
    protected static $OPERATION_CREATE = 1;
    protected static $OPERATION_UPDATE = 2;

    public static function bootFirebaseSync()
    {
        static::created(function ($model) {
            $model->syncFbCreate(self::$OPERATION_CREATE);
        });

        static::updated(function ($model) {
            $model->syncFbUpdate(self::$OPERATION_UPDATE);
        });

        static::deleted(function ($model) {
            $model->syncFbRemove();
        });

        if (method_exists(__CLASS__, 'pivotAttached')) {
            static::pivotAttached(function ($model, $relationName, $pivotIds, $pivotIdsAttribute) {
                $model->syncPivotAttached($model, $relationName, $pivotIds, $pivotIdsAttribute);
            });
        }

        if (method_exists(__CLASS__, 'pivotDetached')) {
            static::pivotDetached(function ($model, $relationName, $pivotIds) {
                $model->syncPivotDetached($model, $relationName, $pivotIds);
            });
        }
    }

    protected function syncFbCreate()
    {
        $this->syncFbSet();
    }

    protected function syncFbSet($operation = null)
    {
        $data = $this->toArray();
        $this->setTimestamps($data, $operation);
        $this->getModelReference()->update($this->toArray());
    }

    private function setTimestamps($data, $operation = null)
    {
        if ($operation == self::$OPERATION_CREATE) {
            $data['created_at'] = ['.sv' => 'timestamp'];
            $data['updated_at'] = ['.sv' => 'timestamp'];
        }

        if ($operation == self::$OPERATION_UPDATE) {
            if (isset($data['updated_at'])) {
                unset($data['updated_at']);
            }
            $data['updated_at'] = ['.sv' => 'timestamp'];
        }
    }

    /**
     * @return Reference
     */
    protected function getModelReference(): Reference
    {
        $path = $this->getTable() . '/' . $this->getKey();
        return $this->getFirebaseDatabase()->getReference($path);
    }

    /**
     * @return Database
     */
    protected function getFirebaseDatabase(): Database
    {
        $firebase = app(Firebase::class);
        return $firebase->getDatabase();
    }

    protected function syncFbUpdate()
    {
        $this->syncFbSet();
    }

    protected function syncFbRemove()
    {
        $this->getModelReference()->remove();
    }

    /**
     * @param $model
     * @param $relationName
     * @param $pivotIds
     * @param $pivotIdsAttribute
     * @throws Exception
     */
    protected function syncPivotAttached($model, $relationName, $pivotIds, $pivotIdsAttribute)
    {
        throw new Exception('Not Implemented');
    }

    /**
     * @param $model
     * @param $relationName
     * @param $pivotIds
     * @throws Exception
     */
    protected function syncPivotDetached($model, $relationName, $pivotIds)
    {
        throw new Exception('Not Implemented');
    }
}
