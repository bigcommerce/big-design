import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled, { css, DefaultTheme, StyledComponent } from 'styled-components';

import { getBorderStyle } from '../../utils';
import { StyleableButton } from '../Button/private';
import { Grid } from '../Grid';
import { Link } from '../Link';
import { StyleableH4, StyleableSmall } from '../Typography/private';
import { TextProps } from '../Typography/types';

import { InlineAlertProps } from './InlineAlert';

export const StyledInlineAlert = styled(Grid)<InlineAlertProps>`
  border: ${({ theme }) => theme.border.box};
  border-radius: ${({ theme }) => theme.borderRadius.normal};
  grid-gap: ${({ theme }) => theme.spacing.xSmall};
  grid-template-columns: ${({ theme }) => `${theme.spacing.large} 1fr ${theme.spacing.large}`};
  padding: ${({ theme }) => theme.spacing.xSmall};

  ${({ onClose }) =>
    onClose
      ? css`
          grid-template-columns: ${({ theme }) => `${theme.spacing.large} 1fr ${theme.spacing.medium}`};
          grid-template-areas: 'icon messages close';
        `
      : css`
          grid-template-columns: ${({ theme }) => `${theme.spacing.large} 1fr`};
          grid-template-areas: 'icon messages';
        `}

  ${({ theme, type }) => type && getBorderStyle(type, theme)};
`;

export const StyledHeader = styled(StyleableH4)`
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  line-height: ${({ theme }) => theme.spacing.large};
  margin-bottom: ${({ theme }) => theme.spacing.none};
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

StyledInlineAlert.defaultProps = { theme: defaultTheme };
StyledHeader.defaultProps = { theme: defaultTheme };
StyledMessageItem.defaultProps = { theme: defaultTheme };
StyledLink.defaultProps = { theme: defaultTheme };
StyledCloseButton.defaultProps = { theme: defaultTheme };
