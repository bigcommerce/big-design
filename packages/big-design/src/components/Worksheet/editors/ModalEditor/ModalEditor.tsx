import React, { createRef, useCallback, useEffect, useMemo } from 'react';

import { typedMemo } from '../../../../utils';
import { Flex } from '../../../Flex';
import { Small } from '../../../Typography';
import { useStore } from '../../hooks';
import { Cell, WorksheetItem, WorksheetModalColumn } from '../../types';

import { StyledButton, StyledFlexItem } from './styled';

export interface ModalEditorProps<Item> {
  cell: Cell<Item>;
  isEditing: boolean;
  formatting?: WorksheetModalColumn<Item>['formatting'];
}

const InternalModalEditor = <T extends WorksheetItem>({ cell, formatting, isEditing }: ModalEditorProps<T>) => {
  const setOpenModal = useStore((state) => state.setOpenModal);
  const setEditingCell = useStore((state) => state.setEditingCell);
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

  const renderedValue = useMemo(() => (formatting ? formatting(value) : `${value}`), [formatting, value]);

  return (
    <Flex justifyContent="space-between" alignItems="center" flexWrap="wrap">
      <StyledFlexItem paddingRight="small" flexShrink={1}>
        <Small color="secondary70" ellipsis title={renderedValue}>
          {renderedValue}
        </Small>
      </StyledFlexItem>
      <StyledButton onClick={handleClick} ref={buttonRef} variant="subtle">
        Edit
      </StyledButton>
    </Flex>
  );
};

export const ModalEditor = typedMemo(InternalModalEditor);
