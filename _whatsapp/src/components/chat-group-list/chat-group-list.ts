import {Component} from '@angular/core';
import {FirebaseAuthProvider} from '../../providers/firebase-auth/firebase-auth';
import {ChatGroup} from "../../../../_angular-app/src/app/model";
import { ChatGroupFbProvider } from 'providers/firebase-auth/chat-group-fb';
import { ChatMessage } from 'app/model';

/**
 * Generated class for the ChatGroupListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'chat-group-list',
  templateUrl: 'chat-group-list.html'
})
export class ChatGroupListComponent {

  groups: ChatGroup[] = [];

  constructor(
    private firebaseAuth: FirebaseAuthProvider,
    private chatGroupFb: ChatGroupFbProvider
    ) {
  }

  ngOnInit() {
    this.chatGroupFb.list().subscribe((groups) => console.log(groups));
    this.chatGroupFb.onAdded().subscribe((group) => {
      this.groups.unshift(group);
    });
    this.chatGroupFb.onChanged().subscribe((group) => {
      const index = this.groups.findIndex((g) => g.id == group.id);
      if (index !== -1) {
        this.groups[index] = group;
      }
      this.groups.splice(index, 1);
      this.groups.unshift(group);
    });
    /* const database = this.firebaseAuth.firebase.database();
    database.ref('chat_groups').on('child_added', (data) => {
      const group = data.val() as ChatGroup;
      this.groups.push(group);
    });

    database.ref('chat_groups').on('child_changed', (data) => {
      const group = data.val() as ChatGroup;
      const index = this.groups.findIndex((g) => g.id == group.id);

      if (index !== -1) {
        this.groups[index] = group;
      }
    });

    database.ref('chat_groups').on('child_removed', (data) => {
      const group = data.val() as ChatGroup;
      const index = this.groups.findIndex((g) => g.id == group.id);

      if (index !== -1) {
        this.groups.slice(index, 1);
      }
    });*/
  }

  formatTextMessage(message: ChatMessage) {
    return message.content.length > 20 ? message.content.slice(0, 20) + '...' : message.content;
  }
}
