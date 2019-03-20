import { css } from 'styled-components';

import { ThemeInterface } from '../../theme';
import { Breakpoints } from '../../theme/system/breakpoints';
import { Spacing } from '../../theme/system/spacing';

type SingleMarginProp = keyof Spacing;
type ResponsiveMarginProp = { [key in keyof Breakpoints]?: keyof Spacing };
type MarginProp = SingleMarginProp | ResponsiveMarginProp;
type MarginKey = 'margin' | 'margin-top' | 'margin-right' | 'margin-bottom' | 'margin-left';
type MarginObject = { [key in MarginKey]: string | 0 };

export interface MarginProps {
  margin?: MarginProp;
  marginTop?: MarginProp;
  marginRight?: MarginProp;
  marginBottom?: MarginProp;
  marginLeft?: MarginProp;
  marginVertical?: MarginProp;
  marginHorizontal?: MarginProp;
}

export const withMargins = () => css<MarginProps>`
  ${({ margin, theme }) => margin && getMargins(margin, theme, 'margin')};
  ${({ marginTop, theme }) => marginTop && getMargins(marginTop, theme, 'margin-top')};
  ${({ marginRight, theme }) => marginRight && getMargins(marginRight, theme, 'margin-right')};
  ${({ marginBottom, theme }) => marginBottom && getMargins(marginBottom, theme, 'margin-bottom')};
  ${({ marginLeft, theme }) => marginLeft && getMargins(marginLeft, theme, 'margin-left')};
  ${({ marginVertical, theme }) => marginVertical && getMargins(marginVertical, theme, 'margin-top', 'margin-bottom')};
  ${({ marginHorizontal, theme }) =>
    marginHorizontal && getMargins(marginHorizontal, theme, 'margin-left', 'margin-right')};
`;

function getMargins(margin: MarginProp, theme: ThemeInterface, ...marginKeys: MarginKey[]) {
  if (typeof margin === 'object') {
    return getResponsiveMargins(margin, theme, marginKeys);
  }

  if (typeof margin === 'string') {
    return getSimpleMargins(margin, theme, marginKeys);
  }

  return css``;
}

function getSimpleMargins(margin: SingleMarginProp, theme: ThemeInterface, marginKeys: MarginKey[]) {
  return marginKeys.reduce<MarginObject>(
    (acc, marginKey) => {
      acc[marginKey] = theme.spacing[margin];

      return acc;
    },
    {} as MarginObject,
  );
}

function getResponsiveMargins(responsiveMargin: ResponsiveMarginProp, theme: ThemeInterface, marginKeys: MarginKey[]) {
  return (Object.keys(responsiveMargin) as Array<keyof Breakpoints>).map(
    breakpointKey =>
      css`
        ${theme.breakpoints[breakpointKey]} {
          ${getSimpleMargins(responsiveMargin[breakpointKey] as keyof Spacing, theme, marginKeys)}
        }
      `,
  );
}
