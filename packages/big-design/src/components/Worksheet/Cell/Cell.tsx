import React, { memo, useMemo } from 'react';

import { Small } from '../../Typography';
import { useEditableCell } from '../hooks';
import { useStore } from '../Worksheet';

import { StyledCell } from './styled';
import { CellProps } from './types';

export const Cell: React.FC<CellProps> = memo(({ columnIndex, hash, rowIndex, type = 'text', value }) => {
  const { handleDoubleClick, handleBlur, handleKeyDown, isEditing, Editor } = useEditableCell({ hash, rowIndex, type });
  const cell = { columnIndex, rowIndex };

  // TODO: refactor?
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

  return (
    <StyledCell onClick={handleOnClick} isSelected={isSelected} onDoubleClick={handleDoubleClick}>
      {isEditing ? (
        <Editor handleBlur={handleBlur} handleKeyDown={handleKeyDown} initialValue={value} />
      ) : (
        <Small>{value}</Small>
      )}
    </StyledCell>
  );
});
