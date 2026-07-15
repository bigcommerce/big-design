import { useMemo } from 'react';

import { NodeMap, TreeNodeId } from '../../Tree';

interface UseVisibleNodesProps {
  expandedNodes: TreeNodeId[];
  nodeMap: NodeMap;
}

const buildVisibleNodes = ({ expandedNodes, nodeMap }: UseVisibleNodesProps): TreeNodeId[] => {
  const expanded = new Set(expandedNodes);
  const visible: TreeNodeId[] = [];

  const walk = (ids: TreeNodeId[]) => {
    for (const id of ids) {
      visible.push(id);

      if (expanded.has(id)) {
        const children = nodeMap.get(id)?.children;

        if (children?.length) {
          walk(children);
        }
      }
    }
  };

  const rootNodes: TreeNodeId[] = [];

  for (const [id, value] of nodeMap) {
    if (value.parent === undefined) {
      rootNodes.push(id);
    }
  }

  walk(rootNodes);

  return visible;
};

export const useVisibleNodes = ({ expandedNodes, nodeMap }: UseVisibleNodesProps) => {
  const visibleNodes = useMemo(
    () => buildVisibleNodes({ expandedNodes, nodeMap }),
    [expandedNodes, nodeMap],
  );

  return { visibleNodes };
};
