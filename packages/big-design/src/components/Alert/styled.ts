import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled, { css, DefaultTheme, StyledComponent } from 'styled-components';

import { getBorderStyle } from '../../utils';
import { StyleableButton } from '../Button/private';
import { Grid } from '../Grid';
import { Link } from '../Link';
import { TextProps } from '../Typography';
import { StyleableH4, StyleableSmall } from '../Typography/private';

import { AlertProps } from './Alert';

export const StyledAlert = styled(Grid)<AlertProps>`
  ${({ theme }) => theme.shadow.floating}

  animation: ${({ theme }) => theme.keyframes.fadeIn} .5s ease-in-out;
  background-color: ${({ theme }) => theme.colors.white};
  grid-gap: ${({ theme }) => theme.spacing.small};
  max-width: ${({ theme }) => theme.helpers.remCalc(456)};
  padding: ${({ theme }) => theme.spacing.small};
  position: fixed;
  right: ${({ theme }) => theme.helpers.remCalc(16)};
  top: ${({ theme }) => theme.helpers.remCalc(16)};
  z-index: ${({ theme }) => theme.zIndex.fixed};

  ${({ onClose }) =>
    onClose
      ? css`
          grid-template-areas: 'icon messages close';
          grid-template-columns: ${({ theme }) => `${theme.spacing.xLarge} 1fr ${theme.spacing.large}`};
        `
      : css`
          grid-template-areas: 'icon messages';
          grid-template-columns: ${({ theme }) => `${theme.spacing.xLarge} 1fr`};
        `}

  ${({ theme, type }) => type && getBorderStyle(type, theme)};
`;

export const StyledHeader = styled(StyleableH4)`
  line-height: ${({ theme }) => theme.helpers.remCalc(16)};
  margin-bottom: ${({ theme }) => theme.spacing.xxSmall};
`;

export const StyledMessageItem = styled(StyleableSmall).attrs({ as: 'span' })`
  color: ${({ theme }) => theme.colors.secondary70};
  vertical-align: middle;
` as StyledComponent<'span', DefaultTheme, TextProps>;

export const StyledLink = styled(Link)`
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  vertical-align: middle;
`;

export const StyledCloseButton = styled(StyleableButton)`
  background-color: ${({ theme }) => theme.colors.white};
  border: ${({ theme }) => theme.border.none};
  color: ${({ theme }) => theme.colors.secondary70};
  height: auto;
  padding: ${({ theme }) => theme.spacing.none};

  &:active {
    background-color: ${({ theme }) => theme.colors.secondary20};
  }

  &:focus {
    box-shadow: ${({ theme }) => `0 0 0 ${theme.spacing.xxSmall} ${theme.colors.secondary20}`};
  }

  &:hover:not(:active) {
    background-color: ${({ theme }) => theme.colors.secondary10};
  }
`;

StyledAlert.defaultProps = { theme: defaultTheme };
StyledHeader.defaultProps = { theme: defaultTheme };
StyledMessageItem.defaultProps = { theme: defaultTheme };
StyledLink.defaultProps = { theme: defaultTheme };
StyledCloseButton.defaultProps = { theme: defaultTheme };
