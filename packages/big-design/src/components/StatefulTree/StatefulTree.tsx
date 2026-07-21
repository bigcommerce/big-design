import React from 'react';

import { typedMemo } from '../../utils';
import { Tree, TreeNodeId, TreeSelectable, useNodeMap, useTreeKeyEvents } from '../Tree';
import { TreeBaseProps, TreeVirtualizationProps } from '../Tree/types';

import { useExpandable, useFocusable, useSelectable, useVisibleNodes } from './hooks';

export interface StatefulTreeBaseProps<T>
  extends Omit<TreeBaseProps<T>, 'expandable' | 'focusable' | 'selectable' | 'onKeyDown'> {
  defaultExpanded?: TreeNodeId[];
  defaultSelected?: TreeNodeId[];
  iconless?: boolean;
  selectable?: TreeSelectable<T>['type'];
  onExpandedChange?: (expandedNodes: TreeNodeId[]) => void;
  onSelectionChange?: (selectedValues: T[]) => void;
}

export interface StatefulTreeProps<T> extends StatefulTreeBaseProps<T> {
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
  const { visibleNodes } = useVisibleNodes({ expandedNodes, nodes });
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
