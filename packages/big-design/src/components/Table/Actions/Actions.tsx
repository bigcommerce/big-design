import React, { RefObject } from 'react';

import { typedMemo } from '../../../utils';
import { FlexItem } from '../../Flex';
import { Text } from '../../Typography';
import { SelectAll } from '../SelectAll';
import { TablePagination } from '../TablePagination';
import { DiscriminatedTablePaginationProps, TableItem, TableSelectable } from '../types';

import { StyledFlex } from './styled';

export interface ActionsProps<T> {
  customActions?: React.ReactNode;
  forwardedRef: RefObject<HTMLDivElement>;
  itemName?: string;
  items: T[];
  pagination?: DiscriminatedTablePaginationProps;
  onSelectionChange?: TableSelectable<T>['onSelectionChange'];
  selectedItems: Set<T>;
  stickyHeader?: boolean;
  tableId: string;
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
  ...props
}: ActionsProps<T>) => {
  const isSelectable = typeof onSelectionChange === 'function';
  const statelessPagination = pagination?.type === 'stateless';
  const totalItems = pagination && !statelessPagination ? pagination.totalItems : items.length;

  const renderItemName = () => {
    if (typeof itemName !== 'string') {
      return null;
    }

    const text = isSelectable || statelessPagination ? itemName : `${totalItems} ${itemName}`;

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
      data-testid="table-controls"
      flexDirection="row"
      justifyContent="stretch"
      ref={forwardedRef}
      stickyHeader={stickyHeader}
      {...props}
    >
      <SelectAll
        items={items}
        onChange={onSelectionChange}
        selectedItems={selectedItems}
        totalItems={!statelessPagination ? totalItems : undefined}
      />
      {renderItemName()}
      {renderActions()}

      {pagination && <TablePagination {...pagination} />}
    </StyledFlex>
  );
};

export const Actions = typedMemo(InternalActions);
