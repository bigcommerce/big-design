import React, { Dispatch, SetStateAction } from 'react';

import { Checkbox } from '../../Checkbox';
import { Flex, FlexItem } from '../../Flex';
import { Text } from '../../Typography';
import {
  TableExpandable,
  TableItem,
  TablePaginationProps,
  TableProps,
  TableSelectable,
} from '../types';

import { useSelectAllState } from './useSelectAllState';

export interface SelectAllProps<T> {
  getChildren?: TableExpandable<T>['getChildren'];
  items: T[];
  onChange?: TableSelectable['onSelectionChange'];
  selectedItems: TableSelectable['selectedItems'];
  totalItems: number;
  pagination?: TablePaginationProps;
  getRowId: NonNullable<TableProps<T>['getRowId']>;
  setSelectedParentRowsCrossPages: Dispatch<SetStateAction<Set<string>>>;
  selectedParentRowsCrossPages: Set<string>;
  isChildrenRowsSelectable?: boolean;
}

export const SelectAll = <T extends TableItem>(props: SelectAllProps<T>) => {
  const { allInPageSelected, handleSelectAll, label, someInPageSelected, totalSelectedItems } =
    useSelectAllState(props);

  const { totalItems } = props;

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
