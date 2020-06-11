import { depthFirstSearch } from '../../utils';

import { Action } from './reducer';
import { MapValues, TreeNodeId, TreeNodeProps, TreeProps, TreeState } from './types';

export const initialize = <T>(nodes: TreeProps<T>['nodes'], selectable: TreeProps<T>['selectable']): TreeState<T> => {
  const state = recursiveInitialize(
    nodes,
    {
      nodeMap: new Map<TreeNodeId, MapValues>(),
      expandedNodeIds: new Set(),
      flattenedNodeIds: [],
      focusedNode: null,
      selectedValues: new Set(),
      visibleNodeIds: [],
    },
    selectable,
  );

  if (!state.selectedValues.size) {
    if (selectable === 'radio') {
      const node = depthFirstSearch(nodes, (node) => node.value !== undefined);

      if (node && node.value !== undefined) {
        state.selectedValues.add(node.value);
        state.focusedNode = node.id;
      }
    }

    if (state.focusedNode === null && nodes[0]?.id !== undefined) {
      state.focusedNode = nodes[0].id;
    }
  }

  return state;
};

const recursiveInitialize = <T>(
  nodes: TreeProps<T>['nodes'] | undefined,
  state: TreeState<T>,
  selectable: TreeProps<T>['selectable'],
): TreeState<T> => {
  if (!nodes || nodes.length < 1) {
    return state;
  }

  // Order of statements in this loop is important.
  nodes.forEach((node) => {
    state.flattenedNodeIds.push(node.id);

    const parent = getParentId(state.nodeMap, node.id);

    state.nodeMap.set(node.id, {
      children: new Set(node.children?.map((child) => child.id)),
      id: node.id,
      parent,
    });

    if (node.expanded) {
      state.expandedNodeIds.add(node.id);
    }

    if ((parent !== undefined && state.expandedNodeIds.has(parent)) || parent === undefined) {
      state.visibleNodeIds.push(node.id);
    }

    if (node.selected && node.value !== undefined) {
      if (selectable === 'radio' && !state.selectedValues.size) {
        state.selectedValues.add(node.value);
        state.focusedNode = node.id;
      } else if (selectable === 'multi') {
        state.selectedValues.add(node.value);

        if (state.focusedNode === null) {
          state.focusedNode = node.id;
        }
      }
    }

    if (node.children && node.children.length > 0) {
      recursiveInitialize(node.children, state, selectable);
    }
  });

  return state;
};

const getParentId = (nodeMap: Map<TreeNodeId, MapValues>, id: TreeNodeId) => {
  const iterator = nodeMap.entries();

  for (const [, value] of iterator) {
    if (value.children && value.children.has(id)) {
      return value.id;
    }
  }

  return undefined;
};

export const getNextVisibleNode = <T>(state: TreeState<T>, id: TreeNodeId): TreeNodeId => {
  const index = state.visibleNodeIds.indexOf(id);

  if (index !== -1 && index + 1 < state.visibleNodeIds.length) {
    return state.visibleNodeIds[index + 1];
  }

  return id;
};

export const getPreviousVisibleNode = <T>(state: TreeState<T>, id: TreeNodeId): TreeNodeId => {
  const index = state.visibleNodeIds.indexOf(id);

  if (index !== -1 && index - 1 >= 0) {
    return state.visibleNodeIds[index - 1];
  }

  return id;
};

export const toggleNode = <T>(state: TreeState<T>, action: Extract<Action<T>, { type: 'TOGGLE_NODE' }>) => {
  const node = state.nodeMap.get(action.id);

  if (state.expandedNodeIds.has(action.id)) {
    state.expandedNodeIds.delete(action.id);

    node?.children.forEach((childId) => {
      const index = state.visibleNodeIds.indexOf(childId);

      if (index > -1) {
        state.visibleNodeIds.splice(index, 1);
      }
    });
  } else {
    state.expandedNodeIds.add(action.id);
    state.visibleNodeIds.splice(state.visibleNodeIds.indexOf(action.id) + 1, 0, ...Array.from(node?.children ?? []));
  }

  return state;
};

export const asyncToggle = <T>(state: TreeState<T>, action: Extract<Action<T>, { type: 'ASYNC_TOGGLE' }>) => {
  const { children, id, radio } = action;

  return recursiveToggle(state, radio, id, children);
};

export const recursiveToggle = <T>(
  state: TreeState<T>,
  radio: boolean,
  id: TreeNodeId,
  children?: TreeNodeProps<T>[],
): TreeState<T> => {
  if (!children) {
    return state;
  }

  const parentNode = state.nodeMap.get(id);
  const parentIndex = state.flattenedNodeIds.indexOf(id);
  const childrenIds = children.map(({ id }) => id);

  state.flattenedNodeIds.splice(
    parentIndex + 1,
    0,
    ...childrenIds.filter((childId) => !state.flattenedNodeIds.includes(childId)),
  );
  state.visibleNodeIds.splice(
    parentIndex + 1,
    0,
    ...childrenIds.filter((childId) => !state.visibleNodeIds.includes(childId)),
  );

  if (parentNode?.children) {
    state.nodeMap.set(id, {
      ...parentNode,
      children: new Set(childrenIds),
    });
  }

  children.forEach((child) => {
    state.nodeMap.set(child.id, {
      children: new Set(child.children?.map(({ id: childId }) => childId)),
      id: child.id,
      parent: getParentId(state.nodeMap, child.id),
    });

    if (child.expanded) {
      state.expandedNodeIds.add(child.id);
    }

    if (child.selected && child.value !== undefined && (!radio || state.selectedValues.size === 0)) {
      state.selectedValues.add(child.value);
    }

    if (child.children && child.children.length > 0) {
      return recursiveToggle(state, radio, child.id, child.children);
    }
  });

  return state;
};
