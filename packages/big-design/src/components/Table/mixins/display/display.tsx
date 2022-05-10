import { Breakpoints, breakpointsOrder, ThemeInterface } from '@bigcommerce/big-design-theme';
import { css, FlattenSimpleInterpolation } from 'styled-components';

import { TableColumnDisplayProp, TableColumnDisplayProps } from './types';

const getSimpleDisplay = (
  displayProp: string | number,
  cssKey: string,
): FlattenSimpleInterpolation => css`
  ${cssKey}: ${displayProp}
`;

const getResponsiveDisplay = (
  displayProp: TableColumnDisplayProp,
  theme: ThemeInterface,
  cssKey: string,
): FlattenSimpleInterpolation[] => {
  const breakpointKeys: string[] = Object.keys(displayProp).sort(
    (firstBreakpoint: keyof Breakpoints, secondBreakpoint: keyof Breakpoints) =>
      breakpointsOrder.indexOf(firstBreakpoint) - breakpointsOrder.indexOf(secondBreakpoint),
  );

  return breakpointKeys.map(
    (breakpointKey: keyof Breakpoints) =>
      css`
        ${theme.breakpoints[breakpointKey]} {
          ${/* eslint-disable-next-line @typescript-eslint/no-unsafe-argument */ ''}
          ${getSimpleDisplay(displayProp[breakpointKey], cssKey)}
        }
      `,
  );
};

const getDisplayStyles = (
  displayProp: TableColumnDisplayProp,
  theme: ThemeInterface,
  cssKey: string,
): FlattenSimpleInterpolation => {
  if (typeof displayProp === 'object') {
    return getResponsiveDisplay(displayProp, theme, cssKey);
  }

  if (typeof displayProp === 'string' || typeof displayProp === 'number') {
    return getSimpleDisplay(displayProp, cssKey);
  }

  return [];
};

export const withTableColumnDisplay = () => css<TableColumnDisplayProps>`
  ${({ display, theme }) => display && getDisplayStyles(display, theme, 'display')};
`;
