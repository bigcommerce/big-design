import { css } from 'styled-components';

import { remCalc } from '../helpers';

export type Border = ReturnType<typeof createBorder>;
export type BorderRadius = ReturnType<typeof createBorderRadius>;

export const createBorder = () => ({
  box: css`
    ${({ theme }) => `1px solid ${theme.colors.secondary30}`};
  `,

  boxError: css`
    ${({ theme }) => `1px solid ${theme.colors.danger40}`};
  `,

  none: 'none',
});

export const createBorderRadius = () => ({
  circle: '50%',
  none: 0,
  normal: remCalc(4),
});
