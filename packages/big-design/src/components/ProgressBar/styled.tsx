import styled, { css, keyframes } from 'styled-components';

import { defaultTheme } from '../../theme';

import { ProgressBarProps } from './ProgressBar';

/* Linear */

export const StyledProgressBarLinear = styled.div`
  background-color: ${({ theme }) => theme.colors.secondary20};
  height: 4px;
  width: 100%;
`;

StyledProgressBarLinear.defaultProps = { theme: defaultTheme };

export const StyledFillerLinear = styled.div<ProgressBarProps>`
  background-color: ${({ theme }) => theme.colors.primary};
  height: 100%;

  ${({ behavior, percent }) =>
    behavior === 'determinant'
      ? css`
          transition: width 0.2s ease-in;
          width: ${() => `${percent}%`};
        `
      : css`
          animation: ${loading} 3s ease-in-out infinite;
          position: relative;
          width: 10%;
        `};
`;

const loading = keyframes`
  0% {
    left: -10%;;
  }
  100% {
    left: 100%;
  }
`;

StyledFillerLinear.defaultProps = { theme: defaultTheme };

/* Circular */

export const StyledProgressBarCircular = styled.svg`
  height: 80px;
  width: 80px;
`;

export const StyledCircle = styled.circle.attrs({ cx: 40, cy: 40, r: 32 })<ProgressBarProps>`
  fill: transparent;
  stroke-width: 8;
  stroke: ${({ theme }) => theme.colors.secondary20};
`;

StyledCircle.defaultProps = { theme: defaultTheme };

const circumference = 32 * 2 * Math.PI;

function setProgress(percent: number) {
  return circumference - (percent / 100) * circumference;
}

export const StyledFillerCircle = styled(StyledCircle)<ProgressBarProps>`
  stroke-dasharray: ${() => `${circumference} ${circumference}`};
  stroke-dashoffset: ${({ percent }) => (percent ? `${setProgress(percent)}` : 0)};
  stroke: ${({ theme }) => theme.colors.primary};
  transform-origin: 50% 50%;
  transform: rotate(-90deg);
  transition: stroke-dashoffset 0.35s;

  ${({ behavior, percent }) =>
    behavior === 'determinant'
      ? css`
          /* transition: width 0.2s ease-in; */
          /* width: ${() => `${percent}%`}; */
        `
      : css`
          animation: ${spin} 1s linear infinite;
          /* position: relative; */
          /* width: 10%; */
          stroke-dashoffset: ${setProgress(75)};
        `};
`;

const spin = keyframes`
  to {
    transform: rotate(270deg)
  }
`;
