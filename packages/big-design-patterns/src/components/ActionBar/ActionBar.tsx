import {
  Button,
  ButtonProps,
  Dropdown,
  DropdownProps,
  excludeMarginProps,
} from '@bigcommerce/big-design';
import React from 'react';

import { warning } from '../../utils';

import { StyledActionBar, StyledActionBarContents } from './styled';

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
  if (!actions.length) {
    return null;
  }

  return (
    <StyledActionBar backgroundColor="white" borderTop="box" role="group" zIndex="fixed">
      <StyledActionBarContents
        flexDirection="row-reverse"
        flexGap={{ mobile: '.5rem', tablet: '.75rem' }}
        justifyContent="end"
        paddingHorizontal={{ mobile: 'xLarge', tablet: 'xxLarge' }}
        paddingVertical="small"
      >
        <Actions actions={actions} />
      </StyledActionBarContents>
    </StyledActionBar>
  );
};
