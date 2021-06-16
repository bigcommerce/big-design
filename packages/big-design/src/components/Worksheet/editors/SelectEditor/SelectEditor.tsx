import React, { createRef, useCallback, useEffect } from 'react';

import { typedMemo } from '../../../../utils';
import { Select } from '../../../Select';
import { useStore } from '../../hooks';
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
  const setEditingCell = useStore((state) => state.setEditingCell);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef, isEditing]);

  const handleChange = useCallback(
    (value: unknown) => {
      onChange(value);
    },
    [onChange],
  );

  const handleOpen = useCallback(() => {
    setEditingCell(cell);
  }, [cell, setEditingCell]);

  const handleClose = useCallback(() => {
    onBlur();
    setEditingCell(null);
  }, [onBlur, setEditingCell]);

  return (
    <SelectWrapper isEdited={isEdited}>
      <Select
        filterable={false}
        inputRef={inputRef}
        onClose={handleClose}
        onOpen={handleOpen}
        onOptionChange={handleChange}
        options={options}
        value={cell.value}
      />
    </SelectWrapper>
  );
};

export const SelectEditor = typedMemo(InternalSelectEditor);
