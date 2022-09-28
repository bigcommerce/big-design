import React, { useRef, useState } from 'react';

import { typedMemo } from '../../../../utils';
import { EditableCellOnKeyDown } from '../../hooks';
import { Cell, WorksheetItem } from '../../types';

import { StyledInput } from './styled';

export interface TextEditorProps<Item> {
  cell: Cell<Item>;
  initialValue?: string;
  isEdited: boolean;
  onBlur(event?: React.FocusEvent<HTMLInputElement>, cell?: Cell<Item>): void;
  onKeyDown: EditableCellOnKeyDown;
}

const InternalTextEditor = <T extends WorksheetItem>({
  cell,
  isEdited,
  initialValue,
  onBlur,
  onKeyDown,
}: TextEditorProps<T>) => {
  const [value, setValue] = useState(initialValue || `${cell.value}`);
  const isBlurBlocked = useRef(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // Avoiding the calling of `onBlur` when user press `Escape`
    // since we handle `onBlur` as saving of the cell data and it conflicts;
    if (event.key === 'Escape') {
      isBlurBlocked.current = true;
    } else {
      isBlurBlocked.current = false;
    }

    // We always receive the value as a string type, cast to Number if column type is number
    onKeyDown(event, formatValue(value));
  };

  const formatValue = (value: string) =>
    cell.type === 'number' && value !== '' ? Number(value) : value;

  return (
    <StyledInput
      autoFocus
      isEdited={isEdited}
      onBlur={(event?: React.FocusEvent<HTMLInputElement>) => {
        if (!isBlurBlocked.current) {
          onBlur(event, cell);
        }
      }}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      value={value}
    />
  );
};

export const TextEditor = typedMemo(InternalTextEditor);
