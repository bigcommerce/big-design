import React, { memo, useMemo } from 'react';

import { useWorksheetStore } from '../hooks';

import { Status } from './styled';

interface RowStatusProps {
  rowIndex: number;
}

export const RowStatus: React.FC<RowStatusProps> = memo(({ rowIndex }) => {
  const { store, useStore } = useWorksheetStore();

  const isSelected: boolean = useStore(
    store,
    useMemo(() => (state) => state.selectedRows.includes(rowIndex), [rowIndex]),
  );

  const isInvalid = useStore(
    store,
    useMemo(
      () => (state) => state.invalidCells.some((invalidCell) => invalidCell.rowIndex === rowIndex),
      [rowIndex],
    ),
  );

  return <Status isInvalid={isInvalid} isSelected={isSelected} />;
});
