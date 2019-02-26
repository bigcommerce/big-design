import { rem } from 'polished';
import { css } from 'styled-components';

import { ThemeOptions } from '../index';
import { AllStyleInterpolations } from '../styled/types';

export interface Border {
  box: AllStyleInterpolations;
  boxError: AllStyleInterpolations;
  radius: string;
}

export const createBorder = (options: ThemeOptions): Border => ({
  box: css`
    ${({ theme }) => `1px solid ${theme.colors.secondary30}`}
  `,
  boxError: css`
    ${({ theme }) => `1px solid ${theme.colors.danger40}`}
  `,
  radius: rem(4, options.htmlFontSize),
});
