import React, { useState } from 'react';

import { EditableCellKeyDown } from '../../hooks';
import { Cell } from '../../types';

import { StyledInput } from './styled';

export interface TextEditorProps {
  cell: Cell;
  handleBlur(): void;
  handleKeyDown: EditableCellKeyDown;
  isEdited: boolean;
}

export const TextEditor: React.FC<TextEditorProps> = ({ cell, handleBlur, handleKeyDown, isEdited }) => {
  const [value, setValue] = useState(cell.value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const forwardKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // We always receive the value as a string type, cast to Number if column type is number
    handleKeyDown(event, formatValue(value));
  };

  const formatValue = (value: string | number) => (cell.type === 'number' ? Number(value) : value);

  return (
    <StyledInput
      autoFocus
      isEdited={isEdited}
      onBlur={handleBlur}
      onChange={handleChange}
      onKeyDown={forwardKeyDown}
      value={value.toString()} // In case of NaN casting to string
    />
  );
};
