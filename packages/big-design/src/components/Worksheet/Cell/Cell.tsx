import React, { useCallback, useEffect, useMemo } from 'react';

import { typedMemo } from '../../../utils';
import { Small } from '../../Typography';
import { SelectEditor, TextEditor } from '../editors';
import { useEditableCell, useStore } from '../hooks';
import { Cell as TCell, WorksheetColumn, WorksheetItem } from '../types';

import { StyledCell } from './styled';

interface CellProps<Item> extends TCell<Item> {
  options: WorksheetColumn<Item>['options'];
  validation: WorksheetColumn<Item>['validation'];
}

const InternalCell = <T extends WorksheetItem>({
  columnIndex,
  hash,
  options,
  rowIndex,
  type,
  value,
  validation,
}: CellProps<T>) => {
  const cell: TCell<T> = useMemo(() => ({ columnIndex, hash, rowIndex, type, value }), [
    columnIndex,
    hash,
    rowIndex,
    type,
    value,
  ]);

  const { handleBlur, handleChange, handleDoubleClick, handleKeyDown, isEditing } = useEditableCell<T>(cell);
  const setSelectedRows = useStore((state) => state.setSelectedRows);
  const setSelectedCells = useStore((state) => state.setSelectedCells);
  const addInvalidCells = useStore((state) => state.addInvalidCells);
  const removeInvalidCells = useStore((state) => state.removeInvalidCells);

  const isSelected = useStore(
    useMemo(
      () => (state) =>
        state.selectedCells.some(
          (selectedCell) => selectedCell.columnIndex === cell.columnIndex && selectedCell.rowIndex === cell.rowIndex,
        ),
      [cell],
    ),
  );

  const isEdited = useStore(
    useMemo(
      () => (state) =>
        state.editedCells.some(
          (editedCell) => editedCell.columnIndex === cell.columnIndex && editedCell.rowIndex === cell.rowIndex,
        ),
      [cell],
    ),
  );

  const invalidCell = useStore(
    useMemo(
      () => (state) =>
        state.invalidCells.find(
          (invalidCell) => invalidCell.columnIndex === cell.columnIndex && invalidCell.rowIndex === cell.rowIndex,
        ),
      [cell.columnIndex, cell.rowIndex],
    ),
  );

  const isValid = useMemo(() => (typeof validation === 'function' ? validation(value) : true), [validation, value]);

  useEffect(() => {
    // Remove from invalidCells if new value is valid
    if (isValid && invalidCell) {
      removeInvalidCells([cell]);
    }

    // Add to invalidCells but only if value is different
    if (!isValid && (!invalidCell || invalidCell.value !== cell.value)) {
      addInvalidCells([cell]);
    }
  }, [addInvalidCells, cell, isValid, invalidCell, removeInvalidCells]);

  const handleClick = useCallback(() => {
    setSelectedRows([rowIndex]);
    setSelectedCells([cell]);
  }, [cell, rowIndex, setSelectedCells, setSelectedRows]);

  const renderedCell = useMemo(() => {
    switch (type) {
      case 'select':
        return <SelectEditor cell={cell} isEdited={isEdited} onChange={handleChange} options={options} />;
      // Default to TextEditor
      default:
        return isEditing ? (
          <TextEditor cell={cell} isEdited={isEdited} onBlur={handleBlur} onKeyDown={handleKeyDown} />
        ) : (
          // In case of NaN casting to string
          <Small color="secondary70">{value.toString()}</Small>
        );
    }
  }, [cell, handleBlur, handleChange, handleKeyDown, isEdited, isEditing, options, type, value]);

  return (
    <StyledCell
      isEdited={isEdited}
      isSelected={isSelected}
      isValid={isValid}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      type={type}
    >
      {renderedCell}
    </StyledCell>
  );
};

export const Cell = typedMemo(InternalCell);
