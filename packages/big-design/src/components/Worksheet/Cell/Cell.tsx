import React, { useCallback, useEffect, useMemo } from 'react';

import { typedMemo } from '../../../utils';
import { Small } from '../../Typography';
import { CheckboxEditor, ModalEditor, SelectEditor, TextEditor, ToggleEditor } from '../editors';
import { useAutoFilling, useEditableCell, useWorksheetStore } from '../hooks';
import {
  InternalWorksheetColumn,
  Cell as TCell,
  WorksheetItem,
  WorksheetSelectableColumn,
  WorksheetTextColumn,
} from '../types';

import { AutoFillHandler, StyledCell } from './styled';

interface CellProps<Item> extends TCell<Item> {
  nextRowValue: Item[keyof Item] | '';
  isLastChild: boolean;
  isChild: boolean;
  options?: WorksheetSelectableColumn<Item>['config']['options'];
  rowId: number | string;
  formatting?: WorksheetTextColumn<Item>['formatting'];
  validation?: InternalWorksheetColumn<Item>['validation'];
}

const InternalCell = <T extends WorksheetItem>({
  columnIndex,
  disabled = false,
  formatting,
  hash,
  options,
  rowIndex,
  type,
  rowId,
  validation,
  value,
  nextRowValue,
  isChild,
  isLastChild,
}: CellProps<T>) => {
  const cell: TCell<T> = useMemo(
    () => ({ columnIndex, disabled, hash, rowIndex, type, value }),
    [columnIndex, disabled, hash, rowIndex, type, value],
  );

  const { handleBlur, handleChange, handleDoubleClick, handleKeyDown, isEditing } =
    useEditableCell<T>(cell);
  const { store, useStore } = useWorksheetStore();
  const {
    isAutoFillActive,
    onFillFullColumn,
    setIsMouseDown,
    setSelectingActive,
    setBlockFillOut,
    setSelectedCell: setHighlightedCell,
  } = useAutoFilling(cell);

  const setSelectedRows = useStore(store, (state) => state.setSelectedRows);
  const setSelectedCells = useStore(store, (state) => state.setSelectedCells);
  const addInvalidCells = useStore(store, (state) => state.addInvalidCells);
  const removeInvalidCells = useStore(store, (state) => state.removeInvalidCells);

  const editWithValue = useStore(
    store,
    useMemo(() => (state) => state.editWithValue, []),
  );

  const isMetaKey = useStore(store, (state) => state.isMetaKey);

  const isControlKey = useStore(store, (state) => state.isControlKey);

  const { isLastSelected, isFirstSelected, isSelected } = useStore(
    store,
    useMemo(
      () => (state) => {
        const idx = state.selectedCells.findIndex(
          (selectedCell) =>
            selectedCell.columnIndex === cell.columnIndex &&
            selectedCell.rowIndex === cell.rowIndex,
        );

        return {
          isLastSelected: state.selectedCells.length - 1 === idx,
          isFirstSelected: idx === 0,
          isSelected: state.selectedCells.some(
            (selectedCell) =>
              selectedCell.columnIndex === cell.columnIndex &&
              selectedCell.rowIndex === cell.rowIndex,
          ),
        };
      },
      [cell],
    ),
  );

  const isEdited = useStore(
    store,
    useMemo(
      () => (state) =>
        state.editedCells.some(
          (editedCell) =>
            editedCell.columnIndex === cell.columnIndex && editedCell.rowIndex === cell.rowIndex,
        ),
      [cell],
    ),
  );

  const invalidCell = useStore(
    store,
    useMemo(
      () => (state) =>
        state.invalidCells.find(
          (invalidCell) =>
            invalidCell.columnIndex === cell.columnIndex && invalidCell.rowIndex === cell.rowIndex,
        ),
      [cell.columnIndex, cell.rowIndex],
    ),
  );

  const isValid = useMemo(
    () => (typeof validation === 'function' ? validation(value) : true),
    [validation, value],
  );

  const isNextCellValid = useMemo(
    () => (typeof validation === 'function' ? validation(nextRowValue) : true),
    [nextRowValue, validation],
  );

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

  const handleAutoFilldblClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      event.stopPropagation();

      onFillFullColumn();
    },
    [onFillFullColumn],
  );

  const handleClick = useCallback(() => {
    setSelectedRows([rowIndex]);
    setSelectedCells([cell]);
  }, [cell, rowIndex, setSelectedCells, setSelectedRows]);

  const renderedValue = useMemo(() => {
    if (typeof formatting === 'function' && value !== '' && !Number.isNaN(value)) {
      return formatting(value);
    }

    return `${value}`;
  }, [formatting, value]);

  const renderedCell = useMemo(() => {
    switch (type) {
      case 'select':
        return (
          <SelectEditor
            cell={cell}
            isEditing={isEditing}
            onBlur={handleBlur}
            onChange={handleChange}
            options={options}
          />
        );

      case 'checkbox':
        return (
          <CheckboxEditor
            cell={cell}
            onBlur={handleBlur}
            onChange={handleChange}
            toggle={isEditing}
          />
        );

      case 'modal':
        return <ModalEditor cell={cell} formatting={formatting} isEditing={isEditing} />;

      case 'toggle':
        return <ToggleEditor rowId={rowId} toggle={isEditing} />;

      default:
        return isEditing && !disabled ? (
          <TextEditor
            cell={cell}
            initialValue={editWithValue}
            isControlKey={isControlKey}
            isEdited={isEdited}
            isMetaKey={isMetaKey}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <Small color={disabled ? 'secondary50' : 'secondary70'} ellipsis title={renderedValue}>
            {renderedValue}
          </Small>
        );
    }
  }, [
    type,
    cell,
    handleBlur,
    handleChange,
    options,
    isEditing,
    formatting,
    rowId,
    disabled,
    editWithValue,
    isControlKey,
    isEdited,
    isMetaKey,
    handleKeyDown,
    renderedValue,
  ]);

  const renderedAutoFillHandler = useMemo(() => {
    return isLastSelected ? (
      <AutoFillHandler
        aria-label="Autofill handler"
        isVisible={!isAutoFillActive}
        onDoubleClick={handleAutoFilldblClick}
        onMouseDown={(event) => {
          event.stopPropagation();

          setSelectingActive(false);
          setBlockFillOut(false);
          setIsMouseDown(true);
        }}
      />
    ) : null;
  }, [
    handleAutoFilldblClick,
    isAutoFillActive,
    isLastSelected,
    setBlockFillOut,
    setIsMouseDown,
    setSelectingActive,
  ]);

  return (
    <StyledCell
      isChild={isChild}
      isEdited={isEdited}
      isFirstSelected={isFirstSelected}
      isLastChild={isLastChild}
      isLastSelected={isLastSelected}
      isNextCellValid={isNextCellValid}
      isSelected={isSelected}
      isValid={isValid}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onMouseDown={() => {
        handleClick();
        setSelectingActive(true);
        setBlockFillOut(true);
      }}
      onMouseEnter={setHighlightedCell}
      onMouseUp={() => {
        setIsMouseDown(false);
        setSelectingActive(false);
      }}
      type={type}
    >
      {renderedCell}
      {renderedAutoFillHandler}
    </StyledCell>
  );
};

export const Cell = typedMemo(InternalCell);
