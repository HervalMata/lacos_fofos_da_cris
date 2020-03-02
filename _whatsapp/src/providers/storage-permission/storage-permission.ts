
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Diagnostic } from '@ionic-native/diagnostic';

const CAN_WRITE_IN_STORAGE = 'can_write_in_storage';

/*
  Generated class for the StoragePermissionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StoragePermissionProvider {

  constructor(
    // @ts-ignore
    public diagnostic: Diagnostic,
    private platform: Platform
    ) {
    console.log('Hello StoragePermissionProvider Provider');
  }

  requestPermission()  : Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      if (this.platform.is('android') && !this.camWriteInStorage) {
        this.platform.ready()
          .then(() => {
            this.diagnostic.requestExternalStorageAuthorization()
              .then((result) => {
                this.camWriteInStorage = result === 'GRANTED';
                resolve(this.camWriteInStorage);
              });
          });
      } else {
        this.camWriteInStorage = true;
        resolve(this.camWriteInStorage);
      }
    });

  }


  get camWriteInStorage() {
    const camWriteInStorage = window.localStorage.getItem(CAN_WRITE_IN_STORAGE);
    return camWriteInStorage === 'true';
  }

  set camWriteInStorage(value) {
    window.localStorage.setItem(CAN_WRITE_IN_STORAGE, value ? 'true' : 'false');
  }
}
