import React, { useCallback, useMemo, useState } from 'react';

import { TextEditor } from '../renamedEditors';
import { Cell } from '../types';

import { useUpdateItems } from './useUpdateItems';

export type EditableCellOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, newValue: string | number) => void;

export const useEditableCell = (cell: Cell) => {
  const [isEditing, setIsEditing] = useState(false);
  const { updateItems } = useUpdateItems();

  const handleDoubleClick = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsEditing(false);
  }, []);

  const handleKeyDown: EditableCellOnKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>, newValue) => {
      const key = event.key;

      switch (key) {
        case 'Enter':
          event.preventDefault();
          event.stopPropagation();

          updateItems([cell], [newValue]);
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
