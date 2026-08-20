import { useMemo } from 'react';

import type { TreeNodeId, TreeNodeProps } from '../types';

export interface FlatTreeNode<T> {
  node: TreeNodeProps<T>;
  depth: number;
  posinset: number;
  setsize: number;
}

interface UseFlatVisibleNodesProps<T> {
  nodes: Array<TreeNodeProps<T>>;
  expandedNodes: Set<TreeNodeId>;
}

// prettier-ignore
const flatten = <T,>(
  nodes: Array<TreeNodeProps<T>>,
  expanded: Set<TreeNodeId>,
  depth: number,
  acc: Array<FlatTreeNode<T>>,
): Array<FlatTreeNode<T>> => {
  const setsize = nodes.length;

  nodes.forEach((node, index) => {
    acc.push({ node, depth, posinset: index + 1, setsize });

    if (node.children?.length && expanded.has(node.id)) {
      flatten(node.children, expanded, depth + 1, acc);
    }
  });

  return acc;
};

// prettier-ignore
export const useFlatVisibleNodes = <T,>({ nodes, expandedNodes }: UseFlatVisibleNodesProps<T>) =>
  useMemo(() => flatten(nodes, expandedNodes, 0, []), [nodes, expandedNodes]);
