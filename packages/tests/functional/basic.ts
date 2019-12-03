describe('Bigcommerce page', () => {
    it('should have the right title', async () => {
        console.log('Navigating to bigcommerce.com')
        await browser.url('https://www.bigcommerce.com/')
        const title = await browser.getTitle()
        expect(title).toEqual('The Future of Commerce Is Yours | BigCommerce')
    })
})
