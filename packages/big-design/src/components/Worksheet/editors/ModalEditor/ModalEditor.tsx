import React, { createRef, useEffect } from 'react';

import { typedMemo } from '../../../../utils';
import { Flex, FlexItem } from '../../../Flex';
import { Small } from '../../../Typography';
import { useStore } from '../../hooks';
import { Cell, WorksheetItem, WorksheetModalColumn } from '../../types';

import { StyledButton } from './styled';

export interface ModalEditorProps<Item> {
  cell: Cell<Item>;
  isEditing: boolean;
  formatting?: WorksheetModalColumn<Item>['formatting'];
}

const InternalModalEditor = <T extends WorksheetItem>({ cell, formatting, isEditing }: ModalEditorProps<T>) => {
  const setOpenModal = useStore((state) => state.setOpenModal);
  const { hash, value } = cell;

  const buttonRef = createRef<HTMLButtonElement>();

  useEffect(() => {
    if (isEditing) {
      setOpenModal(hash);
    }
  }, [hash, isEditing, setOpenModal]);

  const handleClick = () => {
    setOpenModal(hash);
  };

  return (
    <Flex justifyContent="space-between" alignItems="center">
      <FlexItem paddingRight="small">
        <Small>{formatting ? formatting(value) : `${value}`}</Small>
      </FlexItem>
      <StyledButton onClick={handleClick} ref={buttonRef} variant="subtle">
        Edit
      </StyledButton>
    </Flex>
  );
};

export const ModalEditor = typedMemo(InternalModalEditor);
