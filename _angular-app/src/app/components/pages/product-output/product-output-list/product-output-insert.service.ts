import {Injectable} from '@angular/core';
import {NotifyMessageService} from "../../../../services/notify-message.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ProductOutputListComponent} from "./product-output-list.component";

@Injectable({
  providedIn: 'root'
})
export class ProductOutputInsertService {

  constructor(private notifyMessage: NotifyMessageService) {
  }

  private _productOutputListComponent: ProductOutputListComponent;

  set productOutputListComponent(value: ProductOutputListComponent) {
    this._productOutputListComponent = value;
  }

  showModalInsert() {
    this._productOutputListComponent.productOutputNewModal.showModal();
  }

  onInsertSuccess($event: any) {
    console.log($event);
    this.notifyMessage.success('Saida de estoque cadastrada com sucesso.');
    this._productOutputListComponent.getOutputs();
  }

  onInsertError($event: HttpErrorResponse) {
    console.log($event);
    this.notifyMessage.error('Erro ao cadastrar a saida de estoque.')
  }
}
