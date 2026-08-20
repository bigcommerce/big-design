import type { Spacing } from '@bigcommerce/big-design-theme';
import { css } from 'styled-components';

import type { ResponsiveProp } from '../../types';
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

export const withMargins = () => css<TransientMarginProps>`
  ${({ $margin, theme }) => $margin && getSpacingStyles($margin, theme, 'margin')};
  ${({ $marginTop, theme }) => $marginTop && getSpacingStyles($marginTop, theme, 'margin-top')};
  ${({ $marginRight, theme }) =>
    $marginRight && getSpacingStyles($marginRight, theme, 'margin-right')};
  ${({ $marginBottom, theme }) =>
    $marginBottom && getSpacingStyles($marginBottom, theme, 'margin-bottom')};
  ${({ $marginLeft, theme }) => $marginLeft && getSpacingStyles($marginLeft, theme, 'margin-left')};
  ${({ $marginVertical, theme }) =>
    $marginVertical && getSpacingStyles($marginVertical, theme, 'margin-top', 'margin-bottom')};
  ${({ $marginHorizontal, theme }) =>
    $marginHorizontal && getSpacingStyles($marginHorizontal, theme, 'margin-left', 'margin-right')};
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
