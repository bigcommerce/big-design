import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled, { css, DefaultTheme, StyledComponent } from 'styled-components';

import { getBorderStyle } from '../../utils';
import { Flex, FlexItem } from '../Flex';
import { Grid } from '../Grid';
import { Link } from '../Link';
import { StyleableH4, StyleableSmall } from '../Typography/private';
import { TextProps } from '../Typography/types';

import { MessageProps } from './Message';

export const StyledMessage = styled(Grid)<MessageProps>`
  ${({ theme }) => theme.shadow.raised}

  grid-gap: ${({ theme }) => theme.spacing.small};
  padding: ${({ theme }) => theme.spacing.small};

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

export const StyledActionsWrapper = styled(Flex)`
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: -${({ theme }) => theme.spacing.xSmall};
  margin-left: -${({ theme }) => theme.spacing.xxSmall};
  margin-right: -${({ theme }) => theme.spacing.xxSmall};
`;

export const StyledActionWrapper = styled(FlexItem)`
  margin-bottom: ${({ theme }) => theme.spacing.xSmall};
  margin-left: ${({ theme }) => theme.spacing.xxSmall};
  margin-right: ${({ theme }) => theme.spacing.xxSmall};
`;

StyledMessage.defaultProps = { theme: defaultTheme };
StyledHeader.defaultProps = { theme: defaultTheme };
StyledMessageItem.defaultProps = { theme: defaultTheme };
StyledLink.defaultProps = { theme: defaultTheme };
StyledActionsWrapper.defaultProps = { theme: defaultTheme };
StyledActionWrapper.defaultProps = { theme: defaultTheme };
