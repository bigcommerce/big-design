const defaultJestConfig = require('@bigcommerce/configs/jest');

module.exports = {
  ...defaultJestConfig,
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
    },
  },
};
