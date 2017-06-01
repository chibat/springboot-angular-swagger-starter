import { AppnameFrontendPage } from './app.po';

describe('appname-frontend App', () => {
  let page: AppnameFrontendPage;

  beforeEach(() => {
    page = new AppnameFrontendPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
