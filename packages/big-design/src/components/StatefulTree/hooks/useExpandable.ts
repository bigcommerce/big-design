import { useEffect, useState } from 'react';

import { TreeExpandable } from '../../Tree';
import { StatefulTreeProps } from '../StatefulTree';

interface UseExpandableProps<T> {
  defaultExpanded: StatefulTreeProps<T>['defaultExpanded'];
  onExpandedChange: StatefulTreeProps<T>['onExpandedChange'];
}

export const useExpandable = <T>({ defaultExpanded, onExpandedChange }: UseExpandableProps<T>) => {
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

  const onExpand: TreeExpandable['onExpand'] = (nodeId) => {
    setExpandedNodes([...expandedNodes, nodeId]);
  };

  const onCollapse: TreeExpandable['onCollapse'] = (nodeId) => {
    setExpandedNodes((prevNodes) => prevNodes.filter((node) => node !== nodeId));
  };

  const onToggle: TreeExpandable['onToggle'] = (nodeId, isExpanded) => {
    if (isExpanded) {
      onCollapse(nodeId);
    } else {
      onExpand(nodeId);
    }
  };

  return {
    expandedNodes,
    onToggle,
  };
};
