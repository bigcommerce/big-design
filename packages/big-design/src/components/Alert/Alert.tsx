import { CloseIcon } from '@bigcommerce/big-design-icons';
import React, { memo, useId, useMemo } from 'react';

import { excludePaddingProps } from '../../helpers';
import { getMessagingIcon, SharedMessagingProps } from '../../utils';
import { Box } from '../Box';
import { MessagingButton } from '../Button/private';
import { GridItem } from '../Grid';

import { StyledAlert, StyledHeader, StyledLink, StyledMessageItem } from './styled';

export interface AlertProps extends Omit<SharedMessagingProps, 'actions' | 'messages'> {
  key?: string;
  messages?: SharedMessagingProps['messages'];
}

export const Alert: React.FC<AlertProps> = memo(
  ({ className, style, header, messages = [], type = 'success', ...props }) => {
    const headerId = useId();
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

    const renderedHeader = useMemo(
      () => header && <StyledHeader id={headerId}>{header}</StyledHeader>,
      [header, headerId],
    );

    return (
      <StyledAlert {...filteredProps} aria-labelledby={header && headerId} role="alert">
        <GridItem gridArea="icon">{icon}</GridItem>
        <GridItem gridArea="messages">
          {renderedHeader}
          {renderedMessages}
        </GridItem>
        {props.onClose && (
          <GridItem>
            <MessagingButton iconOnly={<CloseIcon size="large" />} onClick={props.onClose} />
          </GridItem>
        )}
      </StyledAlert>
    );
  },
);
