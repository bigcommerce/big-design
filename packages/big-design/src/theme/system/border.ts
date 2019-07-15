import { css } from 'styled-components';

import { remCalc } from '../helpers';
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

export const createBorder = (): Border => ({
  box: css`
    ${({ theme }) => `1px solid ${theme.colors.secondary30}`};
  `,

  boxError: css`
    ${({ theme }) => `1px solid ${theme.colors.danger40}`};
  `,

  none: 'none',
});

export const createBorderRadius = (): BorderRadius => ({
  circle: '50%',
  none: 0,
  normal: remCalc(4),
});
