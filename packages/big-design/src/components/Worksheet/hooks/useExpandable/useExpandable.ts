import { useCallback, useMemo } from 'react';

import { useStore } from './../';

export const useExpandable = (rowId: string | number) => {
  const expandableRows = useStore((state) => state.expandableRows);
  const hiddenRows = useStore((state) => state.hiddenRows);
  const setHiddenRows = useStore((state) => state.setHiddenRows);

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

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const isExpandable = expandableRows !== null && expandableRows[rowId] !== undefined;

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
