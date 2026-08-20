import { CloseIcon } from '@bigcommerce/big-design-icons';
import React, { memo, useMemo } from 'react';

import { excludeMarginProps, excludePaddingProps, type MarginProps } from '../../helpers';
import { getActionVariant, getMessagingIcon, type SharedMessagingProps } from '../../utils';
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

export interface InlineMessageLocalization {
  close: string;
}

const defaultLocalization: InlineMessageLocalization = {
  close: 'Close',
};

export type InlineMessageProps = SharedMessagingProps &
  MarginProps & { localization?: InlineMessageLocalization };

export const InlineMessage: React.FC<InlineMessageProps> = memo(
  ({
    actions,
    className,
    style,
    header,
    localization = defaultLocalization,
    messages = [],
    onClose,
    type = 'success',
    ...props
  }) => {
    const filteredProps = excludePaddingProps(props);
    const icon = useMemo(() => type && getMessagingIcon(type, true), [type]);

    const renderedMessages = useMemo(
      () =>
        messages.map(({ text, link }, index) => (
          <Box key={index}>
            <StyledMessageItem>{text}</StyledMessageItem>{' '}
            {link && (
              <StyledLink external={link.external} href={link.href} target={link.target}>
                {link.text}
              </StyledLink>
            )}
          </Box>
        )),
      [messages],
    );

    const renderedHeader = useMemo(() => header && <StyledHeader>{header}</StyledHeader>, [header]);

    const renderedActions = useMemo(
      () =>
        actions && (
          <StyledActionsWrapper flexDirection="row" flexWrap="wrap" marginTop="xSmall">
            {actions.map(({ text, variant = 'secondary', ...actionProps }, index) => (
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
      [actions],
    );

    return (
      <StyledInlineMessage
        {...filteredProps}
        $onClose={onClose}
        backgroundColor="white"
        role="alert"
        type={type}
      >
        <GridItem gridArea="icon">{icon}</GridItem>
        <GridItem gridArea="messages">
          {renderedHeader}
          {renderedMessages}
          {renderedActions}
        </GridItem>
        {onClose && (
          <GridItem>
            <MessagingButton
              iconOnly={<CloseIcon size="medium" title={localization.close} />}
              onClick={onClose}
            />
          </GridItem>
        )}
      </StyledInlineMessage>
    );
  },
);
