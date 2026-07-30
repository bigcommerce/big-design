import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import { clearFix } from 'polished';
import styled, { css } from 'styled-components';

import { withDisplay, withMargins, withPaddings } from '../../helpers';
import { TransientDisplayProps } from '../../helpers/display/types';
import { TransientMarginProps } from '../../helpers/margins/margins';
import { TransientPaddingProps } from '../../helpers/paddings/paddings';

import { BoxProps } from './Box';

// Internal-only prop shape: bespoke system props are `$`-prefixed so styled-components
// never forwards them to the underlying DOM node. The public `BoxProps` is unchanged;
// `Box.tsx` maps its public props to these transient names before rendering.
interface StyledBoxProps
  extends TransientDisplayProps,
    TransientMarginProps,
    TransientPaddingProps {
  $backgroundColor?: BoxProps['backgroundColor'];
  $shadow?: BoxProps['shadow'];
  $border?: BoxProps['border'];
  $borderTop?: BoxProps['borderTop'];
  $borderRight?: BoxProps['borderRight'];
  $borderBottom?: BoxProps['borderBottom'];
  $borderLeft?: BoxProps['borderLeft'];
  $borderRadius?: BoxProps['borderRadius'];
  $clearfix?: BoxProps['clearfix'];
  $zIndex?: BoxProps['zIndex'];
}

export const StyledBox = styled.div<StyledBoxProps>`
  ${withDisplay()}
  ${withMargins()}
  ${withPaddings()}
  box-sizing: border-box;

  ${({ $clearfix }) => $clearfix && clearFix()};

  ${({ $backgroundColor, theme }) =>
    $backgroundColor &&
    css`
      background-color: ${theme.colors[$backgroundColor]};
    `};

  ${({ $shadow, theme }) => $shadow && theme.shadow[$shadow]};

  ${({ $border, theme }) =>
    $border &&
    css`
      border: ${theme.border[$border]};
    `};

  ${({ $borderTop, theme }) =>
    $borderTop &&
    css`
      border-top: ${theme.border[$borderTop]};
    `};

  ${({ $borderRight, theme }) =>
    $borderRight &&
    css`
      border-right: ${theme.border[$borderRight]};
    `};

  ${({ $borderBottom, theme }) =>
    $borderBottom &&
    css`
      border-bottom: ${theme.border[$borderBottom]};
    `};

  ${({ $borderLeft, theme }) =>
    $borderLeft &&
    css`
      border-left: ${theme.border[$borderLeft]};
    `};

  ${({ $borderRadius, theme }) =>
    $borderRadius &&
    css`
      border-radius: ${theme.borderRadius[$borderRadius]};
    `};

  ${({ $zIndex, theme }) =>
    $zIndex &&
    css`
      z-index: ${theme.zIndex[$zIndex]};
    `};
`;

StyledBox.defaultProps = { theme: defaultTheme };
