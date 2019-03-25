import { rem } from 'polished';
import { css } from 'styled-components';

import { ThemeOptions } from '../index';
import { AllStyleInterpolations } from '../styled/types';

export interface Border {
  box: AllStyleInterpolations;
  boxError: AllStyleInterpolations;
}

export interface BorderRadius {
  circle: AllStyleInterpolations;
  none: AllStyleInterpolations;
  normal: AllStyleInterpolations;
}

export const createBorder = (_options: ThemeOptions): Border => ({
  box: css`
    border: ${({ theme }) => `1px solid ${theme.colors.secondary30}`};
  `,
  boxError: css`
    border: ${({ theme }) => `1px solid ${theme.colors.danger40}`};
  `,
});

export const createBorderRadius = (options: ThemeOptions): BorderRadius => ({
  circle: css`
    border-radius: 50%;
  `,
  none: css`
    border-radius: 0;
  `,
  normal: css`
    border-radius: ${rem(4, options.htmlFontSize)};
  `,
});
