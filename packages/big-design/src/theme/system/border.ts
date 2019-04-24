import { rem } from 'polished';
import { css } from 'styled-components';

import { ThemeOptions } from '../index';
import { AllStyleInterpolations } from '../styled/types';

export interface Border {
  box: AllStyleInterpolations;
  boxError: AllStyleInterpolations;
  none: AllStyleInterpolations;
}

export interface BorderRadius {
  circle: AllStyleInterpolations;
  none: AllStyleInterpolations;
  normal: AllStyleInterpolations;
}

export const createBorder = (_options: ThemeOptions): Border => ({
  box: css`
    ${({ theme }) => `1px solid ${theme.colors.secondary30}`};
  `,

  boxError: css`
    ${({ theme }) => `1px solid ${theme.colors.danger40}`};
  `,

  none: 'none',
});

export const createBorderRadius = (options: ThemeOptions): BorderRadius => ({
  circle: '50%',
  none: 0,
  normal: rem(4, options.htmlFontSize),
});
