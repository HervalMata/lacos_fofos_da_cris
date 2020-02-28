import {Component, ViewChild} from '@angular/core';
import {ChatMessageHttpProvider} from "../../../providers/chat-message-http/chat-message-http";
import {TextInput, ItemSliding} from "ionic-angular";
import { Timer } from 'easytimer.js/dist/easytimer.min';
import { AudioRecorderProvider } from '../../../providers/audio-recorder/audio-recorder';
import { Subject } from "rxjs";
import { debounceTime } from "rsjx/operators";

/**
 * Generated class for the ChatFooterComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
let component = Component({
  selector: 'chat-footer',
  templateUrl: 'chat-footer.html'
});
@component
export class ChatFooterComponent {

  text: string = '';
  messageType = 'text';
  timer = new Timer();
  recording = false;

  @ViewChild('inputFileImage')
  inputFileImage: TextInput;

  @ViewChild('itemSliding')
  iitemSliding: ItemSliding;

  subjectReleaseAudioButton = new Subject();

  constructor(
    private audioRecorder: AudioRecorderProvider,
    private chatMessageHttp: ChatMessageHttpProvider) {}

  ngOnInit() {
    this.onStopRecording();
  }
  onStopRecording() {
    this.subjectReleaseAudioButton
      .pipe(
        debounceTime(500)
      )
      .subscribe(() => {
        if (!this.recording) {
          return;
        }

        if (this.iitemSliding.getSlidingPercent() === 0) {
          this.clearRecording();
          this.audioRecorder.stopRecorder()
            .then(
              (blob) => this.sendMessageAudio(blob),
              error => console.log(error)
            );
        }
      });
  }

  sendMessageAudio(blob: Blob): any {
    this.sendMessage({content: blob, type: 'audio'});
  }

  sendMessage(data: {content, type}) {
    this.chatMessageHttp.create(1, data)
      .subscribe(() => {
        console.log('enviou');
      })
  }

  sendMessageText() {
    this.sendMessage({content: this.text, type: 'text'});
  }

  sendMessageImage(files: FileList) {
    if (!files.length) {
      return;
    }
    this.sendMessage({content: files[0], type: 'image'});
  }

  selectImage() {
    const nativeElement = this.inputFileImage.getElementRef().nativeElement;
    const inputFile = nativeElement.querySelector('input');
    inputFile.click();
  }

  getIconSendMessage() {
    if (this.messageType === 'text') {
      return this.text === '' ? 'mic' : 'send';
    }
  }

  holdAudioButton() {
      this.recording = true;
      this.audioRecorder.startRecorder();

      this.timer.start({precision: 'seconds'});
      this.timer.addEventListener('secondsUpdated', (s) => {
        const timer = this.getMinuteSeconds();
        this.text = `${timer} Gravando...`;
      })
  }

  private getMinuteSeconds() {
    return this.timer.getTimeValues().toString().substring(3);
  }

  releaseAudioButton() {
      this.subjectReleaseAudioButton.next();

  }

  onDrag() {
    console.log(this.iitemSliding.getSlidingPercent());
    if (this.iitemSliding.getSlidingPercent() > 0.9) {
      this.iitemSliding.close();
      this.audioRecorder.stopRecorder()
        .then(
          (blob) => console.log('stop recording'),
          error => console.log(error)
        );
    }
  }

  clearRecording() {
    this.timer.stop();
    this.text = '';
    this.recording = false;
  }
}
