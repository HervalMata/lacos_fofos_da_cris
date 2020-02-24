import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {FirebaseAuthProvider} from "../../../providers/firebase-auth/firebase-auth";
import {ChatMessage} from "../../../app/model";
import {Observable} from "rxjs";

/**
 * Generated class for the ChatMessagesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat-messages',
  templateUrl: 'chat-messages.html',
})
export class ChatMessagesPage {

  messages: ChatMessage[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private firebaseAuth: FirebaseAuthProvider
  ) {
  }

  ionViewDidLoad() {
    const database = this.firebaseAuth.firebase.database();
    database.ref('chatgroups/1/messages').on('child_added', (data) => {
      const message = data.val();

      database.ref('users/${message.user_id}').on('value', (data) => {
        message.user = Observable.create((observer) => {
          database.ref('users/${message.user_id}').on('value', (data) => {
            const user = data.val();
            observer.next(user);
          });
        });
        this.messages.push(message);
      })
    });
  }

}
