/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Breakpoints, breakpointsOrder, ThemeInterface } from '@bigcommerce/big-design-theme';
import { css, FlattenSimpleInterpolation } from 'styled-components';

import { DisplayOverload, DisplayProps } from './types';

const getSimpleDisplay = (
  displayProp: string | number,
  cssKey: string,
): FlattenSimpleInterpolation => css`
  ${cssKey}: ${displayProp}
`;

const getResponsiveDisplay: DisplayOverload = (
  displayProp: any,
  theme: ThemeInterface,
  cssKey: string,
): FlattenSimpleInterpolation[] => {
  // @ts-expect-error Object.keys type is string[]
  const breakpointKeys: Array<keyof Breakpoints> = Object.keys(displayProp).sort(
    // @ts-expect-error Object.keys casues type to be string
    (firstBreakpoint: keyof Breakpoints, secondBreakpoint: keyof Breakpoints) =>
      breakpointsOrder.indexOf(firstBreakpoint) - breakpointsOrder.indexOf(secondBreakpoint),
  );

  return breakpointKeys.map(
    (breakpointKey) =>
      css`
        ${theme.breakpoints[breakpointKey]} {
          ${getSimpleDisplay(displayProp[breakpointKey], cssKey)}
        }
      `,
  );
};

const getDisplayStyles: DisplayOverload = (
  displayProp: any,
  theme: ThemeInterface,
  cssKey: string,
): FlattenSimpleInterpolation => {
  if (typeof displayProp === 'object') {
    // @ts-expect-error refactor types
    return getResponsiveDisplay(displayProp, theme, cssKey);
  }

  if (typeof displayProp === 'string' || typeof displayProp === 'number') {
    return getSimpleDisplay(displayProp, cssKey);
  }

  return [];
};

export const withDisplay = () => css<DisplayProps>`
  ${({ display, theme }) => display && getDisplayStyles(display, theme, 'display')};
`;
