import { Reducer } from 'react';

import { getNextVisibleNode, getPreviousVisibleNode, initialize, toggleNode } from './reducer.utils';
import { TreeNodeId, TreeNodeProps, TreeState } from './types';

interface InitArgs<T> {
  nodes: TreeNodeProps<T>[];
  radio: boolean;
}

export const createReducerInit = <T>() => ({ nodes, radio }: InitArgs<T>): TreeState<T> => initialize(nodes, radio);

export type Action<T> =
  | { type: 'TOGGLE_NODE'; id: TreeNodeId }
  | { type: 'FOCUS'; id: TreeNodeId }
  | { type: 'FOCUS_DOWN'; id: TreeNodeId }
  | { type: 'FOCUS_UP'; id: TreeNodeId }
  | { type: 'FOCUS_FIRST' }
  | { type: 'FOCUS_LAST' }
  | { type: 'SELECTED_NODE'; values: Set<T> };

export const createReducer = <T>(): Reducer<TreeState<T>, Action<T>> => (state, action) => {
  switch (action.type) {
    case 'TOGGLE_NODE':
      return toggleNode(state, action);

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
