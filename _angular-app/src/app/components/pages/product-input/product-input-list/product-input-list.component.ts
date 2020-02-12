import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductInputs} from "../../../../model";
import {ProductInputNewModalComponent} from "../product-input-new-modal/product-input-new-modal.component";
import {ProductInputHttpService} from "../../../../services/http/product-input-http.service";
import {ProductInputInsertService} from "./product-input-insert.service";

@Component({
  selector: 'product-input-list',
  templateUrl: './product-input-list.component.html',
  styleUrls: ['./product-input-list.component.css']
})
export class ProductInputListComponent implements OnInit {

  products: Array<ProductInputs> = [];

  pagination = {
    page: 1,
    totalItems: 0,
    itemsPerPage: 10
  };

  sortColumn = {column: '', sort: ''};

  @ViewChild(ProductInputNewModalComponent)
  productInputNewModal: ProductInputNewModalComponent;

  productId: number;
  searchText: string;

  constructor(
    public productInputHttp: ProductInputHttpService,
    protected productInputInsertService: ProductInputInsertService,
  ) {
    this.productInputInsertService.productInputListComponent = this;
  }

  ngOnInit() {
    this.getInputs();
  }

  getInputs() {
    this.productInputHttp.list({
      page: this.pagination.page,
      sort: this.sortColumn.column === '' ? null : this.sortColumn,
      search: this.searchText
    })
      .subscribe((response) => {
        this.products = response.data;
        this.pagination.totalItems = response.meta.total;
        this.pagination.itemsPerPage = response.meta.per_page;
      });
  }

  pageChanged(page) {
    this.pagination.page = page;
    this.getInputs();
  }

  sort(sortColumn) {
    this.getInputs();
  }

  search(search) {
    this.searchText = search;
    this.getInputs();
  }

}
