import { rem } from 'polished';
import styled, { css, keyframes } from 'styled-components';

import { defaultTheme } from '../../theme';
import { ErrorIcon, SuccessIcon } from '../Icons';

import { circumferences, sizes, strokeWidths } from './constants';
import { ProgressCircleProps, ProgressCircleSizes } from './ProgressCircle';

export const StyledProgressCircle = styled.svg<ProgressCircleProps>`
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

function setFill(percent: number, size: ProgressCircleSizes) {
  return circumferences[size] - (percent / 100) * circumferences[size];
}

export const StyledCircleFiller = styled(StyledCircle)<ProgressCircleProps>`
  stroke-dasharray: ${({ size }) => `${circumferences[size]} ${circumferences[size]}`};
  stroke: ${({ theme }) => theme.colors.primary};
  transform-origin: 50% 50%;

  ${({ percent, size, status }) =>
    status === 'incomplete'
      ? css`
          stroke-dashoffset: ${typeof percent === 'number' ? `${setFill(percent, size)}` : 0};
          transform: rotate(-90deg);
          transition: stroke-dashoffset 0.35s;
        `
      : css`
          animation: ${spin(size)} 1s ease infinite;
          stroke-dashoffset: ${setFill(0, size)};
          transform: rotate(-90deg);
          transition: stroke-dashoffset 0.35s;
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

const spin = (size: ProgressCircleSizes) => keyframes`
  0% {
    stroke-dashoffset: ${setFill(0, size) * -1};
    transform: rotate(-90deg);
  }
  50% {
    stroke-dashoffset: ${setFill(37.5, size) * -1};
  }
  100% {
    stroke-dashoffset: ${setFill(0, size) * -1};
    transform: rotate(270deg);
  }
`;
