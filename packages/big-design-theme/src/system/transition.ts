import { css } from 'styled-components';

export type Transition = typeof transition;

export const transition = {
  small: css`
    all 150ms ease-out;
  `,
  medium: css`
    all 300ms ease-out;
  `,
  large: css`
    all 600ms ease-out;
  `,
};
