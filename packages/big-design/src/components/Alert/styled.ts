import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled, { css } from 'styled-components';

import { getBorderStyle } from '../../utils';
import { Grid } from '../Grid';
import { Link } from '../Link';
import { StyleableH4, StyleableSmall } from '../Typography/private';
import { type TextProps } from '../Typography/types';

import { type AlertProps } from './Alert';

interface StyledAlertProps {
  type?: AlertProps['type'];
  $onClose?: AlertProps['onClose'];
}

export const StyledAlert = styled(Grid)<StyledAlertProps>`
  ${({ theme }) => theme.shadow.floating}

  animation: ${({ theme }) => theme.keyframes.fadeIn} .5s ease-in-out;
  background-color: ${({ theme }) => theme.colors.white};
  grid-gap: ${({ theme }) => theme.spacing.small};
  max-width: ${({ theme }) => theme.helpers.remCalc(456)};
  padding: ${({ theme }) => theme.spacing.small};
  position: fixed;
  right: ${({ theme }) => theme.spacing.medium};
  top: ${({ theme }) => theme.spacing.medium};
  z-index: ${({ theme }) => theme.zIndex.fixed};

  ${({ $onClose }) =>
    $onClose
      ? css`
          grid-template-areas: 'icon messages close';
          grid-template-columns: ${({ theme }) =>
            `${theme.spacing.xLarge} 1fr ${theme.spacing.large}`};
        `
      : css`
          grid-template-areas: 'icon messages';
          grid-template-columns: ${({ theme }) => `${theme.spacing.xLarge} 1fr`};
        `}

  ${({ theme, type }) => type && getBorderStyle(type, theme)};
`;

export const StyledHeader = styled(StyleableH4)`
  line-height: ${({ theme }) => theme.spacing.medium};
  margin-bottom: ${({ theme }) => theme.spacing.xxSmall};
`;

export const StyledMessageItem = styled(StyleableSmall).attrs({ as: 'span' })<Partial<TextProps>>`
  color: ${({ theme }) => theme.colors.secondary70};
  vertical-align: middle;
`;

export const StyledLink = styled(Link)`
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  vertical-align: middle;
`;

StyledAlert.defaultProps = { theme: defaultTheme };
StyledHeader.defaultProps = { theme: defaultTheme };
StyledMessageItem.defaultProps = { theme: defaultTheme };
StyledLink.defaultProps = { theme: defaultTheme };
