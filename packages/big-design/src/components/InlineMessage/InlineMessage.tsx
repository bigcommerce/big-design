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
  StyledInlineMessage,
  StyledLink,
  StyledMessageItem,
} from './styled';

interface Localization {
  close: string;
}

const defaultLocalization: Localization = {
  close: 'Close',
};

export type InlineMessageProps = SharedMessagingProps &
  MarginProps & { localization?: Localization };

export const InlineMessage: React.FC<InlineMessageProps> = memo(
  ({ className, style, header, localization = defaultLocalization, ...props }) => {
    const filteredProps = excludePaddingProps(props);
    const icon = useMemo(() => props.type && getMessagingIcon(props.type, true), [props.type]);

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
      <StyledInlineMessage {...filteredProps} backgroundColor="white" role="alert">
        <GridItem gridArea="icon">{icon}</GridItem>
        <GridItem gridArea="messages">
          {renderedHeader}
          {renderedMessages}
          {renderedActions}
        </GridItem>
        {props.onClose && (
          <GridItem>
            <MessagingButton
              iconOnly={<CloseIcon size="medium" title={localization.close} />}
              onClick={props.onClose}
            />
          </GridItem>
        )}
      </StyledInlineMessage>
    );
  },
);

InlineMessage.defaultProps = {
  messages: [],
  type: 'success',
};
