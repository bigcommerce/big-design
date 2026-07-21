/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { renderHook } from '@testing-library/react';
import { RefObject } from 'react';

import { getSelectedChildrenCounts } from '../../../utils';
import {
  NodeMap,
  TreeExpandable,
  TreeFocusable,
  TreeNodeId,
  TreeNodeProps,
  TreeSelectable,
} from '../types';

import { FlatTreeNode } from './useFlatVisibleNodes';
import { useNodeMap } from './useNodeMap';
import { useTreeKeyEvents } from './useTreeKeyEvents';
import { useTreeVirtualizer } from './useTreeVirtualizer';

describe('useNodeMap', () => {
  test('should return nodeMap - empty nodes', () => {
    const nodes: Array<TreeNodeProps<unknown>> = [];
    const { result } = renderHook(() => useNodeMap({ nodes }));

    expect(result.current.size).toBe(0);
  });

  test('should return nodeMap - nested nodes', () => {
    const nodes = [
      {
        id: '1',
        label: 'Test Node 1',
        children: [
          {
            id: '2',
            label: 'Test Node 2',
          },
        ],
      },
    ];
    const { result } = renderHook(() => useNodeMap({ nodes }));

    expect(result.current.size).toBe(2);

    expect(result.current.get('1')).toEqual({
      children: ['2'],
      id: '1',
      parent: undefined,
    });

    expect(result.current.get('2')).toEqual({
      children: [],
      id: '2',
      parent: '1',
    });
  });
});

describe('getSelectedChildrenCounts', () => {
  test('returns 0 for every node when nothing is selected', () => {
    const counts = getSelectedChildrenCounts(
      [{ id: '1', label: 'Test Node 1', children: [{ id: '2', label: 'Test Node 2' }] }],
      new Set<TreeNodeId>(),
    );

    expect(counts.get('1')).toBe(0);
    expect(counts.get('2')).toBe(0);
  });

  test('counts selected descendants excluding the node itself', () => {
    const nodes: Array<TreeNodeProps<unknown>> = [
      {
        id: '1',
        label: 'Test Node 1',
        children: [
          { id: '2', label: 'Test Node 2' },
          {
            id: '3',
            label: 'Test Node 3',
            children: [{ id: '4', label: 'Test Node 4' }],
          },
        ],
      },
    ];

    const counts = getSelectedChildrenCounts(nodes, new Set<TreeNodeId>(['1', '2', '4']));

    // '1' is selected but is not counted within its own count.
    expect(counts.get('1')).toBe(2);
    expect(counts.get('3')).toBe(1);
    expect(counts.get('2')).toBe(0);
    expect(counts.get('4')).toBe(0);
  });
});

