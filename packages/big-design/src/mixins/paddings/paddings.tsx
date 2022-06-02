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

export const withPaddings = () => css<PaddingProps>`
  ${({ padding, theme }) => padding && getSpacingStyles(padding, theme, 'padding')};
  ${({ paddingTop, theme }) => paddingTop && getSpacingStyles(paddingTop, theme, 'padding-top')};
  ${({ paddingRight, theme }) =>
    paddingRight && getSpacingStyles(paddingRight, theme, 'padding-right')};
  ${({ paddingBottom, theme }) =>
    paddingBottom && getSpacingStyles(paddingBottom, theme, 'padding-bottom')};
  ${({ paddingLeft, theme }) =>
    paddingLeft && getSpacingStyles(paddingLeft, theme, 'padding-left')};
  ${({ paddingVertical, theme }) =>
    paddingVertical && getSpacingStyles(paddingVertical, theme, 'padding-top', 'padding-bottom')};
  ${({ paddingHorizontal, theme }) =>
    paddingHorizontal &&
    getSpacingStyles(paddingHorizontal, theme, 'padding-left', 'padding-right')};
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
