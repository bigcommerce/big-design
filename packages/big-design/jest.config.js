const defaultJestConfig = require('@bigcommerce/configs/jest');

module.exports = {
  ...defaultJestConfig,
  moduleNameMapper: {
    ...defaultJestConfig.moduleNameMapper,
    '@test/utils': '<rootDir>/tests/utils',
  },
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  coverageThreshold: {
    global: {
      statements: 95,
      branches: 87,
      functions: 97,
      lines: 95,
    },
  },
};
