import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import fieldsOptions from "./user-fields-options";

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

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
