import { CloseIcon } from '@bigcommerce/big-design-icons';
import React, { memo, useMemo } from 'react';

import { excludeMarginProps, excludePaddingProps, MarginProps } from '../../mixins';
import { getActionVariant, getMessagingIcon, SharedMessagingProps } from '../../utils';
import { Box } from '../Box';
import { Button } from '../Button';
import { MessagingButton } from '../Button/private';
import { GridItem } from '../Grid';

import { StyledActionsWrapper, StyledHeader, StyledInlineAlert, StyledLink, StyledMessageItem } from './styled';

export type InlineAlertProps = SharedMessagingProps & MarginProps;

export const InlineAlert: React.FC<InlineAlertProps> = memo(({ className, style, header, ...props }) => {
  const filteredProps = excludePaddingProps(props);
  const icon = useMemo(() => props.type && getMessagingIcon(props.type, true), [props.type]);

  const renderedMessages = useMemo(
    () =>
      props.messages.map(({ text, link }, index) => (
        <Box key={index}>
          <StyledMessageItem>{text}</StyledMessageItem> {link && <StyledLink {...link}>{link.text}</StyledLink>}
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
    <StyledInlineAlert {...filteredProps} backgroundColor="white" role="alert">
      <GridItem gridArea="icon">{icon}</GridItem>
      <GridItem gridArea="messages">
        {renderedHeader}
        {renderedMessages}
        {renderedActions}
      </GridItem>
      {props.onClose && (
        <GridItem>
          <MessagingButton onClick={props.onClose} iconOnly={<CloseIcon size="medium" title="Close." />} />
        </GridItem>
      )}
    </StyledInlineAlert>
  );
});

InlineAlert.defaultProps = {
  messages: [],
  type: 'success',
};
