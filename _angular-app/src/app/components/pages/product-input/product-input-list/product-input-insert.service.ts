import {Injectable} from '@angular/core';
import {NotifyMessageService} from "../../../../services/notify-message.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ProductInputListComponent} from "./product-input-list.component";

@Injectable({
  providedIn: 'root'
})
export class ProductInputInsertService {

  constructor(private notifyMessage: NotifyMessageService) {
  }

  private _productInputListComponent: ProductInputListComponent;

  set productInputListComponent(value: ProductInputListComponent) {
    this._productInputListComponent = value;
  }

  showModalInsert() {
    this._productInputListComponent.productInputNewModal.showModal();
  }

  onInsertSuccess($event: any) {
    console.log($event);
    this.notifyMessage.success('Entrada de estoque cadastrada com sucesso.');
    this._productInputListComponent.getInputs();
  }

  onInsertError($event: HttpErrorResponse) {
    console.log($event);
    this.notifyMessage.error('Erro ao cadastrar a entrada de estoque.')
  }
}
