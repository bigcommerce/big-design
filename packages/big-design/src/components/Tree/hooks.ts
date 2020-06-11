import { useMemo } from 'react';

import { TreeNodeId, TreeNodeProps, TreeState } from './types';

export const useIsExpanded = <T>(state: TreeState<T>, id: TreeNodeId) =>
  useMemo(() => state.expandedNodeIds.has(id), [id, state]);

export const useIsSelected = <T>(state: TreeState<T>, value: TreeNodeProps<T>['value']) =>
  useMemo(() => value !== undefined && state.selectedValues.some((selectValue) => selectValue.value === value), [
    value,
    state,
  ]);
