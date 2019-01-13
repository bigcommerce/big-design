module.exports = {
  setupFiles: ['<rootDir>/tests/__setup__/setup.ts'],
  setupTestFrameworkScriptFile: '<rootDir>/tests/__setup__/setupFramework.ts',
  transform: {
    '.[jt]sx?$': '<rootDir>/node_modules/babel-jest',
  },
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testRegex: '(<rootDir>/(tests|src)/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '@src/(.*)': '<rootDir>/src/$1',
  },
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage',
};
