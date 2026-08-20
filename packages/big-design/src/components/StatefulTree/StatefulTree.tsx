import React, { useMemo } from 'react';

import { typedMemo } from '../../utils';
import { Tree, type TreeNodeId, type TreeSelectable, useNodeMap, useTreeKeyEvents } from '../Tree';
import { useFlatVisibleNodes } from '../Tree/hooks/useFlatVisibleNodes';
import { type TreeBaseProps, type TreeVirtualizationProps } from '../Tree/types';

import { useExpandable, useFocusable, useSelectable } from './hooks';

export interface StatefulTreeProps<T>
  extends Omit<TreeBaseProps<T>, 'expandable' | 'focusable' | 'selectable' | 'onKeyDown'> {
  defaultExpanded?: TreeNodeId[];
  defaultSelected?: TreeNodeId[];
  iconless?: boolean;
  selectable?: TreeSelectable<T>['type'];
  onExpandedChange?: (expandedNodes: TreeNodeId[]) => void;
  onSelectionChange?: (selectedValues: T[]) => void;
  virtualization?: TreeVirtualizationProps;
}

const EMPTY_DISABLED_NODES: TreeNodeId[] = [];

const InternalStatefulTree = <T,>(
  props: StatefulTreeProps<T>,
): React.ReactElement<StatefulTreeProps<T>> => {
  const {
    nodes = [],
    defaultExpanded,
    defaultSelected,
    disabledNodes = EMPTY_DISABLED_NODES,
    iconless,
    onNodeClick,
    onExpandedChange,
    onSelectionChange,
    selectable: type,
    virtualization,
  } = props;
  const { focusedNode, onFocus } = useFocusable({ nodes, type, defaultSelected });
  const { expandedNodes, onToggle } = useExpandable({ defaultExpanded, onExpandedChange });
  const { selectedNodes, onSelect } = useSelectable({
    defaultSelected,
    disabledNodes,
    nodes,
    onSelectionChange,
    type,
  });
  const nodeMap = useNodeMap({ nodes });
  const expandedNodesSet = useMemo(() => new Set(expandedNodes), [expandedNodes]);
  const flatNodes = useFlatVisibleNodes({ nodes, expandedNodes: expandedNodesSet });
  const visibleNodes = useMemo(() => flatNodes.map(({ node }) => node.id), [flatNodes]);
  const onKeyDown = useTreeKeyEvents({ onFocus, onSelect, onToggle, nodeMap, visibleNodes });
  const expandable = useMemo(() => ({ expandedNodes, onToggle }), [expandedNodes, onToggle]);
  const focusable = useMemo(() => ({ focusedNode, onFocus }), [focusedNode, onFocus]);
  const selectable = useMemo(
    () => ({ selectedNodes, onSelect, type }),
    [onSelect, selectedNodes, type],
  );
  const treeProps: TreeBaseProps<T> = {
    disabledNodes,
    expandable,
    focusable,
    iconless,
    nodes,
    onKeyDown,
    onNodeClick,
    selectable,
  };

  return <Tree {...treeProps} virtualization={virtualization} />;
};

export const StatefulTree = typedMemo(InternalStatefulTree);
