import { rem } from 'polished';

import { ThemeOptions } from '../index';

export interface Border {
  radius: string;
}

export const createBorder = (options: ThemeOptions): Border => ({
  radius: rem(4, options.htmlFontSize),
});
