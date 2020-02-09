import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category, ProductCategory} from "../../../../model";
import {HttpErrorResponse} from "@angular/common/http";
import {ProductCategoryHttpService} from "../../../../services/http/product-category-http.service";
import {CategoryHttpService} from "../../../../services/http/category-http.service";

@Component({
  selector: 'product-category-new-modal',
  templateUrl: './product-category-new-modal.component.html',
  styleUrls: ['./product-category-new-modal.component.css']
})
export class ProductCategoryNewModalComponent implements OnInit {

  categories: Category[] = [];
  categoriesId: number[] = [];

  @Input()
  productId: number;

  @Input()
  productCategory: ProductCategory = null;

  @Output()
  onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  constructor(
    private productCategoryHttp: ProductCategoryHttpService,
    private categoryHttp: CategoryHttpService
  ) { }

  ngOnInit() {
    this.getCategories();
  }

  change($event) {
    console.log(this.categoriesId);
  }

  getCategories() {
    this.categoryHttp.list({all: 1})
      .subscribe((response) => {
        this.categories = response.data;
      });
  }

  submit() {
    const categoriesId = this.mergeCategories();
    this.productCategoryHttp.create(this.productId, categoriesId)
      .subscribe(productCategory => this.onSuccess.emit(productCategory),
          error => this.onError.emit(error));
    return false;
  }

  private mergeCategories(): number[] {
    const categoriesId = this.productCategory.categories.map((category) => category.id);
    const newCategoriesId = this.categoriesId.filter((category) => {
      return categoriesId.indexOf(category) == -1;
    });
    return categoriesId.concat(newCategoriesId);
  }

}
