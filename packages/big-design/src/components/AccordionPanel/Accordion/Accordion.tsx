import { ExpandMoreIcon } from '@bigcommerce/big-design-icons';
import React, { memo, useId } from 'react';

import { StyledAccordionButton, StyledAccordionContent } from './styled';

export interface AccordionProps {
  children?: React.ReactNode;
  defaultExpanded?: boolean;
  header: string;
  iconLeft?: React.ReactNode;
  isExpanded: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export const Accordion: React.FC<AccordionProps> = memo(
  ({ children, header, iconLeft, isExpanded, onClick }) => {
    const accordionId = useId();
    const accordionItemId = useId();

    return (
      <>
        <StyledAccordionButton
          $iconLeft={iconLeft}
          $isExpanded={isExpanded}
          aria-controls={accordionItemId}
          aria-expanded={isExpanded}
          iconLeft={iconLeft}
          iconRight={<ExpandMoreIcon className="collapse-icon" color="secondary70" />}
          id={accordionId}
          onClick={onClick}
          type="button"
          variant="subtle"
        >
          {header}
        </StyledAccordionButton>
        <StyledAccordionContent
          $iconLeft={iconLeft}
          aria-labelledby={accordionId}
          display={isExpanded ? 'block' : 'none'}
          hidden={!isExpanded}
          id={accordionItemId}
          role="region"
        >
          {children}
        </StyledAccordionContent>
      </>
    );
  },
);
