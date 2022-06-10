import { ExpandMoreIcon } from '@bigcommerce/big-design-icons';
import React, { useState } from 'react';

import { useUniqueId } from '../../hooks';
import { Box } from '../Box';

import { StyledButton } from './styled';

export interface CollapseProps {
  title: string;
  initiallyOpen?: boolean;
  onCollapseChange?(isOpen: boolean): void;
}

export const Collapse: React.FC<CollapseProps> = ({
  children,
  title,
  onCollapseChange,
  initiallyOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(initiallyOpen);
  const triggerId = useUniqueId('collapse-title');
  const panelId = useUniqueId('collapse-panel');

  const handleTitleClick = () => {
    const nextIsOpen = !isOpen;

    setIsOpen(nextIsOpen);

    if (typeof onCollapseChange === 'function') {
      onCollapseChange(nextIsOpen);
    }
  };

  return (
    <>
      <StyledButton
        aria-controls={panelId}
        aria-expanded={isOpen}
        iconRight={<ExpandMoreIcon title={title} />}
        id={triggerId}
        isOpen={isOpen}
        marginVertical="small"
        onClick={handleTitleClick}
        variant="subtle"
      >
        {title}
      </StyledButton>
      <Box
        aria-labelledby={triggerId}
        display={isOpen ? 'block' : 'none'}
        hidden={!isOpen}
        id={panelId}
        role="region"
      >
        {children}
      </Box>
    </>
  );
};
