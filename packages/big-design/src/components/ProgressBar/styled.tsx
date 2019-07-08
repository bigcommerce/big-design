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

StyledFillerLinear.defaultProps = { theme: defaultTheme };

/* Circular */

export const StyledProgressBarCircular = styled.svg<ProgressBarProps>`
  ${({ size }) => css`
    height: ${size ? `${sizeMap[size].height}px` : 0};
    width: ${size ? `${sizeMap[size].height}px` : 0};
  `}
`;

export const StyledCircle = styled.circle.attrs(({ size }: ProgressBarProps) => ({
  cx: size ? sizeMap[size].cx : 0,
  cy: size ? sizeMap[size].cy : 0,
  r: size ? sizeMap[size].r : 0,
}))<ProgressBarProps>`
  fill: transparent;
  stroke-width: ${({ size }) => (size ? sizeMap[size].strokeWidth : 0)};
  stroke: ${({ theme }) => theme.colors.secondary20};
`;

StyledCircle.defaultProps = { theme: defaultTheme };

function setProgress(percent: number, size: 'large' | 'medium' | 'small' | 'xSmall' | undefined) {
  return size ? sizeMap[size].circumference - (percent / 100) * sizeMap[size].circumference : 0;
}

export const StyledFillerCircle = styled(StyledCircle)<ProgressBarProps>`
  stroke-dasharray: ${({ size }) =>
    `${size ? sizeMap[size].circumference : 0} ${size ? sizeMap[size].circumference : 0}`};
  stroke: ${({ theme }) => theme.colors.primary};
  transform-origin: 50% 50%;

  ${({ behavior, percent, size }) =>
    behavior === 'determinant'
      ? css`
          stroke-dashoffset: ${() => (percent ? `${setProgress(percent, size)}` : 0)};
          transform: rotate(-90deg);
          transition: stroke-dashoffset 0.35s;
        `
      : css`
          animation: ${spin} 1s linear infinite;
          stroke-dashoffset: ${setProgress(75, size)};
        `};
`;

export const StyledText = styled.text.attrs(() => ({
  dominantBaseline: 'central',
  textAnchor: 'middle',
  x: '50%',
  y: '50%',
}))<ProgressBarProps>`
  font-size: ${({ size }) => (size === 'large' ? '20px' : '14px')};
  font-weight: ${({ size }) => (size === 'large' ? '600' : 'normal')};
`;

/* Keyframes */

const loading = keyframes`
  from {
    left: -10%;;
  }
  to {
    left: 100%;
  }
`;

const spin = keyframes`
  to {
    transform: rotate(360deg)
  }
`;

const sizeMap = {
  large: {
    height: 80,
    width: 80,
    strokeWidth: 8,
    cx: 40,
    cy: 40,
    r: 32,
    circumference: 32 * 2 * Math.PI,
  },
  medium: {
    height: 48,
    width: 48,
    strokeWidth: 4,
    cx: 24,
    cy: 24,
    r: 20,
    circumference: 20 * 2 * Math.PI,
  },
  small: {
    height: 32,
    width: 32,
    strokeWidth: 4,
    cx: 16,
    cy: 16,
    r: 12,
    circumference: 12 * 2 * Math.PI,
  },
  xSmall: {
    height: 16,
    width: 16,
    strokeWidth: 2,
    cx: 8,
    cy: 8,
    r: 6,
    circumference: 6 * 2 * Math.PI,
  },
};
