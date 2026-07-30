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

// MIGRATION SHIM (LTRAC-1396): reads both the public (`padding`) and transient
// (`$padding`) prop names so components can be migrated to transient props one PR at
// a time while unconverted consumers keep rendering identically. Once every consumer
// passes `$`-prefixed props, drop the `?? padding*` fallbacks (and `PaddingProps` from
// the generic) to leave a pure transient read.
export const withPaddings = () => css<PaddingProps & TransientPaddingProps>`
  ${({ padding, $padding, theme }) => {
    const value = $padding ?? padding;

    return value && getSpacingStyles(value, theme, 'padding');
  }};
  ${({ paddingTop, $paddingTop, theme }) => {
    const value = $paddingTop ?? paddingTop;

    return value && getSpacingStyles(value, theme, 'padding-top');
  }};
  ${({ paddingRight, $paddingRight, theme }) => {
    const value = $paddingRight ?? paddingRight;

    return value && getSpacingStyles(value, theme, 'padding-right');
  }};
  ${({ paddingBottom, $paddingBottom, theme }) => {
    const value = $paddingBottom ?? paddingBottom;

    return value && getSpacingStyles(value, theme, 'padding-bottom');
  }};
  ${({ paddingLeft, $paddingLeft, theme }) => {
    const value = $paddingLeft ?? paddingLeft;

    return value && getSpacingStyles(value, theme, 'padding-left');
  }};
  ${({ paddingVertical, $paddingVertical, theme }) => {
    const value = $paddingVertical ?? paddingVertical;

    return value && getSpacingStyles(value, theme, 'padding-top', 'padding-bottom');
  }};
  ${({ paddingHorizontal, $paddingHorizontal, theme }) => {
    const value = $paddingHorizontal ?? paddingHorizontal;

    return value && getSpacingStyles(value, theme, 'padding-left', 'padding-right');
  }};
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
