import React from 'react';

import { Checkbox } from '../../Checkbox';
import { Flex, FlexItem } from '../../Flex';
import { Text } from '../../Typography';
import { TableExpandable, TableItem, TableSelectable } from '../types';

import { useSelectAllState } from './useSelectAllState';

export interface SelectAllProps<T> {
  expandedRowSelector?: TableExpandable<T>['expandedRowSelector'];
  isExpandable: boolean;
  items: T[];
  onChange?: TableSelectable['onSelectionChange'];
  selectedItems: TableSelectable['selectedItems'];
  totalItems: number;
}

export const SelectAll = <T extends TableItem>({
  expandedRowSelector,
  isExpandable,
  items = [],
  onChange,
  selectedItems,
  totalItems,
}: SelectAllProps<T>) => {
  const { allInPageSelected, handleSelectAll, label, someInPageSelected, totalSelectedItems } =
    useSelectAllState({ expandedRowSelector, isExpandable, items, selectedItems, onChange });

  return (
    <FlexItem flexShrink={0} marginRight="xxSmall">
      <Flex flexDirection="row">
        <Checkbox
          checked={allInPageSelected}
          hiddenLabel
          isIndeterminate={someInPageSelected}
          label={label}
          onChange={handleSelectAll}
        />
        <Text marginLeft="small">
          {totalSelectedItems === 0 ? `${totalItems}` : `${totalSelectedItems}/${totalItems}`}
        </Text>
      </Flex>
    </FlexItem>
  );
};
