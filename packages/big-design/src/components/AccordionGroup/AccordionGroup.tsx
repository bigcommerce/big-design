import React, { memo, useMemo } from 'react';

import { AccordionPanel, AccordionPanelProps } from './AccordionPanel';
import { StyledAccordionGroup, StyledH2 } from './styled';

export interface AccordionGroupProps {
  header: string;
  panels: AccordionPanelProps[];
}

export const AccordionGroup: React.FC<AccordionGroupProps> = memo(({ header, panels }) => {
  const renderedPanels = useMemo(() => {
    return panels.map((panel, index) => <AccordionPanel {...panel} key={index} />);
  }, [panels]);

  return (
    <StyledAccordionGroup>
      <StyledH2>{header}</StyledH2>
      {renderedPanels}
    </StyledAccordionGroup>
  );
});
