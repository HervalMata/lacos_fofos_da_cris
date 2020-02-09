import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {CategoryNewModalComponent} from "../category-new-modal/category-new-modal.component";
import {CategoryEditModalComponent} from "../category-edit-modal/category-edit-modal.component";
import {CategoryDeleteModalComponent} from "../category-delete-modal/category-delete-modal.component";
import {Category} from "../../../../model";
import {CategoryHttpService} from "../../../../services/http/category-http.service";
import {NotifyMessageService} from "../../../../services/notify-message.service";


declare let $;

@Component({
  selector: 'category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: Array<Category> = [];

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
    private notifyMessage: NotifyMessageService
  ) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.categoryHttp.list()
      .subscribe((response) => this.categories = response.data);
  }

  showModalInsert() {
    this.categoryNewModal.showModal();
  }

  showModalEdit(categoryId: number) {
    this.categoryId = categoryId;
    this.categoryEditModal.showModal();
  }

  showModalDelete(categoryId: number) {
    this.categoryId = categoryId;
    this.categoryDeleteModal.showModal();
  }

  onInsertSuccess($event: any) {
    console.log($event);
    this.notifyMessage.success('Categoria cadastrada com sucesso.');
    this.getCategories();
  }

  onInsertError($event: HttpErrorResponse) {
    console.log($event);
    this.notifyMessage.error('Erro ao cadastrar a categoria.')
  }

  onEditSuccess($event: any) {
    console.log($event);
    this.notifyMessage.success('Categoria atualizada com sucesso.');
    this.getCategories();
  }

  onEditError($event: HttpErrorResponse) {
    console.log($event);
    this.notifyMessage.error('Erro ao atualizar a categoria.')
  }

  onDeleteSuccess($event: any) {
    console.log($event);
    this.notifyMessage.success('Categoria excluída com sucesso.');
    this.getCategories();
  }

  onDeleteError($event: HttpErrorResponse) {
    console.log($event);
    this.notifyMessage.error('Não foi possível excluir a categoria.' +
      ' Verifique se a mesma não está relacionada com produtos.')
  }
}
