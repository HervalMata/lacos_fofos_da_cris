import {Component, OnInit, ViewChild} from '@angular/core';
import {Product} from "../../../../model";
import {ProductNewModalComponent} from "../../product/product-new-modal/product-new-modal.component";
import {ProductEditModalComponent} from "../../product/product-edit-modal/product-edit-modal.component";
import {ProductDeleteModalComponent} from "../../product/product-delete-modal/product-delete-modal.component";
import {ProductHttpService} from "../../../../services/http/product-http.service";
import {ProductInsertService} from "../../product/product-list/product-insert.service";
import {ProductEditService} from "../../product/product-list/product-edit.service";
import {ProductDeleteService} from "../../product/product-list/product-delete.service";
import {ProductViewModalComponent} from "../product-view-modal/product-view-modal.component";
import {ProductViewService} from "./product-view.service";

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Array<Product> = [];

  pagination = {
    page: 1,
    totalItems: 0,
    itemsPerPage: 10
  };

  product = {
    name: ''
  };

  @ViewChild(ProductNewModalComponent)
  productNewModal: ProductNewModalComponent;

  @ViewChild(ProductEditModalComponent)
  productEditModal: ProductEditModalComponent;

  @ViewChild(ProductDeleteModalComponent)
  productDeleteModal: ProductDeleteModalComponent;

  @ViewChild(ProductViewModalComponent)
  productViewModal: ProductViewModalComponent;

  productId: number;

  constructor(
    public productHttp: ProductHttpService,
    protected productInsertService: ProductInsertService,
    protected productEditService: ProductEditService,
    protected productDeleteService: ProductDeleteService,
    protected productViewService: ProductViewService
  ) {
    this.productInsertService.productListComponent = this;
    this.productEditService.productListComponent = this;
    this.productDeleteService.productListComponent = this;
    this.productViewService.productListComponent = this;
  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productHttp.list(this.pagination.page)
      .subscribe((response) => {
        this.products = response.data;
        this.pagination.totalItems = response.meta.total;
        this.pagination.totalItems = response.meta.per_page;
      });
  }

  pageChanged(page) {
    this.pagination.page = page;
    this.getProducts();
  }

}
