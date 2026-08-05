const defaultJestConfig = require('@bigcommerce/configs/jest');

module.exports = {
  ...defaultJestConfig,
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  moduleNameMapper: {
    ...defaultJestConfig.moduleNameMapper,
    '\\.css$': '<rootDir>/src/styleMock.js',
  },
  coverageThreshold: {
    global: {
      // Pointer drag-and-drop paths (native HTML5 drag) can't run in jsdom and are
      // excluded via `istanbul ignore`; these floors reflect the remaining reachable code.
      statements: 97.05,
      branches: 88.69,
      functions: 97.95,
      lines: 97.45,
    },
  },
};
