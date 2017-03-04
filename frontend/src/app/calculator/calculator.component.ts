import {Component, OnInit} from '@angular/core';
import {ApplicationApi} from '../../swagger/api/ApplicationApi';
import {Http} from '@angular/http';

@Component({
  selector: 'app-calculator',
  template: `
  <h2>Type safe communication</h2>
  <div>
    <md-input-container><input mdInput type="number" placeholder="number1" [(ngModel)]="arg1" /></md-input-container> +
    <md-input-container><input  mdInput type="number" placeholder="number2" [(ngModel)]="arg2" /></md-input-container> 
    <button md-mini-fab (click)="add()">=</button>
    {{result}}
  </div>
  `
})
export class CalculatorComponent {

  arg1: number;
  arg2: number;
  result: number;

  constructor(private http: Http) {
  }

  add() {
    if (this.arg1 || this.arg2) {
      new ApplicationApi(this.http, window.location.origin)
        .addUsingGET(this.arg1, this.arg2)
        .subscribe(data => this.result = data.result);
    }
  }
}
