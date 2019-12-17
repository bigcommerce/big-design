import ScreenshotService from '../../services/ScreenshotService'

// TODO - .env
const SPECTRE_UI_URL = 'https://spectre.service.bcdev';

// TODO - Add as browser command
export async function assertElementLooks(browser:WebdriverIO.BrowserObject, selector:string, name:string) {
  const screenshotService = new ScreenshotService();

  // TODO - find a better way to handle run information
  const result = await screenshotService.compareElement(selector, name, Number(process.env.RUN_ID), browser)

  // TODO - get in the failed expectations section
  if(!result.pass) {
    console.log(`Image comparison failed with a ${result.diff}% difference`)
  }
  console.log(`Image comparison results can be seen at ${SPECTRE_UI_URL}${result.url}`)

  // TODO - set up a new matcher using results
  expect(result.pass).toEqual(true)
}
