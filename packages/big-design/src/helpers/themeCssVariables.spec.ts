import { createTheme } from '@bigcommerce/big-design-theme';

import { themeToCssVariables } from './themeCssVariables';

test('maps theme tokens to CSS custom properties', () => {
  const css = themeToCssVariables(createTheme());

  expect(css).toContain('--color-primary40: #3C64F4');
  expect(css).toContain('--spacing-medium: 1rem');
  expect(css).toContain('--font-weight-semiBold: 600');
  expect(css).toContain('--radius-normal: 0.25rem');
  expect(css).toContain('--z-index-modal: 1050');
});

test('respects custom htmlFontSize for rem-scaled tokens', () => {
  const css = themeToCssVariables(createTheme({ htmlFontSize: 14 }));

  // remCalc(16) at htmlFontSize 14 => 16/14 rem
  expect(css).toContain('--spacing-medium: 1.1428571428571428rem');
});
