import React, { useState } from 'react';

import { Cell } from '../../types';

import { StyledInput } from './styled';

export interface TextEditorProps {
  cell: Cell;
  handleBlur: any; //TODO: fix
  handleKeyDown: any; //TODO: fix
  isEdited: boolean;
}

export const TextEditor: React.FC<TextEditorProps> = ({ cell, handleBlur, handleKeyDown, isEdited }) => {
  const [value, setValue] = useState(cell.value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  // TODO: rename
  const handleOnKeydown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    handleKeyDown(event, value);
  };

  return (
    <StyledInput
      autoFocus
      isEdited={isEdited}
      onBlur={handleBlur}
      onChange={handleChange}
      onKeyDown={handleOnKeydown}
      type={typeof value === 'number' ? 'number' : 'text'} // TODO: remove?
      value={value}
    />
  );
};
