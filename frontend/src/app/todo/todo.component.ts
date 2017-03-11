import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-todo',
  encapsulation: ViewEncapsulation.None,
  template: `
  <h2>Todo</h2>
  <md-list>
  <md-list-item >
    <span *ngIf="flag">
      <md-checkbox></md-checkbox>
      <span style="width: 100%;" (dblclick)="edit()" [style.text-decoration]="foo">{{text}}</span>
    </span>
    <md-input-container *ngIf="!flag" style="width: 100%;">
      <input #input mdInput [(ngModel)]="text" (mouseover)="input.focus()" (blur)="blur()" (keyup.enter)="enter($event, input)" style="width: 100%;">
    </md-input-container>
  </md-list-item>
  </md-list>
  `,
  styles: ['.mat-input-wrapper: 100%']
})
export class TodoComponent implements OnInit {

  flag = true;
  text = 'aaa';

  foo = 'line-through';

  constructor() { }

  ngOnInit() {
  }

  edit() {
    this.flag = false;
    // el.focus();
  }

  blur() {
    console.info("blur");
    this.flag = true;
    // update
  }

  enter(e, el) {
    console.info("enter");
    el.blur();
  }
}
