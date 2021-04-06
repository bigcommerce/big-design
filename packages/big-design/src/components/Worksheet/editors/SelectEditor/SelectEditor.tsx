import React from 'react';

import { typedMemo } from '../../../../utils';
import { Select } from '../../../Select';
import { Cell, WorksheetColumn, WorksheetItem } from '../../types';

import { SelectWrapper } from './styled';

export interface SelectEditorProps<Item> {
  cell: Cell<Item>;
  isEdited: boolean;
  onChange(value: unknown): void;
  options: WorksheetColumn<Item>['options'];
}

const InternalSelectEditor = <T extends WorksheetItem>({
  cell,
  isEdited,
  onChange,
  options = [],
}: SelectEditorProps<T>) => {
  const handleChange = (value: unknown) => {
    // TODO: fix type?
    onChange(value);
  };

  return (
    <SelectWrapper isEdited={isEdited}>
      <Select filterable={false} options={options} onOptionChange={handleChange} value={cell.value} />
    </SelectWrapper>
  );
};

export const SelectEditor = typedMemo(InternalSelectEditor);
