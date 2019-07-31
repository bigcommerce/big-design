import { breakpointsOrder, Breakpoints, ThemeInterface } from '@bigcommerce/big-design-theme';
import { css, FlattenSimpleInterpolation } from 'styled-components';

import {
  AlignContent,
  AlignItems,
  AlignSelf,
  FlexBasis,
  FlexDirection,
  FlexGrow,
  FlexOrder,
  FlexShrink,
  FlexWrap,
  JustifyContent,
} from './props';

export type FlexMixin = Partial<{
  alignContent: AlignContent;
  alignItems: AlignItems;
  flexDirection: FlexDirection;
  flexWrap: FlexWrap;
  justifyContent: JustifyContent;
}>;

export type FlexItemMixin = Partial<{
  alignSelf: AlignSelf;
  flexBasis: FlexBasis;
  flexGrow: FlexGrow;
  flexOrder: FlexOrder;
  flexShrink: FlexShrink;
}>;

export const withFlexedContainer = () => css<FlexMixin>`
  ${({ alignContent, theme }) => alignContent && getFlexedStyles(alignContent, theme, 'align-content')};
  ${({ alignItems, theme }) => alignItems && getFlexedStyles(alignItems, theme, 'align-items')};
  ${({ flexDirection, theme }) => flexDirection && getFlexedStyles(flexDirection, theme, 'flex-direction')};
  ${({ flexWrap, theme }) => flexWrap && getFlexedStyles(flexWrap, theme, 'flex-wrap')};
  ${({ justifyContent, theme }) => justifyContent && getFlexedStyles(justifyContent, theme, 'justify-content')};
`;

export const withFlexedItems = () => css<FlexItemMixin>`
  ${({ alignSelf, theme }) => alignSelf && getFlexedStyles(alignSelf, theme, 'align-self')};
  ${({ flexBasis, theme }) => flexBasis && getFlexedStyles(flexBasis, theme, 'flex-basis')};
  ${({ flexGrow, theme }) => flexGrow && getFlexedStyles(flexGrow, theme, 'flex-grow')};
  ${({ flexOrder, theme }) => flexOrder && getFlexedStyles(flexOrder, theme, 'order')};
  ${({ flexShrink, theme }) => flexShrink && getFlexedStyles(flexShrink, theme, 'flex-shrink')};
`;

interface FlexedOverload {
  (flexedProp: AlignContent, theme: ThemeInterface, cssKey: 'align-content'): FlattenSimpleInterpolation;
  (flexedProp: AlignItems, theme: ThemeInterface, cssKey: 'align-items'): FlattenSimpleInterpolation;
  (flexedProp: FlexDirection, theme: ThemeInterface, cssKey: 'flex-direction'): FlattenSimpleInterpolation;
  (flexedProp: FlexWrap, theme: ThemeInterface, cssKey: 'flex-wrap'): FlattenSimpleInterpolation;
  (flexedProp: JustifyContent, theme: ThemeInterface, cssKey: 'justify-content'): FlattenSimpleInterpolation;
  (flexedProp: AlignSelf, theme: ThemeInterface, cssKey: 'align-self'): FlattenSimpleInterpolation;
  (flexedProp: FlexBasis, theme: ThemeInterface, cssKey: 'flex-basis'): FlattenSimpleInterpolation;
  (flexedProp: FlexGrow, theme: ThemeInterface, cssKey: 'flex-grow'): FlattenSimpleInterpolation;
  (flexedProp: FlexOrder, theme: ThemeInterface, cssKey: 'order'): FlattenSimpleInterpolation;
  (flexedProp: FlexShrink, theme: ThemeInterface, cssKey: 'flex-shrink'): FlattenSimpleInterpolation;
}

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

  return css``;
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
