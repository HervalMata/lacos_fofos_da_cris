import {ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Select2Component} from "ng2-select2";
import {ProductIdFieldService} from "./product-id-field.service";
import fieldsOptions from "./product-input-fields-options";

@Component({
  selector: 'product-input-form',
  templateUrl: './product-input-form.component.html',
  styleUrls: ['./product-input-form.component.css']
})
export class ProductInputFormComponent implements OnInit {

  @Input()
  form: FormGroup;

  @ViewChild(Select2Component, {read: ElementRef})
  select2Element: ElementRef;

  constructor(
    private changeRef: ChangeDetectorRef,
    public productIdField: ProductIdFieldService
  ) {
  }

  get fieldsOptions(): any {
    return fieldsOptions;
  }

  ngOnInit() {
    this.productIdField.make(this.select2Element, this.form.get('product_id'));
  }

  ngOnChanges() {
    this.changeRef.detectChanges();
  }
}
