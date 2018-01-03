import { Component, OnInit } from '@angular/core';
import { setLang, getLang, getMessages } from '../messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-i18n',
  templateUrl: 'i18n.component.html'
})
export class I18nComponent implements OnInit {

  en: boolean;
  ja: boolean;
  msg = getMessages();

  constructor(private router: Router) {
    console.log('constructor');
  }

  ngOnInit() {
    console.log('ngOnInit');
    if (getLang() === 'ja') {
      this.ja = true;
    } else {
      this.en = true;
    }
  }

  changeEn() {
    setLang('en');
    this.router.navigate(['blank']).then(b => this.router.navigate(['i18n']));
  }

  changeJa() {
    setLang('ja');
    this.router.navigate(['blank']).then(b => this.router.navigate(['i18n']));
  }
}
