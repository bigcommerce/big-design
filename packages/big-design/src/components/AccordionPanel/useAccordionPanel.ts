import { useState } from 'react';

import { AccordionProps } from './Accordion';

type InitialPanels = Array<Omit<AccordionProps, 'isExpanded' | 'onClick'>>;

export const useAccordionPanel = (initialPanels: InitialPanels) => {
  const [expandedPanels, setExpandedPanels] = useState(() => {
    return initialPanels.map(({ defaultExpanded }) => defaultExpanded ?? false);
  });

  const handleOnClick = (panelIndex: number) => () => {
    setExpandedPanels(
      expandedPanels.map((isExpanded, index) => (index === panelIndex ? !isExpanded : isExpanded)),
    );
  };

  return {
    panels: expandedPanels.map<AccordionProps>((isExpanded, index) => ({
      ...initialPanels[index],
      isExpanded,
      onClick: handleOnClick(index),
    })),
  };
};
