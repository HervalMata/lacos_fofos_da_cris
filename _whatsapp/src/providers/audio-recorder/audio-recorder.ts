import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Media, MediaObject } from "@ionic-native/media";
import { File } from "@ionic-native/file";
import { Platform } from "ionic-angular";

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
    private media: Media,
    private file: File,
    private platform: Platform
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

  stopRecorder() : Promise<Blob> {
      return new Promise((resolve, reject) => {
        this.recorder.onError.subscribe((error) => console.log(error));
        this.recorder.startRecord();
        const mimetype = this.audioPlatformConfig.mimetype;
        this.file.readAsArrayBuffer(this.audioPlatformConfig.basePath, this.audioPlatformConfig.name)
           .then(result => {
             const blob = new Blob([new Uint8Array(result)], {type: mimetype});
             resolve(blob);
           }, error => reject(error));
      });
  }

  private getAudioPlatformConfig(platform: 'android' | 'ios') : AudioPlatformConfig {
    const android: AudioPlatformConfig = {
      basePath: this.file.externalDataDirectory,
      name: 'recording.aac',
      mimetype: 'audio/x-hx-aac-adts',

      get fullPath() {
        return  `${this.basePath}${this.name}`
      }

    };

    const ios: AudioPlatformConfig = {
      basePath: this.file.tempDirectory,
      name: 'recording.wav',
      mimetype: 'audio/wav',

      get fullPath() {
        return  `${this.basePath}${this.name}`
      }

    };

    return platform == 'android' ? android : ios;
  }

}
