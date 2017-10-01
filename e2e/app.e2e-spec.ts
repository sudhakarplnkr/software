import { BillMakerAppPage } from './app.po';

describe('bill-maker-app App', () => {
  let page: BillMakerAppPage;

  beforeEach(() => {
    page = new BillMakerAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
