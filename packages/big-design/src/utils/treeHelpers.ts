import { TreeNodeProps, TreeProps } from '../components/Tree';

export function depthFirstSearch<T>(
  nodes: TreeProps<T>['nodes'],
  predicate: (node: TreeNodeProps<T>) => boolean,
  greedy?: boolean,
): TreeNodeProps<T>[] | TreeNodeProps<T> | null;
export function depthFirstSearch<T>(
  nodes: TreeProps<T>['nodes'],
  predicate: (node: TreeNodeProps<T>) => boolean,
  greedy?: true,
): TreeNodeProps<T> | null;
export function depthFirstSearch<T>(
  nodes: TreeProps<T>['nodes'],
  predicate: (node: TreeNodeProps<T>) => boolean,
  greedy?: false,
): TreeNodeProps<T>[] | null;
export function depthFirstSearch<T>(
  nodes: TreeProps<T>['nodes'],
  predicate: (node: TreeNodeProps<T>) => boolean,
  greedy = true,
): TreeNodeProps<T>[] | TreeNodeProps<T> | null {
  const list: TreeNodeProps<T>[] = [];

  for (const node of nodes) {
    if (predicate(node)) {
      if (greedy) {
        return node;
      }

      list.push(node);
    }

    if (node.children && node.children.length > 0) {
      if (greedy) {
        return depthFirstSearch(node.children, predicate, greedy);
      }

      const nestedDfs = depthFirstSearch(node.children, predicate, greedy);

      if (nestedDfs) {
        list.push(...nestedDfs);
      }
    }
  }

  return greedy ? null : list;
}
