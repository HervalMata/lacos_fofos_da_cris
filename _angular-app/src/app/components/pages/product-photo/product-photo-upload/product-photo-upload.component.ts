import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductPhotoHttpService} from "../../../../services/http/product-photo-http.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'product-photo-upload',
  templateUrl: './product-photo-upload.component.html',
  styleUrls: ['./product-photo-upload.component.css']
})
export class ProductPhotoUploadComponent implements OnInit {

  errors: {};

  @Output()
  onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  productId: number;

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

  uploadPhotos(files: FileList) {
    if (!files.length) {
      return;
    }
    this.productPhotoHttp.create(this.productId, files)
      .subscribe((data) => this.onSuccess.emit(data),
        (responseError) => {
          if (responseError.status === 422) {
            this.errors = responseError.error.errors
          }
          this.onError.emit(responseError)
        });
  }

  showErrors() {
    return Object.keys(this.errors).length != 0;
  }
}
