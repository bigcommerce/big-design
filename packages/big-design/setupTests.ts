import '@testing-library/jest-dom';
import 'jest-styled-components';
import failOnConsole from 'jest-fail-on-console';

failOnConsole();

jest.mock('./src/utils', () => ({
  ...jest.requireActual('./src/utils'),
  warning: jest.fn(),
}));

afterEach(() => {
  jest.clearAllMocks();
});
