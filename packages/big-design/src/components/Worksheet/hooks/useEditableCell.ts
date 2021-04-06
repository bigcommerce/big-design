import React, { useCallback, useMemo, useState } from 'react';

import { Cell, WorksheetItem } from '../types';

import { useUpdateItems } from './useUpdateItems';

export type EditableCellOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, newValue: unknown) => void;

export const useEditableCell = <T extends WorksheetItem>(cell: Cell<T>) => {
  const [isEditing, setIsEditing] = useState(false);
  const { updateItems } = useUpdateItems();

  const handleDoubleClick = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsEditing(false);
  }, []);

  const handleChange = useCallback(
    (newValue: unknown) => {
      updateItems([cell], [newValue]);
      setIsEditing(false);
    },
    [cell, updateItems],
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

          setIsEditing(false);

          break;
        case 'Escape':
          event.preventDefault();
          event.stopPropagation();

          setIsEditing(false);

          break;
      }
    },
    [cell, updateItems],
  );

  return useMemo(() => ({ handleBlur, handleChange, handleDoubleClick, handleKeyDown, isEditing }), [
    handleBlur,
    handleChange,
    handleDoubleClick,
    handleKeyDown,
    isEditing,
  ]);
};
