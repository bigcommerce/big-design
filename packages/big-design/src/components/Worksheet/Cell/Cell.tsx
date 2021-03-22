import React, { memo, useMemo } from 'react';

import { Small } from '../../Typography';
import { useStore } from '../Worksheet';

import { StyledCell } from './styled';
import { CellProps } from './types';

export const Cell: React.FC<CellProps> = memo(({ children, rowIndex, columnIndex }) => {
  const cell = { columnIndex, rowIndex };

  const isSelected = useStore(
    useMemo(
      () => (state) =>
        state.selectedCells.reduce(
          (acc, c) => acc || (c.columnIndex === cell.columnIndex && c.rowIndex === cell.rowIndex),
          false,
        ),
      [cell],
    ),
  );

  const setSelectedRows = useStore((state) => state.setSelectedRows);
  const setSelectedCells = useStore((state) => state.setSelectedCells);

  const handleOnClick = () => {
    setSelectedRows([rowIndex]);
    setSelectedCells([cell]);
  };

  console.log(isSelected);

  return (
    <StyledCell onClick={handleOnClick} isSelected={isSelected}>
      <Small>{children}</Small>
    </StyledCell>
  );
});
