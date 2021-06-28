import React, { useCallback, useEffect } from 'react';

import { typedMemo } from '../../../../utils';
import { Checkbox } from '../../../Checkbox';
import { Cell, WorksheetItem } from '../../types';

import { CheckboxWrapper } from './styled';

export interface CheckboxEditorProps<Item> {
  cell: Cell<Item>;
  isEditing: boolean;
  onBlur(): void;
  onChange(value: unknown): void;
}

const InternalCheckboxEditor = <T extends WorksheetItem>({
  cell,
  isEditing,
  onBlur,
  onChange,
}: CheckboxEditorProps<T>) => {
  const handleChange = useCallback(() => {
    onChange(!cell.value);
  }, [cell, onChange]);

  useEffect(() => {
    // isEditing will only return true when a user has pressed
    // `enter` or `space` when a checkbox cell is selected.
    // It is virtually the same as clicking on the checkbox.
    if (isEditing) {
      handleChange();
    }
  }, [cell.value, handleChange, isEditing]);

  return (
    <CheckboxWrapper>
      <Checkbox
        checked={cell.value}
        hiddenLabel={true}
        label={cell.value ? 'Checked' : 'Unchecked'}
        onBlur={onBlur}
        onChange={handleChange}
      />
    </CheckboxWrapper>
  );
};

export const CheckboxEditor = typedMemo(InternalCheckboxEditor);
