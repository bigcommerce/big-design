import React, { useRef, useState } from 'react';

import { typedMemo } from '../../../../utils';
import { EditableCellOnKeyDown } from '../../hooks';
import { Cell, WorksheetItem } from '../../types';

import { StyledInput } from './styled';

export interface TextEditorProps<Item> {
  readonly cell: Cell<Item>;
  readonly initialValue?: string;
  readonly isEdited: boolean;
  onBlur(event?: React.FocusEvent<HTMLInputElement>, cell?: Cell<Item>): void;
  readonly onKeyDown: EditableCellOnKeyDown;
  readonly isMetaKey: boolean;
  readonly isControlKey: boolean;
}

const InternalTextEditor = <T extends WorksheetItem>({
  cell,
  isEdited,
  initialValue,
  onBlur,
  onKeyDown,
  isMetaKey,
  isControlKey,
}: TextEditorProps<T>) => {
  const [value, setValue] = useState(initialValue || `${cell.value}`);
  const isBlurBlocked = useRef(false);
  const [isMetaKeyValue, setIsMetaKeyValue] = useState(isMetaKey);
  const [isControlValue, setIsControlKeyValue] = useState(isControlKey);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // Avoiding the calling of `onBlur` when user press `Escape`
    // since we handle `onBlur` as saving of the cell data and it conflicts;
    if (event.key === 'Escape') {
      isBlurBlocked.current = true;
    } else if (isMetaKeyValue && event.key === 'v' && event.metaKey) {
      setValue('');
      isBlurBlocked.current = false;
      setIsMetaKeyValue(false);
    } else if (isControlValue && event.key === 'v' && event.ctrlKey) {
      setValue('');
      isBlurBlocked.current = false;
      setIsControlKeyValue(false);
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
      $isEdited={isEdited}
      autoFocus
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
