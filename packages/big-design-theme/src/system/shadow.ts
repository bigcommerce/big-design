import { css } from 'styled-components';

import { createRGBA } from '../helpers';

export type Shadow = typeof shadow;

export const shadow = {
  floating: css`
    border-radius: ${({ theme }) => theme.borderRadius.normal};
    box-shadow: ${({ theme }) => `0px 2px 12px ${createRGBA(theme.colors.secondary70, 0.2)}`};
  `,
  raised: css`
    border-radius: ${({ theme }) => theme.borderRadius.normal};
    box-shadow: ${({ theme }) => `0px 1px 6px ${createRGBA(theme.colors.secondary70, 0.2)}`};
  `,
};
