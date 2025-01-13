import React, { useCallback, useEffect, useId, useMemo } from 'react';
import { useShallow } from 'zustand/shallow';

import { typedMemo } from '../../../utils';
import { Tooltip } from '../../Tooltip';
import { Small } from '../../Typography';
import { CheckboxEditor, ModalEditor, SelectEditor, TextEditor, ToggleEditor } from '../editors';
import { MultiSelectEditor } from '../editors/MultiSelectEditor';
import { useAutoFilling, useEditableCell, useWorksheetStore } from '../hooks';
import {
  InternalWorksheetColumn,
  Cell as TCell,
  WorksheetItem,
  WorksheetSelectableColumn,
  WorksheetTextColumn,
} from '../types';
import { getCellIdx } from '../utils';

import { AutoFillHandler, CellNote, StyledCell } from './styled';

interface CellProps<Item> extends TCell<Item> {
  nextRowValue: Item[keyof Item] | '';
  isLastChild: boolean;
  isChild: boolean;
  options?: WorksheetSelectableColumn<Item>['config']['options'];
  rowId: number | string;
  formatting?: WorksheetTextColumn<Item>['formatting'];
  validation?: InternalWorksheetColumn<Item>['validation'];
  notation?: InternalWorksheetColumn<Item>['notation'];
  action?: WorksheetTextColumn<Item>['action'];
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
  notation,
  value,
  nextRowValue,
  isChild,
  isLastChild,
  action,
}: CellProps<T>) => {
  const cell: TCell<T> = useMemo(
    () => ({ columnIndex, disabled, hash, rowIndex, type, value }),
    [columnIndex, disabled, hash, rowIndex, type, value],
  );
  const cellIdx = useMemo(() => getCellIdx(cell), [cell]);

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
  const tooltipId = useId();

  const setSelectedRows = useStore(
    store,
    useShallow((state) => state.setSelectedRows),
  );
  const setSelectedCells = useStore(
    store,
    useShallow((state) => state.setSelectedCells),
  );
  const addInvalidCells = useStore(
    store,
    useShallow((state) => state.addInvalidCells),
  );
  const removeInvalidCells = useStore(
    store,
    useShallow((state) => state.removeInvalidCells),
  );

  const row: T = useStore(
    store,
    useShallow((state) => state.rows[rowIndex]),
  );

  const editWithValue = useStore(
    store,
    useShallow((state) => state.editWithValue),
  );

  const isShiftPressed = useStore(
    store,
    useShallow((state) => state.isShiftPressed),
  );

  const isMetaKey = useStore(
    store,
    useShallow((state) => state.isMetaKey),
  );

  const isControlKey = useStore(
    store,
    useShallow((state) => state.isControlKey),
  );

  const { selectedCells, isLastSelected, isFirstSelected, isSelected } = useStore(
    store,
    useShallow((state) => {
      const idx = Object.keys(state.selectedCellsMap).indexOf(cellIdx);

      return {
        selectedCells: state.selectedCells,
        isLastSelected: state.selectedCells.length - 1 === idx,
        isFirstSelected: idx === 0,
        isSelected: idx !== -1,
      };
    }),
  );

  const isEdited = useStore(
    store,
    useShallow((state) => !!state.editedCellsMap[cellIdx]),
  );

  const invalidCell = useStore(
    store,
    useShallow((state) => state.invalidCellsMap[cellIdx]),
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
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();

      onFillFullColumn();
    },
    [onFillFullColumn],
  );

  const handleClick = useCallback(() => {
    if (isShiftPressed) {
      const lastSelected = selectedCells[selectedCells.length - 1];
      const fromIdx = lastSelected.rowIndex;
      const toIdx = cell.rowIndex;

      const rangeIdxs = Array.from({ length: toIdx - fromIdx }, (_, index) => fromIdx + index + 1);

      const newCells = rangeIdxs.map((rowIndex) => ({
        ...cell,
        columnIndex: lastSelected.columnIndex,
        rowIndex,
      }));

      setSelectedCells([...selectedCells, ...newCells]);
    } else {
      setSelectedRows([rowIndex]);
      setSelectedCells([cell]);
    }
  }, [cell, isShiftPressed, rowIndex, selectedCells, setSelectedCells, setSelectedRows]);

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

      case 'multiSelect':
        return (
          <MultiSelectEditor
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
            action={action}
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
    isEditing,
    handleBlur,
    handleChange,
    options,
    formatting,
    rowId,
    disabled,
    action,
    editWithValue,
    isControlKey,
    isEdited,
    isMetaKey,
    handleKeyDown,
    renderedValue,
  ]);

  const renderedNote = useMemo(() => {
    if (!notation) {
      return null;
    }

    const note = notation(value, row);

    if (!note) {
      return null;
    }

    return (
      <Tooltip
        id={tooltipId}
        placement="right"
        trigger={<CellNote color={note.color} role="note" />}
      >
        {note.description}
      </Tooltip>
    );
  }, [notation, row, tooltipId, value]);

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
      {renderedNote}
    </StyledCell>
  );
};

export const Cell = typedMemo(InternalCell);
