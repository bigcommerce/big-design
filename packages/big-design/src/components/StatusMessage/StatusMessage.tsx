import React, { memo } from 'react';

import { Button, ButtonProps } from '../Button';
import { Flex, FlexItem } from '../Flex';
import { H1, H4, Text } from '../Typography';

import { StatusMessageIcons } from './StatusMessageIcons';
import { StatusMessagePatterns } from './StatusMessagePatterns';
import { StatusMessageIllustration, StyledStatusMessage } from './styled';

export interface StatusMessageButtonProps extends Omit<ButtonProps, 'children'> {
  text: string;
}

export interface StatusMessageProps {
  actions?: StatusMessageButtonProps[];
  heading?: string;
  message: string;
  size?: 'page' | 'panel';
  variant?:
    | '404'
    | 'info'
    | 'error'
    | 'search'
    | 'server-error'
    | 'success'
    | 'unauthorized'
    | 'warning';
}

export const StatusMessage: React.FC<StatusMessageProps> = memo(
  ({ actions, heading, message, size = 'panel', variant = 'info' }) => {
    return (
      <StyledStatusMessage size={size} variant={variant}>
        <StatusMessageIllustration aria-hidden="true" size={size} variant={variant}>
          <StatusMessagePatterns variant={variant} />
          <StatusMessageIcons variant={variant} />
        </StatusMessageIllustration>
        <Flex flexDirection="column">
          {heading ? (
            size === 'page' ? (
              <H1 margin="none" marginBottom="small">
                {heading}
              </H1>
            ) : (
              <H4 margin="none" marginBottom="xSmall">
                {heading}
              </H4>
            )
          ) : null}
          <Text margin="none">{message}</Text>
        </Flex>

        {actions ? (
          <Flex
            flexDirection={{ mobile: 'column', tablet: 'row' }}
            flexGap="1rem"
            paddingTop="small"
          >
            {actions.map((action, index) => (
              <FlexItem key={index}>
                <Button {...action} mobileWidth="auto">
                  {action.text}
                </Button>
              </FlexItem>
            ))}
          </Flex>
        ) : null}
      </StyledStatusMessage>
    );
  },
);

StatusMessage.displayName = 'StatusMessage';
