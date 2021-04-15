import React, { useCallback, useMemo, useState } from 'react';

import { TextEditor } from '../editors';
import { Cell } from '../types';

import { useUpdateItems } from './useUpdateItems';

export type EditableCellKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, newValue: string | number) => void;

export const useEditableCell = (cell: Cell<string | number>) => {
  const [isEditing, setIsEditing] = useState(false);
  const { updateItems } = useUpdateItems();

  const handleDoubleClick = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsEditing(false);
  }, []);

  const handleKeyDown: EditableCellKeyDown = useCallback(
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

  const Editor = useMemo(() => {
    switch (cell.type) {
      // Will always defualt to TextEditor, at a later point we will add other types
      default: {
        return TextEditor;
      }
    }
  }, [cell.type]);

  return useMemo(() => ({ Editor: Editor, handleBlur, handleDoubleClick, handleKeyDown, isEditing }), [
    Editor,
    handleBlur,
    handleDoubleClick,
    handleKeyDown,
    isEditing,
  ]);
};
