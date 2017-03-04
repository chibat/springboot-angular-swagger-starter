import { Component, OnInit } from '@angular/core';
import {lang, setLang, messages} from '../messages';
import { Router }   from '@angular/router';

@Component({
  selector: 'app-i18n',
  template: `
  <h2>Type safe i18n</h2>
  <md-radio-group>
  <md-radio-button value="en" (change)="changeEn()" [checked]="en">English</md-radio-button>
  <md-radio-button value="ja" (change)="changeJa()" [checked]="ja">日本語</md-radio-button>
  <div>{{msg.title}}</div>
  </md-radio-group>
  `
})
export class I18nComponent implements OnInit {

  en: boolean;
  ja: boolean;
  msg = messages;

  constructor(/* private router: Router */) {
    console.log('constructor');
  }

  ngOnInit() {
    console.log('ngOnInit');
    if (lang === 'ja') {
      this.ja = true;
    } else {
      this.en = true;
    }
  }

  changeEn() {
    setLang('en');
    location.reload();
    // this.router.navigateByUrl('/dummy', {skipLocationChange: true});
    // this.router.navigate([""]);
  }

  changeJa() {
    setLang('ja');
    location.reload();
    // this.router.navigateByUrl('/dummy', {skipLocationChange: true});
    // this.router.navigate([""], {});
  }
}
