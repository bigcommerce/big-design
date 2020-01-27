const DEBUG = true
const BROWSER = process.env.BROWSER || 'firefox'

const Logger = require('./logger.js');
const path = require('path')
const browserList = require('./browser-list');

const testPath = './src/test';
const artifactsPath = `${testPath}/artifacts`;
const screenshotsPath = `${artifactsPath}/screenshots`;
const logsPath = `${artifactsPath}/logs`;
const seleniumPath = `${artifactsPath}/selenium`;
const testResultsPath = `${artifactsPath}/test-results`;

let originalConsole = null;

const buildCapabilities = process.env.CIRCLE_BUILD_NUM
  ? `${process.env.CIRCLE_BUILD_NUM} ${process.env.CIRCLE_BRANCH}`
  : `Local - ${new Date()}`;

const browserstackCapabilities = {
  project: 'BigDesign',
  build: buildCapabilities,
  'browserstack.local': true,
};

exports.config = {
    //
    // ====================
    // Runner Configuration
    // ====================
    //
    // WebdriverIO allows it to run your tests in arbitrary locations (e.g. locally or
    // on a remote machine).
    runner: 'local',
    //
    // ==================
    // Specify Test Files
    // ==================
    // Define which test specs should run. The pattern is relative to the directory
    // from which `wdio` was called. Notice that, if you are calling `wdio` from an
    // NPM script (see https://docs.npmjs.com/cli/run-script) then the current working
    // directory is where your package.json resides, so `wdio` will be called from there.
    //
    specs: [
        `${testPath}/**/*spec.ts`
    ],
    // Patterns to exclude.
    exclude: [
        // 'path/to/excluded/files'
    ],
    //
    // ============
    // Capabilities
    // ============
    // Define your capabilities here. WebdriverIO can run multiple capabilities at the same
    // time. Depending on the number of capabilities, WebdriverIO launches several test
    // sessions. Within your capabilities you can overwrite the spec and exclude options in
    // order to group specific specs to a specific capability.
    //
    // First, you can define how many instances should be started at the same time. Let's
    // say you have 3 different capabilities (Chrome, Firefox, and Safari) and you have
    // set maxInstances to 1; wdio will spawn 3 processes. Therefore, if you have 10 spec
    // files and you set maxInstances to 10, all spec files will get tested at the same time
    // and 30 processes will get spawned. The property handles how many capabilities
    // from the same test should run tests.
    //
    maxInstances: 1,
    //
    // If you have trouble getting all important capabilities together, check out the
    // Sauce Labs platform configurator - a great tool to configure your capabilities:
    // https://docs.saucelabs.com/reference/platforms-configurator
    //
    capabilities: [{
        // maxInstances can get overwritten per capability. So if you have an in-house Selenium
        // grid with only 5 firefox instances available you can make sure that not more than
        // 5 instances get started at a time.
        maxInstances: 5,
        //
        browserName: BROWSER,
        // If outputDir is provided WebdriverIO can capture driver session logs
        // it is possible to configure which logTypes to include/exclude.
        // excludeDriverLogs: ['*'], // pass '*' to exclude all driver session logs
        // excludeDriverLogs: ['bugreport', 'server'],
    }],
    //
    // ===================
    // Test Configurations
    // ===================
    // Define all options that are relevant for the WebdriverIO instance here
    //
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    logLevel: 'info',

    outputDir: logsPath,
    //
    // Set specific log levels per logger
    // loggers:
    // - webdriver, webdriverio
    // - @wdio/applitools-service, @wdio/browserstack-service, @wdio/devtools-service, @wdio/sauce-service
    // - @wdio/mocha-framework, @wdio/jasmine-framework
    // - @wdio/local-runner, @wdio/lambda-runner
    // - @wdio/sumologic-reporter
    // - @wdio/cli, @wdio/config, @wdio/sync, @wdio/utils
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    // logLevels: {
    //     webdriver: 'info',
    //     '@wdio/applitools-service': 'info'
    // },
    //
    // If you only want to run your tests until a specific amount of tests have failed use
    // bail (default is 0 - don't bail, run all tests).
    bail: 0,

    screenshotPath: screenshotsPath,

    screenshotOnReject: false,
    //
    // Set a base URL in order to shorten url command calls. If your `url` parameter starts
    // with `/`, the base url gets prepended, not including the path portion of your baseUrl.
    // If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
    // gets prepended directly.
    baseUrl: 'http://localhost',
    //
    // Default timeout for all waitFor* commands.
    waitforTimeout: 10000,
    //
    // Default timeout in milliseconds for request
    // if Selenium Grid doesn't send response
    connectionRetryTimeout: 90000,
    //
    // Default request retries count
    connectionRetryCount: 3,
    //
    // Test runner services
    // Services take over a specific job you don't want to take care of. They enhance
    // your test setup with almost no effort. Unlike plugins, they don't add new
    // commands. Instead, they hook themselves up into the test process.
    services: [
        'selenium-standalone',
        'browserstack',
        [
            'image-comparison',
            // The options
            {
                // Some options, see the docs for more
                baselineFolder: path.join(process.cwd(), `${testPath}/image-comparison/baseline`),
                formatImageName: '{tag}',
                screenshotPath: path.join(process.cwd(), `${testPath}/image-comparison`),
                savePerInstance: true,
                autoSaveBaseline: true,
                blockOutStatusBar: true,
                blockOutToolBar: true,
                // ... more options
            }
        ]
    ],

    seleniumLogs: logsPath,
    seleniumInstallArgs: {
        baseURL: 'https://selenium-release.storage.googleapis.com',
        version: '3.141.59',
        drivers: {
            chrome: {
                version: '78.0.3904.105',
                arch: process.arch,
                baseURL: 'https://chromedriver.storage.googleapis.com'
            },
            firefox: {
                version: '0.26.0',
                arch: process.arch,
                baseURL: 'https://github.com/mozilla/geckodriver/releases/download'
            }
        },
        basePath: seleniumPath,
      },
    seleniumArgs: {
        baseURL: 'https://selenium-release.storage.googleapis.com',
        version: '3.141.59',
        drivers: {
            chrome: {
                version: '78.0.3904.105',
                arch: process.arch,
                baseURL: 'https://chromedriver.storage.googleapis.com'
            },
            firefox: {
                version: '0.26.0',
                arch: process.arch,
                baseURL: 'https://github.com/mozilla/geckodriver/releases/download'
            }
        },
        basePath: seleniumPath,
    },

      // If you have trouble getting all important capabilities together, check out the
  // Browserstack platform configurator - a great tool to configure your capabilities:
  // https://www.browserstack.com/list-of-browsers-and-platforms?product=automate

  user: process.env.BROWSERSTACK_USERNAME,
  key: process.env.BROWSERSTACK_ACCESS_KEY,

  browserstackOpts: {
    key: process.env.BROWSERSTACK_ACCESS_KEY
  },

  capabilities: [
    {
      ...browserList['browserstack-chrome'],
      ...{ ...browserstackCapabilities, browserName: browserList['browserstack-chrome']['customName'] }
    },
    // { ...browserList['browserstack-firefox'],
    // ...{ ...browserstackCapabilities, browserName: browserList['browserstack-firefox']['customName'] }
    // },
    // { ...browserList['browserstack-edge'],
    // ...{ ...browserstackCapabilities, browserName: browserList['browserstack-edge']['customName'] }
    // },
    // { ...browserList['browserstack-ie'],
    // ...{ ...browserstackCapabilities, browserName: browserList['browserstack-ie']['customName'] }
    // },
    {
      ...browserList['browserstack-iphone'],
      ...{ ...browserstackCapabilities, browserName: browserList['browserstack-iphone']['customName'] }
    },
    // { ...browserList['browserstack-ipad'],
    // ...{ ...browserstackCapabilities, browserName: browserList['browserstack-ipad']['customName'] }
    // },
    // { ...browserList['browserstack-galaxy'],
    // ...{ ...browserstackCapabilities, browserName: browserList['browserstack-galaxy']['customName'] }
    // },
    {
      ...browserList['browserstack-pixel'],
      ...{ ...browserstackCapabilities, browserName: browserList['browserstack-pixel']['customName'] }
    }
  ],



    // Framework you want to run your specs with.
    // The following are supported: Mocha, Jasmine, and Cucumber
    // see also: https://webdriver.io/docs/frameworks.html
    //
    // Make sure you have the wdio adapter package for the specific framework installed
    // before running any tests.
    framework: 'jasmine',
    //
    // The number of times to retry the entire specfile when it fails as a whole
    // specFileRetries: 1,
    //
    // Test reporter for stdout.
    // The only one supported by default is 'dot'
    // see also: https://webdriver.io/docs/dot-reporter.html
    reporters: [
        'spec',
        [
            'junit',
            {
                outputDir: testResultsPath,
                outputFileFormat: function(options) {
                    return 'test-result.xml'
                },
                errorOptions: {
                    error: 'message',
                    failure: 'message',
                    stacktrace: 'stack'
                }
            }
        ]
    ],

    //
    // Options to be passed to Jasmine.
    jasmineNodeOpts: {
        //
        // Jasmine default timeout
        defaultTimeoutInterval: DEBUG ? (24 * 60 * 60 * 1000) : 60000,
        //
        // The Jasmine framework allows interception of each assertion in order to log the state of the application
        // or website depending on the result. For example, it is pretty handy to take a screenshot every time
        // an assertion fails.
        // expectationResultHandler: function(passed, assertion) {
            // do something
        // }
    },

    //
    // =====
    // Hooks
    // =====
    // WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
    // it and to build services around it. You can either apply a single function or an array of
    // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
    // resolved to continue.
    /**
     * Gets executed once before all workers get launched.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     */
    onPrepare: async (config, capabilities) => {
        try {
            const ScreenshotService = require('./src/services/ScreenshotService').default

            screenshotService = new ScreenshotService();
            process.env.RUN_ID = await screenshotService.instantiateRun();
        } catch(ex) {
            console.log('Failed to instantiate screenshot service', ex)
            throw(ex)
        }    },
    /**
     * Gets executed just before initialising the webdriver session and test framework. It allows you
     * to manipulate configurations depending on the capability or spec.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     */
    // beforeSession: (config, capabilities, specs) => {
    // },
    /**
     * Gets executed before test execution begins. At this point you can access to all global
     * variables like `browser`. It is the perfect place to define custom commands.
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     */
    before: async (capabilities, specs) => {
        require('ts-node').register({ files: true });
        // TODO: find a way to make the element proper sized without shrinking window
        browser.setWindowSize(800, 600)
    },
    /**
     * Runs before a WebdriverIO command gets executed.
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     */
    // beforeCommand: (commandName, args) => {
    // },
    /**
     * Hook that gets executed before the suite starts
     * @param {Object} suite suite details
     */
    // beforeSuite: (suite) => {
    // },
    /**
     * Function to be executed before a test (in Mocha/Jasmine) starts.
     */
    beforeTest: (test, context) => {
        // Override console to allow for STDOUT and file logging with one command
        originalConsole = console

        let filename = test['fullName'].replace(/\s/gi, '_');
        let file = `${logsPath}/${test['start']}-${filename}.log`;

        const logger = Logger.new(file);

        // TODO - Figure out a better way
        // TODO - Rocket syntax for top level function
        console = (function(originalConsole){
            return {
                log: (text, obj) => {
                    if(obj) {
                        originalConsole.log(`${text}\n${JSON.stringify(obj,null,2)}`);
                        logger.info(text, obj)
                    } else {
                        originalConsole.log(text);
                        logger.info(text)
                    }
                },
                info: (text, obj) => {
                    if(obj) {
                        originalConsole.log(`${text}\n${JSON.stringify(obj,null,2)}`);
                        logger.info(text, obj)
                    } else {
                        originalConsole.log(text);
                        logger.info(text)
                    }
                },
                warn: (text, obj) => {
                    if(obj) {
                        originalConsole.warn(`${text}\n${JSON.stringify(obj,null,2)}`);
                        logger.warn(text, obj)
                    } else {
                        originalConsole.warn(text);
                        logger.warn(text)
                    }
                },
                error: (text, obj) => {
                    if(obj) {
                        originalConsole.error(`${text}\n${JSON.stringify(obj,null,2)}`);
                        logger.error(text, obj)
                    } else {
                        originalConsole.error(text);
                        logger.error(text)
                    }
                }
            };
        }(originalConsole));

        console.log(`--- Starting test ${test['fullName']} ---`);
    },
    /**
     * Hook that gets executed _before_ a hook within the suite starts (e.g. runs before calling
     * beforeEach in Mocha)
     */
    // beforeHook: (test, context) => {
    // },
    /**
     * Hook that gets executed _after_ a hook within the suite starts (e.g. runs after calling
     * afterEach in Mocha)
     */
    // afterHook: (test, context, { error, result, duration, passed, retries }) => {
    // },
    /**
     * Function to be executed after a test (in Mocha/Jasmine).
     */
    afterTest: (test, context, { error, result, duration, passed, retries }) => {
        console.log(`--- Ending test ${test['fullName']} ---`);

        // Return console to its original state
        console = originalConsole;
    },

    /**
     * Hook that gets executed after the suite has ended
     * @param {Object} suite suite details
     */
    // afterSuite: (suite) => {
    // },
    /**
     * Runs after a WebdriverIO command gets executed
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     * @param {Number} result 0 - command success, 1 - command error
     * @param {Object} error error object if any
     */
    // afterCommand: (commandName, args, result, error) => {
    // },
    /**
     * Gets executed after all tests are done. You still have access to all global variables from
     * the test.
     * @param {Number} result 0 - test pass, 1 - test fail
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    // after: (result, capabilities, specs) => {
    // },
    /**
     * Gets executed right after terminating the webdriver session.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    // afterSession: (config, capabilities, specs) => {
    // },
    /**
     * Gets executed after all workers got shut down and the process is about to exit. An error
     * thrown in the onComplete hook will result in the test run failing.
     * @param {Object} exitCode 0 - success, 1 - fail
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {<Object>} results object containing test results
     */
    // onComplete: (exitCode, config, capabilities, results) => {
    // },
    /**
    * Gets executed when a refresh happens.
    * @param {String} oldSessionId session ID of the old session
    * @param {String} newSessionId session ID of the new session
    */
    //onReload: (oldSessionId, newSessionId) => {
    //}
}
