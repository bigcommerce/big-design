import React, { memo, useState } from 'react';

import { EditableCellKeyDown } from '../../hooks';
import { Cell } from '../../types';

import { StyledInput } from './styled';

export interface TextEditorProps {
  cell: Cell<string | number>;
  isEdited: boolean;
  onBlur(): void;
  onKeyDown: EditableCellKeyDown;
}

export const TextEditor: React.FC<TextEditorProps> = memo(({ cell, isEdited, onBlur, onKeyDown }) => {
  const [value, setValue] = useState(cell.value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // We always receive the value as a string type, cast to Number if column type is number
    onKeyDown(event, formatValue(value));
  };

  const formatValue = (value: string | number) => (cell.type === 'number' ? Number(value) : value);

  return (
    <StyledInput
      autoFocus
      isEdited={isEdited}
      onBlur={onBlur}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      value={value.toString()} // In case of NaN casting to string
    />
  );
});
