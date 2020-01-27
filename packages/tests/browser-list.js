module.exports = {
  chrome: {
    browserName: 'chrome',
    customName: 'chrome'
  },

  'mobile-iphone': {
    browserName: 'chrome',
    customName: 'mobile-iphone',
    chromeOptions: {
      mobileEmulation: { deviceName: 'iPhone X' }
    }
  },

  'mobile-pixel': {
    browserName: 'chrome',
    customName: 'mobile-pixel',
    chromeOptions: {
      mobileEmulation: { deviceName: 'Pixel 2' }
    }
  },

  'mobile-samsung': {
    browserName: 'chrome',
    customName: 'mobile-samsung',
    chromeOptions: {
      mobileEmulation: { deviceName: 'Galaxy S5' }
    }
  },

  firefox: {
    browserName: 'firefox',
    customName: 'firefox'
  },

  'headless-chrome': {
    browserName: 'chrome',
    chromeOptions: {
      args: ['headless', 'disable-gpu']
    },
    customName: 'headless-chrome'
  },

  'browserstack-chrome': {
    os: 'OS X',
    os_version: 'Mojave',
    browser: 'Chrome',
    browser_version: '70.0',
    resolution: '1600x1200',
    customName: 'browserstack-chrome'
  },

  'browserstack-firefox': {
    os: 'OS X',
    os_version: 'High Sierra',
    browser: 'Firefox',
    browser_version: '64.0 beta',
    resolution: '1600x1200',
    customName: 'browserstack-firefox'
  },

  'browserstack-edge': {
    os: 'Windows',
    os_version: '10',
    browser: 'Edge',
    browser_version: '17.0',
    resolution: '1024x768',
    customName: 'browserstack-edge'
  },

  'browserstack-ie': {
    os: 'Windows',
    os_version: '8.1',
    browser: 'IE',
    browser_version: '11.0',
    resolution: '1600x1200',
    customName: 'browserstack-ie'
  },

  'browserstack-iphone': {
    device: 'iPhone XS',
    os_version: '12.0',
    customName: 'browserstack-iphone',
    browserName: 'iPhone XS 12.0',
    realMobile: 'true',
    browser: 'iPhone XS'
  },

  'browserstack-ipad': {
    device: 'iPad 6th',
    os_version: '11.3',
    customName: 'browserstack-ipad',
    browserName: 'iPad 6th 11.3',
    realMobile: 'true',
    browser: 'iPad 6th'
  },

  'browserstack-galaxy': {
    device: 'Samsung Galaxy Note 9',
    os_version: '8.1',
    customName: 'browserstack-galaxy',
    browserName: 'Samsung Galaxy Note 9 8.1',
    realMobile: 'true',
    browser: 'Galaxy Note 9'
  },

  'browserstack-pixel': {
    device: 'Google Pixel 2',
    os_version: '9.0',
    customName: 'browserstack-pixel',
    browserName: 'Google Pixel 2 9.0',
    realMobile: 'true',
    browser: 'Pixel 2'
  }
};
