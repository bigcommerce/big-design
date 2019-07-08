import { rem } from 'polished';
import styled, { css, keyframes } from 'styled-components';

import { defaultTheme } from '../../theme';
import { ErrorIcon, SuccessIcon } from '../Icons';

import { circumferences, sizes, strokeWidths } from './constants';
import { ProgressCircleProps, ProgressCircleSizes } from './ProgressCircle';

/* Circular */

export const StyledProgressBarCircular = styled.svg<ProgressCircleProps>`
  ${({ size }) => css`
    height: ${rem(sizes[size])};
    width: ${rem(sizes[size])};
  `}
`;

export const StyledCircle = styled.circle.attrs(({ size }: ProgressCircleProps) => ({
  cx: rem(sizes[size] / 2),
  cy: rem(sizes[size] / 2),
  r: rem(sizes[size] / 2 - strokeWidths[size] / 2),
}))<ProgressCircleProps>`
  fill: transparent;
  stroke-width: ${({ size }) => rem(strokeWidths[size])};
  stroke: ${({ theme }) => theme.colors.secondary20};
`;

StyledCircle.defaultProps = { theme: defaultTheme };

function setProgress(percent: number, size: ProgressCircleSizes) {
  return circumferences[size] - (percent / 100) * circumferences[size];
}

export const StyledFillerCircle = styled(StyledCircle)<ProgressCircleProps>`
  stroke-dasharray: ${({ size }) => `${circumferences[size]} ${circumferences[size]}`};
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
}))<ProgressCircleProps>`
  font-size: ${({ size }) => (size === 'large' ? rem(20) : rem(14))};
  font-weight: ${({ size }) => (size === 'large' ? '600' : 'normal')};
`;

export const StyledErrorIcon = styled(ErrorIcon)`
  color: ${({ theme }) => theme.colors.danger};
`;

StyledErrorIcon.defaultProps = { theme: defaultTheme };

export const StyledSuccessIcon = styled(SuccessIcon)`
  color: ${({ theme }) => theme.colors.success};
`;

StyledSuccessIcon.defaultProps = { theme: defaultTheme };

const spin = keyframes`
  to {
    transform: rotate(360deg)
  }
`;
