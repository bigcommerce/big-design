import { rem } from 'polished';

import { ThemeOptions } from '../index';

export interface Spacing {
  xxSmall: string;
  xSmall: string;
  small: string;
  medium: string;
  large: string;
  xLarge: string;
  xxLarge: string;
  xxxLarge: string;
}

export const createSpacing = (options: ThemeOptions): Spacing => ({
  xxSmall: rem(4, options.htmlFontSize),
  xSmall: rem(8, options.htmlFontSize),
  small: rem(12, options.htmlFontSize),
  medium: rem(16, options.htmlFontSize),
  large: rem(20, options.htmlFontSize),
  xLarge: rem(24, options.htmlFontSize),
  xxLarge: rem(32, options.htmlFontSize),
  xxxLarge: rem(48, options.htmlFontSize),
});
