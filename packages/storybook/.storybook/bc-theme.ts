import { theme } from '@bigcommerce/big-design-theme';
import { create } from '@storybook/theming';

import logo from './assets/logo.svg';

const { colors } = theme;

export default create({
  appBg: colors.secondary10,
  base: 'light',
  brandImage: logo,
  brandTitle: 'Big Design',
  brandUrl: 'https://bigcommerce.design',
  colorSecondary: colors.primary,
});
