import '@testing-library/jest-dom/extend-expect';

jest.mock('./src/utils', () => ({
  ...jest.requireActual<any>('./src/utils'),
  warning: jest.fn(),
}));

afterEach(() => {
  jest.clearAllMocks();
});
