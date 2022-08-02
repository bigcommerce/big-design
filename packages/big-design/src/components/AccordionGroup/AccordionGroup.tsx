import React, { memo } from 'react';

import { StyledAccordionGroup, StyledH2 } from './styled';

export interface AccordionGroupProps {
  header: string;
  children?: React.ReactNode;
}

export const AccordionGroup: React.FC<AccordionGroupProps> = memo(({ header, children }) => {
  return (
    <StyledAccordionGroup>
      <StyledH2>{header}</StyledH2>
      {children}
    </StyledAccordionGroup>
  );
});
