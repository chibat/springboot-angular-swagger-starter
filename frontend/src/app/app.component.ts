import { Component, Input } from '@angular/core';
import {ApplicationApi} from '../swagger/api/ApplicationApi'
import {Http} from '@angular/http';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  template: `
  <h1>
    <input type="number" [(ngModel)]="arg1" /> +
    <input type="number" [(ngModel)]="arg2" />
    <button (click)="add()">add</button>
    {{result}}
  </h1>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  arg1: number;
  arg2: number;
  result: number;
  constructor(private http: Http) {
  }
  add() {
    if (this.arg1 || this.arg2) {
      new ApplicationApi(this.http, environment.basePath)
        .addUsingGET(this.arg1, this.arg2)
        .subscribe(data=>this.result = data.result);
    }
  }
}
