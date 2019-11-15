import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled, { css } from 'styled-components';

import { withTransition } from '../../mixins/transitions';

import { ProgressBarProps } from './ProgressBar';

export const StyledProgressBar = styled.div`
  background-color: ${({ theme }) => theme.colors.secondary20};
  height: ${({ theme }) => theme.spacing.xxSmall};
  overflow: hidden;
  width: 100%;
`;

export const StyledProgressBarFiller = styled.div<ProgressBarProps>`
  background-color: ${({ theme }) => theme.colors.primary};
  height: 100%;
  overflow: hidden;

  ${({ percent, theme }) =>
    typeof percent === 'number'
      ? css`
          ${withTransition(['width', 'background-color', 'height'])}
          width: ${percent}%;
        `
      : css`
          animation: ${theme.keyframes.loading} 2s ease-in-out infinite;
          position: relative;
          width: 6.25%;
        `};
`;

StyledProgressBar.defaultProps = { theme: defaultTheme };
StyledProgressBarFiller.defaultProps = { theme: defaultTheme };
