import { rem } from 'polished';

import { ThemeOptions } from '../index';

export interface LineHeight {
  small: string;
  medium: string;
  large: string;
  xLarge: string;
  xxLarge: string;
  xxxLarge: string;
}

export const createLineHeight = (options: ThemeOptions): LineHeight => ({
  small: rem(20, options.htmlFontSize),
  medium: rem(24, options.htmlFontSize),
  large: rem(28, options.htmlFontSize),
  xLarge: rem(32, options.htmlFontSize),
  xxLarge: rem(40, options.htmlFontSize),
  xxxLarge: rem(48, options.htmlFontSize),
});
