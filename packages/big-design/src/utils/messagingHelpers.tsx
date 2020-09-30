import { CheckCircleIcon, ErrorIcon, InfoIcon, WarningIcon } from '@bigcommerce/big-design-icons';
import { ThemeInterface } from '@bigcommerce/big-design-theme';
import React, { HTMLAttributes } from 'react';
import { css } from 'styled-components';

import { ButtonProps } from '../components/Button';
import { LinkProps } from '../components/Link';
import { MarginProps } from '../mixins/margins';

export interface SharedMessagingProps extends HTMLAttributes<HTMLDivElement> {
  actions?: MessageAction[];
  header?: string;
  messages: MessageItem[];
  type?: MessagingType;
  onClose?(): void;
}

export type MessagingType = 'success' | 'error' | 'warning' | 'info';

export type MessagingVariant = 'alert' | 'message' | 'inline';

export interface MessageItem {
  text: string;
  link?: MessageLinkItem;
}

export type MessageLinkItem = Pick<LinkProps, 'external' | 'href' | 'target'> & {
  text: string;
};

export interface MessageAction extends Omit<ButtonProps, 'children' | 'mobileWidth' | 'variant' | keyof MarginProps> {
  text: string;
  variant?: Exclude<ButtonProps['variant'], 'primary'>;
}

export const getMessagingIcon = (type: MessagingType, condensed?: boolean) => {
  const size = condensed ? 'large' : 'xLarge';

  switch (type) {
    case 'success':
      return <CheckCircleIcon size={size} color="success" />;
    case 'error':
      return <ErrorIcon size={size} color="danger" />;
    case 'warning':
      return <WarningIcon size={size} color="warning50" />;
    case 'info':
      return <InfoIcon size={size} color="primary60" />;
  }
};

export const getBorderStyle = (type: MessagingType, theme: ThemeInterface) => css`
  ${type === 'success' &&
  css`
    border-left: ${theme.spacing.xxSmall} solid ${theme.colors.success};
  `};

  ${type === 'error' &&
  css`
    border-left: ${theme.spacing.xxSmall} solid ${theme.colors.danger};
  `};

  ${type === 'warning' &&
  css`
    border-left: ${theme.spacing.xxSmall} solid ${theme.colors.warning50};
  `};

  ${type === 'info' &&
  css`
    border-left: ${theme.spacing.xxSmall} solid ${theme.colors.primary60};
  `};
`;

export const getActionVariant = (variant: ButtonProps['variant']) => (variant === 'primary' ? 'secondary' : variant);
