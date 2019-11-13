import React from 'react';

import { Checkbox } from '../../Checkbox';
import { Flex } from '../../Flex';
import { Text } from '../../Typography';
import { TableItem, TablePaginationProps, TableSelectable } from '../types';

export interface SelectAllProps<T> {
  items: T[];
  totalItems: number;
  onChange?: TableSelectable<T>['onSelectionChange'];
  pagination?: TablePaginationProps;
  selectedItems: Set<T>;
}

export const SelectAll = <T extends TableItem>({
  items = [],
  onChange,
  selectedItems,
  totalItems,
}: SelectAllProps<T>) => {
  const allInPageSelected = items.length > 0 && items.every(item => selectedItems.has(item));
  const someInPageSelected = items.length > 0 && items.some(item => selectedItems.has(item));

  const handleSelectAll = () => {
    if (typeof onChange !== 'function') {
      return;
    }

    if (selectedItems.size === 0) {
      return onChange([...items]);
    }

    if (allInPageSelected) {
      const newSelectedItems = new Set(selectedItems);

      items.forEach(item => newSelectedItems.delete(item));

      return onChange([...newSelectedItems]);
    }

    return onChange([...new Set([...selectedItems, ...items])]);
  };

  if (typeof onChange !== 'function') {
    return null;
  }

  const totalSelectedItems = selectedItems.size;

  return (
    <Flex.Item marginRight="xxSmall" flexShrink={0}>
      <Flex flexDirection="row">
        <Checkbox isIndeterminate={someInPageSelected} checked={allInPageSelected} onChange={handleSelectAll} />
        <Text marginLeft="small">
          {totalSelectedItems === 0 ? `${totalItems}` : `${totalSelectedItems}/${totalItems}`}
        </Text>
      </Flex>
    </Flex.Item>
  );
};
