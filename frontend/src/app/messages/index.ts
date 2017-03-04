import {messagesEn} from './messages.en';
import {messagesJa} from './messages.ja';

const COOKIE_KEY = 'lang';

export function getLang(): string {
  const lang = document.cookie.replace(new RegExp('(?:^|.*;\\s*)' + COOKIE_KEY + '\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*'), '$1');
  return document.cookie === lang ? 'en' : lang;
}

export function setLang(value: string, path?: string, domain?: string, secure?: boolean) {
  document.cookie = COOKIE_KEY + '=' + value
    + '; max-age=2147483647'
    + (domain ? '; domain=' + domain : '')
    + (path ? '; path=' + path : '/')
    + (secure ? '; secure' : '');
}

export function getMessages(): typeof messagesEn {
  switch (getLang()) {
    case 'ja':
      return messagesJa;
  }
  return messagesEn;
}


