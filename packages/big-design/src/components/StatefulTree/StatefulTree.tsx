import React from 'react';

import { typedMemo } from '../../utils';
import { Tree, TreeNodeId, TreeProps, TreeSelectable, useNodeMap, useTreeKeyEvents } from '../Tree';

import { useExpandable, useFocusable, useSelectable, useVisibleNodes } from './hooks';

export interface StatefulTreeProps<T>
  extends Omit<TreeProps<T>, 'expandable' | 'focusable' | 'selectable' | 'onKeyDown'> {
  defaultExpanded?: TreeNodeId[];
  defaultSelected?: TreeNodeId[];
  selectable?: TreeSelectable<T>['type'];
  onExpandedChange?: (expandedNodes: TreeNodeId[]) => void;
  onSelectionChange?: (selectedValues: T[]) => void;
}

const InternalStatefulTree = <T extends unknown>({
  nodes = [],
  defaultExpanded,
  defaultSelected,
  disabledNodes = [],
  onNodeClick,
  onExpandedChange,
  onSelectionChange,
  selectable: type,
}: StatefulTreeProps<T>): React.ReactElement<StatefulTreeProps<T>> => {
  const { focusedNode, onFocus } = useFocusable({ nodes, type, defaultSelected });
  const { expandedNodes, onToggle } = useExpandable({ defaultExpanded, onExpandedChange });
  const { selectedNodes, onSelect } = useSelectable({ defaultSelected, disabledNodes, nodes, onSelectionChange, type });
  const nodeMap = useNodeMap({ nodes });
  const { visibleNodes } = useVisibleNodes({ expandedNodes, nodeMap });
  const onKeyDown = useTreeKeyEvents({ onFocus, onSelect, onToggle, nodeMap, visibleNodes });

  return (
    <Tree
      nodes={nodes}
      disabledNodes={disabledNodes}
      expandable={{ expandedNodes, onToggle }}
      focusable={{ focusedNode, onFocus }}
      onKeyDown={onKeyDown}
      onNodeClick={onNodeClick}
      selectable={{ selectedNodes, onSelect, type }}
    />
  );
};

export const StatefulTree = typedMemo(InternalStatefulTree);
