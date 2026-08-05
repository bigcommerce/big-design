import { Spacing } from '@bigcommerce/big-design-theme';
import { css } from 'styled-components';

import { ResponsiveProp } from '../../types';
import { getSpacingStyles } from '../spacings';

type PaddingProp = ResponsiveProp<keyof Spacing>;

export type PaddingProps = Partial<{
  padding: PaddingProp;
  paddingTop: PaddingProp;
  paddingRight: PaddingProp;
  paddingBottom: PaddingProp;
  paddingLeft: PaddingProp;
  paddingVertical: PaddingProp;
  paddingHorizontal: PaddingProp;
}>;

// Internal, transient (`$`-prefixed) counterpart of `PaddingProps`. styled-components
// never forwards `$`-prefixed props to the DOM, so tag-target styled components read
// these instead of the public names to avoid leaking them onto real DOM nodes.
export type TransientPaddingProps = Partial<{
  $padding: PaddingProp;
  $paddingTop: PaddingProp;
  $paddingRight: PaddingProp;
  $paddingBottom: PaddingProp;
  $paddingLeft: PaddingProp;
  $paddingVertical: PaddingProp;
  $paddingHorizontal: PaddingProp;
}>;

export const withPaddings = () => css<TransientPaddingProps>`
  ${({ $padding, theme }) => $padding && getSpacingStyles($padding, theme, 'padding')};
  ${({ $paddingTop, theme }) => $paddingTop && getSpacingStyles($paddingTop, theme, 'padding-top')};
  ${({ $paddingRight, theme }) =>
    $paddingRight && getSpacingStyles($paddingRight, theme, 'padding-right')};
  ${({ $paddingBottom, theme }) =>
    $paddingBottom && getSpacingStyles($paddingBottom, theme, 'padding-bottom')};
  ${({ $paddingLeft, theme }) =>
    $paddingLeft && getSpacingStyles($paddingLeft, theme, 'padding-left')};
  ${({ $paddingVertical, theme }) =>
    $paddingVertical && getSpacingStyles($paddingVertical, theme, 'padding-top', 'padding-bottom')};
  ${({ $paddingHorizontal, theme }) =>
    $paddingHorizontal &&
    getSpacingStyles($paddingHorizontal, theme, 'padding-left', 'padding-right')};
`;

export function excludePaddingProps<T extends Record<string, any>>(
  props: T,
): Pick<T, Exclude<keyof T, keyof PaddingProps>> {
  const {
    padding,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
    paddingVertical,
    paddingHorizontal,
    ...rest
  } = props;

  return rest;
}

// Rename-and-keep counterpart of `excludePaddingProps`: maps the public padding props
// to their transient (`$`-prefixed) names for hand-off to a tag-target styled component.
export function toTransientPaddingProps(props: PaddingProps): TransientPaddingProps {
  const {
    padding,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
    paddingVertical,
    paddingHorizontal,
  } = props;

  return {
    $padding: padding,
    $paddingTop: paddingTop,
    $paddingRight: paddingRight,
    $paddingBottom: paddingBottom,
    $paddingLeft: paddingLeft,
    $paddingVertical: paddingVertical,
    $paddingHorizontal: paddingHorizontal,
  };
}
