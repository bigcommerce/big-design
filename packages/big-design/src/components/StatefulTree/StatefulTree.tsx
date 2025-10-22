import React from 'react';

import { typedMemo } from '../../utils';
import { Tree, TreeNodeId, TreeProps, TreeSelectable, useNodeMap, useTreeKeyEvents } from '../Tree';

import { useExpandable, useFocusable, useSelectable, useVisibleNodes } from './hooks';

export interface StatefulTreeProps<T>
  extends Omit<TreeProps<T>, 'expandable' | 'focusable' | 'selectable' | 'onKeyDown'> {
  readonly defaultExpanded?: TreeNodeId[];
  readonly defaultSelected?: TreeNodeId[];
  readonly iconless?: boolean;
  readonly selectable?: TreeSelectable<T>['type'];
  readonly onExpandedChange?: (expandedNodes: TreeNodeId[]) => void;
  readonly onSelectionChange?: (selectedValues: T[]) => void;
}

const InternalStatefulTree = <T,>({
  nodes = [],
  defaultExpanded,
  defaultSelected,
  disabledNodes = [],
  iconless,
  onNodeClick,
  onExpandedChange,
  onSelectionChange,
  selectable: type,
}: StatefulTreeProps<T>): React.ReactElement<StatefulTreeProps<T>> => {
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
  const { visibleNodes } = useVisibleNodes({ expandedNodes, nodeMap });
  const onKeyDown = useTreeKeyEvents({ onFocus, onSelect, onToggle, nodeMap, visibleNodes });

  return (
    <Tree
      disabledNodes={disabledNodes}
      expandable={{ expandedNodes, onToggle }}
      focusable={{ focusedNode, onFocus }}
      iconless={iconless}
      nodes={nodes}
      onKeyDown={onKeyDown}
      onNodeClick={onNodeClick}
      selectable={{ selectedNodes, onSelect, type }}
    />
  );
};

export const StatefulTree = typedMemo(InternalStatefulTree);
