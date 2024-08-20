import { warning } from './warning';

jest.mock('./warning', () => ({
  ...jest.requireActual('./warning'),
}));

test('warning should throw a console.error', () => {
  jest.spyOn(console, 'warn').mockImplementation();
  warning('test error');

  // eslint-disable-next-line no-console
  expect(console.warn).toHaveBeenCalledTimes(1);

  warning('test error');

  // eslint-disable-next-line no-console
  expect(console.warn).toHaveBeenCalledTimes(2);
});
