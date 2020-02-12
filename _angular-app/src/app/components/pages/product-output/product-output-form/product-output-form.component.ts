import {ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Select2Component} from "ng2-select2";
import {ProductIdFieldService} from "./product-id-field.service";
import fieldsOptions from "./product-output-fields-options";

@Component({
  selector: 'product-output-form',
  templateUrl: './product-output-form.component.html',
  styleUrls: ['./product-output-form.component.css']
})
export class ProductOutputFormComponent implements OnInit {

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
