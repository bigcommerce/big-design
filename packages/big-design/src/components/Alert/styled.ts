import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled, { css, DefaultTheme, StyledComponent } from 'styled-components';

import { Grid } from '../Grid';
import { Link } from '../Link';
import { TextProps } from '../Typography';
import { StyleableH4, StyleableSmall } from '../Typography/private';

import { AlertProps } from './Alert';

export const StyledAlert = styled(Grid)<AlertProps>`
  background-color: ${({ theme }) => theme.colors.white};
  grid-template-areas: 'icon messages';

  ${({ onDismiss }) =>
    onDismiss
      ? css`
          grid-template-areas: 'icon messages close';
        `
      : css`
          grid-template-areas: 'icon messages';
        `}

  ${({ theme, variant }) =>
    variant === 'alert' &&
    css`
      ${theme.shadow.floating}

      grid-gap: ${theme.spacing.small};
      grid-template-columns: ${theme.spacing.xLarge} 1fr ${theme.spacing.xLarge};
      max-width: ${theme.helpers.remCalc(456)};
      padding: ${theme.spacing.small};
      position: fixed;
      right: ${theme.helpers.remCalc(16)};
      top: ${theme.helpers.remCalc(16)};
      z-index: ${theme.zIndex.fixed};
  `}

  ${({ theme, variant }) =>
    variant === 'message' &&
    css`
      ${theme.shadow.raised}

      grid-gap: ${theme.spacing.small};
      grid-template-columns: ${theme.spacing.xLarge} 1fr ${theme.spacing.xLarge};
      padding: ${theme.spacing.small};
  `}

  ${({ theme, variant }) =>
    variant === 'inline' &&
    css`
      border: ${theme.border.box};
      border-radius: ${theme.borderRadius.normal};
      grid-gap: ${theme.spacing.xSmall};
      grid-template-columns: ${theme.spacing.large} 1fr ${theme.spacing.large};
      padding: ${theme.spacing.xSmall};
    `}

  ${({ theme, type }) =>
    type === 'success' &&
    css`
      border-left: 4px solid ${theme.colors.success};
    `};

  ${({ theme, type }) =>
    type === 'error' &&
    css`
      border-left: 4px solid ${theme.colors.danger};
    `};

  ${({ theme, type }) =>
    type === 'warning' &&
    css`
      border-left: 4px solid ${theme.colors.warning50};
    `};

  ${({ theme, type }) =>
    type === 'info' &&
    css`
      border-left: 4px solid ${theme.colors.primary60};
    `};
`;

export const StyledHeadline = styled(StyleableH4)<Pick<AlertProps, 'variant'>>`
  line-height: ${({ theme }) => theme.helpers.remCalc(16)};
  margin-bottom: ${({ theme }) => theme.spacing.xxSmall};

  ${({ theme, variant }) =>
    variant === 'inline' &&
    css`
      font-size: ${theme.typography.fontSize.small};
      line-height: ${theme.spacing.large};
      margin-bottom: ${theme.spacing.none};
    `}
`;

export const StyledMessage = styled(StyleableSmall).attrs({ as: 'span' })`
  color: ${({ theme }) => theme.colors.secondary70};
  vertical-align: middle;
` as StyledComponent<'span', DefaultTheme, TextProps>;

export const StyledLink = styled(Link)`
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  vertical-align: middle;
`;

StyledAlert.defaultProps = { theme: defaultTheme };
StyledHeadline.defaultProps = { theme: defaultTheme };
