import React, { ComponentPropsWithoutRef, forwardRef, isValidElement, memo, Ref } from 'react';

import { MarginProps } from '../../helpers';
import { excludePaddingProps } from '../../helpers/paddings/paddings';
import { warning } from '../../utils';
import { Badge, BadgeProps } from '../Badge/Badge';
import { Box } from '../Box';
import { Button, ButtonProps } from '../Button';
import { Flex } from '../Flex';
import { Text } from '../Typography';

import { StyledH2, StyledPanel } from './styled';

interface PrivateProps {
  forwardedRef: Ref<HTMLDivElement>;
}

export interface PanelAction extends Omit<ButtonProps, 'children'> {
  text?: string;
}

export interface PanelProps extends ComponentPropsWithoutRef<'div'>, MarginProps {
  readonly children?: React.ReactNode;
  readonly description?: React.ReactNode;
  readonly header?: string;
  readonly headerId?: string;
  readonly action?: PanelAction;
  readonly badge?: BadgeProps;
}

export const RawPanel: React.FC<PanelProps & PrivateProps> = memo(({ forwardedRef, ...props }) => {
  const filteredProps = excludePaddingProps(props);
  const { action, children, description, header, headerId, badge, ...rest } = filteredProps;

  const renderHeader = () => {
    if (!header && !action) {
      return null;
    }

    if (typeof header !== 'string') {
      return null;
    }

    return (
      <Flex flexDirection="row">
        {Boolean(header) && (
          <StyledH2 id={headerId} marginBottom="none">
            {header}
            {badge && <Badge marginLeft="xSmall" {...badge} />}
          </StyledH2>
        )}
        {action && <Button {...action}>{action.text}</Button>}
      </Flex>
    );
  };

  const renderDescription = () => {
    if (!description) {
      return null;
    }

    if (typeof description === 'string') {
      return (
        <Text color="secondary60" marginBottom="none" marginTop={header ? 'xxSmall' : 'none'}>
          {description}
        </Text>
      );
    }

    if (isValidElement(description)) {
      return description;
    }

    warning('description must be either a string or a ReactNode.');
  };

  return (
    <StyledPanel
      marginBottom="medium"
      {...rest}
      backgroundColor="white"
      padding={{ mobile: 'medium', tablet: 'xLarge' }}
      ref={forwardedRef}
      shadow="raised"
    >
      {renderHeader()}
      {renderDescription()}
      {children !== undefined && <Box marginTop="medium">{children}</Box>}
    </StyledPanel>
  );
});

export const Panel = forwardRef<HTMLDivElement, PanelProps>(
  ({ className, style, ...props }, ref) => <RawPanel {...props} forwardedRef={ref} />,
);

Panel.displayName = 'Panel';
