import React, { memo } from 'react';

import { Panel } from '../Panel';

import { Accordion, AccordionProps } from './Accordion';
import { StyledAccordionPanelWrapper } from './styled';

export interface AccordionPanelProps {
  header: string;
  panels: AccordionProps[];
}

export const AccordionPanel: React.FC<AccordionPanelProps> = memo(({ header, panels }) => {
  return (
    <Panel header={header}>
      <StyledAccordionPanelWrapper>
        {panels.map((panel, index) => (
          <Accordion {...panel} key={index} />
        ))}
      </StyledAccordionPanelWrapper>
    </Panel>
  );
});
