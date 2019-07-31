import { breakpointsOrder, Breakpoints, ThemeInterface } from '@bigcommerce/big-design-theme';
import { css, FlattenSimpleInterpolation } from 'styled-components';

import { Responsive } from '../../types';

type SingleAlignContent =
  | 'normal'
  | 'start'
  | 'end'
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'baseline'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | 'stretch';
type ResponsiveAlignContent = Responsive<SingleAlignContent>;
type AlignContent = SingleAlignContent | ResponsiveAlignContent;

type SingleAlignItems =
  | 'normal'
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'start'
  | 'end'
  | 'self-start'
  | 'self-end'
  | 'baseline'
  | 'stretch';
type ResponsiveAlignItems = Responsive<SingleAlignItems>;
type AlignItems = SingleAlignItems | ResponsiveAlignItems;

type SingleAlignSelf =
  | 'auto'
  | 'normal'
  | 'self-start'
  | 'self-end'
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'baseline'
  | 'stretch';
type ResponsiveAlignSelf = Responsive<SingleAlignSelf>;
type AlignSelf = SingleAlignSelf | ResponsiveAlignSelf;

type SingleFlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';
type ResponsiveFlexDirection = Responsive<SingleFlexDirection>;
type FlexDirection = SingleFlexDirection | ResponsiveFlexDirection;

type SingleFlexWrap = 'nowrap' | 'wrap' | 'wrap-reversed';
type ResponsiveFlexWrap = Responsive<SingleFlexWrap>;
type FlexWrap = SingleFlexWrap | ResponsiveFlexWrap;

type SingleJustifyContent =
  | 'normal'
  | 'start'
  | 'end'
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'left'
  | 'right'
  | 'baseline'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | 'stretch';
type ResponsiveJustifyContent = Responsive<SingleJustifyContent>;
type JustifyContent = SingleJustifyContent | ResponsiveJustifyContent;

type SingleFlexBasis = 'auto' | 'fill' | 'min-content' | 'max-content' | 'fit-content' | 'content' | string;
type ResponsiveFlexBasis = Responsive<SingleFlexBasis>;
type FlexBasis = SingleFlexBasis | ResponsiveFlexBasis;

type SingleFlexGrow = number;
type ResponsiveFlexGrow = Responsive<SingleFlexGrow>;
type FlexGrow = SingleFlexGrow | ResponsiveFlexGrow;

type SingleFlexOrder = number;
type ResponsiveFlexOrder = Responsive<SingleFlexOrder>;
type FlexOrder = SingleFlexOrder | ResponsiveFlexOrder;

type SingleFlexShrink = number;
type ResponsiveFlexShrink = Responsive<SingleFlexShrink>;
type FlexShrink = SingleFlexShrink | ResponsiveFlexShrink;

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
