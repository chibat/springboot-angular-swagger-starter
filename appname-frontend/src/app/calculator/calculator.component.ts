import {Component, OnInit} from '@angular/core';
import {CalculatorApi} from '../../swagger/api/CalculatorApi';
import {Http} from '@angular/http';

@Component({
  selector: 'app-calculator',
  templateUrl: 'calculator.component.html'
})
export class CalculatorComponent {

  arg1: number;
  arg2: number;
  result: number;

  constructor(private http: Http) {
  }

  add() {
    if (this.arg1 || this.arg2) {
      new CalculatorApi(this.http, window.location.origin, null)
        .add(this.arg1, this.arg2)
        .subscribe(data => this.result = data.result);
    }
  }
}
