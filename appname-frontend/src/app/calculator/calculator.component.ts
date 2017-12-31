import { Component, OnInit } from '@angular/core';
import { CalculatorService } from '../../swagger/api/calculator.service';
import {Http} from '@angular/http';

@Component({
  selector: 'app-calculator',
  templateUrl: 'calculator.component.html'
})
export class CalculatorComponent {

  arg1: number;
  arg2: number;
  result: number;

  constructor(private  calculatorService: CalculatorService) {
  }

  add() {
    if (this.arg1 || this.arg2) {
      this.calculatorService
        .add(this.arg1, this.arg2)
        .subscribe(data => this.result = data.result);
    }
  }
}
