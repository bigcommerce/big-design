import React, { useState } from 'react';

import { typedMemo } from '../../../../utils';
import { EditableCellOnKeyDown } from '../../hooks';
import { Cell, WorksheetItem } from '../../types';

import { StyledInput } from './styled';

export interface TextEditorProps<Item> {
  cell: Cell<Item>;
  isEdited: boolean;
  onKeyDown: EditableCellOnKeyDown;
  onBlur(): void;
}

const InternalTextEditor = <T extends WorksheetItem>({
  cell,
  isEdited,
  onBlur,
  onKeyDown,
}: TextEditorProps<T>) => {
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  const [value, setValue] = useState(`${cell.value}`);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const formatValue = (localValue: string) =>
    cell.type === 'number' && localValue !== '' ? Number(localValue) : localValue;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // We always receive the value as a string type, cast to Number if column type is number
    onKeyDown(event, formatValue(value));
  };

  return (
    <StyledInput
      // eslint-disable-next-line jsx-a11y/no-autofocus
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
