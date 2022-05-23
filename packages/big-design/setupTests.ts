import '@testing-library/jest-dom/extend-expect';

jest.mock('./src/utils', () => ({
  ...jest.requireActual('./src/utils'),
  warning: jest.fn(),
}));

afterEach(() => {
  jest.clearAllMocks();
});
