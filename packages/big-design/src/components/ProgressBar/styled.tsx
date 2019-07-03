import styled, { css, keyframes } from 'styled-components';

import { defaultTheme } from '../../theme';

import { ProgressBarProps } from './ProgressBar';

/* Linear */

export const StyledProgressBarLinear = styled.div<ProgressBarProps>`
  background-color: ${({ theme }) => theme.colors.secondary20};
  height: 4px;
  width: 100%;
`;

StyledProgressBarLinear.defaultProps = { theme: defaultTheme };

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
          animation: ${slide} 3s ease-in-out infinite;
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

/* Circular */

export const StyledProgressBarCircular = styled.svg`
  height: 80px;
  width: 80px;
`;

StyledProgressBarCircular.defaultProps = { theme: defaultTheme };

export const StyledCircle = styled.circle<ProgressBarProps>`
  stroke-width: 8;
  stroke: ${({ theme }) => theme.colors.secondary20};
  fill: transparent;
  r: 32;
  cx: 40;
  cy: 40;
`;

StyledCircle.defaultProps = { theme: defaultTheme };

const circumference = 32 * 2 * Math.PI;

function setProgress(percent: number) {
  return circumference - (percent / 100) * circumference;
}

export const StyledFillerCircle = styled(StyledCircle).attrs(props => ({ circumference, setProgress }))`
  stroke-dasharray: ${props => `${props.circumference} ${props.circumference}`};
  stroke-dashoffset: ${props => (props.percent ? `${props.setProgress(props.percent)}` : 0)};
  stroke: ${({ theme }) => theme.colors.primary};
  transform-origin: 50% 50%;
  transform: rotate(-90deg);
  transition: stroke-dashoffset 0.35s;
`;
