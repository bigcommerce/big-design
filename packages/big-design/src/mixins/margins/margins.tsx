import { Spacing } from '@bigcommerce/big-design-theme';
import { css } from 'styled-components';

import { WithTransients } from 'src/utils/withTransients';

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

export const withMargins = () => css<WithTransients<MarginProps>>`
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
