import React, { useEffect } from 'react';

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
  useEffect(() => {
    if (isEditing) {
      // For checkbox we want to change the value when editing is called
      onChange(!cell.value);
    }
  }, [cell.value, isEditing, onChange]);

  const handleChange = () => {
    onChange(!cell.value);
  };

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
