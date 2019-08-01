import { breakpointsOrder, Breakpoints, ThemeInterface } from '@bigcommerce/big-design-theme';
import { css, FlattenSimpleInterpolation } from 'styled-components';

import { FlexedItemProps, FlexedOverload, FlexedProps } from './types';

export const withFlexedContainer = () => css<FlexedProps>`
  ${({ alignContent, theme }) => alignContent && getFlexedStyles(alignContent, theme, 'align-content')};
  ${({ alignItems, theme }) => alignItems && getFlexedStyles(alignItems, theme, 'align-items')};
  ${({ flexDirection, theme }) => flexDirection && getFlexedStyles(flexDirection, theme, 'flex-direction')};
  ${({ flexWrap, theme }) => flexWrap && getFlexedStyles(flexWrap, theme, 'flex-wrap')};
  ${({ justifyContent, theme }) => justifyContent && getFlexedStyles(justifyContent, theme, 'justify-content')};
`;

export const withFlexedItems = () => css<FlexedItemProps>`
  ${({ alignSelf, theme }) => alignSelf && getFlexedStyles(alignSelf, theme, 'align-self')};
  ${({ flexBasis, theme }) => flexBasis && getFlexedStyles(flexBasis, theme, 'flex-basis')};
  ${({ flexGrow, theme }) => flexGrow && getFlexedStyles(flexGrow, theme, 'flex-grow')};
  ${({ flexOrder, theme }) => flexOrder && getFlexedStyles(flexOrder, theme, 'order')};
  ${({ flexShrink, theme }) => flexShrink && getFlexedStyles(flexShrink, theme, 'flex-shrink')};
`;

const getFlexedStyles: FlexedOverload = (
  flexedProp: any,
  theme: ThemeInterface,
  cssKey: any,
): FlattenSimpleInterpolation => {
  if (typeof flexedProp === 'object') {
    return getResponsiveFlex(flexedProp, theme, cssKey);
  }

  if (typeof flexedProp === 'string' || typeof flexedProp === 'number') {
    return getSimpleFlex(flexedProp, theme, cssKey);
  }

  return [];
};

const getSimpleFlex = (
  flexedProp: string | number,
  _theme: ThemeInterface,
  cssKey: string,
): FlattenSimpleInterpolation => css`
  ${cssKey}: ${flexedProp}
`;

const getResponsiveFlex: FlexedOverload = (
  flexedProp: any,
  theme: ThemeInterface,
  cssKey: string,
): FlattenSimpleInterpolation[] => {
  const breakpointKeys = Object.keys(flexedProp).sort(
    (firstBreakpoint, secondBreakpoint) =>
      breakpointsOrder.indexOf(firstBreakpoint as keyof Breakpoints) -
      breakpointsOrder.indexOf(secondBreakpoint as keyof Breakpoints),
  );

  return (breakpointKeys as Array<keyof Breakpoints>).map(
    breakpointKey =>
      css`
        ${theme.breakpoints[breakpointKey]} {
          ${getSimpleFlex(flexedProp[breakpointKey], theme, cssKey)}
        }
      `,
  );
};
