import React from 'react';

import { typedMemo } from '../../../../utils';
import { Box } from '../../../Box';
import { Flex } from '../../../Flex';
import { Cell, WorksheetItem } from '../../types';

import { StyledFlexItem } from './styled';

export interface ImageEditorProps<Item> {
  cell: Cell<Item>;
  isEditing: boolean;
  onChange(value: unknown): void;
  imageSetHandler: ((cell: any) => void) | undefined;
}

const InternalImageEditor = <T extends WorksheetItem>({
  cell,
  imageSetHandler,
}: ImageEditorProps<T>) => {
  return (
    <Flex
      onClick={() => {
        if (imageSetHandler) {
          imageSetHandler(cell);
        }
      }}
    >
      <StyledFlexItem flexShrink={1} paddingRight="small">
        <Box>
          <img alt={cell.value.src} src={cell.value.src} width="16px" />
        </Box>
      </StyledFlexItem>
      <StyledFlexItem flexShrink={1} paddingRight="small">
        {cell.value.title}
      </StyledFlexItem>
    </Flex>
  );
};

export const ImageEditor = typedMemo(InternalImageEditor);
