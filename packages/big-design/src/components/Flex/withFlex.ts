import {
  Breakpoints,
  breakpointsOrder,
  CSSRules,
  ThemeInterface,
} from '@bigcommerce/big-design-theme';
import { css } from 'styled-components';

import { FlexedItemProps, FlexedOverload, FlexedProps, TransientFlexedItemProps } from './types';

export const withFlexedContainer = () => css<FlexedProps>`
  ${({ alignContent, theme }) =>
    alignContent && getFlexedStyles(alignContent, theme, 'align-content')};
  ${({ alignItems, theme }) => alignItems && getFlexedStyles(alignItems, theme, 'align-items')};
  ${({ flexDirection, theme }) =>
    flexDirection && getFlexedStyles(flexDirection, theme, 'flex-direction')};
  ${({ flexGap, theme }) => flexGap && getFlexedStyles(flexGap, theme, 'gap')};
  ${({ flexColumnGap, theme }) =>
    flexColumnGap && getFlexedStyles(flexColumnGap, theme, 'column-gap')};
  ${({ flexRowGap, theme }) => flexRowGap && getFlexedStyles(flexRowGap, theme, 'row-gap')};
  ${({ flexWrap, theme }) => flexWrap && getFlexedStyles(flexWrap, theme, 'flex-wrap')};
  ${({ justifyContent, theme }) =>
    justifyContent && getFlexedStyles(justifyContent, theme, 'justify-content')};
`;

export const withFlexedItems = () => css<TransientFlexedItemProps>`
  ${({ $alignSelf, theme }) => $alignSelf && getFlexedStyles($alignSelf, theme, 'align-self')};
  ${({ $flexBasis, theme }) => $flexBasis && getFlexedStyles($flexBasis, theme, 'flex-basis')};
  ${({ $flexGrow, theme }) =>
    typeof $flexGrow !== 'undefined' && getFlexedStyles($flexGrow, theme, 'flex-grow')};
  ${({ $flexOrder, theme }) =>
    typeof $flexOrder !== 'undefined' && getFlexedStyles($flexOrder, theme, 'order')};
  ${({ $flexShrink, theme }) =>
    typeof $flexShrink !== 'undefined' && getFlexedStyles($flexShrink, theme, 'flex-shrink')};
`;

// Rename-and-keep helper: maps FlexedItemProps' public fields to their transient
// ($-prefixed) names for hand-off to a tag-target styled component. withFlexedItems()
// has a single consumer (Flex/Item/styled.tsx), so unlike the shared margin/padding/
// display helpers, no dual-read shim is needed here.
export function toTransientFlexedItemProps(props: FlexedItemProps): TransientFlexedItemProps {
  const { alignSelf, flexBasis, flexGrow, flexOrder, flexShrink } = props;

  return {
    $alignSelf: alignSelf,
    $flexBasis: flexBasis,
    $flexGrow: flexGrow,
    $flexOrder: flexOrder,
    $flexShrink: flexShrink,
  };
}

const getFlexedStyles: FlexedOverload = (
  flexedProp: any,
  theme: ThemeInterface,
  cssKey: any,
): CSSRules => {
  if (typeof flexedProp === 'object') {
    return getResponsiveFlex(flexedProp, theme, cssKey);
  }

  if (typeof flexedProp === 'string' || typeof flexedProp === 'number') {
    return getSimpleFlex(flexedProp, cssKey);
  }

  return [];
};

const getSimpleFlex = (flexedProp: string | number, cssKey: string): CSSRules => css`
  ${cssKey}: ${flexedProp}
`;

const getResponsiveFlex = (flexedProp: any, theme: ThemeInterface, cssKey: string): CSSRules[] => {
  const breakpointKeys = Object.keys(flexedProp).sort(
    (firstBreakpoint, secondBreakpoint) =>
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      breakpointsOrder.indexOf(firstBreakpoint as keyof Breakpoints) -
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      breakpointsOrder.indexOf(secondBreakpoint as keyof Breakpoints),
  );

  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  return (breakpointKeys as Array<keyof Breakpoints>).map(
    (breakpointKey) => css`
      ${theme.breakpoints[breakpointKey]} {
        ${''}
        ${getSimpleFlex(flexedProp[breakpointKey], cssKey)}
      }
    `,
  );
};
