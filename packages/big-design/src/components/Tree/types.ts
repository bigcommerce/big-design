export interface TreeProps<T> {
  iconless?: boolean;
  nodes: TreeNodeProps<T>[];
  selectable?: 'radio' | 'multi';
  onExpand?(node: TreeNodeProps<T>): Promise<TreeNodeRef<T>> | TreeNodeRef<T> | void;
  onCollapse?(node: TreeNodeProps<T>): Promise<TreeNodeRef<T>> | TreeNodeRef<T> | void;
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

export type TreeNodeRef<T> = Pick<TreeNodeProps<T>, 'children'>;

export type MapValues = {
  children?: Set<TreeNodeId>;
  id: TreeNodeId;
  parent?: TreeNodeId;
};

export interface TreeState<T> {
  nodeMap: Map<TreeNodeId, MapValues>;
  expandedNodeIds: Set<TreeNodeId>;
  flattenedNodeIds: TreeNodeId[];
  focusedNode: TreeNodeId | null;
  selectedValues: Set<T>;
  visibleNodeIds: TreeNodeId[];
}
