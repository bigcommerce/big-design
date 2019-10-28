import React from 'react';

import { typedMemo } from '../../../utils';
import { Flex } from '../../Flex';
import { Text } from '../../Typography';
import { TableItem, TablePaginationProps, TableSelectable } from '../types';
import { SelectAll } from '../SelectAll';
import { TablePagination } from '../TablePagination';

export interface ActionsProps<T> {
  itemName?: string;
  items: T[];
  pagination?: TablePaginationProps;
  onSelectionChange?: TableSelectable<T>['onSelectionChange'];
  selectedItems: Set<T>;
  tableId: string;
}

const InternalActions = <T extends TableItem>({
  pagination,
  tableId,
  itemName,
  items = [],
  onSelectionChange,
  selectedItems,
  ...props
}: ActionsProps<T>) => {
  const isSelectable = typeof onSelectionChange === 'function';
  const totalItems = pagination ? pagination.totalItems : items.length;

  const renderItemName = () => {
    if (typeof itemName !== 'string') {
      return null;
    }

    const text = Boolean(isSelectable) ? itemName : `${totalItems} ${itemName}`;

    return (
      <Flex.Item>
        <Text margin="none">{text}</Text>
      </Flex.Item>
    );
  };

  return (
    <Flex
      alignItems="center"
      aria-controls={tableId}
      flexDirection="row"
      justifyContent="stretch"
      padding="small"
      {...props}
    >
      <SelectAll onChange={onSelectionChange} selectedItems={selectedItems} items={items} totalItems={totalItems} />
      {renderItemName()}
      {pagination && <TablePagination {...pagination} />}
    </Flex>
  );
};

export const Actions = typedMemo(InternalActions);
