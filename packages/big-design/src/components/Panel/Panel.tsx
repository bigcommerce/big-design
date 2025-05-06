import React, { ComponentPropsWithoutRef, forwardRef, isValidElement, memo, Ref } from 'react';

import { excludeMarginProps, MarginProps } from '../../helpers';
import { excludePaddingProps } from '../../helpers/paddings/paddings';
import { warning } from '../../utils';
import { Badge, BadgeProps } from '../Badge/Badge';
import { Box } from '../Box';
import { Button, ButtonProps } from '../Button';
import { Dropdown, DropdownProps } from '../Dropdown';
import { Flex } from '../Flex';
import { Lozenge, LozengeProps } from '../Lozenge';
import { Text } from '../Typography';

import { StyledH2, StyledPanel } from './styled';

interface PrivateProps {
  forwardedRef: Ref<HTMLDivElement>;
}

export interface PanelActionProps extends Omit<ButtonProps, 'children' | 'mobileWidth'> {
  text?: string;
}

export interface PanelDropdownProps extends Omit<DropdownProps, 'toggle'> {
  toggle: PanelActionProps;
}

export type PanelAction = PanelActionProps | PanelDropdownProps;

export interface PanelProps extends ComponentPropsWithoutRef<'div'>, MarginProps {
  children?: React.ReactNode;
  description?: React.ReactNode;
  header?: string;
  headerId?: string;
  action?: PanelAction;
  badge?: BadgeProps;
  lozenge?: LozengeProps;
}

const Action = (action: PanelAction) => {
  if ('toggle' in action) {
    const { toggle, ...dropdownProps } = action;
    const { text, ...buttonProps } = toggle;

    return (
      <Dropdown
        {...dropdownProps}
        toggle={
          <Button {...excludeMarginProps(buttonProps)} mobileWidth="auto">
            {text}
          </Button>
        }
      />
    );
  }

  const { text, ...buttonProps } = action;

  return (
    <Button {...excludeMarginProps(buttonProps)} mobileWidth="auto">
      {text}
    </Button>
  );
};

export const RawPanel: React.FC<PanelProps & PrivateProps> = memo(({ forwardedRef, ...props }) => {
  const filteredProps = excludePaddingProps(props);
  const { action, children, description, header, headerId, badge, lozenge, ...rest } =
    filteredProps;

  const renderHeader = () => {
    if (!header && !action) {
      return null;
    }

    if (typeof header !== 'string') {
      return null;
    }

    return (
      <Flex alignItems="center" flexDirection="row" flexGap="0.5rem" justifyContent="space-between">
        {Boolean(header) && (
          <Flex alignItems="center" flexDirection="row" flexGap="0.5rem">
            <StyledH2 id={headerId} marginBottom="none">
              {header}
            </StyledH2>
            {lozenge && <Lozenge {...lozenge} />}
            {badge && <Badge {...badge} />}
          </Flex>
        )}
        {action && <Action {...action} />}
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
