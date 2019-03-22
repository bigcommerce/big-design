import { defaultTheme } from '../../theme';

import { getSpacingStyles } from './index';

test('simple spacing', () => {
  const styles = getSpacingStyles('medium', defaultTheme, 'border');

  expect(styles).toEqual({
    border: '1rem',
  });
});

test('multiple simple spacings', () => {
  const styles = getSpacingStyles('medium', defaultTheme, 'border', 'padding-right');

  expect(styles).toEqual({
    border: '1rem',
    'padding-right': '1rem',
  });
});

test('responsive spacing', () => {
  const styles = getSpacingStyles({ mobile: 'none', tablet: 'small', desktop: 'medium' }, defaultTheme, 'border');

  expect(styles).toMatchSnapshot();
});

test('multiple responsive spacing', () => {
  const styles = getSpacingStyles(
    { mobile: 'none', tablet: 'small', desktop: 'medium' },
    defaultTheme,
    'border',
    'padding-right',
  );

  expect(styles).toMatchSnapshot();
});
