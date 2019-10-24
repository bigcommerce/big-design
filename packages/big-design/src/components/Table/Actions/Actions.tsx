import React, { memo, useMemo } from 'react';

import { Checkbox } from '../../Checkbox';
import { Flex } from '../../Flex';
import { Pagination } from '../../Pagination';
import { Text } from '../../Typography';
import { TableItem, TablePagination, TableSelectable } from '../types';

import { StyledActions, StyledPaginationContainer } from './styled';

export interface ActionsProps<T> {
  itemName?: string;
  items: T[];
  pagination?: TablePagination;
  selectable?: TableSelectable<T>;
  tableId: string;
}

export const Actions = memo(
  <T extends TableItem>({ selectable, pagination, tableId, itemName, items = [], ...props }: ActionsProps<T>) => {
    const totalItems = pagination ? pagination.totalItems : items.length;

    const handleSelectAll = () => {
      if (!selectable) {
        return;
      }

      const { selectedItems, onSelectionChange } = selectable;

      if (selectedItems.length > 0) {
        onSelectionChange([]);
      } else {
        onSelectionChange([...items]);
      }
    };

    const getSelectAllChecked = () => {
      if (!selectable) {
        return false;
      }

      const { selectAllState, selectedItems } = selectable;

      switch (selectAllState) {
        case 'ALL':
          return true;

        case 'PARTIAL':
        case 'NONE':
          return false;

        default:
          const totalSelectedItems = selectedItems.length;
          const totalItemsInPage = items.length;

          return totalSelectedItems === totalItemsInPage && totalItemsInPage > 0;
      }
    };

    const renderSelectAllAction = () => {
      if (!selectable) {
        return null;
      }

      const { selectAllState, selectedItems } = selectable;
      const totalSelectedItems = selectedItems.length;
      const totalItemsInPage = items.length;

      const isChecked = getSelectAllChecked();
      const isIndeterminate =
        selectAllState === 'PARTIAL' || (totalSelectedItems > 0 && totalSelectedItems !== totalItemsInPage);

      return (
        <Flex.Item marginRight="xxSmall">
          <Flex flexDirection="row">
            <Checkbox isIndeterminate={isIndeterminate} checked={isChecked} onChange={handleSelectAll} />
            <Text marginLeft="small">
              {totalSelectedItems === 0 ? `${totalItems}` : `${totalSelectedItems}/${totalItems}`}
            </Text>
          </Flex>
        </Flex.Item>
      );
    };

    const renderPagination = useMemo(
      () =>
        pagination && (
          <StyledPaginationContainer>
            <Pagination {...pagination} />
          </StyledPaginationContainer>
        ),
      [pagination],
    );

    const renderItemName = () => {
      if (typeof itemName !== 'string') {
        return null;
      }

      const text = Boolean(selectable) ? itemName : `${totalItems} ${itemName}`;

      return (
        <Flex.Item>
          <Text margin="none">{text}</Text>
        </Flex.Item>
      );
    };

    return (
      <StyledActions
        alignItems="center"
        aria-controls={tableId}
        flexDirection="row"
        justifyContent="stretch"
        padding="small"
        {...props}
      >
        {renderSelectAllAction()}
        {renderItemName()}
        {renderPagination}
      </StyledActions>
    );
  },
);
