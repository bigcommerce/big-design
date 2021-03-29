import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';

import { Small } from '../../Typography';
import { useEditableCell, useStore } from '../hooks';
import { Cell as CellType } from '../types';

import { StyledCell } from './styled';

interface CellProps extends CellType {
  validation?(value: string | number): boolean;
}

export const Cell: React.FC<CellProps> = memo(({ columnIndex, hash, rowIndex, type = 'text', value, validation }) => {
  const cell = useMemo(() => ({ columnIndex, rowIndex, hash, type, value }), [
    columnIndex,
    rowIndex,
    hash,
    type,
    value,
  ]);

  const { handleDoubleClick, handleBlur, handleKeyDown, isEditing, Editor } = useEditableCell({ cell });
  const setSelectedRows = useStore(useMemo(() => (state) => state.setSelectedRows, []));
  const setSelectedCells = useStore(useMemo(() => (state) => state.setSelectedCells, []));
  const addInvalidCells = useStore(useMemo(() => (state) => state.addInvalidCells, []));
  const removeInvalidCells = useStore(useMemo(() => (state) => state.removeInvalidCells, []));

  const [isCurrentlyInvalid, setIsCurrentlyInvalid] = useState(false);

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

  const isValid = useMemo(() => (typeof validation === 'function' ? validation(value) : true), [validation, value]);

  useEffect(() => {
    if (!isValid) {
      addInvalidCells([cell]);
      setIsCurrentlyInvalid(true);
    } else if (isCurrentlyInvalid) {
      console.log('remove', cell);
      removeInvalidCells([cell]);
      setIsCurrentlyInvalid(false);
    }
  }, [addInvalidCells, removeInvalidCells, cell, isCurrentlyInvalid, isValid]);

  const handleOnClick = useCallback(() => {
    setSelectedRows([rowIndex]);
    setSelectedCells([cell]);
  }, [cell, rowIndex, setSelectedCells, setSelectedRows]);

  const renderedCell = useMemo(
    () =>
      isEditing ? (
        <Editor cell={cell} handleBlur={handleBlur} handleKeyDown={handleKeyDown} isEdited={isEdited} />
      ) : (
        <Small>{value}</Small>
      ),
    [cell, handleBlur, handleKeyDown, isEdited, isEditing, value],
  );

  return (
    <StyledCell
      onClick={handleOnClick}
      isEdited={isEdited}
      isSelected={isSelected}
      isValid={isValid}
      onDoubleClick={handleDoubleClick}
    >
      {renderedCell}
    </StyledCell>
  );
});
