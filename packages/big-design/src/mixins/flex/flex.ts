import { breakpointsOrder, Breakpoints, ThemeInterface } from '@bigcommerce/big-design-theme';
import { css, FlattenSimpleInterpolation } from 'styled-components';

import {
  AlignContent,
  AlignItems,
  AlignSelf,
  FlexBasis,
  FlexDirection,
  FlexGrow,
  FlexShrink,
  FlexWrap,
  JustifyContent,
  Order,
} from './props';

export type FlexMixin = Partial<{
  alignContent: AlignContent;
  alignItems: AlignItems;
  direction: FlexDirection;
  wrap: FlexWrap;
  justifyContent: JustifyContent;
}>;

export type FlexItemMixin = Partial<{
  alignSelf: AlignSelf;
  basis: FlexBasis;
  grow: FlexGrow;
  order: Order;
  shrink: FlexShrink;
}>;

export const withFlexedContainer = () => css<FlexMixin>`
  ${({ alignContent, theme }) => alignContent && getFlexedStyles(alignContent, theme, 'align-content')};
  ${({ alignItems, theme }) => alignItems && getFlexedStyles(alignItems, theme, 'align-items')};
  ${({ direction, theme }) => direction && getFlexedStyles(direction, theme, 'flex-direction')};
  ${({ wrap, theme }) => wrap && getFlexedStyles(wrap, theme, 'flex-wrap')};
  ${({ justifyContent, theme }) => justifyContent && getFlexedStyles(justifyContent, theme, 'justify-content')};
`;

export const withFlexedItems = () => css<FlexItemMixin>`
  ${({ alignSelf, theme }) => alignSelf && getFlexedStyles(alignSelf, theme, 'align-self')};
  ${({ basis, theme }) => basis && getFlexedStyles(basis, theme, 'flex-basis')};
  ${({ grow, theme }) => grow && getFlexedStyles(grow, theme, 'flex-grow')};
  ${({ order, theme }) => order && getFlexedStyles(order, theme, 'order')};
  ${({ shrink, theme }) => shrink && getFlexedStyles(shrink, theme, 'flex-shrink')};
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
  (flexedProp: Order, theme: ThemeInterface, cssKey: 'order'): FlattenSimpleInterpolation;
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
    (a, b) => breakpointsOrder.indexOf(a as keyof Breakpoints) - breakpointsOrder.indexOf(b as keyof Breakpoints),
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
