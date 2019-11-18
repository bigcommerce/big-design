import 'jest-environment-webdriverio';

jest.setTimeout(60000);

describe('Google', (): void => {
  /*
    beforeEach(
        async (): Promise<void> => {
          await browser.reloadSession();
        }
    );*/

  it('should contain the Google logo', async (): Promise<void> => {
    await browser.url('https://www.bigcommerce.com/');
    const title = await browser.getTitle();
    expect(title).toEqual('The Future of Commerce Is Yours | BigCommerce');
  });
});
