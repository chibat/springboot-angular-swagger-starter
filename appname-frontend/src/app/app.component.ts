import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None,
  template: `
  <md-sidenav-container class="example-container">
    <md-toolbar color="primary">
    <button md-mini-fab (click)="sidenav.toggle()">
      <md-icon>menu</md-icon>
    </button>
    <span style="margin-left: 5px;">Spring Boot + Angular + Swagger Starter</span>
    </md-toolbar>
    <md-sidenav #sidenav mode="over" opened="false" #sidenav class="example-sidenav">
      <md-list>
        <md-list-item>
          <button md-button routerLink="" routerLinkActive="active" (click)="sidenav.toggle()">Type safe communication</button>
        </md-list-item>
        <md-list-item>
          <button md-button routerLink="i18n" routerLinkActive="active" (click)="sidenav.toggle()">Type safe i18n</button>
        </md-list-item>
        <md-list-item>
          <button md-button routerLink="actuator" routerLinkActive="active" (click)="sidenav.toggle()">Actuator</button>
        </md-list-item>
      </md-list>
    </md-sidenav>
    <div class="example-sidenav-content">
    <router-outlet></router-outlet>
    </div>
  </md-sidenav-container>
  `,
  styles: [`
    .example-container {
      height: 100%;
    }
    .example-sidenav-content {
      margin: 8px;
    }
    .example-sidenav {
      background: #3f51b5;
    }
    .mat-list .mat-list-item {
      color: #ffffff
    }
  `]
})
export class AppComponent {
}
