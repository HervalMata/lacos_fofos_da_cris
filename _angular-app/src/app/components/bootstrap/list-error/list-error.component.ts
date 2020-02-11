import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'list-error',
  templateUrl: './list-error.component.html',
  styleUrls: ['./list-error.component.css']
})
export class ListErrorComponent implements OnInit {

  @Input()
  errors = {};

  constructor() {
  }

  get errorsKey() {
    return Object.keys(this.errors);
  }

  ngOnInit() {
  }
}
