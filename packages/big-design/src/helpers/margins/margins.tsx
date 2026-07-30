import { Spacing } from '@bigcommerce/big-design-theme';
import { css } from 'styled-components';

import { ResponsiveProp } from '../../types';
import { getSpacingStyles } from '../spacings';

type MarginProp = ResponsiveProp<keyof Spacing | 'auto'>;

export type MarginProps = Partial<{
  margin: MarginProp;
  marginTop: MarginProp;
  marginRight: MarginProp;
  marginBottom: MarginProp;
  marginLeft: MarginProp;
  marginVertical: MarginProp;
  marginHorizontal: MarginProp;
}>;

// Internal, transient (`$`-prefixed) counterpart of `MarginProps`. styled-components
// never forwards `$`-prefixed props to the DOM, so tag-target styled components read
// these instead of the public names to avoid leaking them onto real DOM nodes.
export type TransientMarginProps = Partial<{
  $margin: MarginProp;
  $marginTop: MarginProp;
  $marginRight: MarginProp;
  $marginBottom: MarginProp;
  $marginLeft: MarginProp;
  $marginVertical: MarginProp;
  $marginHorizontal: MarginProp;
}>;

// MIGRATION SHIM (LTRAC-1396): reads both the public (`margin`) and transient
// (`$margin`) prop names so components can be migrated to transient props one PR at
// a time while unconverted consumers keep rendering identically. Once every consumer
// passes `$`-prefixed props, drop the `?? margin*` fallbacks (and `MarginProps` from
// the generic) to leave a pure transient read.
export const withMargins = () => css<MarginProps & TransientMarginProps>`
  ${({ margin, $margin, theme }) => {
    const value = $margin ?? margin;

    return value && getSpacingStyles(value, theme, 'margin');
  }};
  ${({ marginTop, $marginTop, theme }) => {
    const value = $marginTop ?? marginTop;

    return value && getSpacingStyles(value, theme, 'margin-top');
  }};
  ${({ marginRight, $marginRight, theme }) => {
    const value = $marginRight ?? marginRight;

    return value && getSpacingStyles(value, theme, 'margin-right');
  }};
  ${({ marginBottom, $marginBottom, theme }) => {
    const value = $marginBottom ?? marginBottom;

    return value && getSpacingStyles(value, theme, 'margin-bottom');
  }};
  ${({ marginLeft, $marginLeft, theme }) => {
    const value = $marginLeft ?? marginLeft;

    return value && getSpacingStyles(value, theme, 'margin-left');
  }};
  ${({ marginVertical, $marginVertical, theme }) => {
    const value = $marginVertical ?? marginVertical;

    return value && getSpacingStyles(value, theme, 'margin-top', 'margin-bottom');
  }};
  ${({ marginHorizontal, $marginHorizontal, theme }) => {
    const value = $marginHorizontal ?? marginHorizontal;

    return value && getSpacingStyles(value, theme, 'margin-left', 'margin-right');
  }};
`;

export function excludeMarginProps<T extends Record<string, any>>(
  props: T,
): Pick<T, Exclude<keyof T, keyof MarginProps>> {
  const {
    margin,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    marginVertical,
    marginHorizontal,
    ...rest
  } = props;

  return rest;
}

// Rename-and-keep counterpart of `excludeMarginProps`: maps the public margin props
// to their transient (`$`-prefixed) names for hand-off to a tag-target styled component.
export function toTransientMarginProps(props: MarginProps): TransientMarginProps {
  const {
    margin,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    marginVertical,
    marginHorizontal,
  } = props;

  return {
    $margin: margin,
    $marginTop: marginTop,
    $marginRight: marginRight,
    $marginBottom: marginBottom,
    $marginLeft: marginLeft,
    $marginVertical: marginVertical,
    $marginHorizontal: marginHorizontal,
  };
}