describe('useTreeKeyEvents', () => {
  let onFocus: TreeFocusable['onFocus'];
  let onSelect: TreeSelectable<number>['onSelect'];
  let onToggle: TreeExpandable['onToggle'];
  let nodeMap: NodeMap;
  let visibleNodes: TreeNodeId[];
  let preventDefault: () => void;
  let stopPropagation: () => void;

  beforeEach(() => {
    onFocus = jest.fn();
    onSelect = jest.fn();
    onToggle = jest.fn();
    preventDefault = jest.fn();
    stopPropagation = jest.fn();
    nodeMap = new Map();
    visibleNodes = [];
  });

  test('space key', () => {
    const { result } = renderHook(() =>
      useTreeKeyEvents({ onFocus, onSelect, onToggle, nodeMap, visibleNodes }),
    );

    result.current(
      {
        currentTarget: 1,
        target: 1,
        key: ' ',
        preventDefault,
        stopPropagation,
      } as unknown as React.KeyboardEvent<HTMLLIElement>,
      { id: '0', isExpanded: false, isSelectable: true, hasChildren: false, value: 0 },
    );

    expect(preventDefault).toHaveBeenCalledTimes(1);
    expect(stopPropagation).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith('0', 0);
  });

  describe('enter key', () => {
    test('collapsible node', () => {
      const { result } = renderHook(() =>
        useTreeKeyEvents({ onFocus, onSelect, onToggle, nodeMap, visibleNodes }),
      );

      result.current(
        {
          currentTarget: 1,
          target: 1,
          key: 'Enter',
          preventDefault,
          stopPropagation,
        } as unknown as React.KeyboardEvent<HTMLLIElement>,
        { id: '0', isExpanded: false, isSelectable: true, hasChildren: true, value: 0 },
      );

      expect(preventDefault).toHaveBeenCalledTimes(1);
      expect(stopPropagation).toHaveBeenCalledTimes(1);
      expect(onToggle).toHaveBeenCalledWith('0', false);
    });

    test('end node', () => {
      const { result } = renderHook(() =>
        useTreeKeyEvents({ onFocus, onSelect, onToggle, nodeMap, visibleNodes }),
      );

      result.current(
        {
          currentTarget: 1,
          target: 1,
          key: 'Enter',
          preventDefault,
          stopPropagation,
        } as unknown as React.KeyboardEvent<HTMLLIElement>,
        { id: '0', isExpanded: false, isSelectable: true, hasChildren: false, value: 0 },
      );

      expect(preventDefault).toHaveBeenCalledTimes(1);
      expect(stopPropagation).toHaveBeenCalledTimes(1);
      expect(onSelect).toHaveBeenCalledWith('0', 0);
    });
  });

  test('arrow down', () => {
    visibleNodes = ['0', '1'];

    const { result } = renderHook(() =>
      useTreeKeyEvents({ onFocus, onSelect, onToggle, nodeMap, visibleNodes }),
    );

    result.current(
      {
        currentTarget: 1,
        target: 1,
        key: 'ArrowDown',
        preventDefault,
        stopPropagation,
      } as unknown as React.KeyboardEvent<HTMLLIElement>,
      { id: '0', isExpanded: false, isSelectable: true, hasChildren: false, value: 0 },
    );

    expect(preventDefault).toHaveBeenCalledTimes(1);
    expect(stopPropagation).not.toHaveBeenCalled();
    expect(onFocus).toHaveBeenCalledWith('1');
  });

  test('arrow down on last node does nothing', () => {
    visibleNodes = ['0', '1'];

    const { result } = renderHook(() =>
      useTreeKeyEvents({ onFocus, onSelect, onToggle, nodeMap, visibleNodes }),
    );

    result.current(
      {
        currentTarget: 1,
        target: 1,
        key: 'ArrowDown',
        preventDefault,
        stopPropagation,
      } as unknown as React.KeyboardEvent<HTMLLIElement>,
      { id: '1', isExpanded: false, isSelectable: true, hasChildren: false, value: 1 },
    );

    expect(preventDefault).toHaveBeenCalledTimes(1);
    expect(stopPropagation).not.toHaveBeenCalled();
    expect(onFocus).toHaveBeenCalledWith('1');
  });

  test('arrow up', () => {
    visibleNodes = ['0', '1'];

    const { result } = renderHook(() =>
      useTreeKeyEvents({ onFocus, onSelect, onToggle, nodeMap, visibleNodes }),
    );

    result.current(
      {
        currentTarget: 1,
        target: 1,
        key: 'ArrowUp',
        preventDefault,
        stopPropagation,
      } as unknown as React.KeyboardEvent<HTMLLIElement>,
      { id: '1', isExpanded: false, isSelectable: true, hasChildren: false, value: 1 },
    );

    expect(preventDefault).toHaveBeenCalledTimes(1);
    expect(stopPropagation).not.toHaveBeenCalled();
    expect(onFocus).toHaveBeenCalledWith('0');
  });

  test('arrow up on first node does nothing', () => {
    visibleNodes = ['0', '1'];

    const { result } = renderHook(() =>
      useTreeKeyEvents({ onFocus, onSelect, onToggle, nodeMap, visibleNodes }),
    );

    result.current(
      {
        currentTarget: 1,
        target: 1,
        key: 'ArrowUp',
        preventDefault,
        stopPropagation,
      } as unknown as React.KeyboardEvent<HTMLLIElement>,
      { id: '0', isExpanded: false, isSelectable: true, hasChildren: false, value: 0 },
    );

    expect(preventDefault).toHaveBeenCalledTimes(1);
    expect(stopPropagation).not.toHaveBeenCalled();
    expect(onFocus).toHaveBeenCalledWith('0');
  });

  describe('arrow right (has children)', () => {
    test('if expanded, focuses on next visible node', () => {
      visibleNodes = ['0', '1'];

      const { result } = renderHook(() =>
        useTreeKeyEvents({ onFocus, onSelect, onToggle, nodeMap, visibleNodes }),
      );

      result.current(
        {
          currentTarget: 1,
          target: 1,
          key: 'ArrowRight',
          preventDefault,
          stopPropagation,
        } as unknown as React.KeyboardEvent<HTMLLIElement>,
        { id: '0', isExpanded: true, isSelectable: true, hasChildren: true, value: 0 },
      );

      expect(preventDefault).toHaveBeenCalledTimes(1);
      expect(stopPropagation).not.toHaveBeenCalled();
      expect(onFocus).toHaveBeenCalledWith('1');
    });

    test('if collapsed, expands node', () => {
      const { result } = renderHook(() =>
        useTreeKeyEvents({ onFocus, onSelect, onToggle, nodeMap, visibleNodes }),
      );

      result.current(
        {
          currentTarget: 1,
          target: 1,
          key: 'ArrowRight',
          preventDefault,
          stopPropagation,
        } as unknown as React.KeyboardEvent<HTMLLIElement>,
        { id: '0', isExpanded: false, isSelectable: true, hasChildren: true, value: 0 },
      );

      expect(preventDefault).toHaveBeenCalledTimes(1);
      expect(stopPropagation).not.toHaveBeenCalled();
      expect(onToggle).toHaveBeenCalledWith('0', false);
    });
  });

  describe('arrow left', () => {
    test('if expanded, collapses node', () => {
      visibleNodes = ['0', '1'];

      const { result } = renderHook(() =>
        useTreeKeyEvents({ onFocus, onSelect, onToggle, nodeMap, visibleNodes }),
      );

      result.current(
        {
          currentTarget: 1,
          target: 1,
          key: 'ArrowLeft',
          preventDefault,
          stopPropagation,
        } as unknown as React.KeyboardEvent<HTMLLIElement>,
        { id: '0', isExpanded: true, isSelectable: true, hasChildren: true, value: 0 },
      );

      expect(preventDefault).toHaveBeenCalledTimes(1);
      expect(stopPropagation).not.toHaveBeenCalled();
      expect(onToggle).toHaveBeenCalledWith('0', true);
    });

    test('if collapsed and has parent, focus on parent node', () => {
      visibleNodes = ['0', '1'];
      nodeMap.set('1', {
        children: [],
        id: '1',
        parent: '0',
      });

      const { result } = renderHook(() =>
        useTreeKeyEvents({ onFocus, onSelect, onToggle, nodeMap, visibleNodes }),
      );

      result.current(
        {
          currentTarget: 1,
          target: 1,
          key: 'ArrowLeft',
          preventDefault,
          stopPropagation,
        } as unknown as React.KeyboardEvent<HTMLLIElement>,
        { id: '1', isExpanded: false, isSelectable: true, hasChildren: true, value: 1 },
      );

      expect(preventDefault).toHaveBeenCalledTimes(1);
      expect(stopPropagation).not.toHaveBeenCalled();
      expect(onFocus).toHaveBeenCalledWith('0');
    });
  });

  test('home', () => {
    visibleNodes = ['0', '1'];

    const { result } = renderHook(() =>
      useTreeKeyEvents({ onFocus, onSelect, onToggle, nodeMap, visibleNodes }),
    );

    result.current(
      {
        currentTarget: 1,
        target: 1,
        key: 'Home',
        preventDefault,
        stopPropagation,
      } as unknown as React.KeyboardEvent<HTMLLIElement>,
      { id: '1', isExpanded: false, isSelectable: true, hasChildren: false, value: 1 },
    );

    expect(preventDefault).toHaveBeenCalledTimes(1);
    expect(stopPropagation).not.toHaveBeenCalled();
    expect(onFocus).toHaveBeenCalledWith('0');
  });

  test('end', () => {
    visibleNodes = ['0', '1'];

    const { result } = renderHook(() =>
      useTreeKeyEvents({ onFocus, onSelect, onToggle, nodeMap, visibleNodes }),
    );

    result.current(
      {
        currentTarget: 1,
        target: 1,
        key: 'End',
        preventDefault,
        stopPropagation,
      } as unknown as React.KeyboardEvent<HTMLLIElement>,
      { id: '0', isExpanded: false, isSelectable: true, hasChildren: false, value: 0 },
    );

    expect(preventDefault).toHaveBeenCalledTimes(1);
    expect(stopPropagation).not.toHaveBeenCalled();
    expect(onFocus).toHaveBeenCalledWith('1');
  });
});

