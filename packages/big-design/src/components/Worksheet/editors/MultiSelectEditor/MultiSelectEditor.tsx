import React, { createRef, useCallback, useEffect } from 'react';
import { useShallow } from 'zustand/shallow';

import { typedMemo } from '../../../../utils';
import { MultiSelect } from '../../../MultiSelect';
import { useWorksheetStore } from '../../hooks';
import { Cell, WorksheetItem, WorksheetSelectableColumn } from '../../types';

import { MultiSelectWrapper } from './styled';

export interface MultiSelectEditorProps<Item> {
  readonly cell: Cell<Item>;
  readonly isEditing: boolean;
  readonly options?: WorksheetSelectableColumn<Item>['config']['options'];
  onBlur(): void;
  onChange(value: unknown): void;
}

const InternalMultiSelectEditor = <T extends WorksheetItem>({
  cell,
  isEditing,
  onBlur,
  onChange,
  options = [],
}: MultiSelectEditorProps<T>) => {
  const inputRef = createRef<HTMLInputElement>();
  const { store, useStore } = useWorksheetStore();

  const setEditingCell = useStore(
    store,
    useShallow((state) => state.setEditingCell),
  );

  const value = Array.isArray(cell.value) ? cell.value : [cell.value];

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef, isEditing]);

  const handleChange = useCallback(
    (value: unknown[]) => {
      onChange(value);
    },
    [onChange],
  );

  const handleOpen = useCallback(() => {
    setEditingCell({ cell });
  }, [cell, setEditingCell]);

  const handleClose = useCallback(() => {
    onBlur();
    setEditingCell({ cell: null });
  }, [onBlur, setEditingCell]);

  return (
    <MultiSelectWrapper>
      <MultiSelect
        disabled={cell.disabled}
        filterable={false}
        inputRef={inputRef}
        onClose={handleClose}
        onOpen={handleOpen}
        onOptionsChange={handleChange}
        options={options}
        value={value}
      />
    </MultiSelectWrapper>
  );
};

export const MultiSelectEditor = typedMemo(InternalMultiSelectEditor);
