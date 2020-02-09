import { Injectable } from '@angular/core';
import {UserListComponent} from "../../user/user-list/user-list.component";
import {NotifyMessageService} from "../../../../services/notify-message.service";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserEditService {

  private _userListComponent: UserListComponent;

  constructor(private notifyMessage: NotifyMessageService) { }

  set userListComponent(value: UserListComponent) {
    this._userListComponent = value;
  }

  showModalEdit(userId: number) {
    this._userListComponent.userId = userId;
    this._userListComponent.userEditModal.showModal();
  }

  onEditSuccess($event: any) {
    console.log($event);
    this.notifyMessage.success('Usuário atualizado com sucesso.');
    this._userListComponent.getUsers();
  }

  onEditError($event: HttpErrorResponse) {
    console.log($event);
    this.notifyMessage.error('Erro ao atualizar o usuário.')
  }
}
