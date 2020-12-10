import { useEffect, useState } from 'react';

import { NodeMap, TreeNodeId } from '../../Tree';

interface UseVisibleNodesProps {
  expandedNodes: TreeNodeId[];
  nodeMap: NodeMap;
}

interface RecursiveSearchProps {
  nodes: TreeNodeId[];
  expandedNodes: TreeNodeId[];
  nodeMap: NodeMap;
}

const recursiveSearch = ({ nodes, expandedNodes, nodeMap }: RecursiveSearchProps): TreeNodeId[] => {
  return nodes.reduce<TreeNodeId[]>((acc, id) => {
    if (expandedNodes.includes(id)) {
      const children = nodeMap.get(id)?.children;

      if (children) {
        const visibleChildren = recursiveSearch({
          nodes: children,
          expandedNodes,
          nodeMap,
        });

        return acc.includes(id) ? [...acc, ...visibleChildren] : [...acc, id, ...visibleChildren];
      }
    }

    return [...acc, id];
  }, []);
};

const buildVisibleNodes = ({ expandedNodes, nodeMap }: UseVisibleNodesProps) => {
  const entries = Array.from(nodeMap.entries());
  const parentNodes: TreeNodeId[] = entries.filter(([, value]) => value.parent === undefined, []).map(([id]) => id);

  return recursiveSearch({
    nodes: parentNodes,
    expandedNodes,
    nodeMap,
  });
};

export const useVisibleNodes = ({ expandedNodes, nodeMap }: UseVisibleNodesProps) => {
  const [visibleNodes, setVisibleNodes] = useState(buildVisibleNodes({ expandedNodes, nodeMap }));

  useEffect(() => {
    setVisibleNodes(buildVisibleNodes({ expandedNodes, nodeMap }));
  }, [expandedNodes, nodeMap]);

  return { visibleNodes };
};
