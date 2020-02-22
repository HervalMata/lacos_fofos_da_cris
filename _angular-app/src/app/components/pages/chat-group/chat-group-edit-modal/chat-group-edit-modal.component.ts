import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {HttpErrorResponse} from "@angular/common/http";
import {ChatGroupHttpService} from "../../../../services/http/chat-group-http.service";
import fieldsOptions from "../../product/product-form/product-fields-options";

@Component({
  selector: 'chat-group-edit-modal',
  templateUrl: './chat-group-edit-modal.component.html',
  styleUrls: ['./chat-group-edit-modal.component.css']
})
export class ChatGroupEditModalComponent implements OnInit {

  form: FormGroup;
  errors = {};
  @ViewChild(ModalComponent)
  modal: ModalComponent;
  @Output()
  onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  constructor(
    private chatGroupHttp: ChatGroupHttpService,
    private formBuilder: FormBuilder
  ) {
    const maxlength = fieldsOptions.name.validationMessage.maxlength;
    const minlength = fieldsOptions.price.validationMessage.minlength;
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(maxlength), Validators.minLength(minlength)]],
      photo: ['', [Validators.required]]
    });
  }

  @Input()
  _chatGroupId: number;

  @Input()
  set chatGroupId(value) {
    this._chatGroupId = value;
    if (this._chatGroupId) {
      this.chatGroupHttp.get(this._chatGroupId)
        .subscribe((chatGroup) => this.form.patchValue(chatGroup),
          responseError => {
            if (responseError.status == 401) {
              this.modal.hide();
            }
          });
    }
  }

  ngOnInit() {
  }

  submit() {
    this.chatGroupHttp.update(this._chatGroupId, this.form.value)
      .subscribe((chatGroup) => {
        console.log(chatGroup);
        this.onSuccess.emit(chatGroup);
        this.modal.hide();
      }, responseError => {
        if (responseError.status === 422) {
          this.errors = responseError.error.errors
        }
        this.onError.emit(responseError)
      });
  }

  showModal() {
    this.modal.show();
  }

  hideModal($event: Event) {
    console.log($event);
  }

  showErrors() {
    return Object.keys(this.errors).length != 0;
  }

}
