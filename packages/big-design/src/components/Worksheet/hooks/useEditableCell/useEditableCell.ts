import React, { FocusEvent, useCallback, useMemo } from 'react';
import { useShallow } from 'zustand/shallow';

import { Cell, WorksheetItem } from '../../types';
import { useTableFocus } from '../useTableFocus';
import { useUpdateItems } from '../useUpdateItems';
import { useWorksheetStore } from '../useWorksheetStore';

export type EditableCellOnKeyDown = (
  event: React.KeyboardEvent<HTMLInputElement>,
  newValue: unknown,
) => void;

export const useEditableCell = <T extends WorksheetItem>(cell: Cell<T>) => {
  const { store, useStore } = useWorksheetStore();

  const setEditingCell = useStore(
    store,
    useShallow((state) => state.setEditingCell),
  );
  const { updateItems } = useUpdateItems();
  const { focusTable } = useTableFocus();

  const isEditing = useStore(
    store,
    useShallow(
      ({ editingCell }) =>
        editingCell !== null &&
        editingCell.columnIndex === cell.columnIndex &&
        editingCell.rowIndex === cell.rowIndex,
    ),
  );

  const restoreFocus = useCallback(() => {
    setEditingCell({ cell: null });
    focusTable();
  }, [focusTable, setEditingCell]);

  const handleDoubleClick = useCallback(() => {
    if (!cell.disabled) {
      setEditingCell({ cell });
    }
  }, [cell, setEditingCell]);

  const handleBlur = useCallback(
    (event?: FocusEvent<HTMLInputElement>, cell?: Cell<T>) => {
      const isNumberCell = cell?.type === 'number';
      const isTextCell = cell?.type === 'text';
      const value = event?.target.value;

      if (isNumberCell || isTextCell) {
        updateItems([cell], [isNumberCell && !Number.isNaN(Number(value)) ? Number(value) : value]);
      }

      restoreFocus();
    },
    [restoreFocus, updateItems],
  );

  const handleChange = useCallback(
    (newValue: unknown) => {
      updateItems([cell], [newValue]);
      restoreFocus();
    },
    [cell, restoreFocus, updateItems],
  );

  const handleKeyDown: EditableCellOnKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>, newValue) => {
      const key = event.key;

      switch (key) {
        case 'Enter':
        case 'Tab':
          event.preventDefault();

          // Only call updateItems if cells have new values
          if (cell.value !== newValue) {
            updateItems([cell], [newValue]);
          }

          restoreFocus();

          break;

        case 'Escape':
          event.preventDefault();

          restoreFocus();

          break;
      }
    },
    [cell, restoreFocus, updateItems],
  );

  return useMemo(
    () => ({ handleBlur, handleChange, handleDoubleClick, handleKeyDown, isEditing }),
    [handleBlur, handleChange, handleDoubleClick, handleKeyDown, isEditing],
  );
};
