const defaultJestConfig = require('@bigcommerce/configs/jest');

module.exports = {
  ...defaultJestConfig,
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  coverageThreshold: {
    global: {
      statements: 96.35,
      branches: 88.7,
      functions: 97.55,
      lines: 96.73,
    },
  },
};
