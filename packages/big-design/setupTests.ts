import '@testing-library/jest-dom/extend-expect';

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock('./src/utils', () => ({
  ...jest.requireActual('./src/utils'),
  warning: jest.fn(),
}));

afterEach(() => {
  jest.clearAllMocks();
});
