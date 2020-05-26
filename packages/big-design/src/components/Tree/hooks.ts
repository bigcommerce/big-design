import { useMemo } from 'react';

import { TreeNodeId, TreeNodeProps, TreeState } from './types';

export const useIsExpanded = <T>(state: TreeState<T>, id: TreeNodeId) =>
  useMemo(() => state.expandedNodeIds.includes(id), [id, state]);

export const useIsSelected = <T>(state: TreeState<T>, value: TreeNodeProps<T>['value']) =>
  useMemo(() => value !== undefined && state.selectedValues.includes(value), [value, state]);
