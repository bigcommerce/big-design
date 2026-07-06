import { withDefaultTheme } from '@bigcommerce/big-design-theme';
import styled, { css } from 'styled-components';

import { withTransition } from '../../helpers/transitions';

import { ProgressBarProps } from './ProgressBar';

export const StyledProgressBar = styled.div.attrs(withDefaultTheme)`
  background-color: ${({ theme }) => theme.colors.secondary20};
  height: ${({ theme }) => theme.spacing.xxSmall};
  overflow: hidden;
  width: 100%;
`;

export const StyledProgressBarFiller = styled.div.attrs(withDefaultTheme)<ProgressBarProps>`
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
