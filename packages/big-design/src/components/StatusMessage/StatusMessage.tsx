import { theme } from '@bigcommerce/big-design-theme';
import React from 'react';

import { Flex } from '../Flex';
import { H1, H4, Text } from '../Typography';

import { StyledStatusIllustration, StyledStatusMessage } from './styled';

export type StatusMessageVariantType =
  | '404'
  | 'info'
  | 'error'
  | 'search'
  | 'server-error'
  | 'success'
  | 'unauthorized'
  | 'warning';

export interface StatusMessageProps {
  readonly actions?: React.ReactNode;
  readonly heading?: string;
  readonly message: string;
  readonly size?: 'page' | 'panel';
  readonly variant?: StatusMessageVariantType;
}

export const StatusMessage: React.FC<StatusMessageProps> = ({
  actions,
  heading,
  message,
  size = 'panel',
  variant = 'info',
}) => {
  const Header = size === 'page' ? H1 : H4;
  const hasHeading = heading !== undefined && heading.length > 0;

  const flexGapSize = size === 'page' ? theme.spacing.xLarge : theme.spacing.medium;
  const paddingVertical = size === 'page' ? 'xxxLarge' : 'large';

  return (
    <Flex
      alignItems="center"
      flexDirection="column"
      flexGap={flexGapSize}
      justifyContent="center"
      paddingVertical={paddingVertical}
    >
      <StyledStatusIllustration aria-hidden="true" size={size} variant={variant} />
      <StyledStatusMessage>
        {hasHeading && (
          <Header margin="none" marginBottom="small">
            {heading}
          </Header>
        )}
        <Text margin="none">{message}</Text>
      </StyledStatusMessage>
      {actions}
    </Flex>
  );
};

StatusMessage.displayName = 'StatusMessage';
