import React, { memo, useMemo } from 'react';

import { Small } from '../../Typography';
import { useEditableCell } from '../hooks';
import { Cell as CellType } from '../types';
import { useStore } from '../Worksheet';

import { StyledCell } from './styled';

type CellProps = CellType;

export const Cell: React.FC<CellProps> = memo(({ columnIndex, hash, rowIndex, type = 'text', value }) => {
  const cell = { columnIndex, rowIndex, hash, type, value };
  const { handleDoubleClick, handleBlur, handleKeyDown, isEditing, Editor } = useEditableCell({ cell });

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

  // TODO: refactor?
  const isEdited = useStore(
    useMemo(
      () => (state) =>
        state.editedCells.reduce(
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
    <StyledCell onClick={handleOnClick} isEdited={isEdited} isSelected={isSelected} onDoubleClick={handleDoubleClick}>
      {isEditing ? (
        <Editor cell={cell} handleBlur={handleBlur} handleKeyDown={handleKeyDown} isEdited={isEdited} />
      ) : (
        <Small>{value}</Small>
      )}
    </StyledCell>
  );
});
