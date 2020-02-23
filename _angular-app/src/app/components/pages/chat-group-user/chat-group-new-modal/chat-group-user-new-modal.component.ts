import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {Select2Component} from "ng2-select2";
import {ChatGroupUserHttpService} from "../../../../services/http/chat-group-user-http.service";
import {AuthService} from "../../../../services/auth.service";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'chat-group-user-new-modal',
  templateUrl: './chat-group-user-new-modal.component.html',
  styleUrls: ['./chat-group-user-new-modal.component.css']
})
export class ChatGroupUserNewModalComponent implements OnInit {

  @Input()
  chatGroupId: number;
  usersId: number[];
  select2Options = {
    data: null,
    options: {}
  };

  @ViewChild(Select2Component)
  select2Element: ElementRef;

  @Output()
  onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  constructor(
    private chatGroupUserHttp: ChatGroupUserHttpService,
    private authService: AuthService
  ) {
  }

  get select2Native(): HTMLElement {
    return this.select2Element.nativeElement;
  }

  ngOnInit() {
    this.prepareSelect2();
  }

  submit() {
    this.chatGroupUserHttp.create(this.chatGroupId, this.usersId)
      .subscribe((response) => {
          this.resetSelect2();
          this.onSuccess.emit(response);
        }, error => this.onError.emit(error)
      );
  }

  prepareSelect2() {
    this.select2Options.options = {
      minimumInputLength: 1,
      theme: 'bootstrap4',
      multiple: true,
      ajax: {
        headers: {
          'Authorization': this.authService.authorizationHeader
        },
        url: `${environment.api.url}/users?role=customer`,
        data(params) {
          return {
            search: params.term
          }
        },
        proccessResults(data) {
          return {
            results: data.data.map((user) => {
              return {id: user.id, text: user.name}
            })
          }
        }
      }
    };
    this.select2Options.data = [];
  }

  private resetSelect2() {
    const selectField = $(this.select2Native).find('select');
    selectField.val().trigger('change');
    this.usersId = [];
  }
}
