import { CloseIcon } from '@bigcommerce/big-design-icons';
import React, { memo, useMemo } from 'react';

import { excludePaddingProps } from '../../mixins';
import { getMessagingIcon, SharedMessagingProps } from '../../utils';
import { Box } from '../Box';
import { Button } from '../Button';
import { MessagingButton } from '../Button/private';
import { GridItem } from '../Grid';

import { StyledAlert, StyledHeader, StyledLink, StyledMessageItem } from './styled';

export interface AlertProps extends SharedMessagingProps {
  key?: string;
}

export const Alert: React.FC<AlertProps> = memo(({ className, style, header, ...props }) => {
  const filteredProps = excludePaddingProps(props);
  const icon = useMemo(() => props.type && getMessagingIcon(props.type), [props.type]);

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
        <Box marginTop="xSmall">
          {props.actions.map(({ text, ...actionProps }, index) => (
            <Button key={index} {...actionProps}>
              {text}
            </Button>
          ))}
        </Box>
      ),
    [props.actions],
  );

  return (
    <StyledAlert {...filteredProps} role="alert">
      <GridItem gridArea="icon">{icon}</GridItem>
      <GridItem gridArea="messages">
        {renderedHeader}
        {renderedMessages}
        {renderedActions}
      </GridItem>
      {props.onClose && (
        <GridItem>
          <MessagingButton onClick={props.onClose} iconOnly={<CloseIcon size="large" />} />
        </GridItem>
      )}
    </StyledAlert>
  );
});

Alert.defaultProps = {
  messages: [],
  type: 'success',
};
