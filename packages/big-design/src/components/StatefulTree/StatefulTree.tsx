import React, { useMemo } from 'react';

import {
  Tree,
  TreeNodeId,
  TreeSelectable,
  useFlatVisibleNodes,
  useNodeMap,
  useTreeKeyEvents,
} from '../Tree';
import { TreeBaseProps, TreeVirtualizationProps } from '../Tree/types';
import { typedMemo } from '../../utils';

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
  const treeProps: TreeBaseProps<T> = {
    disabledNodes,
    expandable: { expandedNodes, onToggle },
    focusable: { focusedNode, onFocus },
    iconless,
    nodes,
    onKeyDown,
    onNodeClick,
    selectable: { selectedNodes, onSelect, type },
  };

  return <Tree {...treeProps} virtualization={virtualization} />;
};

export const StatefulTree = typedMemo(InternalStatefulTree);
