import { CloseIcon } from '@bigcommerce/big-design-icons';
import React, { memo, useMemo } from 'react';

import { excludeMarginProps, excludePaddingProps, MarginProps } from '../../mixins';
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

interface Localization {
  localization?: { close: string };
}

export type MessageProps = SharedMessagingProps & MarginProps;

export const Message: React.FC<MessageProps & Localization> = memo(
  ({ className, localization = { close: 'Close' }, style, header, ...props }) => {
    const filteredProps = excludePaddingProps(props);
    const icon = useMemo(() => props.type && getMessagingIcon(props.type), [props.type]);

    const renderedMessages = useMemo(
      () =>
        props.messages.map(({ text, link }, index) => (
          <Box key={index}>
            <StyledMessageItem>{text}</StyledMessageItem>{' '}
            {link && <StyledLink {...link}>{link.text}</StyledLink>}
          </Box>
        )),
      [props.messages],
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

Message.defaultProps = {
  messages: [],
  type: 'success',
};
