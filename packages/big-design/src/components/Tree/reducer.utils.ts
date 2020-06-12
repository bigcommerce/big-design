import { depthFirstSearch } from '../../utils';

import { Action } from './reducer';
import { MapValues, TreeNodeId, TreeNodeProps, TreeProps, TreeState } from './types';

export const initialize = <T>(
  nodes: TreeProps<T>['initialNodes'],
  selectable: TreeProps<T>['selectable'],
): TreeState<T> => {
  const state = recursiveInitialize(
    nodes,
    {
      nodeMap: new Map<TreeNodeId, MapValues>(),
      expandedNodeIds: new Set(),
      flattenedNodeIds: [],
      focusedNode: null,
      selectedValues: [],
      visibleNodeIds: [],
    },
    selectable,
  );

  let selectedValues;
  let focusedNode;

  if (!state.selectedValues.length) {
    if (selectable === 'radio') {
      const node = depthFirstSearch(nodes, (node) => node.value !== undefined);

      if (node && node.value !== undefined) {
        selectedValues = [{ id: node.id, value: node.value }];
        focusedNode = node.id;
      }
    }

    if (state.focusedNode === null && nodes?.length && nodes[0]?.id !== undefined) {
      focusedNode = nodes[0].id;
    }
  }

  return {
    ...state,
    selectedValues: selectedValues !== undefined ? selectedValues : state.selectedValues,
    focusedNode: focusedNode !== undefined ? focusedNode : state.focusedNode,
  };
};

const recursiveInitialize = <T>(
  nodes: TreeProps<T>['initialNodes'] | undefined,
  state: TreeState<T>,
  selectable: TreeProps<T>['selectable'],
): TreeState<T> => {
  if (!nodes || nodes.length < 1) {
    return state;
  }

  // Order of statements in this loop is important.
  return nodes.reduce<TreeState<T>>((acc, node) => {
    const parent = getParentId(acc.nodeMap, node.id);
    const nodeMap = new Map(acc.nodeMap);
    const flattenedNodeIds = [...acc.flattenedNodeIds, node.id];
    const expandedNodeIds = new Set(acc.expandedNodeIds);

    let visibleNodeIds;
    let selectedValues;
    let focusedNode;

    nodeMap.set(node.id, {
      children: new Set(node.children?.map((child) => child.id)),
      id: node.id,
      parent,
    });

    if (node.expanded) {
      expandedNodeIds.add(node.id);
    }

    if ((parent !== undefined && expandedNodeIds.has(parent)) || parent === undefined) {
      visibleNodeIds = [...acc.visibleNodeIds, node.id];
    }

    if (node.selected && node.value !== undefined) {
      if (selectable === 'radio' && !acc.selectedValues.length) {
        selectedValues = [{ id: node.id, value: node.value }];
        focusedNode = node.id;
      } else if (selectable === 'multi') {
        selectedValues = [...acc.selectedValues, { id: node.id, value: node.value }];

        if (acc.focusedNode === null) {
          focusedNode = node.id;
        }
      }
    }

    const newState = {
      ...acc,
      nodeMap,
      flattenedNodeIds,
      expandedNodeIds,
      visibleNodeIds: visibleNodeIds !== undefined ? visibleNodeIds : acc.visibleNodeIds,
      selectedValues: selectedValues !== undefined ? selectedValues : acc.selectedValues,
      focusedNode: focusedNode !== undefined ? focusedNode : acc.focusedNode,
    };

    if (node.children && node.children.length > 0) {
      return recursiveInitialize(node.children, newState, selectable);
    }

    return newState;
  }, state);
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

export const getNextVisibleNode = <T>(visibleNodeIds: TreeState<T>['visibleNodeIds'], id: TreeNodeId): TreeNodeId => {
  const index = visibleNodeIds.indexOf(id);

  if (index !== -1 && index + 1 < visibleNodeIds.length) {
    return visibleNodeIds[index + 1];
  }

  return id;
};

export const getPreviousVisibleNode = <T>(
  visibleNodeIds: TreeState<T>['visibleNodeIds'],
  id: TreeNodeId,
): TreeNodeId => {
  const index = visibleNodeIds.indexOf(id);

  if (index !== -1 && index - 1 >= 0) {
    return visibleNodeIds[index - 1];
  }

  return id;
};

export const toggleNode = <T>(state: TreeState<T>, action: Extract<Action<T>, { type: 'TOGGLE_NODE' }>) => {
  const node = state.nodeMap.get(action.id);
  const expandedNodeIds = new Set(state.expandedNodeIds);
  const visibleNodeIds = [...state.visibleNodeIds];

  if (state.expandedNodeIds.has(action.id)) {
    expandedNodeIds.delete(action.id);

    node?.children.forEach((childId) => {
      const index = visibleNodeIds.indexOf(childId);

      if (index > -1) {
        visibleNodeIds.splice(index, 1);
      }
    });
  } else {
    expandedNodeIds.add(action.id);
    visibleNodeIds.splice(visibleNodeIds.indexOf(action.id) + 1, 0, ...Array.from(node?.children ?? []));
  }

  return {
    ...state,
    expandedNodeIds,
    visibleNodeIds,
  };
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
  const expandedNodeIds = new Set(state.expandedNodeIds);
  const flattenedNodeIds = [...state.flattenedNodeIds];
  const visibleNodeIds = [...state.visibleNodeIds];
  const nodeMap = new Map(state.nodeMap);

  let selectedValues = [...state.selectedValues];

  flattenedNodeIds.splice(parentIndex + 1, 0, ...childrenIds.filter((childId) => !flattenedNodeIds.includes(childId)));
  visibleNodeIds.splice(parentIndex + 1, 0, ...childrenIds.filter((childId) => !visibleNodeIds.includes(childId)));

  if (parentNode?.children) {
    nodeMap.set(id, {
      ...parentNode,
      children: new Set(childrenIds),
    });
  }

  return children.reduce<TreeState<T>>((acc, child) => {
    nodeMap.set(child.id, {
      children: new Set(child.children?.map(({ id: childId }) => childId)),
      id: child.id,
      parent: getParentId(nodeMap, child.id),
    });

    if (child.expanded) {
      expandedNodeIds.add(child.id);
    }

    if (child.selected && child.value !== undefined && (!radio || selectedValues.length === 0)) {
      selectedValues = [...selectedValues, { id: child.id, value: child.value }];
    }

    const newState = {
      ...acc,
      nodeMap,
      flattenedNodeIds,
      expandedNodeIds,
      visibleNodeIds,
      selectedValues,
    };

    if (child.children && child.children.length > 0) {
      return recursiveToggle(newState, radio, child.id, child.children);
    }

    return newState;
  }, state);
};
