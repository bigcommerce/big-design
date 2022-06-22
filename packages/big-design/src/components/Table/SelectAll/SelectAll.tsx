import React from 'react';

import { Checkbox } from '../../Checkbox';
import { Flex, FlexItem } from '../../Flex';
import { Text } from '../../Typography';
import { TableItem, TablePaginationProps } from '../types';

export interface SelectAllProps<T> {
  totalItems: number;
  onChange?(item: unknown): void;
  pagination?: TablePaginationProps;
  selectedItems: T[];
  isIndeterminate: boolean;
  isAllSelected: boolean;
}

export const SelectAll = <T extends TableItem>({
  onChange,
  selectedItems,
  totalItems,
  isIndeterminate,
  isAllSelected,
}: SelectAllProps<T>) => {
  const totalSelectedItems = selectedItems.length;
  const label = isAllSelected ? 'Deselect All' : 'Select All';

  return (
    <FlexItem marginRight="xxSmall" flexShrink={0}>
      <Flex flexDirection="row">
        <Checkbox
          isIndeterminate={isIndeterminate}
          hiddenLabel
          label={label}
          onChange={onChange}
          checked={isAllSelected}
        />
        <Text marginLeft="small">
          {totalSelectedItems === 0 ? `${totalItems}` : `${totalSelectedItems}/${totalItems}`}
        </Text>
      </Flex>
    </FlexItem>
  );
};
