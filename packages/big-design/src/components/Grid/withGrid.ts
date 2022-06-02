/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Breakpoints, breakpointsOrder, ThemeInterface } from '@bigcommerce/big-design-theme';
import { css, FlattenSimpleInterpolation } from 'styled-components';

import { GridedItemProps, GridedOverload, GridedProps } from './types';

const getSimpleGrid = (
  gridedProp: string | number,
  cssKey: string,
): FlattenSimpleInterpolation => css`
  ${cssKey}: ${gridedProp}
`;

const getResponsiveGrid: GridedOverload = (
  gridedProp: any,
  theme: ThemeInterface,
  cssKey: string,
): FlattenSimpleInterpolation[] => {
  const breakpointKeys = Object.keys(gridedProp).sort(
    // @ts-expect-error actually breakpoint key
    (firstBreakpoint: keyof Breakpoints, secondBreakpoint: keyof Breakpoints) =>
      breakpointsOrder.indexOf(firstBreakpoint) - breakpointsOrder.indexOf(secondBreakpoint),
  );

  return breakpointKeys.map(
    (breakpointKey) =>
      css`
        ${/* @ts-expect-error actually breakpoint key */ ''}
        ${theme.breakpoints[breakpointKey]} {
          ${getSimpleGrid(gridedProp[breakpointKey], cssKey)}
        }
      `,
  );
};

const getGridedStyles: GridedOverload = (
  gridedProp: any,
  theme: ThemeInterface,
  cssKey: string,
): FlattenSimpleInterpolation => {
  if (typeof gridedProp === 'object') {
    // @ts-expect-error @todo refactor grid types
    return getResponsiveGrid(gridedProp, theme, cssKey);
  }

  if (typeof gridedProp === 'string' || typeof gridedProp === 'number') {
    return getSimpleGrid(gridedProp, cssKey);
  }

  return [];
};

export const withGridedContainer = () => css<GridedProps>`
  ${({ gridAreas, theme }) =>
    gridAreas && getGridedStyles(gridAreas, theme, 'grid-template-areas')};
  ${({ gridAutoColumns, theme }) =>
    gridAutoColumns && getGridedStyles(gridAutoColumns, theme, 'grid-auto-columns')};
  ${({ gridAutoFlow, theme }) =>
    gridAutoFlow && getGridedStyles(gridAutoFlow, theme, 'grid-auto-flow')};
  ${({ gridAutoRows, theme }) =>
    gridAutoRows && getGridedStyles(gridAutoRows, theme, 'grid-auto-rows')};
  ${({ gridColumns, theme }) =>
    gridColumns && getGridedStyles(gridColumns, theme, 'grid-template-columns')};
  ${({ gridGap, theme }) => gridGap && getGridedStyles(gridGap, theme, 'grid-gap')};
  ${({ gridRows, theme }) => gridRows && getGridedStyles(gridRows, theme, 'grid-template-rows')};
  ${({ gridTemplate, theme }) =>
    gridTemplate && getGridedStyles(gridTemplate, theme, 'grid-template')};
`;

export const withGridedItems = () => css<GridedItemProps>`
  ${({ gridArea, theme }) => gridArea && getGridedStyles(gridArea, theme, 'grid-area')};
  ${({ gridColumn, theme }) => gridColumn && getGridedStyles(gridColumn, theme, 'grid-column')};
  ${({ gridColumnEnd, theme }) =>
    gridColumnEnd && getGridedStyles(gridColumnEnd, theme, 'grid-column-end')};
  ${({ gridColumnStart, theme }) =>
    gridColumnStart && getGridedStyles(gridColumnStart, theme, 'grid-column-start')};
  ${({ gridRow, theme }) => gridRow && getGridedStyles(gridRow, theme, 'grid-row')};
  ${({ gridRowEnd, theme }) => gridRowEnd && getGridedStyles(gridRowEnd, theme, 'grid-row-end')};
  ${({ gridRowStart, theme }) =>
    gridRowStart && getGridedStyles(gridRowStart, theme, 'grid-row-start')};
`;
