import { useMemo } from 'react';

import { TreeItemId, TreeNodeProps, TreeState } from './types';

export const useIsExpanded = <T>(state: TreeState<T>, id: TreeItemId) =>
  useMemo(() => state.expandedNodeIds.includes(id), [id, state]);

export const useIsSelected = <T>(state: TreeState<T>, value: TreeNodeProps<T>['value']) =>
  useMemo(() => value && state.selectedValues.includes(value), [value, state]);
