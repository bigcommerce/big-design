'use client';

import { useMemo } from 'react';

import { depthFirstSearch } from '../../../utils';
import { TreeNodeId, TreeNodeProps } from '../types';

interface UseSelectedChildrenCountProps<T> {
  selectedNodes?: TreeNodeId[];
  children?: Array<TreeNodeProps<T>>;
}

export const useSelectedChildrenCount = <T>({
  selectedNodes,
  children,
}: UseSelectedChildrenCountProps<T>) =>
  useMemo(() => {
    if (children?.length && selectedNodes) {
      const selectedChildren = depthFirstSearch(
        children,
        (node) => selectedNodes.some((selected) => selected === node.id),
        false,
      );

      return selectedChildren ? selectedChildren.length : 0;
    }

    return 0;
  }, [children, selectedNodes]);
