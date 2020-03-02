import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Content, InfiniteScroll} from 'ionic-angular';
import { ChatMessage, ChatGroup } from '../../../app/model';
import { ChatMessageFbProvider } from '../../../providers/firebase-auth/chat-message-fb';
import { IsCurrentUserPipe } from '../../../pipes/is-current-user/is-current-user';

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

  messages: {key: string, value: ChatMessage}[] = [];
  chatGroup: ChatGroup;
  limit = 20;
  canMoreMessages = true;
  countNewMessages = 0;
  showContent = false;

  @ViewChild(Content)
  content: Content;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private chatMessageFb: ChatMessageFbProvider,
    private isCurrentUser: IsCurrentUserPipe
  ) {
    this.chatGroup = this.navParams.get('chat_group');
  }

  ionViewDidLoad() {
    this.chatMessageFb.latest(this.chatGroup, this.limit)
      .subscribe((messages) => {
        // @ts-ignore
        this.messages = messages;
        setTimeout(() => {
          this.scrollToBottom();
          this.showContent = true;
        }, 500);

      });

      this.chatMessageFb.onAdded(this.chatGroup)
      .subscribe(message => {
        // @ts-ignore
        this.messages.push(message);
        if (this.isCurrentUser.transform(message.value.user_id)) {
          return;
        }
        this.countNewMessages++;
      })
    }

  scrollToBottom() {
    this.countNewMessages = 0;
    this.content.scrollToBottom(0);
  }

  showButtonScrollBottom() {
    const dimensions = this.content.getContentDimensions();
    const contentHeight = dimensions.contentHeight;
    const scrollTop = dimensions.scrollTop;
    const scrollHeight = dimensions.scrollHeight;

    return scrollHeight > scrollTop + contentHeight;
  }

    doInfinite(infiniteScroll: InfiniteScroll) {
      // @ts-ignore
      this.chatMessageFb.oldest(this.chatGroup, this.limit, messages[0].key)
        .subscribe((messages) => {
          // @ts-ignore
          if (!messages.length) {
            this.canMoreMessages = false;
          }
          // @ts-ignore
          this.messages.unshift(...messages);
          infiniteScroll.complete();
        }, () => infiniteScroll.complete());
    }
}
