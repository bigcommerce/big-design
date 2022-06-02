import { CloseIcon } from '@bigcommerce/big-design-icons';
import React, { memo, useMemo } from 'react';

import { excludePaddingProps } from '../../mixins';
import { getMessagingIcon, SharedMessagingProps } from '../../utils';
import { Box } from '../Box';
import { MessagingButton } from '../Button/private';
import { GridItem } from '../Grid';

import { StyledAlert, StyledHeader, StyledLink, StyledMessageItem } from './styled';

export interface AlertProps extends Omit<SharedMessagingProps, 'actions'> {
  [x: string]: unknown;
  key?: string;
}

export const Alert: React.FC<AlertProps> = memo(({ className, style, header, ...props }) => {
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

  return (
    <StyledAlert {...filteredProps} role="alert">
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
});

Alert.defaultProps = {
  messages: [],
  type: 'success',
};
