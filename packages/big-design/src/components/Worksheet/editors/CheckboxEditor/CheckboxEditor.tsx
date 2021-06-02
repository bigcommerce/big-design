import React from 'react';

import { typedMemo } from '../../../../utils';
import { Checkbox } from '../../../Checkbox';
import { Cell, WorksheetItem } from '../../types';

import { CheckboxWrapper } from './styled';

export interface CheckboxEditorProps<Item> {
  cell: Cell<Item>;
  onChange(value: unknown): void;
}

const InternalCheckboxEditor = <T extends WorksheetItem>({ cell, onChange }: CheckboxEditorProps<T>) => {
  const handleChange = () => {
    onChange(!cell.value);
  };

  return (
    <CheckboxWrapper>
      <Checkbox
        label={cell.value ? 'Checked' : 'Unchecked'}
        hiddenLabel={true}
        checked={cell.value}
        onChange={handleChange}
      />
    </CheckboxWrapper>
  );
};

export const CheckboxEditor = typedMemo(InternalCheckboxEditor);
