import { ExpandMoreIcon } from '@bigcommerce/big-design-icons';
import React, { useState } from 'react';

import { useUniqueId } from '../../hooks';
import { typedMemo } from '../../utils';
import { Box } from '../Box';

import { StyledButton } from './styled';

export interface CollapseProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  initiallyOpen?: boolean;
  onCollapseChange?(isOpen: boolean): void;
}

export const Collapse: React.FC<CollapseProps> = typedMemo(
  ({ children, title, onCollapseChange, initiallyOpen = false }) => {
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

    if (!title) {
      title = isOpen ? 'Show less' : 'Show more';
    }

    return (
      <>
        <StyledButton
          aria-expanded={isOpen}
          aria-controls={panelId}
          iconRight={<ExpandMoreIcon title={title} />}
          id={triggerId}
          isOpen={isOpen}
          variant="subtle"
          onClick={handleTitleClick}
        >
          {title}
        </StyledButton>
        <Box
          aria-labelledby={triggerId}
          display={isOpen ? 'block' : 'none'}
          id={panelId}
          hidden={!isOpen}
          role="region"
        >
          {children}
        </Box>
      </>
    );
  },
);

Collapse.displayName = 'Collapse';
