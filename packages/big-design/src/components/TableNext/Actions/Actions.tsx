import React, { RefObject } from 'react';

import { typedMemo } from '../../../utils';
import { FlexItem } from '../../Flex';
import { Text } from '../../Typography';
import { SelectAll } from '../SelectAll';
import { TablePagination } from '../TablePagination';
import { TableExpandable, TableItem, TablePaginationProps, TableSelectable } from '../types';

import { StyledFlex } from './styled';

export interface ActionsProps<T> {
  customActions?: React.ReactNode;
  forwardedRef: RefObject<HTMLDivElement>;
  itemName?: string;
  items: T[];
  isExpandable: boolean;
  pagination?: TablePaginationProps;
  selectedItems: TableSelectable['selectedItems'];
  stickyHeader?: boolean;
  tableId: string;
  expandedRowSelector?: TableExpandable<T>['expandedRowSelector'];
  onSelectionChange?: TableSelectable['onSelectionChange'];
}

const InternalActions = <T extends TableItem>({
  customActions,
  forwardedRef,
  itemName,
  items = [],
  pagination,
  selectedItems,
  stickyHeader,
  tableId,
  isExpandable,
  expandedRowSelector,
  onSelectionChange,
  ...props
}: ActionsProps<T>) => {
  const isSelectable = typeof onSelectionChange === 'function';
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
      ref={forwardedRef}
      stickyHeader={stickyHeader}
      {...props}
    >
      {isSelectable && (
        <SelectAll
          expandedRowSelector={expandedRowSelector}
          isExpandable={isExpandable}
          items={items}
          onChange={onSelectionChange}
          pagination={pagination}
          selectedItems={selectedItems}
          totalItems={totalItems}
        />
      )}
      {renderItemName()}
      {renderActions()}

      {pagination && <TablePagination {...pagination} />}
    </StyledFlex>
  );
};

export const Actions = typedMemo(InternalActions);
