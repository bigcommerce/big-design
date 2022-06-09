import React, { memo, useMemo } from 'react';

import { useStore } from '../hooks';

import { Status } from './styled';

interface RowStatusProps {
  rowIndex: number;
}

export const RowStatus: React.FC<RowStatusProps> = memo(({ rowIndex }) => {
  const isSelected = useStore(
    useMemo(() => (state) => state.selectedRows.includes(rowIndex), [rowIndex]),
  );

  const isInvalid = useStore(
    useMemo(
      () => (state) => state.invalidCells.some((invalidCell) => invalidCell.rowIndex === rowIndex),
      [rowIndex],
    ),
  );

  return <Status isInvalid={isInvalid} isSelected={isSelected} />;
});
