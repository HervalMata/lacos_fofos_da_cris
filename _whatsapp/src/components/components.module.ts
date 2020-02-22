import {NgModule} from '@angular/core';
import {ChatGroupListComponent} from './chat-group-list/chat-group-list';
import {IonicModule} from "ionic-angular";

@NgModule({
  declarations: [ChatGroupListComponent],
  imports: [
    IonicModule
  ],
  exports: [ChatGroupListComponent]
})
export class ComponentsModule {
}
