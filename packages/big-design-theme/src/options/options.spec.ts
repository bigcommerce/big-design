import { themeOptions } from './options';

test('returns default options', () => {
  const defaultOptions = themeOptions.getOptions();

  expect(defaultOptions).toEqual({ htmlFontSize: 16 });
});

test('updates default options', () => {
  const defaultOptions = themeOptions.getOptions();

  expect(defaultOptions).toEqual({ htmlFontSize: 16 });

  const newOptions = themeOptions.setOptions({ htmlFontSize: 15 });

  expect(newOptions).toEqual({ htmlFontSize: 15 });
});
