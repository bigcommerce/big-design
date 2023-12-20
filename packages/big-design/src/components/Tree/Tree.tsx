import React, { createContext, useMemo, useRef } from 'react';

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
  treeRef: { current: null },
});

export const Tree = <T,>({
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
  const treeRef = useRef<HTMLUListElement>(null);

  const initialTreeContext: TreeContextState<T> = {
    disabledNodes,
    expandable,
    focusable,
    iconless,
    onKeyDown,
    onNodeClick,
    selectable,
    treeRef,
  };

  const renderedItems = useMemo(
    () => nodes.map((node, index) => <TreeNode {...node} key={index} />),
    [nodes],
  );

  return (
    <TreeContext.Provider value={initialTreeContext}>
      <StyledUl
        aria-multiselectable={selectable?.type === 'multi'}
        id={id}
        ref={treeRef}
        role="tree"
        style={{ overflow: 'hidden' }}
      >
        {renderedItems}
      </StyledUl>
    </TreeContext.Provider>
  );
};
