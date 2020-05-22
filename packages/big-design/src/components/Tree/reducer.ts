import { Reducer } from 'react';

import { NodeMap, TreeItemId, TreeNodeProps, TreeProps, TreeState } from './types';

interface InitArgs<T> {
  nodes: TreeNodeProps<T>[];
}

export const createReducerInit = <T>() => ({ nodes }: InitArgs<T>): TreeState<T> => {
  const nodeMap = initializeNodeMap(nodes);
  const expandedNodeIds = initializeExpandedNodeIds(nodes);
  const visibleNodeIds = initializeVisibleNodeIds(nodes, nodeMap);

  return {
    nodes,
    nodeMap,
    expandedNodeIds,
    flattenedNodeIds: initializeFlattenedNodeIds(nodes),
    focusedNode: nodes[0].id,
    selectedValues: [],
    visibleNodeIds,
  };
};

export type Action<T> =
  | { type: 'TOGGLE_NODE'; id: TreeItemId }
  | { type: 'FOCUS'; id: TreeItemId }
  | { type: 'FOCUS_DOWN'; id: TreeItemId }
  | { type: 'FOCUS_UP'; id: TreeItemId }
  | { type: 'FOCUS_RIGHT'; id: TreeItemId }
  | { type: 'FOCUS_LEFT'; id: TreeItemId }
  | { type: 'FOCUS_FIRST' }
  | { type: 'FOCUS_LAST' }
  | { type: 'SELECTED_NODE'; values: T[] };

export const createReducer = <T>(): Reducer<TreeState<T>, Action<T>> => (state, action) => {
  switch (action.type) {
    case 'TOGGLE_NODE':
      if (state.expandedNodeIds.includes(action.id)) {
        return {
          ...state,
          expandedNodeIds: state.expandedNodeIds.filter((nodeId) => nodeId !== action.id),
          visibleNodeIds: removeChildNodes(state.visibleNodeIds, action.id, state.nodeMap),
        };
      }

      return {
        ...state,
        expandedNodeIds: insertNode(state.expandedNodeIds, action.id, state.flattenedNodeIds),
        visibleNodeIds: buildVisibleNodes(state.nodeMap[action.id].children, state),
      };

    case 'FOCUS':
      return {
        ...state,
        focusedNode: action.id,
      };

    case 'FOCUS_DOWN':
      return {
        ...state,
        focusedNode: getNextVisibleNode(state, action.id),
      };

    case 'FOCUS_UP':
      return {
        ...state,
        focusedNode: getPreviousVisibleNode(state, action.id),
      };

    case 'FOCUS_RIGHT':
      if (state.expandedNodeIds.includes(action.id)) {
        return {
          ...state,
          focusedNode: getNextVisibleNode(state, action.id),
        };
      }

      if (state.nodeMap[action.id].children.length > 0) {
        return {
          ...state,
          expandedNodeIds: insertNode(state.expandedNodeIds, action.id, state.flattenedNodeIds),
          visibleNodeIds: buildVisibleNodes(state.nodeMap[action.id].children, state),
        };
      }

      return state;

    case 'FOCUS_LEFT':
      if (state.expandedNodeIds.includes(action.id)) {
        return {
          ...state,
          expandedNodeIds: state.expandedNodeIds.filter((nodeId) => nodeId !== action.id),
          visibleNodeIds: removeChildNodes(state.visibleNodeIds, action.id, state.nodeMap),
        };
      }

      if (state.nodeMap[action.id].parent !== undefined) {
        return {
          ...state,
          focusedNode: state.nodeMap[action.id].parent,
        };
      }

      return state;

    case 'FOCUS_FIRST':
      return {
        ...state,
        focusedNode: state.visibleNodeIds[0],
      };

    case 'FOCUS_LAST':
      return {
        ...state,
        focusedNode: state.visibleNodeIds[state.visibleNodeIds.length - 1],
      };

    case 'SELECTED_NODE':
      if (action.values) {
        return {
          ...state,
          selectedValues: action.values,
        };
      }

      return state;

    default:
      return state;
  }
};

