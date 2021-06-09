import { useCallback, useMemo } from 'react';

import { useStore } from '../useStore';

export const useTableFocus = () => {
  const tableRef = useStore(useMemo(() => (state) => state.tableRef, []));

  const focusTable = useCallback(() => {
    if (tableRef) {
      tableRef.focus();
    }
  }, [tableRef]);

  return useMemo(() => ({ focusTable }), [focusTable]);
};
