import { PubNubAngular2DemoCLIPage } from './app.po';

describe('pub-nub-angular2-demo-cli App', () => {
  let page: PubNubAngular2DemoCLIPage;

  beforeEach(() => {
    page = new PubNubAngular2DemoCLIPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
