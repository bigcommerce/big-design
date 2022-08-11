import { useState } from 'react';

export const useAccordion = (defaultExpanded: boolean) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded ?? false);

  const onClick = () => {
    setIsExpanded(!isExpanded);
  };

  return {
    isExpanded,
    onClick,
  };
};
