import { Breakpoints, Spacing } from '@bigcommerce/big-design-theme';
import { css } from 'styled-components';

import { getSpacingStyles } from '../spacings';

type SingleMarginProp = keyof Spacing;
type ResponsiveMarginProp = { [key in keyof Breakpoints]?: keyof Spacing };
type MarginProp = SingleMarginProp | ResponsiveMarginProp;

export type MarginProps = Partial<{
  margin: MarginProp;
  marginTop: MarginProp;
  marginRight: MarginProp;
  marginBottom: MarginProp;
  marginLeft: MarginProp;
  marginVertical: MarginProp;
  marginHorizontal: MarginProp;
}>;

export const withMargins = () => css<MarginProps>`
  ${({ margin, theme }) => margin && getSpacingStyles(margin, theme, 'margin')};
  ${({ marginTop, theme }) => marginTop && getSpacingStyles(marginTop, theme, 'margin-top')};
  ${({ marginRight, theme }) => marginRight && getSpacingStyles(marginRight, theme, 'margin-right')};
  ${({ marginBottom, theme }) => marginBottom && getSpacingStyles(marginBottom, theme, 'margin-bottom')};
  ${({ marginLeft, theme }) => marginLeft && getSpacingStyles(marginLeft, theme, 'margin-left')};
  ${({ marginVertical, theme }) =>
    marginVertical && getSpacingStyles(marginVertical, theme, 'margin-top', 'margin-bottom')};
  ${({ marginHorizontal, theme }) =>
    marginHorizontal && getSpacingStyles(marginHorizontal, theme, 'margin-left', 'margin-right')};
`;
