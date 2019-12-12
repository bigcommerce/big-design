export default class BigDesignElement {
  selector: string
  browser: WebdriverIO.BrowserObject

  constructor(selector: string, browser: WebdriverIO.BrowserObject) {
    this.selector = selector;
    this.browser = browser;
  }
}
