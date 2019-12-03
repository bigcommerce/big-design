const log4js = require('log4js');

module.exports = {
  new: (file) => {
    log4js.configure({
      appenders: {
        test: { type: 'file', filename: file }
      },
      categories: {
        default: { appenders: [ 'test' ], level: 'debug' }
      }
    });

    const logger = log4js.getLogger('test');
    logger.level = 'info';

    return logger
  }
};
