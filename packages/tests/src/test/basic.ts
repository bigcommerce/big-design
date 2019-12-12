import { assertElementLooks } from '../helpers/assertions'

describe('Bigcommerce page', () => {
    it('should have the right title', async () => {
        // tslint:disable-next-line:no-console
        console.log('Navigating to bigcommerce.com')
        browser.url('https://www.bigcommerce.com/')
        const title = browser.getTitle()
        expect(title).toEqual('The Future of Commerce Is Yours | BigCommerce')

        // TODO - Make it a syncronous command
        await assertElementLooks(browser, '.titleArea-logo','logo')
    })
})
