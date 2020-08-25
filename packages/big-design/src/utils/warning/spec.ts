import { warning } from './warning';

const consoleError = jest.spyOn(console, 'warn').mockImplementation(jest.fn);

jest.mock('./warning', () => ({
  ...jest.requireActual<any>('./warning'),
}));

test('warning should throw a console.error', () => {
  warning('test error');

  expect(consoleError).toHaveBeenCalledTimes(1);

  warning('test error');

  expect(consoleError).toHaveBeenCalledTimes(2);
});
