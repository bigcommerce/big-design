import { css } from 'styled-components';

import { AllStyleInterpolations } from '../styled/types';

export interface Elevation {
  floating: AllStyleInterpolations;
  raised: AllStyleInterpolations;
}

export const elevation: Elevation = {
  floating: css`
    border-radius: ${({ theme }) => theme.border.radius};
    box-shadow: 0px 2px 12px rgba(49, 52, 64, 0.2);
  `,
  raised: css`
    border-radius: ${({ theme }) => theme.border.radius};
    box-shadow: 0px 1px 6px rgba(49, 52, 64, 0.2);
  `,
};
