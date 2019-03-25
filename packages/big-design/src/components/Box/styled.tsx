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
    `}

  ${({ elevation, theme }) => elevation && theme.elevation[elevation]}
  ${({ border, theme }) => border && theme.border[border]}
  ${({ borderRadius, theme }) => borderRadius && theme.borderRadius[borderRadius]}
`;

StyledBox.defaultProps = { theme: defaultTheme };