describe('useTreeVirtualizer', () => {
  const toFlatNodes = (nodes: Array<TreeNodeProps<number>>): Array<FlatTreeNode<number>> =>
    nodes.map((node, index) => ({ node, depth: 0, posinset: index + 1, setsize: nodes.length }));

  const nullScrollRef = { current: null } as RefObject<HTMLUListElement>;

  test('does not scroll or reassign focus while disabled', () => {
    const onFocus = jest.fn();
    const nodes: Array<TreeNodeProps<number>> = [
      { id: '0', label: '0', value: 0 },
      { id: '1', label: '1', value: 1 },
    ];
    const flatNodes = toFlatNodes(nodes);

    const { result } = renderHook(() =>
      useTreeVirtualizer({
        enabled: false,
        flatNodes,
        focusedNode: 'missing',
        nodes,
        onFocus,
        scrollRef: nullScrollRef,
      }),
    );

    expect(result.current.getVirtualItems()).toHaveLength(0);
    expect(onFocus).not.toHaveBeenCalled();
  });

  test('reassigns focus to the first node when the focused node no longer exists anywhere in the tree', () => {
    const onFocus = jest.fn();
    const nodes: Array<TreeNodeProps<number>> = [
      { id: '0', label: '0', value: 0 },
      { id: '1', label: '1', value: 1 },
    ];
    const flatNodes = toFlatNodes(nodes);

    renderHook(() =>
      useTreeVirtualizer({
        enabled: true,
        flatNodes,
        focusedNode: 'pruned',
        nodes,
        onFocus,
        scrollRef: nullScrollRef,
      }),
    );

    expect(onFocus).toHaveBeenCalledWith('0');
  });

  test('does not reassign focus when the focused node exists but is hidden behind a collapsed ancestor', () => {
    const onFocus = jest.fn();
    const nodes: Array<TreeNodeProps<number>> = [
      { id: '0', label: '0', value: 0, children: [{ id: '0-a', label: 'a', value: 2 }] },
      { id: '1', label: '1', value: 1 },
    ];
    // '0-a' is omitted here, mirroring how the flattener excludes it while its parent is collapsed.
    const flatNodes = toFlatNodes([nodes[0], nodes[1]]);

    renderHook(() =>
      useTreeVirtualizer({
        enabled: true,
        flatNodes,
        focusedNode: '0-a',
        nodes,
        onFocus,
        scrollRef: nullScrollRef,
      }),
    );

    expect(onFocus).not.toHaveBeenCalled();
  });

  test('does not throw when the scroll element is unavailable', () => {
    const nodes: Array<TreeNodeProps<number>> = [{ id: '0', label: '0', value: 0 }];
    const flatNodes = toFlatNodes(nodes);

    const { unmount } = renderHook(() =>
      useTreeVirtualizer({
        enabled: true,
        flatNodes,
        focusedNode: '0',
        nodes,
        scrollRef: nullScrollRef,
      }),
    );

    expect(() => unmount()).not.toThrow();
  });

  test('reassigning focus without an onFocus callback does not throw', () => {
    const nodes: Array<TreeNodeProps<number>> = [
      { id: '0', label: '0', value: 0 },
      { id: '1', label: '1', value: 1 },
    ];
    const flatNodes = toFlatNodes(nodes);

    expect(() =>
      renderHook(() =>
        useTreeVirtualizer({
          enabled: true,
          flatNodes,
          focusedNode: 'pruned',
          nodes,
          scrollRef: nullScrollRef,
        }),
      ),
    ).not.toThrow();
  });

  test('falls back to measuring without a ResizeObserver', () => {
    const nodes: Array<TreeNodeProps<number>> = [{ id: '0', label: '0', value: 0 }];
    const flatNodes = toFlatNodes(nodes);
    const scrollElement = document.createElement('ul');
    const scrollRef = { current: scrollElement } as RefObject<HTMLUListElement>;

    expect(typeof ResizeObserver).toBe('undefined');

    const { unmount } = renderHook(() =>
      useTreeVirtualizer({
        enabled: true,
        flatNodes,
        focusedNode: '0',
        maxHeight: 200,
        nodes,
        scrollRef,
      }),
    );

    expect(() => unmount()).not.toThrow();
  });
});
