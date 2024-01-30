import React, { RefObject } from 'react';

import { typedMemo } from '../../../utils';
import { FlexItem } from '../../Flex';
import { Text } from '../../Typography';
import { SelectAll } from '../SelectAll';
import { TablePagination } from '../TablePagination';
import { TableItem, TablePaginationProps, TableSelectable } from '../types';

import { StyledFlex } from './styled';

export interface ActionsProps<T> {
  readonly customActions?: React.ReactNode;
  readonly forwardedRef: RefObject<HTMLDivElement>;
  readonly itemName?: string;
  readonly items: T[];
  readonly pagination?: TablePaginationProps;
  readonly onSelectionChange?: TableSelectable<T>['onSelectionChange'];
  readonly selectedItems: Set<T>;
  readonly stickyHeader?: boolean;
  readonly tableId: string;
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
      $alignItems="center"
      $flexDirection="row"
      $justifyContent="stretch"
      $stickyHeader={stickyHeader}
      aria-controls={tableId}
      ref={forwardedRef}
      {...props}
    >
      <SelectAll
        items={items}
        onChange={onSelectionChange}
        selectedItems={selectedItems}
        totalItems={totalItems}
      />
      {renderItemName()}
      {renderActions()}

      {pagination && <TablePagination {...pagination} />}
    </StyledFlex>
  );
};

export const Actions = typedMemo(InternalActions);
