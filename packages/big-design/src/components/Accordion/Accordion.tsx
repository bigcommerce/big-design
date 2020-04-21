import { ExpandMoreIcon } from '@bigcommerce/big-design-icons';
import React, { useState } from 'react';

import { useUniqueId } from '../../hooks';
import { typedMemo } from '../../utils';
import { Box } from '../Box';

import { StyledButton, StyledIconWrapper, StyledTitle } from './styled';

export interface AccordionProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  title: string;
  initiallyOpen?: boolean;
  onChange?(isOpen: boolean): void;
}

export const Accordion: React.FC<AccordionProps> = typedMemo(
  ({ children, title, onChange, initiallyOpen = false, ...props }) => {
    const [isOpen, setIsOpen] = useState(initiallyOpen);
    const uniqueAccordionId = props.id ? props.id : useUniqueId('accordion');
    const triggerId = `${uniqueAccordionId}-title`;
    const panelId = `${uniqueAccordionId}-panel`;

    const handleTitleClick = () => {
      setIsOpen(!isOpen);

      if (typeof onChange === 'function') {
        onChange(!isOpen);
      }
    };

    const handleKeyDownEvents = (event: React.KeyboardEvent) => {
      switch (event.key) {
        case ' ':
        case 'Enter':
          event.preventDefault();
          handleTitleClick();
          break;
      }
    };

    return (
      <>
        <StyledTitle>
          <StyledButton
            aria-expanded={isOpen}
            aria-controls={panelId}
            iconRight={
              <StyledIconWrapper isOpen={isOpen}>
                <ExpandMoreIcon title={title} />
              </StyledIconWrapper>
            }
            id={triggerId}
            onClick={handleTitleClick}
            variant="subtle"
            onKeyDown={handleKeyDownEvents}
          >
            {title}
          </StyledButton>
        </StyledTitle>
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

Accordion.displayName = 'Accordion';
