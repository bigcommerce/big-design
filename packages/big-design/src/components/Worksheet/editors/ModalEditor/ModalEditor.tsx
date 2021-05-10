import React from 'react';

import { typedMemo } from '../../../../utils';
import { Flex, FlexItem } from '../../../Flex';
import { Small } from '../../../Typography';
import { useStore } from '../../hooks';
import { Cell, WorksheetItem } from '../../types';

import { StyledLink } from './styled';

export interface CustomEditorProps<Item> {
  cell: Cell<Item>;
}

const InternalModalEditor = <T extends WorksheetItem>({ cell }: CustomEditorProps<T>) => {
  const setOpenModal = useStore((state) => state.setOpenModal);
  const { hash, value } = cell;

  const handleClick = () => {
    setOpenModal(hash);
  };

  return (
    <Flex justifyContent="space-between" alignItems="center">
      <FlexItem paddingRight="small">
        <Small>{String(value)}</Small>
      </FlexItem>
      <StyledLink onClick={handleClick}>Edit</StyledLink>
    </Flex>
  );
};

export const ModalEditor = typedMemo(InternalModalEditor);
