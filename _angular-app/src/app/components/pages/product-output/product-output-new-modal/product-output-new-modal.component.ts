import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {HttpErrorResponse} from "@angular/common/http";
import fieldsOptions from "../../product-input/product-input-form/product-input-fields-options";
import {ProductOutputHttpService} from "../../../../services/http/product-output-http.service";

@Component({
  selector: 'product-output-new-modal',
  templateUrl: './product-output-new-modal.component.html',
  styleUrls: ['./product-output-new-modal.component.css']
})
export class ProductOutputNewModalComponent implements OnInit {

  form: FormGroup;
  errors = {};

  @ViewChild(ModalComponent)
  modal: ModalComponent;

  @Output()
  onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  constructor(
    private productOutputHttp: ProductOutputHttpService,
    private formBuilder: FormBuilder
  ) {
    const min = fieldsOptions.price.validationMessage.min;
    this.form = this.formBuilder.group({
      product_id: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.min(fieldsOptions.amount.validationMessage.min)]],
    });
  }

  ngOnInit() {
  }

  submit() {
    this.productOutputHttp.create(this.form.value)
      .subscribe((productOutput) => {
        this.form.reset({
          product_id: '',
          amount: ''
        });
        console.log(productOutput);
        this.onSuccess.emit(productOutput);
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
