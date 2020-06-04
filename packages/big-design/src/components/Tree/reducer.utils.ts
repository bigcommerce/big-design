import { Action } from './reducer';
import { MapValues, TreeNodeId, TreeNodeProps, TreeProps, TreeState } from './types';

export const initialize = <T>(nodes: TreeProps<T>['nodes'], radio: boolean): TreeState<T> => {
  const initialState: TreeState<T> = {
    nodeMap: new Map<TreeNodeId, MapValues>(),
    expandedNodeIds: new Set(),
    flattenedNodeIds: [],
    focusedNode: null,
    selectedValues: new Set(),
    visibleNodeIds: [],
  };

  return recursiveInitialize(nodes, initialState, radio);
};

const recursiveInitialize = <T>(
  nodes: TreeProps<T>['nodes'] | undefined,
  state: TreeState<T>,
  radio: boolean,
): TreeState<T> => {
  if (!nodes || nodes.length < 1) {
    return state;
  }

  // Order of statements in this loop is important.
  nodes.forEach((node) => {
    state.flattenedNodeIds.push(node.id);

    state.nodeMap.set(node.id, {
      children: new Set(node.children?.map((child) => child.id)),
      id: node.id,
      parent: getParentId(state.nodeMap, node.id),
    });

    if (state.focusedNode === null) {
      state.focusedNode = node.id;
    }

    if (node.expanded) {
      state.expandedNodeIds.add(node.id);
    }

    const parent = state.nodeMap.get(node.id)?.parent;

    if ((parent && state.expandedNodeIds.has(parent)) || parent === undefined) {
      state.visibleNodeIds.push(node.id);
    }

    if (node.children && node.children.length > 0) {
      recursiveInitialize(node.children, state, radio);
    }

    // Needs to happen after the recursive call for radio Trees
    // We want the closest node to the root to be selected.
    if (node.selected && node.value) {
      if (radio) {
        state.selectedValues.clear();
      }

      state.focusedNode = node.id;
      state.selectedValues.add(node.value);
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

    node?.children?.forEach((childId) => {
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
