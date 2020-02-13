import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {HttpErrorResponse} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {ProductPhotoHttpService} from "../../../../services/http/product-photo-http.service";

@Component({
  selector: 'product-photo-delete-modal',
  templateUrl: './product-photo-delete-modal.component.html',
  styleUrls: ['./product-photo-delete-modal.component.css']
})
export class ProductPhotoDeleteModalComponent implements OnInit {

  errors: {};

  @ViewChild(ModalComponent)
  modal: ModalComponent;

  @Output()
  onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  productId: number;

  @Input()
  photoId: number;

  constructor(
    private route: ActivatedRoute,
    private productPhotoHttp: ProductPhotoHttpService,
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.productId = params.product;
    });
  }

  destroy() {
    this.productPhotoHttp.destroy(this.productId, this.photoId)
      .subscribe((data) => {
          this.onSuccess.emit(data);
          this.modal.hide();
        },
        (responseError) => {
          if (responseError.status === 422) {
            this.errors = responseError.error.errors
          }
          this.onError.emit(responseError)
        });
  }

  hideModal() {
    this.modal.hide();
  }

  showModal() {
    this.modal.show();
  }

  showErrors() {
    return Object.keys(this.errors).length != 0;
  }

}
