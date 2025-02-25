import { useCallback, useMemo } from 'react';
import { useShallow } from 'zustand/shallow';

import { useWorksheetStore } from '../useWorksheetStore';

export const useExpandable = (rowId: string | number) => {
  const { store, useStore } = useWorksheetStore();

  const expandableRows = useStore(
    store,
    useShallow((state) => state.expandableRows),
  );
  const hiddenRows = useStore(
    store,
    useShallow((state) => state.hiddenRows),
  );
  const setHiddenRows = useStore(
    store,
    useShallow((state) => state.setHiddenRows),
  );

  const onExpand = useCallback(() => {
    const childIds = expandableRows[rowId];

    setHiddenRows(hiddenRows.filter((hiddenRow) => !childIds.includes(hiddenRow)));
  }, [expandableRows, hiddenRows, rowId, setHiddenRows]);

  const onCollapse = useCallback(() => {
    const childIds = expandableRows[rowId];

    setHiddenRows([...hiddenRows, ...childIds]);
  }, [expandableRows, hiddenRows, rowId, setHiddenRows]);

  const onToggle = useCallback(
    (isExpanded: boolean) => {
      if (isExpanded) {
        onCollapse();
      } else {
        onExpand();
      }
    },
    [onCollapse, onExpand],
  );

  const isExpandable = expandableRows?.[rowId] !== undefined;

  const hasExpanded =
    isExpandable && !hiddenRows.some((row) => expandableRows[rowId].includes(row));

  return useMemo(
    () => ({
      hasExpanded,
      isExpandable,
      onToggle,
    }),
    [hasExpanded, isExpandable, onToggle],
  );
};
