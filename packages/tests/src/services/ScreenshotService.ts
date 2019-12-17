import fs = require('fs');
import SpectreClient from 'nodeclient-spectre';
import { ScreenshotOutput } from 'webdriver-image-comparison/build/helpers/afterScreenshot.interfaces';

// TODO - .env
const SPECTRE_API_HOST= 'http://spectre.linkerd:4140';
const PROJECT = 'Big Design';
const SUITE = 'Components';

export default class ScreenshotService {
  runId: number
  browser: WebdriverIO.BrowserObject
  spectreClient: SpectreClient  = new SpectreClient(SPECTRE_API_HOST)

  compareElement = async (selector:string, name:string, runId:number, browser: WebdriverIO.BrowserObject): Promise<any> => {
    this.browser = browser
    const results = this.takeImage(selector, name)
    const imageName = `${results.path}/${results.fileName}`
    const screenshot = this.readImage(imageName)

    return await this.postImage(screenshot, name, runId)
  }

  private instantiateRun = async (): Promise<number> => {
      const response = await this.spectreClient.createTestrun(PROJECT, SUITE)

      return response.id
  }

  private takeImage = (selector:string, name:string): ScreenshotOutput => {
    this.browser.$(selector).waitForDisplayed();

    // TODO - Make sure TS definitions are added to browser
    // @ts-ignore - saveElement is not in the ts definitions of browser
    return this.browser.saveElement($(selector), name, { /* some options*/ })
  }

  private readImage = (imageName: string): string => {
    // read binary data
    const screenshot: Buffer = fs.readFileSync(imageName);

    // convert binary data to base64 encoded string
    return Buffer.from(screenshot).toString('base64');

  }

  private postImage = async (screenshot: string, name: string, runId: number): Promise<any> => {
    const windowSize = this.browser.getWindowSize()

    const response = await this.spectreClient.submitScreenshot(
      name, // test name
      // @ts-ignore - capabilities doesn't have browserName in its definition
      this.browser.config.capabilities.browserName, // browser
      `${windowSize.width}x${windowSize.height}`, // screen size
      screenshot, // screenshot
      runId, // run id
      '', // crop area
      '', // source-url
      30, // fuzz-level
      '' // highlight color
    )

    return response;
  }
}
