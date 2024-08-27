import React from 'react';
import { StyledActionBar, StyledActionBarContents } from './styled';
import {
  Button,
  ButtonProps,
  Dropdown,
  DropdownProps,
  excludeMarginProps,
  Flex,
} from '@bigcommerce/big-design';

import { warning } from '../../utils';

interface ActionButtonProps extends Omit<ButtonProps, 'children' | 'mobileWidth'> {
  text: string;
}

interface ActionDropdownProps extends Omit<DropdownProps, 'toggle'> {
  toggle: ActionButtonProps;
}

interface ActionProps {
  actions: Array<ActionButtonProps | ActionDropdownProps>;
}

export interface ActionBarProps {
  actions: Array<ActionButtonProps | ActionDropdownProps>;
}

function validateActions(actions: Array<ActionButtonProps | ActionDropdownProps>) {

  if (actions.length > 3) {
    warning('Action bar should not have more than 3 actions.');
  }

  const primaryButtonActions = actions.filter((action) => {
    if ('toggle' in action) {
      return action.toggle.variant === 'primary';
    }

    return action.variant === 'primary';
  });

  if (primaryButtonActions.length > 1) {
    warning('Action bar should not have more than 1 primary action.');
  }
}

const Actions = ({ actions }: ActionProps) => {
  validateActions(actions);

  return (
    <>
      {actions.slice(0, 3).map((action, i) => {
        if ('toggle' in action) {
          const { toggle, ...dropdownProps } = action;
          const { text, ...buttonProps } = toggle;

          return (
            <Dropdown
              key={i}
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
          <Button key={i} {...excludeMarginProps(buttonProps)} mobileWidth="auto">
            {text}
          </Button>
        );
      })}
    </>
  );
};

export const ActionBar = ({ actions }: ActionBarProps) => {
  if (!actions.length) return null;

  return (
    <StyledActionBar role="group">
      <StyledActionBarContents>
        <Flex
          flexDirection={{ mobile: 'row-reverse' }}
          flexGap={{ mobile: '.75rem', tablet: '0.625rem' }}
        >
          <Actions actions={actions} />
        </Flex>
      </StyledActionBarContents>
    </StyledActionBar>
  );
};
