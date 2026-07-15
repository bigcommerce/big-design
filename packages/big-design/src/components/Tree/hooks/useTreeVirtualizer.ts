import { Rect, useVirtualizer, Virtualizer } from '@tanstack/react-virtual';
import { RefObject, useEffect, useMemo } from 'react';

import { TreeNodeId } from '../types';

import { FlatTreeNode } from './useFlatVisibleNodes';

const ROW_HEIGHT_ESTIMATE = 40;
const OVERSCAN = 20;

interface UseTreeVirtualizerProps<T> {
  enabled?: boolean;
  flatNodes: Array<FlatTreeNode<T>>;
  focusedNode: TreeNodeId;
  maxHeight?: number;
  scrollRef: RefObject<HTMLUListElement>;
}

const createObserveElementRect =
  (fallbackHeight: number) =>
  <T extends Element>(instance: Virtualizer<T, Element>, cb: (rect: Rect) => void) => {
    const element = instance.scrollElement;

    if (!element) {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      return () => {};
    }

    const measure = () => {
      const rect = element.getBoundingClientRect();

      cb({ height: rect.height || fallbackHeight, width: rect.width });
    };

    measure();

    if (typeof ResizeObserver !== 'undefined') {
      const ro = new ResizeObserver(measure);

      ro.observe(element);

      return () => ro.disconnect();
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => {};
  };

export const useTreeVirtualizer = <T>({
  enabled,
  flatNodes,
  focusedNode,
  maxHeight,
  scrollRef,
}: UseTreeVirtualizerProps<T>) => {
  const fallbackHeight = typeof maxHeight === 'number' ? maxHeight : 0;

  const virtualizer = useVirtualizer({
    count: enabled ? flatNodes.length : 0,
    estimateSize: () => ROW_HEIGHT_ESTIMATE,
    getItemKey: (index) => flatNodes[index].node.id,
    getScrollElement: () => scrollRef.current,
    observeElementRect: createObserveElementRect(fallbackHeight),
    overscan: OVERSCAN,
  });

  const focusedIndex = useMemo(
    () => (enabled ? flatNodes.findIndex(({ node }) => node.id === focusedNode) : -1),
    [enabled, flatNodes, focusedNode],
  );

  useEffect(() => {
    if (enabled && focusedIndex >= 0) {
      virtualizer.scrollToIndex(focusedIndex, { behavior: 'auto' });
    }
  }, [enabled, focusedIndex, virtualizer]);

  return virtualizer;
};
