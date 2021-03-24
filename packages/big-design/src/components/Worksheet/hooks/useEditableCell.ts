import React, { useCallback, useMemo, useState } from 'react';

import { TextEditor } from '../renamedEditors';

import { useUpdateItems } from './useUpdateItems';

export type EditableCellOnKeyDown<T> = (e: React.KeyboardEvent<HTMLInputElement>, cell: { value: T }) => void;

interface UseEditableCellProps {
  hash: string;
  rowIndex: number;
  type?: 'text' | 'number';
}

export const useEditableCell = <T>({ hash, rowIndex, type = 'text' }: UseEditableCellProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const { updateItems } = useUpdateItems();

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleKeyDown: EditableCellOnKeyDown<T> = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>, { value }) => {
      const key = event.key;

      switch (key) {
        case 'Enter':
          event.preventDefault();
          event.stopPropagation();

          updateItems([{ value, hash, rowIndex }]);
          setIsEditing(false);

          break;
        case 'Escape':
          event.preventDefault();
          event.stopPropagation();

          setIsEditing(false);

          break;
      }
    },
    [hash, rowIndex, updateItems],
  );

  const Editor = useMemo(() => {
    switch (type) {
      default: {
        return TextEditor;
      }
    }
  }, [type]);

  return useMemo(() => ({ Editor: Editor, handleBlur, handleDoubleClick, handleKeyDown, isEditing }), [
    Editor,
    handleKeyDown,
    isEditing,
  ]);
};
