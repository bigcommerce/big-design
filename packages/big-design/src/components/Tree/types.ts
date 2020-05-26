export interface TreeProps<T> {
  iconless?: boolean;
  nodes: TreeNodeProps<T>[];
  selectable?: 'radio' | 'multi';
  onExpand?(node: TreeNodeProps<T>): void;
  onCollapse?(node: TreeNodeProps<T>): void;
  // Based on the selectable prop, it can either
  // return and array of values, or just one.
  onSelect?(values: T[] | T): void;
}

export type TreeNodeId = string | number;

export interface TreeNodeProps<T> {
  children?: TreeNodeProps<T>[];
  disabled?: boolean;
  expanded?: boolean;
  icon?: React.ReactChild | null;
  id: TreeNodeId;
  label: string;
  selected?: boolean;
  value?: T;
}

export type NodeMap = {
  [nodeId in TreeNodeId]: {
    children: TreeNodeId[];
    id: TreeNodeId;
    parent: TreeNodeId;
  };
};

export interface TreeState<T> {
  nodes: TreeNodeProps<T>[];
  nodeMap: NodeMap;
  expandedNodeIds: TreeNodeId[];
  flattenedNodeIds: TreeNodeId[];
  focusedNode: TreeNodeId;
  selectedValues: Array<T>;
  visibleNodeIds: TreeNodeId[];
}
