import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import fieldsOptions from "./product-fields-options";

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  @Input()
  form: FormGroup;

  constructor(private changeRef: ChangeDetectorRef) {
  }

  get fieldOptions(): any {
    return fieldsOptions;
  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.changeRef.detectChanges();
  }

}
