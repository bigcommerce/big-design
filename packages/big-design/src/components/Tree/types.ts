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

export type TreeItemId = string | number;

export interface TreeNodeProps<T> {
  children?: TreeNodeProps<T>[];
  disabled?: boolean;
  expanded?: boolean;
  icon?: React.ReactChild | null;
  id: TreeItemId;
  label: string;
  selected?: boolean;
  value?: T;
}

export type NodeMap = {
  [nodeId in TreeItemId]: {
    children: TreeItemId[];
    id: TreeItemId;
    parent: TreeItemId;
  };
};

export interface TreeState<T> {
  nodes: TreeNodeProps<T>[];
  nodeMap: NodeMap;
  expandedNodeIds: TreeItemId[];
  flattenedNodeIds: TreeItemId[];
  focusedNode: TreeItemId;
  selectedValues: Array<T>;
  visibleNodeIds: TreeItemId[];
}
