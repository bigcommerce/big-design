import { cleanup } from '@test/utils';
import '@testing-library/jest-dom/extend-expect';

jest.mock('./src/utils', () => ({
  ...jest.requireActual<any>('./src/utils'),
  warning: jest.fn(),
}));

beforeAll(() => {
  console.error = jest.fn();
});

afterEach(() => {
  jest.clearAllMocks();

  // https://github.com/testing-library/react-testing-library/pull/519
  cleanup();
});
