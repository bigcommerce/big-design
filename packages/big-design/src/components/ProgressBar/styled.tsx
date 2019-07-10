import { rem } from 'polished';
import styled, { css, keyframes } from 'styled-components';

import { defaultTheme } from '../../theme';

import { ProgressBarProps } from './ProgressBar';

export const StyledProgressBar = styled.div`
  background-color: ${({ theme }) => theme.colors.secondary20};
  height: ${rem(4)};
  overflow: hidden;
  width: 100%;
`;

StyledProgressBar.defaultProps = { theme: defaultTheme };

export const StyledProgressBarFiller = styled.div<ProgressBarProps>`
  background-color: ${({ theme }) => theme.colors.primary};
  height: 100%;

  ${({ percent, status }) =>
    status === 'incomplete'
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

StyledProgressBarFiller.defaultProps = { theme: defaultTheme };

const loading = keyframes`
  from {
    left: -10%;;
  }
  to {
    left: 100%;
  }

`;
