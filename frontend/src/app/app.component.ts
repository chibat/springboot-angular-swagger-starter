import { Component, Input } from '@angular/core';
import { CalculatorComponent } from './calculator/calculator.component'
import { I18nComponent } from './i18n/i18n.component'

@Component({
  selector: 'app-root',
  template: `
  <h1>Type safe communication</h1>
  <app-calculator></app-calculator>
  <h1>Type safe i18n</h1>
  <app-i18n></app-i18n>
  `
})
export class AppComponent {
}
