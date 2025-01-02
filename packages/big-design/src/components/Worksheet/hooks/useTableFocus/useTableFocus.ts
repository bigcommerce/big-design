import { useCallback, useMemo } from 'react';
import { useShallow } from 'zustand/shallow';

import { useWorksheetStore } from '../useWorksheetStore';

export const useTableFocus = () => {
  const { store, useStore } = useWorksheetStore();

  const tableRef = useStore(
    store,
    useShallow((state) => state.tableRef),
  );

  const focusTable = useCallback(() => {
    if (tableRef) {
      tableRef.focus();
    }
  }, [tableRef]);

  return useMemo(() => ({ focusTable }), [focusTable]);
};
