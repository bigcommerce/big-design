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
  nodes,
  onKeyDown,
  onNodeClick,
  selectable,
  virtualization,
}: TreeProps<T>): React.ReactElement<TreeProps<T>> => {
  const treeRef = useRef<HTMLUListElement>(null);
  const pendingFocusNodeRef = useRef<TreeNodeId>();
  const focusedNodeRef = useRef(focusable.focusedNode);

  focusedNodeRef.current = focusable.focusedNode;

  const maxHeight = virtualization?.maxHeight;
  const hasValidMaxHeight =
    typeof maxHeight === 'number' && Number.isFinite(maxHeight) && maxHeight > 0;
  const virtualized = Boolean(virtualization) && hasValidMaxHeight;

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

      // Only reclaim focus if it's still logically owned by the tree (nothing else
      // has been focused since, in or outside the tree) and this node is still the
      // one the tree considers focused.
      const activeElement = document.activeElement;
      const focusStillOwnedByTree =
        activeElement === document.body || Boolean(treeRef.current?.contains(activeElement));

      if (nodeId === focusedNodeRef.current && focusStillOwnedByTree) {
        node.focus();
      }
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

  const initialTreeContext: TreeContextState<T> = useMemo(
    () => ({
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
    }),
    [
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
    ],
  );

  // Depending on booleans (rather than the `virtualization` object itself) keeps this from
  // re-warning on every render for consumers who pass `virtualization` as an inline literal.
  const hasVirtualization = Boolean(virtualization);

  useEffect(() => {
    if (hasVirtualization && !hasValidMaxHeight) {
      warning(
        'Tree: `virtualization.maxHeight` must be a positive, finite number to bound the scroll area.',
      );
    }
  }, [hasVirtualization, hasValidMaxHeight]);

  const flatNodes = useFlatVisibleNodes({
    nodes: virtualized ? nodes : [],
    expandedNodes: expandedNodesSet,
  });

  const virtualizer = useTreeVirtualizer({
    enabled: virtualized,
    flatNodes,
    focusedNode: focusable.focusedNode,
    maxHeight: virtualized ? maxHeight : undefined,
    nodes,
    onFocus: focusable.onFocus,
    scrollRef: treeRef,
  });

  const renderedItems = useMemo(
    () =>
      virtualized
        ? null
        : nodes.map((node, index) => (
            <TreeNode {...node} depth={0} key={index} posinset={index + 1} setsize={nodes.length} />
          )),
    [nodes, virtualized],
  );

  const virtualItems = virtualized ? virtualizer.getVirtualItems() : [];

  // Roving tabindex only ever lands on the focused node's own `<li>`. If that node
  // is scrolled out of the virtualized window it isn't mounted, so nothing in the
  // tree has tabIndex 0 and Tab from outside skips the tree entirely. Make the list
  // itself a fallback tab stop in that case, and redirect focus to the real target
  // as soon as scrolling it into view mounts it.
  const focusedNodeMounted =
    !virtualized ||
    virtualItems.some((item) => flatNodes[item.index]?.node.id === focusable.focusedNode);

  const handleContainerFocus = useCallback(
    (e: React.FocusEvent<HTMLUListElement>) => {
      if (e.target !== e.currentTarget) {
        return;
      }

      const index = flatNodes.findIndex((flatNode) => flatNode.node.id === focusedNodeRef.current);

      if (index === -1) {
        return;
      }

      pendingFocusNodeRef.current = focusedNodeRef.current;
      virtualizer.scrollToIndex(index, { behavior: 'auto' });
    },
    [flatNodes, virtualizer],
  );

  const renderVirtualItems = () => {
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
        onFocus={virtualized ? handleContainerFocus : undefined}
        ref={treeRef}
        role="tree"
        tabIndex={virtualized && !focusedNodeMounted ? 0 : undefined}
      >
        {virtualized ? renderVirtualItems() : renderedItems}
      </StyledUl>
    </TreeContext.Provider>
  );
};
