import BigDesignElement from './bd-element';

// TODO: Make more typescripty
export default class BigDesignCheckbox extends BigDesignElement {
  toggle() {
    this.getBoxElement().click()
    console.log(`Toggled checkbox with selector: ${this.selector}`)
  }

  private getBoxElement(): WebdriverIO.Element {
    const selector = `${this.selector} label:nth-child(2)`

    return this.browser.$(selector)
  }
}
