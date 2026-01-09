import { warning } from './warning';

jest.mock('../env', () => ({
  isProduction: false,
}));

describe('warning', () => {
  const originalConsole = global.console;

  afterEach(() => {
    global.console = originalConsole;
    jest.resetModules();
  });

  test('should call console.warn in non-production environment', () => {
    const mockWarn = jest.fn();

    jest.spyOn(console, 'warn').mockImplementation(mockWarn);

    warning('test error');

    // eslint-disable-next-line no-console
    expect(console.warn).toHaveBeenCalledTimes(1);
    // eslint-disable-next-line no-console
    expect(console.warn).toHaveBeenCalledWith('Warning: test error');

    warning('test error');

    // eslint-disable-next-line no-console
    expect(console.warn).toHaveBeenCalledTimes(2);
  });

  test('should not call console.warn in production environment', () => {
    jest.resetModules();
    jest.doMock('../env', () => ({
      isProduction: true,
    }));

    // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
    const { warning: prodWarning } = require('./warning');
    const mockWarn = jest.fn();

    jest.spyOn(console, 'warn').mockImplementation(mockWarn);

    prodWarning('test error');

    // eslint-disable-next-line no-console
    expect(console.warn).not.toHaveBeenCalled();
  });

  test('should not throw error when console is undefined', () => {
    const consoleBackup = global.console;

    // @ts-expect-error - testing undefined console
    delete global.console;

    expect(() => {
      warning('test error');
    }).not.toThrow();

    global.console = consoleBackup;
  });
});