const initializeNodeMap = <T>(nodes: TreeProps<T>['nodes'], parent?: TreeItemId): NodeMap =>
  nodes.reduce((acc, node) => {
    const childNodeMap = node.children ? initializeNodeMap(node.children, node.id) : {};

    return {
      ...acc,
      [node.id]: {
        id: node.id,
        children: node.children ? node.children.map((child) => child.id) : [],
        parent,
      },
      ...childNodeMap,
    };
  }, {});

const initializeExpandedNodeIds = <T>(nodes: TreeProps<T>['nodes']): TreeItemId[] =>
  nodes.reduce<TreeItemId[]>((acc, node) => {
    const childrenIds = node.children && node.children.length > 0 ? initializeExpandedNodeIds(node.children) : [];

    if (node.expanded) {
      return [...acc, node.id, ...childrenIds];
    }

    return acc;
  }, []);

const initializeFlattenedNodeIds = <T>(nodes: TreeProps<T>['nodes']): TreeItemId[] =>
  nodes.reduce<TreeItemId[]>((acc, node) => {
    const childrenIds = node.children && node.children.length > 0 ? initializeFlattenedNodeIds(node.children) : [];

    return [...acc, node.id, ...childrenIds];
  }, []);

const initializeVisibleNodeIds = <T>(nodes: TreeProps<T>['nodes'], nodeMap: NodeMap): TreeItemId[] =>
  nodes.reduce<TreeItemId[]>((acc, node) => {
    const childrenIds =
      node.expanded && node.children && node.children.length > 0
        ? initializeVisibleNodeIds(node.children, nodeMap)
        : [];

    return [...acc, node.id, ...childrenIds];
  }, []);

const getNextVisibleNode = <T>(state: TreeState<T>, id: TreeItemId): TreeItemId => {
  const index = state.flattenedNodeIds.indexOf(id);

  const nextPossibleIndex = index + 1;
  const nextPossibleId = state.flattenedNodeIds[nextPossibleIndex];

  if (index === -1 || nextPossibleId === undefined) {
    return id;
  }

  return state.visibleNodeIds.includes(nextPossibleId) ? nextPossibleId : getNextVisibleNode(state, nextPossibleId);
};

const getPreviousVisibleNode = <T>(state: TreeState<T>, id: TreeItemId): TreeItemId => {
  const index = state.flattenedNodeIds.indexOf(id);

  const previousPossibleIndex = index - 1;
  const previousPossibleId = state.flattenedNodeIds[previousPossibleIndex];

  if (previousPossibleIndex === -1 || previousPossibleId === undefined) {
    return id;
  }

  return state.visibleNodeIds.includes(previousPossibleId)
    ? previousPossibleId
    : getPreviousVisibleNode(state, previousPossibleId);
};

// Inserts id in the correct order and returns a new array.
const insertNode = (array: TreeItemId[], id: TreeItemId, flattenedNodeIds: TreeItemId[]): TreeItemId[] => {
  if (array.includes(id)) {
    return array;
  }

  const newArr = [...array, id];

  return flattenedNodeIds.filter((nodeId) => newArr.includes(nodeId));
};

const removeChildNodes = (array: TreeItemId[], id: TreeItemId, nodeMap: NodeMap): TreeItemId[] => {
  let tempArr = [...array];

  if (nodeMap[id].children.length > 0) {
    tempArr = nodeMap[id].children.reduce((acc, childId) => {
      return removeChildNodes(
        acc.filter((nodeId) => nodeId !== childId),
        childId,
        nodeMap,
      );
    }, tempArr);
  }

  return tempArr;
};

const buildVisibleNodes = <T>(nodes: TreeItemId[], state: TreeState<T>): TreeItemId[] => {
  let list = [...state.visibleNodeIds];

  nodes.forEach((node) => {
    list = insertNode(list, node, state.flattenedNodeIds);

    const childs = state.nodeMap[node].children;

    if (state.expandedNodeIds.includes(node) && childs) {
      list = buildVisibleNodes(childs, { ...state, visibleNodeIds: list });
    }
  });

  return list;
};
