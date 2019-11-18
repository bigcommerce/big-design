module.exports = {
  baseURL: 'https://selenium-release.storage.googleapis.com',
  version: '3.141.59',
  drivers: {
    chrome: {
      version: '76.0.3809.68',
      baseURL: 'https://chromedriver.storage.googleapis.com'
    },
    firefox: {
      version: '0.26.0',
      baseURL: 'https://github.com/mozilla/geckodriver/releases/download'
    }
  }
};