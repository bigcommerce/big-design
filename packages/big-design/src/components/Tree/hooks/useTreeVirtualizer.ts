import { Rect, useVirtualizer, Virtualizer } from '@tanstack/react-virtual';
import { MutableRefObject, RefObject, useEffect, useMemo, useRef } from 'react';

import { useEventCallback } from '../../../hooks';
import { TreeNodeId, TreeNodeProps } from '../types';

import { FlatTreeNode } from './useFlatVisibleNodes';

const ROW_HEIGHT_ESTIMATE = 40;
const OVERSCAN = 20;

// eslint-disable-next-line @typescript-eslint/no-empty-function
const NOOP = () => {};

interface UseTreeVirtualizerProps<T> {
  enabled?: boolean;
  flatNodes: Array<FlatTreeNode<T>>;
  focusedNode: TreeNodeId;
  maxHeight?: number;
  nodes: Array<TreeNodeProps<T>>;
  onFocus?: (nodeId: TreeNodeId) => void;
  scrollRef: RefObject<HTMLUListElement>;
}

// Checks the full (unfiltered-by-expansion) tree, not just the flattened/visible
// `flatNodes` — a focused node can legitimately be absent from `flatNodes` simply
// because one of its ancestors is collapsed, which is not the same as no longer
// existing in `nodes` at all.
const nodeExistsInTree = <T>(nodes: Array<TreeNodeProps<T>>, id: TreeNodeId): boolean =>
  nodes.some(
    (node) => node.id === id || (node.children ? nodeExistsInTree(node.children, id) : false),
  );

const createObserveElementRect =
  (fallbackHeightRef: MutableRefObject<number>) =>
  <T extends Element>(instance: Virtualizer<T, Element>, cb: (rect: Rect) => void) => {
    const element = instance.scrollElement;

    if (!element) {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      return () => {};
    }

    const measure = () => {
      const rect = element.getBoundingClientRect();

      // Read the ref (not a captured value) since virtual-core only calls this
      // factory once per scrollElement, so a captured value would go stale if
      // `maxHeight` changes later without the scroll element itself changing.
      cb({ height: rect.height || fallbackHeightRef.current, width: rect.width });
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
  nodes,
  onFocus,
  scrollRef,
}: UseTreeVirtualizerProps<T>) => {
  const fallbackHeightRef = useRef(typeof maxHeight === 'number' ? maxHeight : 0);

  fallbackHeightRef.current = typeof maxHeight === 'number' ? maxHeight : 0;

  const observeElementRect = useMemo(() => createObserveElementRect(fallbackHeightRef), []);

  // Wrapped with the shared "stable callback" helper (not used directly as a
  // dependency) since `onFocus` is typically a fresh closure every render (e.g.
  // StatefulTree's useFocusable doesn't memoize it) — depending on it directly
  // would re-fire the effect below (including its scrollToIndex call) on every
  // unrelated re-render, snapping the scroll position back to the focused row
  // any time some other piece of tree state changes.
  const stableOnFocus = useEventCallback(onFocus ?? NOOP);

  const virtualizer = useVirtualizer({
    count: enabled ? flatNodes.length : 0,
    enabled,
    estimateSize: () => ROW_HEIGHT_ESTIMATE,
    getItemKey: (index) => flatNodes[index].node.id,
    getScrollElement: () => scrollRef.current,
    observeElementRect,
    overscan: OVERSCAN,
  });

  const nodeIndexMap = useMemo(
    () => new Map(flatNodes.map(({ node }, index) => [node.id, index])),
    [flatNodes],
  );

  const focusedIndex = useMemo(
    () => (enabled ? (nodeIndexMap.get(focusedNode) ?? -1) : -1),
    [enabled, nodeIndexMap, focusedNode],
  );

  // Read via a ref (not a dependency) in the scroll effect below: `flatNodes`
  // legitimately changes on every expand/collapse anywhere in the tree, but an
  // expand/collapse elsewhere shouldn't re-scroll the view back to the focused
  // row — only an actual change of *which* node is focused should do that.
  const focusedIndexRef = useRef(focusedIndex);

  focusedIndexRef.current = focusedIndex;

  useEffect(() => {
    if (!enabled || flatNodes.length === 0 || focusedIndex !== -1) {
      return;
    }

    // Only re-target focus if the node is genuinely gone (e.g. `nodes` was
    // pruned) — not merely hidden behind a collapsed ancestor, which is a
    // normal state (e.g. `defaultSelected` pointing at a node whose parent
    // isn't in `defaultExpanded`) that must not steal focus back to row 0.
    if (!nodeExistsInTree(nodes, focusedNode)) {
      stableOnFocus(flatNodes[0].node.id);
    }
  }, [enabled, flatNodes, focusedIndex, nodes, focusedNode, stableOnFocus]);

  useEffect(() => {
    if (!enabled || focusedIndexRef.current === -1) {
      return;
    }

    virtualizer.scrollToIndex(focusedIndexRef.current, { behavior: 'auto' });
    // Deliberately reacting only to `focusedNode` (plus `enabled`/`virtualizer`)
    // so that scrolling is tied to the focus target changing, not to `flatNodes`
    // changing for unrelated reasons (e.g. an expand/collapse elsewhere).
  }, [enabled, focusedNode, virtualizer]);

  return virtualizer;
};
