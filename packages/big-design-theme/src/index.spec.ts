import { getDefaultedTheme, theme, withDefaultTheme } from './index';

test('returns the default theme when no theme is supplied', () => {
  expect(getDefaultedTheme(undefined)).toBe(theme);
  expect(getDefaultedTheme({})).toBe(theme);
});

test('merges partial custom themes with the default theme', () => {
  const customTheme = {
    colors: {
      primary: '#010203',
    },
  };

  const mergedTheme = getDefaultedTheme(customTheme);

  expect(mergedTheme.colors.primary).toBe('#010203');
  expect(mergedTheme.colors.secondary70).toBe(theme.colors.secondary70);
  expect(mergedTheme.spacing.medium).toBe(theme.spacing.medium);
  expect(mergedTheme.helpers.remCalc(16)).toBe('1rem');
});

test('normalizes theme props', () => {
  const props = withDefaultTheme({});

  expect(props.theme).toBe(theme);
});
