import { useCallback, useEffect, useState } from 'react';

import { TreeExpandable } from '../../Tree';
import { StatefulTreeProps } from '../StatefulTree';

interface UseExpandableProps<T> {
  defaultExpanded: StatefulTreeProps<T>['defaultExpanded'];
  onExpandedChange: StatefulTreeProps<T>['onExpandedChange'];
}

// prettier-ignore
export const useExpandable = <T,>({ defaultExpanded, onExpandedChange }: UseExpandableProps<T>) => {
  const [expandedNodes, setExpandedNodes] = useState(defaultExpanded ?? []);

  useEffect(() => {
    if (defaultExpanded) {
      setExpandedNodes(defaultExpanded);
    }
  }, [defaultExpanded]);

  useEffect(() => {
    if (typeof onExpandedChange === 'function') {
      onExpandedChange(expandedNodes);
    }
  }, [expandedNodes, onExpandedChange]);

  const onToggle = useCallback<NonNullable<TreeExpandable['onToggle']>>((nodeId, isExpanded) => {
    setExpandedNodes((prevNodes) =>
      isExpanded ? prevNodes.filter((node) => node !== nodeId) : [...prevNodes, nodeId],
    );
  }, []);

  return {
    expandedNodes,
    onToggle,
  };
};
