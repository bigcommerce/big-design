import { useCallback, useMemo } from 'react';

import { useWorksheetStore } from '../useStore';

export const useTableFocus = () => {
  const { store, useStore } = useWorksheetStore();

  const tableRef = useStore(
    store,
    useMemo(() => (state) => state.tableRef, []),
  );

  const focusTable = useCallback(() => {
    if (tableRef) {
      tableRef.focus();
    }
  }, [tableRef]);

  return useMemo(() => ({ focusTable }), [focusTable]);
};
