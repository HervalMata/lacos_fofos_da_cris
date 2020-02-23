import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ChatGroup, User} from "../../../../model";
import {HttpErrorResponse} from "@angular/common/http";
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {ChatGroupHttpService} from "../../../../services/http/chat-group-http.service";
import {ChatGroupUserHttpService} from "../../../../services/http/chat-group-user-http.service";
import {UserHttpService} from "../../../../services/http/user-http.service";

@Component({
  selector: 'chat-group-user-delete-modal',
  templateUrl: './chat-group-user-delete-modal.component.html',
  styleUrls: ['./chat-group-user-delete-modal.component.css']
})
export class ChatGroupUserDeleteModalComponent implements OnInit {

  chatGroup: ChatGroup;
  user: User;
  @Output()
  onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();
  @ViewChild(ModalComponent)
  modal: ModalComponent;

  constructor(
    private chatGroupHttp: ChatGroupHttpService,
    private chatGroupUserHttp: ChatGroupUserHttpService,
    private userHttp: UserHttpService
  ) {
  }

  _chatGroupId: number;

  @Input()
  set chatGroupId(value) {
    this._chatGroupId = value;
    if (this._chatGroupId) {
      this.chatGroupHttp.get(this._chatGroupId)
        .subscribe((chatGroup) => this.chatGroup = chatGroup);
    }
  }

  _userId: number;

  @Input()
  set userId(value) {
    this._userId = value;
    if (this._userId) {
      this.userHttp.get(this._userId)
        .subscribe((user) => this.user = user);
    }
  }

  ngOnInit() {
  }

  destroy() {
    this.chatGroupUserHttp.destroy(this._chatGroupId, this._userId)
      .subscribe((chatGroup) => {
        console.log(chatGroup);
        this.onSuccess.emit(chatGroup);
        this.modal.hide();
      }, error => this.onError.emit(error));
  }

  showModal() {
    this.modal.show();
  }

  hideModal($event: Event) {
    console.log($event);
  }

}
