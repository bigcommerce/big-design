import { css } from 'styled-components';

// todo: timings and easings should be moved into big-design-theme
const Timings = {
  short: '150ms',
};

const Easings = {
  hover: 'ease-out',
};

export const withTransition = (
  properties: string[],
  duration = Timings.short,
  ease = Easings.hover,
) => css`
  transition: all ${duration} ${ease};
  transition-property: ${properties.join(', ')};
`;
