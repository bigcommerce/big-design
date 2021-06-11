import React, { createRef, useEffect } from 'react';

import { typedMemo } from '../../../../utils';
import { Select } from '../../../Select';
import { Cell, WorksheetItem, WorksheetSelectableColumn } from '../../types';

import { SelectWrapper } from './styled';

export interface SelectEditorProps<Item> {
  cell: Cell<Item>;
  isEdited: boolean;
  isEditing: boolean;
  options?: WorksheetSelectableColumn<Item>['config']['options'];
  onBlur(): void;
  onChange(value: unknown): void;
}

const InternalSelectEditor = <T extends WorksheetItem>({
  cell,
  isEdited,
  isEditing,
  onBlur,
  onChange,
  options = [],
}: SelectEditorProps<T>) => {
  const inputRef = createRef<HTMLInputElement>();

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  });

  const handleChange = (value: unknown) => {
    onChange(value);
  };

  return (
    <SelectWrapper isEdited={isEdited}>
      <Select
        filterable={false}
        inputRef={inputRef}
        onClose={onBlur}
        onOptionChange={handleChange}
        options={options}
        value={cell.value}
      />
    </SelectWrapper>
  );
};

export const SelectEditor = typedMemo(InternalSelectEditor);
