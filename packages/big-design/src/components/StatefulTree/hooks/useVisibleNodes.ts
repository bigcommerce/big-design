import { useMemo } from 'react';

import { TreeNodeId, TreeNodeProps, useFlatVisibleNodes } from '../../Tree';

interface UseVisibleNodesProps<T> {
  expandedNodes: TreeNodeId[];
  nodes: Array<TreeNodeProps<T>>;
}

export const useVisibleNodes = <T>({ expandedNodes, nodes }: UseVisibleNodesProps<T>) => {
  const expandedNodesSet = useMemo(() => new Set(expandedNodes), [expandedNodes]);
  const flatNodes = useFlatVisibleNodes({ nodes, expandedNodes: expandedNodesSet });

  const visibleNodes = useMemo(() => flatNodes.map(({ node }) => node.id), [flatNodes]);

  return { visibleNodes };
};
