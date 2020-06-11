import { act, renderHook, RenderHookResult } from '@testing-library/react-hooks';
import { Dispatch, useReducer } from 'react';

import { Action, createReducer, createReducerInit } from './reducer';
import { TreeState } from './types';

describe('tree state handling', () => {
  type Value = number | undefined;

  let state: TreeState<Value>;
  let dispatch: Dispatch<Action<Value>>;
  let hook: RenderHookResult<unknown, [typeof state, typeof dispatch]>;

  beforeEach(() => {
    const reducer = createReducer<Value>();
    const reducerInit = createReducerInit<Value>();

    hook = renderHook(() =>
      useReducer(
        reducer,
        {
          nodes: [
            {
              id: 0,
              label: 'Category',
              expanded: true,
              children: [
                {
                  id: 3,
                  value: 3,
                  label: 'Subcategory',
                  selected: true,
                  children: [
                    {
                      id: 4,
                      value: 4,
                      label: 'Subsubcateogry',
                      selected: true,
                    },
                  ],
                },
              ],
            },
            {
              id: 1,
              label: 'Category',
              disabled: true,
            },
            {
              id: 2,
              label: 'Category',
            },
          ],
          selectable: 'multi',
        },
        reducerInit,
      ),
    );

    state = hook.result.current[0];
    dispatch = hook.result.current[1];
  });

  describe('initial state', () => {
    test('nodeMap', () => {
      expect(state.nodeMap).toEqual(
        new Map([
          [
            0,
            {
              id: 0,
              parent: undefined,
              children: new Set([3]),
            },
          ],
          [
            1,
            {
              id: 1,
              parent: undefined,
              children: new Set(),
            },
          ],
          [
            2,
            {
              id: 2,
              parent: undefined,
              children: new Set(),
            },
          ],
          [
            3,
            {
              id: 3,
              parent: 0,
              children: new Set([4]),
            },
          ],
          [
            4,
            {
              id: 4,
              parent: 3,
              children: new Set(),
            },
          ],
        ]),
      );
    });

    test('flattenedNodeIds', () => {
      expect(state.flattenedNodeIds).toEqual([0, 3, 4, 1, 2]);
    });

    test('expandedNodeIds', () => {
      expect(state.expandedNodeIds).toEqual(new Set([0]));
    });

    test('visibleNodeIds', () => {
      expect(state.visibleNodeIds).toEqual([0, 3, 1, 2]);
    });

    test('focusedNode', () => {
      expect(state.focusedNode).toEqual(3);
    });

    test('selectedValues', () => {
      expect(state.selectedValues).toEqual([
        { id: 3, value: 3 },
        { id: 4, value: 4 },
      ]);
    });
  });

  describe('dispatch triggers state mutations', () => {
    test('TOGGLE_NODE', () => {
      expect(state.expandedNodeIds).toEqual(new Set([0]));
      expect(state.visibleNodeIds).toEqual([0, 3, 1, 2]);

      act(() => {
        dispatch({ type: 'TOGGLE_NODE', id: 3 });
      });

      expect(state.expandedNodeIds).toEqual(new Set([0, 3]));
      expect(state.visibleNodeIds).toEqual([0, 3, 4, 1, 2]);

      act(() => {
        dispatch({ type: 'TOGGLE_NODE', id: 3 });
      });

      expect(state.expandedNodeIds).toEqual(new Set([0]));
      expect(state.visibleNodeIds).toEqual([0, 3, 1, 2]);
    });

    test('FOCUS', () => {
      expect(state.focusedNode).toEqual(3);

      act(() => {
        dispatch({ type: 'FOCUS', id: 0 });
      });

      expect(hook.result.current[0].focusedNode).toEqual(0);
    });

    test('FOCUS_DOWN', () => {
      expect(state.focusedNode).toEqual(3);

      act(() => {
        dispatch({ type: 'FOCUS_DOWN', id: 3 });
      });

      expect(hook.result.current[0].focusedNode).toEqual(1);
    });

    test('FOCUS_FIRST', () => {
      expect(state.focusedNode).toEqual(3);

      act(() => {
        dispatch({ type: 'FOCUS_FIRST' });
      });

      expect(hook.result.current[0].focusedNode).toEqual(0);
    });

    test('FOCUS_LAST', () => {
      expect(state.focusedNode).toEqual(3);

      act(() => {
        dispatch({ type: 'FOCUS_LAST' });
      });

      expect(hook.result.current[0].focusedNode).toEqual(2);
    });

    test('SELECTED_NODE', () => {
      expect(state.selectedValues).toEqual([
        { id: 3, value: 3 },
        { id: 4, value: 4 },
      ]);

      act(() => {
        dispatch({ type: 'SELECTED_NODE', values: [{ id: 4, value: 4 }] });
      });

      expect(hook.result.current[0].selectedValues).toEqual([{ id: 4, value: 4 }]);
    });
  });
});
