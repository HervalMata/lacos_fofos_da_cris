import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import fieldsOptions from "./chat-group-fields-options";

@Component({
  selector: 'chat-group-form',
  templateUrl: './chat-group-form.component.html',
  styleUrls: ['./chat-group-form.component.css']
})
export class ChatGroupFormComponent implements OnInit {

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

  choosePhoto(files: FileList) {
    if (!files.length) {
      return;
    }
    this.form.get('photo').setValue(files[0]);
  }

}
