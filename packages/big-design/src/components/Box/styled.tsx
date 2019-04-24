import styled, { css } from 'styled-components';

import { withMargins, withPaddings } from '../../mixins';
import { defaultTheme } from '../../theme';

import { BoxProps } from './Box';

export const StyledBox = styled.div<BoxProps>`
  ${withMargins()};
  ${withPaddings()};

  ${({ backgroundColor, theme }) =>
    backgroundColor &&
    css`
      background-color: ${theme.colors[backgroundColor]};
    `};

  ${({ elevation, theme }) => elevation && theme.elevation[elevation]};

  ${({ border, theme }) =>
    border &&
    css`
      border: ${theme.border[border]};
    `};

  ${({ borderTop, theme }) =>
    borderTop &&
    css`
      border-top: ${theme.border[borderTop]};
    `};

  ${({ borderRight, theme }) =>
    borderRight &&
    css`
      border-right: ${theme.border[borderRight]};
    `};

  ${({ borderBottom, theme }) =>
    borderBottom &&
    css`
      border-bottom: ${theme.border[borderBottom]};
    `};

  ${({ borderLeft, theme }) =>
    borderLeft &&
    css`
      border-left: ${theme.border[borderLeft]};
    `};

  ${({ borderRadius, theme }) =>
    borderRadius &&
    css`
      border-radius: ${theme.borderRadius[borderRadius]};
    `};
`;

StyledBox.defaultProps = { theme: defaultTheme };
