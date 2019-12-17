import BigDesignCheckbox from './../components/bd-checkbox'
import { assertElementLooks } from './helpers/assertions'

const GROSS_CSS = 'body > div > div > div:nth-child(2) > div > div:nth-child(3) > div:nth-child(1) form > div > div'

describe('BigDesign Checkbox', () => {
  it('unchecked should not regress', async () => {
      browser.url('http://localhost:3000/checkbox')

      // TODO - Make it a syncronous command
      await assertElementLooks(browser, GROSS_CSS, 'unchecked checkbox')
  })

  it('checked should not regress', async () => {
      browser.url('http://localhost:3000/checkbox')

      const checkbox = new BigDesignCheckbox(GROSS_CSS, browser)
      checkbox.toggle()

      // TODO - Make it a syncronous command
      await assertElementLooks(browser, GROSS_CSS, 'checked checkbox')
  })
})
