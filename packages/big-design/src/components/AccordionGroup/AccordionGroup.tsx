import React, { memo, useMemo } from 'react';

import { Panel } from '../Panel';

import { AccordionPanel, AccordionPanelProps } from './AccordionPanel';
import { StyledAccordionPanelWrapper } from './styled';

export interface AccordionGroupProps {
  header: string;
  panels: AccordionPanelProps[];
}

export const AccordionGroup: React.FC<AccordionGroupProps> = memo(({ header, panels }) => {
  const renderedPanels = useMemo(() => {
    return panels.map((panel, index) => <AccordionPanel {...panel} key={index} />);
  }, [panels]);

  return (
    <Panel header={header}>
      <StyledAccordionPanelWrapper>{renderedPanels}</StyledAccordionPanelWrapper>
    </Panel>
  );
});
