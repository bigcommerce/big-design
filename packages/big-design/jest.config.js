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
      statements: 95.4,
      branches: 86.72,
      functions: 96.73,
      lines: 95.44,
    },
  },
};
