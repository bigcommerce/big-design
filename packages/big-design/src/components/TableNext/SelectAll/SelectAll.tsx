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
  readonly getChildren?: TableExpandable<T>['getChildren'];
  readonly items: T[];
  readonly onChange?: TableSelectable['onSelectionChange'];
  readonly selectedItems: TableSelectable['selectedItems'];
  readonly totalItems?: number;
  readonly pagination?: TablePaginationProps;
  readonly getRowId: NonNullable<TableProps<T>['getRowId']>;
  readonly setSelectedParentRowsCrossPages: Dispatch<SetStateAction<Set<string>>>;
  readonly selectedParentRowsCrossPages: Set<string>;
  readonly isChildrenRowsSelectable?: boolean;
}

export const SelectAll = <T extends TableItem>(props: SelectAllProps<T>) => {
  const { allInPageSelected, handleSelectAll, label, someInPageSelected, totalSelectedItems } =
    useSelectAllState(props);

  const { totalItems } = props;

  const nonSelectionSummary = totalItems ?? '';
  const selectionSummary = totalItems ? `${totalSelectedItems}/${totalItems}` : totalSelectedItems;

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
          {totalSelectedItems === 0 ? nonSelectionSummary : selectionSummary}
        </Text>
      </Flex>
    </FlexItem>
  );
};
