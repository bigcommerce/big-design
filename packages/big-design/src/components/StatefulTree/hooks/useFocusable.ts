import { useState } from 'react';

import { TreeFocusable, TreeNodeId, TreeNodeProps, TreeSelectableType } from '../../Tree';

interface UseFocusableProps<T> {
  nodes: Array<TreeNodeProps<T>>;
  type: TreeSelectableType;
  defaultSelected?: TreeNodeId[];
}

export const useFocusable = <T>({ nodes, type, defaultSelected }: UseFocusableProps<T>) => {
  /*
   * We purposefully want to focus on the first node if defaultSelected is empty,
   * with the assumption that the tree is fully collapsed.
   */
  const [focusedNode, setFocusedNode] = useState(
    type && defaultSelected?.length ? defaultSelected[0] : nodes[0].id,
  );

  const onFocus: TreeFocusable['onFocus'] = (nodeId) => {
    setFocusedNode(nodeId);
  };

  return {
    focusedNode,
    onFocus,
  };
};
