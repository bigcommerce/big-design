import styled, { css, keyframes } from 'styled-components';

import { defaultTheme } from '../../theme';

import { ProgressBarProps } from './ProgressBar';

export const StyledProgressBarLinear = styled.div<ProgressBarProps>`
  background-color: ${({ theme }) => theme.colors.secondary20};
  height: 4px;
  width: 100%;
`;

StyledProgressBarLinear.defaultProps = { theme: defaultTheme };

export const StyledProgressBarCircular = styled.div<ProgressBarProps>``;

StyledProgressBarCircular.defaultProps = { theme: defaultTheme };

export const StyledFillerLinear = styled.div<ProgressBarProps>`
  background-color: ${({ theme }) => theme.colors.primary};
  height: 100%;

  ${({ behavior }) =>
    behavior === 'determinant'
      ? css<ProgressBarProps>`
          transition: width 0.2s ease-in;
          // fix this
          width: ${innerProps => `${innerProps.percent}%`};
        `
      : css`
          animation: ${slide} 3s linear infinite;
          position: relative;
          width: 10%;
        `};
`;

const slide = keyframes`
  0% {
    left: -10%;;
  }
  100% {
    left: 100%;
  }
`;

StyledFillerLinear.defaultProps = { theme: defaultTheme };

export const StyledFillerCircular = styled.div<ProgressBarProps>``;

StyledFillerCircular.defaultProps = { theme: defaultTheme };
