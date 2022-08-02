import { useEffect, useState } from 'react';

interface UseAccordionProps {
  defaultExpanded?: boolean;
}

export const useAccordion = ({ defaultExpanded }: UseAccordionProps) => {
  const [isExpanded, setisExpanded] = useState(false);

  useEffect(() => {
    if (defaultExpanded) {
      setisExpanded(defaultExpanded);
    }
  }, [defaultExpanded]);

  const onClick = () => {
    const nextIsExpanded = !isExpanded;

    setisExpanded(nextIsExpanded);
  };

  return {
    isExpanded,
    onClick,
  };
};
