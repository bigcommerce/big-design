import { Button, ButtonProps, excludeMarginProps } from '@bigcommerce/big-design';
import React from 'react';

import { warning } from '../../utils';

import { StyledActionBar, StyledActionBarContents } from './styled';

interface ActionButtonProps extends Omit<ButtonProps, 'children' | 'mobileWidth'> {
  text: string;
}

export interface ActionBarProps {
  actions: ActionButtonProps[];
}

function validateActions(actions: ActionButtonProps[]) {
  if (actions.length > 3) {
    warning('Action bar should not have more than 3 actions.');
  }

  const primaryButtonActions = actions.filter((action) => {
    return action.variant === 'primary';
  });

  if (primaryButtonActions.length > 1) {
    warning('Action bar should not have more than 1 primary action.');
  }
}

const Actions = ({ actions }: Pick<ActionBarProps, 'actions'>) => {
  validateActions(actions);

  return (
    <>
      {actions.slice(0, 3).map((action, i) => {
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
