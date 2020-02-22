import {Injectable} from '@angular/core';
import {ChatGroupListComponent} from "../../chat-group/chat-group-list/chat-group-list.component";
import {NotifyMessageService} from "../../../../services/notify-message.service";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ChatGroupInsertService {

  constructor(private notifyMessage: NotifyMessageService) {
  }

  private _chatGroupListComponent: ChatGroupListComponent;

  set chatGroupListComponent(value: ChatGroupListComponent) {
    this._chatGroupListComponent = value;
  }

  showModalInsert() {
    this._chatGroupListComponent.chatGroupNewModal.showModal();
  }

  onInsertSuccess($event: any) {
    console.log($event);
    this.notifyMessage.success('Grupo cadastrado com sucesso.');
    this._chatGroupListComponent.getChatGroups();
  }

  onInsertError($event: HttpErrorResponse) {
    console.log($event);
    this.notifyMessage.error('Erro ao cadastrar o grupo.')
  }
}
