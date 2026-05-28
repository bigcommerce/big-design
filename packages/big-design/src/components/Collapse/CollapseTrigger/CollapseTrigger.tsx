import { ExpandMoreIcon } from '@bigcommerce/big-design-icons';
import React from 'react';

import { MarginProps } from '../../../helpers';
import { useCollapseContext } from '../useCollapseContext';

import { StyledButton } from './styled';

export interface CollapseTriggerProps extends MarginProps {
  title: string | React.ReactNode;
}

export const CollapseTrigger: React.FC<CollapseTriggerProps> = ({
  title,
  marginVertical = 'small',
  ...marginProps
}) => {
  const { isOpen, toggle, disabled, triggerId, panelId } = useCollapseContext('Collapse.Trigger');

  return (
    <StyledButton
      aria-controls={panelId}
      aria-expanded={isOpen}
      disabled={disabled}
      iconRight={<ExpandMoreIcon title={typeof title === 'string' ? title : undefined} />}
      id={triggerId}
      isOpen={isOpen}
      marginVertical={marginVertical}
      onClick={toggle}
      type="button"
      variant="subtle"
      {...marginProps}
    >
      {title}
    </StyledButton>
  );
};
