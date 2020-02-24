import {NgModule} from '@angular/core';
import {ChatGroupListComponent} from './chat-group-list/chat-group-list';
import {IonicModule} from "ionic-angular";
import {ChatAvatarComponent} from '../pages/chat-messages/chat-avatar/chat-avatar';
import {ChatFooterComponent} from '../pages/chat-messages/chat-footer/chat-footer';
import {ChatContentRightComponent} from '../pages/chat-messages/chat-content-right/chat-content-right';
import {ChatContentLeftComponent} from '../pages/chat-messages/chat-content-left/chat-content-left';
import {ChatContentDetailComponent} from '../pages/chat-messages/chat-content-detail/chat-content-detail';

@NgModule({
  declarations: [ChatGroupListComponent,
    ChatAvatarComponent,
    ChatFooterComponent,
    ChatContentRightComponent,
    ChatContentLeftComponent,
    ChatContentDetailComponent],
  imports: [
    IonicModule
  ],
  exports: [ChatGroupListComponent,
    ChatAvatarComponent,
    ChatFooterComponent,
    ChatContentRightComponent,
    ChatContentLeftComponent,
    ChatContentDetailComponent]
})
export class ComponentsModule {
}
