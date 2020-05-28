import React, { useMemo, useReducer } from 'react';

import { typedMemo } from '../../utils';

import { createReducer, createReducerInit } from './reducer';
import { StyledUl } from './styled';
import { TreeNode } from './TreeNode';
import { TreeProps } from './types';

const InternalTree = <T extends unknown>({
  iconless,
  nodes,
  onCollapse,
  onExpand,
  onSelect,
  selectable,
}: TreeProps<T>): React.ReactElement<TreeProps<T>> => {
  const reducer = useMemo(() => createReducer<T>(), []);
  const reducerInit = useMemo(() => createReducerInit<T>(), []);
  const [state, dispatch] = useReducer(reducer, { nodes, radio: selectable === 'radio' }, reducerInit);

  const renderedItems = useMemo(
    () =>
      nodes.map((node, index) => (
        <TreeNode
          {...node}
          dispatch={dispatch}
          iconless={iconless}
          key={index}
          onCollapse={onCollapse}
          onExpand={onExpand}
          onSelect={onSelect}
          selectable={selectable}
          state={state}
        />
      )),
    [iconless, nodes, onCollapse, onExpand, onSelect, selectable, state],
  );

  return (
    <StyledUl role="tree" aria-multiselectable={selectable === 'multi'} style={{ overflow: 'hidden' }}>
      {renderedItems}
    </StyledUl>
  );
};

export const Tree = typedMemo(InternalTree);
