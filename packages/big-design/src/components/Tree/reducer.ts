import { Reducer } from 'react';

import { asyncToggle, getNextVisibleNode, getPreviousVisibleNode, initialize, toggleNode } from './reducer.utils';
import { SelectValue, TreeNodeId, TreeNodeProps, TreeProps, TreeState } from './types';

interface InitArgs<T> {
  nodes: TreeNodeProps<T>[];
  selectable: TreeProps<T>['selectable'];
}

export const createReducerInit = <T>() => ({ nodes, selectable }: InitArgs<T>): TreeState<T> =>
  initialize(nodes, selectable);

export type Action<T> =
  | { type: 'TOGGLE_NODE'; id: TreeNodeId }
  | { type: 'ASYNC_TOGGLE'; radio: boolean; id: TreeNodeId; children?: TreeNodeProps<T>[] }
  | { type: 'FOCUS'; id: TreeNodeId }
  | { type: 'FOCUS_DOWN'; id: TreeNodeId }
  | { type: 'FOCUS_UP'; id: TreeNodeId }
  | { type: 'FOCUS_FIRST' }
  | { type: 'FOCUS_LAST' }
  | { type: 'SELECTED_NODE'; values: SelectValue<T>[] };

export const createReducer = <T>(): Reducer<TreeState<T>, Action<T>> => (state, action) => {
  switch (action.type) {
    case 'TOGGLE_NODE':
      return toggleNode(state, action);

    case 'ASYNC_TOGGLE':
      return asyncToggle(state, action);

    case 'FOCUS':
      return {
        ...state,
        focusedNode: action.id,
      };

    case 'FOCUS_DOWN':
      return {
        ...state,
        focusedNode: getNextVisibleNode(state.visibleNodeIds, action.id),
      };

    case 'FOCUS_UP':
      return {
        ...state,
        focusedNode: getPreviousVisibleNode(state.visibleNodeIds, action.id),
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
