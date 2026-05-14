import { CloseIcon } from '@bigcommerce/big-design-icons';
import React, { memo, useMemo } from 'react';

import { excludeMarginProps, excludePaddingProps, MarginProps } from '../../helpers';
import { getActionVariant, getMessagingIcon, SharedMessagingProps } from '../../utils';
import { Box } from '../Box';
import { Button } from '../Button';
import { MessagingButton } from '../Button/private';
import { GridItem } from '../Grid';

import {
  StyledActionsWrapper,
  StyledHeader,
  StyledLink,
  StyledMessage,
  StyledMessageItem,
} from './styled';

export interface MessageLocalization {
  close: string;
}

const defaultLocalization: MessageLocalization = {
  close: 'Close',
};

export type MessageProps = Omit<SharedMessagingProps, 'messages'> &
  MarginProps & { localization?: MessageLocalization; messages?: SharedMessagingProps['messages'] };

export const Message: React.FC<MessageProps> = memo(
  ({
    className,
    localization = defaultLocalization,
    style,
    header,
    messages = [],
    type = 'success',
    ...props
  }) => {
    const messagingProps = { ...props, messages, type };
    const filteredProps = excludePaddingProps(messagingProps);
    const icon = useMemo(() => type && getMessagingIcon(type), [type]);

    const renderedMessages = useMemo(
      () =>
        messages.map(({ text, link }, index) => (
          <Box key={index}>
            <StyledMessageItem>{text}</StyledMessageItem>{' '}
            {link && <StyledLink {...link}>{link.text}</StyledLink>}
          </Box>
        )),
      [messages],
    );

    const renderedHeader = useMemo(() => header && <StyledHeader>{header}</StyledHeader>, [header]);

    const renderedActions = useMemo(
      () =>
        props.actions && (
          <StyledActionsWrapper flexDirection="row" flexWrap="wrap" marginTop="xSmall">
            {props.actions.map(({ text, variant = 'secondary', ...actionProps }, index) => (
              <Button
                {...excludeMarginProps(actionProps)}
                key={index}
                marginBottom="xSmall"
                marginHorizontal="xxSmall"
                mobileWidth="auto"
                variant={getActionVariant(variant)}
              >
                {text}
              </Button>
            ))}
          </StyledActionsWrapper>
        ),
      [props.actions],
    );

    return (
      <StyledMessage {...filteredProps} backgroundColor="white" role="alert">
        <GridItem gridArea="icon">{icon}</GridItem>
        <GridItem gridArea="messages">
          {renderedHeader}
          {renderedMessages}
          {renderedActions}
        </GridItem>
        {props.onClose && (
          <GridItem>
            <MessagingButton
              iconOnly={<CloseIcon size="large" title={localization.close} />}
              onClick={props.onClose}
            />
          </GridItem>
        )}
      </StyledMessage>
    );
  },
);
