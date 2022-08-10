import { useState } from 'react';

export const useAccordion = (defaultExpanded: boolean) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const onClick = () => {
    setIsExpanded(!isExpanded);
  };

  return {
    isExpanded,
    onClick,
  };
};
