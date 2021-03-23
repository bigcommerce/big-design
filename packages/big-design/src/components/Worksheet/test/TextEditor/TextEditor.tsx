import React, { useState } from 'react';

import { StyledInput } from './styled';

interface TextEditorProps {
  initialValue: string;
  handleBlur: any;
  handleKeyDown: any;
}

export const TextEditor: React.FC<TextEditorProps> = ({ initialValue, handleBlur, handleKeyDown }) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  // TODO: rename
  const handleOnKeydown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    handleKeyDown(event, { value });
  };

  return (
    <StyledInput
      autoFocus
      type={typeof value === 'number' ? 'number' : 'text'}
      value={value}
      onBlur={handleBlur}
      onChange={handleChange}
      onKeyDown={handleOnKeydown}
    />
  );
};
