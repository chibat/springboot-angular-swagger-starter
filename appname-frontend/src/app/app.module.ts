import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BASE_PATH } from '../swagger/variables';
import { CalculatorService } from '../swagger/api/calculator.service';

import {
  MatSidenavModule,
  MatInputModule,
  MatIconModule,
  MatToolbarModule,
  MatListModule,
  MatRadioModule,
  MatFormFieldModule,
  MatSelectModule,
  MatOptionModule,
  MatButtonModule,
} from '@angular/material';

import { AppComponent } from './app.component';
import { BlankComponent } from './blank.component';
import { I18nComponent } from './i18n/i18n.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { ActuatorComponent } from './actuator/actuator.component';

@NgModule({
  declarations: [
    AppComponent,
    BlankComponent,
    I18nComponent,
    CalculatorComponent,
    ActuatorComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    MatListModule,
    MatRadioModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
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
    ], {useHash: false}) // SEO false
  ],
  providers: [ CalculatorService, {provide: BASE_PATH, useValue: window.location.origin}],
  bootstrap: [AppComponent]
})
export class AppModule { }
