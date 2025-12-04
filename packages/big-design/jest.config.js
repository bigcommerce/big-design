const defaultJestConfig = require('@bigcommerce/configs/jest');

module.exports = {
  ...defaultJestConfig,
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  coverageThreshold: {
    global: {
      statements: 97.14,
      branches: 88.69,
      functions: 98.08,
      lines: 97.54,
    },
  },
};
