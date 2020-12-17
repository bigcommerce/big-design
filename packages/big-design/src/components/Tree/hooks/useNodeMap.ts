import { useMemo } from 'react';

import { NodeMap, TreeNodeId, TreeNodeProps } from '../types';

interface UseNodeMapProps<T> {
  nodes: TreeNodeProps<T>[];
}

interface BuildNodeMapProps<T> extends UseNodeMapProps<T> {
  nodeMap: NodeMap;
}

const getParentId = (nodeMap: NodeMap, id: TreeNodeId) => {
  const iterator = nodeMap.entries();

  for (const [, value] of iterator) {
    if (value.children && value.children.includes(id)) {
      return value.id;
    }
  }
};

const buildNodeMap = <T>({ nodes, nodeMap }: BuildNodeMapProps<T>): NodeMap => {
  if (!nodes || nodes.length < 1) {
    return nodeMap;
  }

  return nodes.reduce<NodeMap>((acc, node) => {
    const parent = getParentId(acc, node.id);

    acc.set(node.id, {
      children: node.children?.map((child) => child.id) ?? [],
      id: node.id,
      parent,
    });

    if (node.children && node.children.length > 0) {
      return buildNodeMap({
        nodes: node.children,
        nodeMap: acc,
      });
    }

    return acc;
  }, nodeMap);
};

export const useNodeMap = <T>({ nodes }: UseNodeMapProps<T>): NodeMap => {
  return useMemo(() => buildNodeMap({ nodes, nodeMap: new Map() }), [nodes]);
};
