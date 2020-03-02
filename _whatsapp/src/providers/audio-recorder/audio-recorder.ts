import { Diagnostic } from '@ionic-native/diagnostic';
import { Injectable } from '@angular/core';
import { Media, MediaObject } from "@ionic-native/media";
import { File } from "@ionic-native/file";
import { Platform, AlertController } from "ionic-angular";
import { StoragePermissionProvider } from '../storage-permission/storage-permission';

const CAN_ACCESS_MICROPHONE = 'can_access_microphone';

export interface AudioPlatformConfig {
  basePath: string;
  name: string;
  mimetype: string;
  fullPath: string;
}

/*
  Generated class for the AudioRecorderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AudioRecorderProvider {

  private recorder: MediaObject;
  private audioPlatformConfig: AudioPlatformConfig;

  constructor(
    // @ts-ignore
    private media: Media,
    private file: File,
    private platform: Platform,
    private storagePermission: StoragePermissionProvider,
    // @ts-ignore
    private diagnostic: Diagnostic,
    private alertCtrl: AlertController
    ) {
    console.log('Hello AudioRecorderProvider Provider');
  }

  startRecorder() {
    const platform = this.platform.is('android') ? 'android' : 'ios';
    this.audioPlatformConfig = this.getAudioPlatformConfig(platform);
    const fullPath = this.audioPlatformConfig.fullPath.replace(/^file::\/\//, '');
    this.recorder = this.media.create(fullPath);
    this.recorder.startRecord();
  }

  async requestPermission() : Promise<boolean> {
    if (!this.storagePermission.camWriteInStorage) {
      const camWriteInStorage = await this.storagePermission.requestPermission();
    }
    if (!this.canAccessMicrophone) {
      await this.platform.ready();
      const resultMicrophoneAuth = await this.diagnostic.requestMicrophoneAuthorization();
      this.canAccessMicrophone = resultMicrophoneAuth === 'GRANTED';
    }

    return this.storagePermission.camWriteInStorage && this.canAccessMicrophone;
  }


  get hasPermission() {
    return this.storagePermission.camWriteInStorage && this.canAccessMicrophone;
  }


  private get canAccessMicrophone() {
    const camWriteInStorage = window.localStorage.getItem(CAN_ACCESS_MICROPHONE);
    return camWriteInStorage === 'true';
  }

  private set canAccessMicrophone(value) {
    window.localStorage.setItem(CAN_ACCESS_MICROPHONE, value ? 'true' : 'false');
  }

  stopRecorder() : Promise<Blob> {
      return new Promise((resolve, reject) => {
        this.recorder.onError.subscribe((error) => console.log(error));
        this.recorder.startRecord();
        const mimetype = this.audioPlatformConfig.mimetype;
        // @ts-ignore
        this.file.readAsArrayBuffer(this.audioPlatformConfig.basePath, this.audioPlatformConfig.name)
           .then(result => {
             const blob = new Blob([new Uint8Array(result)], {type: mimetype});
             resolve(blob);
           }, error => reject(error));
      });
  }

  private getAudioPlatformConfig(platform: 'android' | 'ios') : AudioPlatformConfig {

    const android: AudioPlatformConfig = {
      // @ts-ignore
      basePath: this.file.externalDataDirectory,
      name: 'recording.aac',
      mimetype: 'audio/x-hx-aac-adts',

      get fullPath() {
        return  `${this.basePath}${this.name}`
      }

    };

    const ios: AudioPlatformConfig = {
      // @ts-ignore
      basePath: this.file.tempDirectory,
      name: 'recording.wav',
      mimetype: 'audio/wav',

      get fullPath() {
        return  `${this.basePath}${this.name}`
      }

    };

    return platform == 'android' ? android : ios;
  }

  showAlertToCloseApp() {
    const alert = this.alertCtrl.create({
      title: 'Aviso',
      message: 'Permissões concedidas. É necessário reabrir o App para continuar. Deseja fazer isso agora?',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.startRecorder();
            this.stopRecorder().then(() => {
              this.platform.exitApp();
            });
          }
        },
        {
          text: 'Cancelar'
        }
      ]
    });
    alert.present();
  }
}
