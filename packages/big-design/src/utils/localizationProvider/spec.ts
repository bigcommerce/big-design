import { createLocalizationProvider } from './localizationProvider';

test('get localised data for a locale', () => {
  const locale = 'en-US';
  const localisedData = createLocalizationProvider(locale);

  expect(localisedData.code).toBe(locale);
  expect(localisedData.monthsLong).toStrictEqual([
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]);
});
