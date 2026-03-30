import React, { useEffect, useMemo } from 'react';
import { useShallow } from 'zustand/shallow';

import { typedMemo } from '../../../../utils';
import { useWorksheetStore } from '../../hooks';
import { Cell, WorksheetItem, WorksheetMultilineTextColumn } from '../../types';

import { ClampedText } from './styled';

export interface MultilineTextEditorProps<Item> {
  cell: Cell<Item>;
  isEditing: boolean;
  formatting?: WorksheetMultilineTextColumn<Item>['formatting'];
}

const InternalMultilineTextEditor = <T extends WorksheetItem>({
  cell,
  formatting,
  isEditing,
}: MultilineTextEditorProps<T>) => {
  const { store, useStore } = useWorksheetStore();

  const setOpenModal = useStore(
    store,
    useShallow((state) => state.setOpenModal),
  );

  const { hash, value } = cell;

  useEffect(() => {
    if (isEditing) {
      setOpenModal(hash);
    }
  }, [hash, isEditing, setOpenModal]);

  const renderedValue = useMemo(
    () => (typeof formatting === 'function' ? formatting(value) : `${value}`),
    [formatting, value],
  );

  return (
    <ClampedText dangerouslySetInnerHTML={{ __html: renderedValue }} />
  );
};

export const MultilineTextEditor = typedMemo(InternalMultilineTextEditor);
