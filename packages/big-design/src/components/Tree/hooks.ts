import { useMemo } from 'react';

import { depthFirstSearch } from '../../utils';

import { TreeNodeId, TreeNodeProps, TreeState } from './types';

export const useIsExpanded = <T>(state: TreeState<T>, id: TreeNodeId) =>
  useMemo(() => state.expandedNodeIds.has(id), [id, state]);

export const useIsSelected = <T>(state: TreeState<T>, value: TreeNodeProps<T>['value']) =>
  useMemo(() => value !== undefined && state.selectedValues.some((selectValue) => selectValue.value === value), [
    value,
    state,
  ]);

export const useSelectedChildrenCount = <T>(state: TreeState<T>, children: TreeNodeProps<T>['children']) =>
  useMemo(() => {
    if (children?.length) {
      const selectedChildren = depthFirstSearch(
        children,
        (node) => state.selectedValues.some((selected) => selected.id === node.id),
        false,
      );

      return selectedChildren ? selectedChildren.length : 0;
    }

    return 0;
  }, [children, state.selectedValues]);
