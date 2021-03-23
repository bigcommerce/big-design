import React, { useCallback, useMemo, useState } from 'react';

import { TextEditor } from '../test/TextEditor';

export type EditableCellOnKeyDown<T> = (e: React.KeyboardEvent<HTMLInputElement>, cell: { value: T }) => void;

interface UseEditableCellProps {
  type?: 'text' | 'number';
}

export const useEditableCell = <T>({ type = 'text' }: UseEditableCellProps) => {
  const [isEditing, setIsEditing] = useState(false);

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

          console.log('newValue', value);
          setIsEditing(false);

          break;
        case 'Escape':
          event.preventDefault();
          event.stopPropagation();

          setIsEditing(false);

          break;
      }
    },
    [],
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
