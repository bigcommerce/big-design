import { CheckCircleIcon, ErrorIcon, InfoIcon, WarningIcon } from '@bigcommerce/big-design-icons';
import React, { memo, useMemo } from 'react';

import { MarginProps } from '../../mixins';
import { excludePaddingProps } from '../../mixins/paddings/paddings';
import { Box } from '../Box';
import { GridItem } from '../Grid';
import { LinkProps } from '../Link';

import { StyledAlert, StyledHeadline, StyledLink, StyledMessage } from './styled';

// TODO:
// - aria-roles
// - close icon

// TODO: Move to types.ts
type ItemLinkProps = Pick<LinkProps, 'external' | 'href' | 'target'> & {
  text: string;
};

interface ItemProps {
  text: string;
  link: ItemLinkProps;
}

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement>, MarginProps {
  headline?: string;
  messages: ItemProps[];
  type?: 'success' | 'error' | 'warning' | 'info';
  variant?: 'alert' | 'message' | 'inline';
  onDismiss?(): void;
}

export const Alert: React.FC<AlertProps> = memo(({ className, style, headline, ...props }) => {
  const filteredProps = excludePaddingProps(props);
  const iconSize = props.variant !== 'inline' ? 'xLarge' : 'large';

  const renderedIcon = useMemo(() => {
    switch (props.type) {
      case 'success':
        return <CheckCircleIcon size={iconSize} color="success" />;
      case 'error':
        return <ErrorIcon size={iconSize} color="danger" />;
      case 'warning':
        return <WarningIcon size={iconSize} color="warning50" />;
      case 'info':
        return <InfoIcon size={iconSize} color="primary60" />;
    }
  }, [props.type, iconSize]);

  const renderedMessages = useMemo(
    () =>
      props.messages.map(({ text, link }, index) => (
        <Box key={index}>
          <StyledMessage>{text}</StyledMessage> {link && <StyledLink {...link}>{link.text}</StyledLink>}
        </Box>
      )),
    [props.messages],
  );

  const renderedHeadline = useMemo(
    () => headline && <StyledHeadline variant={filteredProps.variant}>{headline}</StyledHeadline>,
    [headline, filteredProps.variant],
  );

  return (
    <StyledAlert {...filteredProps} role="alert">
      <GridItem gridArea="icon">{renderedIcon}</GridItem>
      <GridItem gridArea="messages">
        {renderedHeadline}
        {renderedMessages}
      </GridItem>
      {props.onDismiss && <GridItem>{/* StyleableButton */}X</GridItem>}
    </StyledAlert>
  );
});

Alert.defaultProps = {
  messages: [],
  type: 'success',
  variant: 'alert',
};
