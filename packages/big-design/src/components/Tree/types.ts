import { RefObject } from 'react';

export type TreeNodeId = string;

export type TreeSelectableType = 'radio' | 'multi' | undefined;

export type TreeOnKeyDown<T> = (
  e: React.KeyboardEvent<HTMLLIElement>,
  node: {
    id: TreeNodeId;
    isExpanded: boolean;
    isSelectable: boolean;
    hasChildren: boolean;
    value: T;
  },
) => void;

export type TreeOnNodeClick = (e: React.MouseEvent<HTMLLIElement>, nodeId: TreeNodeId) => void;

export interface TreeNodeProps<T> {
  children?: Array<TreeNodeProps<T>>;
  icon?: React.ReactNode | null;
  id: TreeNodeId;
  label: string;
  value?: T;
}

export interface TreeExpandable {
  expandedNodes: TreeNodeId[];
  onCollapse?(nodeId: TreeNodeId): void;
  onExpand?(nodeId: TreeNodeId): void;
  onToggle?(nodeId: TreeNodeId, isExpanded: boolean): void;
}

export interface TreeSelectable<T> {
  selectedNodes?: TreeNodeId[];
  type: TreeSelectableType;
  onSelect?: (nodeId: TreeNodeId, value: T) => void;
}

export interface TreeFocusable {
  focusedNode: TreeNodeId;
  onFocus(nodeId: TreeNodeId): void;
}

export interface TreeBaseProps<T> {
  nodes: Array<TreeNodeProps<T>>;
  iconless?: boolean;
  id?: string;
  expandable: TreeExpandable;
  focusable: TreeFocusable;
  selectable?: TreeSelectable<T>;
  disabledNodes?: TreeNodeId[];
  onKeyDown: TreeOnKeyDown<T>;
  onNodeClick?: TreeOnNodeClick;
}

export interface TreeVirtualizationProps {
  /** Height (in px) of the scrollable area. */
  maxHeight: number;
}

export interface TreeProps<T> extends TreeBaseProps<T> {
  /**
   * Renders only the visible nodes within the viewport. Recommended for large
   * trees (thousands of nodes).
   */
  virtualization?: TreeVirtualizationProps;
}

export interface TreeContextState<T> {
  expandable: TreeExpandable;
  focusable: TreeFocusable;
  iconless?: boolean;
  selectable?: TreeSelectable<T>;
  onKeyDown: TreeOnKeyDown<T>;
  onNodeClick?: TreeOnNodeClick;
  onNodeRefChange(nodeId: TreeNodeId, node: HTMLLIElement | null, wasFocused?: boolean): void;
  treeRef: RefObject<HTMLUListElement>;
  disabledNodesSet: Set<TreeNodeId>;
  expandedNodesSet: Set<TreeNodeId>;
  selectedNodesSet: Set<TreeNodeId>;
  selectedChildrenCounts: Map<TreeNodeId, number>;
}

export interface MapValues {
  children: TreeNodeId[];
  id: TreeNodeId;
  parent?: TreeNodeId;
}

export type NodeMap = Map<TreeNodeId, MapValues>;
