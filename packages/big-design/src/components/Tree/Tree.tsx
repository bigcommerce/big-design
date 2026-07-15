import React, { createContext, useCallback, useEffect, useMemo, useRef } from 'react';

import { getSelectedChildrenCounts, warning } from '../../utils';

import { useFlatVisibleNodes, useTreeVirtualizer } from './hooks';
import { StyledUl, StyledVirtualSpacer } from './styled';
import { TreeNode } from './TreeNode';
import { TreeContextState, TreeNodeId, TreeProps } from './types';

const EMPTY_COUNTS: Map<TreeNodeId, number> = new Map();

export const TreeContext = createContext<TreeContextState<any>>({
  expandable: {
    expandedNodes: [],
  },
  focusable: {
    focusedNode: '',
    onFocus: () => null,
  },
  onKeyDown: () => null,
  onNodeRefChange: () => null,
  treeRef: { current: null },
  disabledNodesSet: new Set(),
  expandedNodesSet: new Set(),
  selectedNodesSet: new Set(),
  selectedChildrenCounts: EMPTY_COUNTS,
});

export const Tree = <T,>({
  disabledNodes,
  expandable,
  focusable,
  iconless,
  id,
  maxHeight,
  nodes,
  onKeyDown,
  onNodeClick,
  selectable,
  virtualized: virtualizedProp,
}: TreeProps<T>): React.ReactElement<TreeProps<T>> => {
  const treeRef = useRef<HTMLUListElement>(null);
  const pendingFocusNodeRef = useRef<TreeNodeId>();
  const focusedNodeRef = useRef(focusable.focusedNode);

  focusedNodeRef.current = focusable.focusedNode;

  const hasValidMaxHeight =
    typeof maxHeight === 'number' && Number.isFinite(maxHeight) && maxHeight > 0;
  const virtualized = virtualizedProp === true && hasValidMaxHeight;
  const onNodeRefChange = useCallback(
    (nodeId: TreeNodeId, node: HTMLLIElement | null, wasFocused = false) => {
      if (!node) {
        if (wasFocused) {
          pendingFocusNodeRef.current = focusedNodeRef.current;
        }

        return;
      }

      if (pendingFocusNodeRef.current !== nodeId) {
        return;
      }

      pendingFocusNodeRef.current = undefined;
      node.focus();
    },
    [],
  );

  const expandedNodesSet = useMemo(
    () => new Set(expandable.expandedNodes),
    [expandable.expandedNodes],
  );
  const selectedNodesSet = useMemo(
    () => new Set(selectable?.selectedNodes ?? []),
    [selectable?.selectedNodes],
  );
  const disabledNodesSet = useMemo(() => new Set(disabledNodes ?? []), [disabledNodes]);

  const selectedChildrenCounts = useMemo(
    () => (selectable?.type ? getSelectedChildrenCounts(nodes, selectedNodesSet) : EMPTY_COUNTS),
    [nodes, selectable?.type, selectedNodesSet],
  );

  const initialTreeContext: TreeContextState<T> = {
    disabledNodes,
    expandable,
    focusable,
    iconless,
    onKeyDown,
    onNodeRefChange,
    onNodeClick,
    selectable,
    treeRef,
    disabledNodesSet,
    expandedNodesSet,
    selectedNodesSet,
    selectedChildrenCounts,
  };

  useEffect(() => {
    if (virtualizedProp && !hasValidMaxHeight) {
      warning(
        'Tree: `virtualized` requires a positive, finite `maxHeight` to bound the scroll area.',
      );
    }
  }, [hasValidMaxHeight, virtualizedProp]);

  const flatNodes = useFlatVisibleNodes({
    nodes: virtualized ? nodes : [],
    expandedNodes: expandable.expandedNodes,
  });

  const virtualizer = useTreeVirtualizer({
    enabled: virtualized,
    flatNodes,
    focusedNode: focusable.focusedNode,
    maxHeight: virtualized ? maxHeight : undefined,
    scrollRef: treeRef,
  });

  const renderedItems = useMemo(
    () => nodes.map((node, index) => <TreeNode {...node} key={index} />),
    [nodes],
  );

  const renderVirtualItems = () => {
    const virtualItems = virtualizer.getVirtualItems();
    const paddingTop = virtualItems.length > 0 ? virtualItems[0].start : 0;
    const paddingBottom =
      virtualItems.length > 0
        ? virtualizer.getTotalSize() - virtualItems[virtualItems.length - 1].end
        : 0;

    return (
      <>
        {paddingTop > 0 && <StyledVirtualSpacer $height={paddingTop} aria-hidden="true" />}
        {virtualItems.map((virtualItem) => {
          const { node, depth, posinset, setsize } = flatNodes[virtualItem.index];

          return (
            <TreeNode
              {...node}
              depth={depth}
              key={node.id}
              measureElement={virtualizer.measureElement}
              posinset={posinset}
              setsize={setsize}
              virtualIndex={virtualItem.index}
              virtualized
            />
          );
        })}
        {paddingBottom > 0 && <StyledVirtualSpacer $height={paddingBottom} aria-hidden="true" />}
      </>
    );
  };

  return (
    <TreeContext.Provider value={initialTreeContext}>
      <StyledUl
        $maxHeight={virtualized ? maxHeight : undefined}
        $virtualized={virtualized}
        aria-multiselectable={selectable?.type === 'multi'}
        id={id}
        ref={treeRef}
        role="tree"
      >
        {virtualized ? renderVirtualItems() : renderedItems}
      </StyledUl>
    </TreeContext.Provider>
  );
};
