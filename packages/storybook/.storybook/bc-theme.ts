import { defaultTheme } from '@bigcommerce/big-design';
import { create } from '@storybook/theming';

import logo from './assets/logo.svg';

const { colors } = defaultTheme;

export default create({
  appBg: colors.secondary10,
  base: 'light',
  brandImage: logo,
  brandTitle: 'Big Design',
  brandUrl: 'https://design.bigcommerce',
  colorSecondary: colors.primary,
});
