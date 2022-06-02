/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Breakpoints, breakpointsOrder, ThemeInterface } from '@bigcommerce/big-design-theme';
import { css, FlattenSimpleInterpolation } from 'styled-components';

import { FlexedItemProps, FlexedOverload, FlexedProps } from './types';

const getSimpleFlex = (
  flexedProp: string | number,
  cssKey: string,
): FlattenSimpleInterpolation => css`
  ${cssKey}: ${flexedProp}
`;

const getResponsiveFlex = (
  flexedProp: any,
  theme: ThemeInterface,
  cssKey: string,
): FlattenSimpleInterpolation[] => {
  // @ts-expect-error Object.keys type is string[]
  const breakpointKeys: Array<keyof Breakpoints> = Object.keys(flexedProp).sort(
    // @ts-expect-error Object.keys casues type to be string
    (firstBreakpoint: keyof Breakpoints, secondBreakpoint: keyof Breakpoints) =>
      breakpointsOrder.indexOf(firstBreakpoint) - breakpointsOrder.indexOf(secondBreakpoint),
  );

  return breakpointKeys.map(
    (breakpointKey: keyof Breakpoints) =>
      css`
        ${theme.breakpoints[breakpointKey]} {
          ${getSimpleFlex(flexedProp[breakpointKey], cssKey)}
        }
      `,
  );
};

const getFlexedStyles: FlexedOverload = (
  flexedProp: any,
  theme: ThemeInterface,
  cssKey: string,
): FlattenSimpleInterpolation => {
  if (typeof flexedProp === 'object') {
    return getResponsiveFlex(flexedProp, theme, cssKey);
  }

  if (typeof flexedProp === 'string' || typeof flexedProp === 'number') {
    return getSimpleFlex(flexedProp, cssKey);
  }

  return [];
};

export const withFlexedContainer = () => css<FlexedProps>`
  ${({ alignContent, theme }) =>
    alignContent && getFlexedStyles(alignContent, theme, 'align-content')};
  ${({ alignItems, theme }) => alignItems && getFlexedStyles(alignItems, theme, 'align-items')};
  ${({ flexDirection, theme }) =>
    flexDirection && getFlexedStyles(flexDirection, theme, 'flex-direction')};
  ${({ flexWrap, theme }) => flexWrap && getFlexedStyles(flexWrap, theme, 'flex-wrap')};
  ${({ justifyContent, theme }) =>
    justifyContent && getFlexedStyles(justifyContent, theme, 'justify-content')};
`;

export const withFlexedItems = () => css<FlexedItemProps>`
  ${({ alignSelf, theme }) => alignSelf && getFlexedStyles(alignSelf, theme, 'align-self')};
  ${({ flexBasis, theme }) => flexBasis && getFlexedStyles(flexBasis, theme, 'flex-basis')};
  ${({ flexGrow, theme }) =>
    typeof flexGrow !== 'undefined' && getFlexedStyles(flexGrow, theme, 'flex-grow')};
  ${({ flexOrder, theme }) =>
    typeof flexOrder !== 'undefined' && getFlexedStyles(flexOrder, theme, 'order')};
  ${({ flexShrink, theme }) =>
    typeof flexShrink !== 'undefined' && getFlexedStyles(flexShrink, theme, 'flex-shrink')};
`;
