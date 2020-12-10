import React, { createContext, useEffect, useMemo, useState } from 'react';

import { StyledUl } from './styled';
import { TreeNode } from './TreeNode';
import { TreeContextState, TreeProps } from './types';

// We don't have access to the type yet, so we need to pass any into the generic.
export const TreeContext = createContext<TreeContextState<any>>({
  expandable: {
    expandedNodes: [],
  },
  focusable: {
    focusedNode: '',
    onFocus: () => null,
  },
  onKeyDown: () => null,
});

export const Tree = <T extends unknown>({
  disabledNodes,
  expandable,
  focusable,
  iconless,
  id,
  nodes,
  onKeyDown,
  onNodeClick,
  selectable,
}: TreeProps<T>): React.ReactElement<TreeProps<T>> => {
  const [internalNodes, setInternalNodes] = useState(nodes);
  const initialTreeContext: TreeContextState<T> = {
    disabledNodes,
    expandable,
    focusable,
    iconless,
    onKeyDown,
    onNodeClick,
    selectable,
  };

  useEffect(() => {
    setInternalNodes(nodes);
  }, [nodes]);

  const renderedItems = useMemo(() => internalNodes.map((node, index) => <TreeNode {...node} key={index} />), [
    internalNodes,
  ]);

  return (
    <TreeContext.Provider value={initialTreeContext}>
      <StyledUl id={id} role="tree" aria-multiselectable={selectable?.type === 'multi'} style={{ overflow: 'hidden' }}>
        {renderedItems}
      </StyledUl>
    </TreeContext.Provider>
  );
};
