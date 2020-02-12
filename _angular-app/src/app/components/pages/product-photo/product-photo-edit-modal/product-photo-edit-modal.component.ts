import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {ProductPhotoHttpService} from "../../../../services/http/product-photo-http.service";
import {ModalComponent} from "../../../bootstrap/modal/modal.component";

@Component({
  selector: 'product-photo-edit-modal',
  templateUrl: './product-photo-edit-modal.component.html',
  styleUrls: ['./product-photo-edit-modal.component.css']
})
export class ProductPhotoEditModalComponent implements OnInit {

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

  editPhoto(files: FileList) {
    if (!files.length) {
      return;
    }
    this.productPhotoHttp.update(this.productId, this.photoId, files[0])
      .subscribe((data) => this.onSuccess.emit(data),
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
