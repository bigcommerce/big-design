import React, { useState } from 'react';

import { typedMemo } from '../../../../utils';
import { EditableCellOnKeyDown } from '../../hooks';
import { Cell, WorksheetItem } from '../../types';

import { StyledInput } from './styled';

export interface TextEditorProps<Item> {
  cell: Cell<Item>;
  isEdited: boolean;
  onBlur(): void;
  onKeyDown: EditableCellOnKeyDown;
}

const InternalTextEditor = <T extends WorksheetItem>({ cell, isEdited, onBlur, onKeyDown }: TextEditorProps<T>) => {
  const [value, setValue] = useState(`${cell.value}`);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // We always receive the value as a string type, cast to Number if column type is number
    onKeyDown(event, formatValue(value));
  };

  const formatValue = (value: string) => (cell.type === 'number' ? Number(value) : value);

  return (
    <StyledInput
      autoFocus
      isEdited={isEdited}
      onBlur={onBlur}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      value={value}
    />
  );
};

export const TextEditor = typedMemo(InternalTextEditor);
