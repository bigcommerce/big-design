import { rem } from 'polished';
import styled, { css, keyframes } from 'styled-components';

import { defaultTheme } from '../../theme';

import { ProgressBarProps } from './ProgressBar';

export const StyledProgressBarLinear = styled.div`
  background-color: ${({ theme }) => theme.colors.secondary20};
  height: ${rem(4)};
  width: 100%;
`;

StyledProgressBarLinear.defaultProps = { theme: defaultTheme };

export const StyledFillerLinear = styled.div<ProgressBarProps>`
  background-color: ${({ theme }) => theme.colors.primary};
  height: 100%;

  ${({ percent, type }) =>
    type === 'determinant'
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

const loading = keyframes`
  from {
    left: -10%;;
  }
  to {
    left: 100%;
  }

`;
