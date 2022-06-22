import React, { RefObject } from 'react';

import { typedMemo } from '../../../utils';
import { FlexItem } from '../../Flex';
import { Text } from '../../Typography';
import { SelectAll } from '../SelectAll';
import { TablePagination } from '../TablePagination';
import { TableItem, TablePaginationProps, TableSelectable } from '../types';

import { StyledFlex } from './styled';

export interface ActionsProps<T> {
  customActions?: React.ReactNode;
  forwardedRef: RefObject<HTMLDivElement>;
  itemName?: string;
  items: T[];
  pagination?: TablePaginationProps;
  onSelectionChange?: TableSelectable<T>['onSelectionChange'];
  selectedItems: T[];
  stickyHeader?: boolean;
  tableId: string;
  isIndeterminate: boolean;
  isAllSelected: boolean;
  isSelectable: boolean;
}

const InternalActions = <T extends TableItem>({
  customActions,
  forwardedRef,
  itemName,
  items = [],
  onSelectionChange,
  pagination,
  selectedItems,
  stickyHeader,
  tableId,
  isIndeterminate,
  isAllSelected,
  isSelectable,
  ...props
}: ActionsProps<T>) => {
  // TODO: Refactor this. Think about isSelectable.
  // const isSelectable = typeof onSelectionChange === 'function';
  const totalItems = pagination ? pagination.totalItems : items.length;

  const renderItemName = () => {
    if (typeof itemName !== 'string') {
      return null;
    }

    const text = isSelectable ? itemName : `${totalItems} ${itemName}`;

    return (
      <FlexItem flexShrink={0} marginRight="medium">
        <Text margin="none">{text}</Text>
      </FlexItem>
    );
  };

  const renderActions = () => {
    return customActions ?? null;
  };

  return (
    <StyledFlex
      alignItems="center"
      aria-controls={tableId}
      flexDirection="row"
      justifyContent="stretch"
      stickyHeader={stickyHeader}
      ref={forwardedRef}
      {...props}
    >
      {isSelectable && (
        <SelectAll
          onChange={onSelectionChange}
          selectedItems={selectedItems}
          totalItems={totalItems}
          isIndeterminate={isIndeterminate}
          isAllSelected={isAllSelected}
        />
      )}

      {renderItemName()}
      {renderActions()}

      {pagination && <TablePagination {...pagination} />}
    </StyledFlex>
  );
};

export const Actions = typedMemo(InternalActions);
