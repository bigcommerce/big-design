jest.mock('./system/border', () => ({
  createBorder: () => ({ none: 'none' }),
  createBorderRadius: () => ({ normal: '4px' }),
}));

jest.mock('./system/breakpoints', () => ({
  breakpointValues: { desktop: '1025px', mobile: '0px', tablet: '720px', wide: '1500px' },
  breakpoints: {
    desktop: '@media (min-width: 1025px)',
    mobile: '@media (min-width: 0px)',
    tablet: '@media (min-width: 720px)',
    wide: '@media (min-width: 1500px)',
  },
}));

jest.mock('./system/colors', () => ({
  colors: {
    primary: '#123456',
    secondary70: '#abcdef',
  },
}));

jest.mock('./system/keyframes', () => ({
  fadeIn: 'fadeIn',
  loading: 'loading',
  rotate: 'rotate',
}));

jest.mock('./system/line-height', () => ({
  createLineHeight: () => ({ medium: '1.5rem' }),
}));

jest.mock('./system/shadow', () => ({
  shadow: { floating: 'floating', raised: 'raised' },
}));

jest.mock('./system/spacing', () => ({
  createSpacing: () => ({ medium: '1rem' }),
}));

jest.mock('./system/typography', () => ({
  createTypography: () => ({ fontFamily: 'Source Sans', fontSize: {}, fontWeight: {} }),
}));

jest.mock('./system/z-index', () => ({
  zIndex: { modal: 1050 },
}));

import { createTheme, getDefaultedTheme, theme, withDefaultTheme } from './index';

test('creates a theme with default options', () => {
  expect(createTheme().colors.primary).toBe(theme.colors.primary);
});

test('returns the default theme when no theme is supplied', () => {
  expect(getDefaultedTheme(undefined)).toBe(theme);
  expect(getDefaultedTheme({})).toBe(theme);
  expect(getDefaultedTheme(theme)).toBe(theme);
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

test('merges null-prototype custom themes', () => {
  const customTheme = Object.create(null) as { colors: { primary: string } };

  customTheme.colors = {
    primary: '#010203',
  };

  expect(getDefaultedTheme(customTheme).colors.primary).toBe('#010203');
});

test('preserves default values when custom theme values are undefined', () => {
  const mergedTheme = getDefaultedTheme({
    colors: {
      primary: undefined,
    },
  });

  expect(mergedTheme.colors.primary).toBe(theme.colors.primary);
});

test('caches merged custom themes', () => {
  const customTheme = {
    colors: {
      primary: '#010203',
    },
  };

  expect(getDefaultedTheme(customTheme)).toBe(getDefaultedTheme(customTheme));
});

test('normalizes theme props', () => {
  const props = withDefaultTheme({});

  expect(props.theme).toBe(theme);
});
