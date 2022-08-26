import React, { createRef, useCallback, useEffect, useMemo } from 'react';

import { typedMemo } from '../../../../utils';
import { Flex } from '../../../Flex';
import { Small } from '../../../Typography';
import { useWorksheetStore } from '../../hooks';
import { Cell, WorksheetItem, WorksheetModalColumn } from '../../types';

import { StyledButton, StyledFlexItem } from './styled';

export interface ModalEditorProps<Item> {
  cell: Cell<Item>;
  isEditing: boolean;
  formatting?: WorksheetModalColumn<Item>['formatting'];
}

const InternalModalEditor = <T extends WorksheetItem>({
  cell,
  formatting,
  isEditing,
}: ModalEditorProps<T>) => {
  const { store, useStore } = useWorksheetStore();
  const setOpenModal = useStore(store, (state) => state.setOpenModal);
  const setEditingCell = useStore(store, (state) => state.setEditingCell);
  const { hash, value } = cell;

  const buttonRef = createRef<HTMLButtonElement>();

  useEffect(() => {
    if (isEditing) {
      setOpenModal(hash);
    }
  }, [hash, isEditing, setOpenModal]);

  const handleClick = useCallback(() => {
    setEditingCell(cell);
  }, [cell, setEditingCell]);

  const renderedValue = useMemo(
    () => (typeof formatting === 'function' ? formatting(value) : `${value}`),
    [formatting, value],
  );

  return (
    <Flex alignItems="center" flexWrap="wrap" justifyContent="space-between">
      <StyledFlexItem flexShrink={1} paddingRight="small">
        <Small color={cell.disabled ? 'secondary50' : 'secondary70'} ellipsis title={renderedValue}>
          {renderedValue}
        </Small>
      </StyledFlexItem>
      <StyledButton disabled={cell.disabled} onClick={handleClick} ref={buttonRef} variant="subtle">
        Edit
      </StyledButton>
    </Flex>
  );
};

export const ModalEditor = typedMemo(InternalModalEditor);
