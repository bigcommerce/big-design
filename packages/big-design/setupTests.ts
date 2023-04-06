import '@testing-library/jest-dom/extend-expect';
import failOnConsole from 'jest-fail-on-console';

failOnConsole();

jest.mock('./src/utils', () => ({
  ...jest.requireActual<any>('./src/utils'),
  warning: jest.fn(),
}));

afterEach(() => {
  jest.clearAllMocks();
});
