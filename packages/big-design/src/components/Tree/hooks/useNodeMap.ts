import { useMemo } from 'react';

import { NodeMap, TreeNodeId, TreeNodeProps } from '../types';

interface UseNodeMapProps<T> {
  nodes: Array<TreeNodeProps<T>>;
}

interface BuildNodeMapProps<T> extends UseNodeMapProps<T> {
  nodeMap: NodeMap;
}

const getParentId = (nodeMap: NodeMap, id: TreeNodeId) => {
  const iterator = nodeMap.entries();

  // eslint-disable-next-line no-restricted-syntax
  for (const [, value] of iterator) {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (value.children && value.children.includes(id)) {
      return value.id;
    }
  }
};

const buildNodeMap = <T>({ nodes, nodeMap }: BuildNodeMapProps<T>): NodeMap => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
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
