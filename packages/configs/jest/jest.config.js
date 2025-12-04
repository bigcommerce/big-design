module.exports = {
  testRegex: '(<rootDir>/(tests|src)/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '@src/(.*)': '<rootDir>/src/$1',
  },
  coverageDirectory: '<rootDir>/coverage',
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  transform: {
    '^.+\\.(t|j)sx?$': [
      '@swc/jest',
      { jsc: { experimental: { plugins: [['@swc/plugin-styled-components', { pure: true }]] } } },
    ],
  },
};
