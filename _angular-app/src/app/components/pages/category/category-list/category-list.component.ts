import {Component, OnInit, ViewChild} from '@angular/core';
import {CategoryNewModalComponent} from "../category-new-modal/category-new-modal.component";
import {CategoryEditModalComponent} from "../category-edit-modal/category-edit-modal.component";
import {CategoryDeleteModalComponent} from "../category-delete-modal/category-delete-modal.component";
import {Category} from "../../../../model";
import {CategoryHttpService} from "../../../../services/http/category-http.service";
import {NotifyMessageService} from "../../../../services/notify-message.service";
import {CategoryInsertService} from "./category-insert.service";
import {CategoryEditService} from "./category-edit.service";
import {CategoryDeleteService} from "./category-delete.service";


declare let $;

@Component({
  selector: 'category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: Array<Category> = [];

  pagination = {
    page: 1,
    totalItems: 0,
    itemsPerPage: 10
  }

  category = {
    name: ''
  };

  @ViewChild(CategoryNewModalComponent)
  categoryNewModal: CategoryNewModalComponent;

  @ViewChild(CategoryEditModalComponent)
  categoryEditModal: CategoryEditModalComponent;

  @ViewChild(CategoryDeleteModalComponent)
  categoryDeleteModal: CategoryDeleteModalComponent;

  categoryId: number;

  constructor(
    public categoryHttp: CategoryHttpService,
    protected categoryInsertService: CategoryInsertService,
    protected categoryEditService: CategoryEditService,
    protected categoryDeleteService: CategoryDeleteService,
  ) {
    this.categoryInsertService.categoryListComponent = this;
    this.categoryEditService.categoryListComponent = this;
    this.categoryDeleteService.categoryListComponent = this;
  }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.categoryHttp.list(this.pagination.page)
      .subscribe((response) => {
        this.categories = response.data;
        this.pagination.totalItems = response.meta.total;
        this.pagination.totalItems = response.meta.per_page;
      });
  }

  pageChanged(page) {
    this.pagination.page = page;
    this.getCategories();
  }
}
