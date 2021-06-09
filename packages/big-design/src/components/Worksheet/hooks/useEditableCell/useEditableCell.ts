import React, { useCallback, useMemo } from 'react';

import { Cell, WorksheetItem } from '../../types';
import { useNavigation } from '../useNavigation';
import { useStore } from '../useStore';
import { useTableFocus } from '../useTableFocus';
import { useUpdateItems } from '../useUpdateItems';

export type EditableCellOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, newValue: unknown) => void;

export const useEditableCell = <T extends WorksheetItem>(cell: Cell<T>) => {
  const setEditingCell = useStore((state) => state.setEditingCell);
  const { updateItems } = useUpdateItems();
  const { navigate } = useNavigation(cell);
  const { focusTable } = useTableFocus();

  const isEditing = useStore(
    useMemo(
      () => ({ editingCell }) =>
        editingCell !== null && editingCell.columnIndex === cell.columnIndex && editingCell.rowIndex === cell.rowIndex,
      [cell],
    ),
  );

  const restoreFocus = useCallback(() => {
    setEditingCell(null);
    focusTable();
  }, [focusTable, setEditingCell]);

  const handleDoubleClick = useCallback(() => {
    setEditingCell(cell);
  }, [cell, setEditingCell]);

  const handleBlur = useCallback(() => {
    restoreFocus();
  }, [restoreFocus]);

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
          event.preventDefault();
          event.stopPropagation();

          // Only call updateItems if cells have new values
          if (cell.value !== newValue) {
            updateItems([cell], [newValue]);
          }

          restoreFocus();

          // Navigate down on enter
          if (cell.type !== 'modal' && cell.type !== 'select') {
            navigate({ rowIndex: 1, columnIndex: 0 });
          }

          break;
        case 'Escape':
          event.preventDefault();
          event.stopPropagation();

          restoreFocus();

          break;
      }
    },
    [cell, navigate, restoreFocus, updateItems],
  );

  return useMemo(() => ({ handleBlur, handleChange, handleDoubleClick, handleKeyDown, isEditing }), [
    handleBlur,
    handleChange,
    handleDoubleClick,
    handleKeyDown,
    isEditing,
  ]);
};
