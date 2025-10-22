import '@testing-library/jest-dom';
import failOnConsole from 'jest-fail-on-console';

failOnConsole({
  shouldFailOnError: true,
  shouldFailOnWarn: true,
  shouldFailOnLog: false,
  shouldFailOnInfo: false,
  shouldFailOnDebug: false,
  // Ignore react-popper act() warnings - these are internal library issues
  silenceMessage: (message) => {
    if (typeof message === 'string' && message.includes('Warning: An update to')) {
      return true;
    }

    return false;
  },
});

jest.mock('./src/utils', () => ({
  ...jest.requireActual('./src/utils'),
  warning: jest.fn(),
}));

afterEach(() => {
  jest.clearAllMocks();
});
