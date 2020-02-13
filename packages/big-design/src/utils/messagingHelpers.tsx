import { CheckCircleIcon, ErrorIcon, InfoIcon, WarningIcon } from '@bigcommerce/big-design-icons';
import { ThemeInterface } from '@bigcommerce/big-design-theme';
import React from 'react';
import { css } from 'styled-components';

import { LinkProps } from '../components/Link';
import { MarginProps } from '../mixins';

export interface SharedMessagingProps extends React.HTMLAttributes<HTMLDivElement>, MarginProps {
  header?: string;
  messages: MessageItem[];
  type?: MessagingType;
  onClose?(): void;
}

export type MessagingType = 'success' | 'error' | 'warning' | 'info';

export type MessagingVariant = 'alert' | 'message' | 'inline';

export interface MessageItem {
  text: string;
  link: MessageLinkItem;
}

type MessageLinkItem = Pick<LinkProps, 'external' | 'href' | 'target'> & {
  text: string;
};

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
      border-left: 4px solid ${theme.colors.success};
    `};

  ${type === 'error' &&
    css`
      border-left: 4px solid ${theme.colors.danger};
    `};

  ${type === 'warning' &&
    css`
      border-left: 4px solid ${theme.colors.warning50};
    `};

  ${type === 'info' &&
    css`
      border-left: 4px solid ${theme.colors.primary60};
    `};
`;
