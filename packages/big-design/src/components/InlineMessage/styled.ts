import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled, { css } from 'styled-components';

import { getBorderStyle } from '../../utils';
import { Flex } from '../Flex';
import { Grid } from '../Grid';
import { Link } from '../Link';
import { StyleableH4, StyleableSmall } from '../Typography/private';
import { type TextProps } from '../Typography/types';

import { type InlineMessageProps } from './InlineMessage';

interface StyledInlineMessageProps {
  type?: InlineMessageProps['type'];
  $onClose?: InlineMessageProps['onClose'];
}

export const StyledInlineMessage = styled(Grid)<StyledInlineMessageProps>`
  border: ${({ theme }) => theme.border.box};
  border-radius: ${({ theme }) => theme.borderRadius.normal};
  grid-gap: ${({ theme }) => theme.spacing.xSmall};
  grid-template-columns: ${({ theme }) => `${theme.spacing.large} 1fr ${theme.spacing.large}`};
  padding: ${({ theme }) => theme.spacing.xSmall};

  ${({ $onClose }) =>
    $onClose
      ? css`
          grid-template-areas: 'icon messages close';
          grid-template-columns: ${({ theme }) =>
            `${theme.spacing.large} 1fr ${theme.spacing.medium}`};
        `
      : css`
          grid-template-areas: 'icon messages';
          grid-template-columns: ${({ theme }) => `${theme.spacing.large} 1fr`};
        `}

  ${({ theme, type }) => type && getBorderStyle(type, theme)};
`;

export const StyledHeader = styled(StyleableH4)`
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  line-height: ${({ theme }) => theme.spacing.large};
  margin-bottom: ${({ theme }) => theme.spacing.none};
`;

export const StyledMessageItem = styled(StyleableSmall).attrs({ as: 'span' })<Partial<TextProps>>`
  color: ${({ theme }) => theme.colors.secondary70};
  vertical-align: middle;
`;

export const StyledLink = styled(Link)`
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  vertical-align: middle;
`;

export const StyledActionsWrapper = styled(Flex)`
  margin-bottom: -${({ theme }) => theme.spacing.xSmall};
  margin-left: -${({ theme }) => theme.spacing.xxSmall};
  margin-right: -${({ theme }) => theme.spacing.xxSmall};
`;

StyledInlineMessage.defaultProps = { theme: defaultTheme };
StyledHeader.defaultProps = { theme: defaultTheme };
StyledMessageItem.defaultProps = { theme: defaultTheme };
StyledLink.defaultProps = { theme: defaultTheme };
StyledActionsWrapper.defaultProps = { theme: defaultTheme };
