import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { BlankComponent } from './blank.component';
import { I18nComponent } from './i18n/i18n.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { ActuatorComponent } from './actuator/actuator.component';
import { ApiDocsComponent } from './api-docs/api-docs.component';
import { TodoComponent } from './todo/todo.component';

@NgModule({
  declarations: [
    AppComponent,
    BlankComponent,
    I18nComponent,
    CalculatorComponent,
    ActuatorComponent,
    ApiDocsComponent,
    TodoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    RouterModule.forRoot([
      {
        path: '',
        component: CalculatorComponent
      },
      {
        path: 'blank',
        component: BlankComponent
      },
      {
        path: 'todo',
        component: TodoComponent
      },
      {
        path: 'i18n',
        component: I18nComponent
      },
      {
        path: 'actuator',
        component: ActuatorComponent
      },
      {
        path: 'actuator/:path',
        component: ActuatorComponent
      },
      {
        path: 'api-docs',
        component: ApiDocsComponent
      },
    ], {useHash: false}) // SEO false
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
