import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled, { css } from 'styled-components';

import { Box } from '../../Box';

import { PanelContentProps } from './Contents';

export const StyledPanelContentsWrapper = styled(Box)<Omit<PanelContentProps, 'children'>>`
  ${({ theme, scrollable }) =>
    scrollable &&
    css`
      background-image: linear-gradient(
          0deg,
          ${theme.colors.secondary40} 0%,
          transparent 1px,
          transparent 100%
        ),
        linear-gradient(180deg, ${theme.colors.secondary40} 0%, transparent 1px, transparent 100%);
      overflow: auto;
    `}

  ${({ height }) =>
    height &&
    css`
      height: ${height};
    `}

  ${({ theme, padded }) =>
    padded !== true &&
    css`
      margin-inline: -${theme.spacing.medium};
    `}

  ${({ theme }) => theme.breakpoints.tablet} {
    ${({ theme, padded }) =>
      padded !== true &&
      css`
        margin-inline: -${theme.spacing.xLarge};
      `}
  }
`;
StyledPanelContentsWrapper.defaultProps = {
  theme: defaultTheme,
  padded: true,
  scrollable: false,
  height: 'auto',
};

export const StyledPanelContents = styled(Box)<Omit<PanelContentProps, 'children'>>`
  min-height: 100%;
  ${({ theme, scrollable }) =>
    scrollable &&
    css`
      border-block-start: ${theme.border.box};
      border-block-end: ${theme.border.box};

      border-block-start-color: ${theme.colors.white};
      border-block-end-color: ${theme.colors.white};
    `}
`;
StyledPanelContents.defaultProps = {
  theme: defaultTheme,
  padded: true,
  scrollable: false,
  height: 'auto',
};
