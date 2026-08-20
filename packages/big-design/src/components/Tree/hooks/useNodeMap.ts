import { useMemo } from 'react';

import { type NodeMap, type TreeNodeId, type TreeNodeProps } from '../types';

interface UseNodeMapProps<T> {
  nodes: Array<TreeNodeProps<T>>;
}

interface BuildNodeMapProps<T> extends UseNodeMapProps<T> {
  nodeMap: NodeMap;
  parent?: TreeNodeId;
}

// prettier-ignore
const buildNodeMap = <T,>({ nodes, nodeMap, parent }: BuildNodeMapProps<T>): NodeMap => {
  if (!nodes || nodes.length < 1) {
    return nodeMap;
  }

  return nodes.reduce<NodeMap>((acc, node) => {
    acc.set(node.id, {
      children: node.children?.map((child) => child.id) ?? [],
      id: node.id,
      parent,
    });

    if (node.children && node.children.length > 0) {
      return buildNodeMap({
        nodes: node.children,
        nodeMap: acc,
        parent: node.id,
      });
    }

    return acc;
  }, nodeMap);
};

// prettier-ignore
export const useNodeMap = <T,>({ nodes }: UseNodeMapProps<T>): NodeMap => {
  return useMemo(() => buildNodeMap({ nodes, nodeMap: new Map() }), [nodes]);
};
