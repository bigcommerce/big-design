import React, { Dispatch, RefObject, SetStateAction } from 'react';

import { typedMemo } from '../../../utils';
import { FlexItem } from '../../Flex';
import { Text } from '../../Typography';
import { SelectAll } from '../SelectAll';
import { TablePagination } from '../TablePagination';
import {
  DiscriminatedTablePaginationProps,
  TableExpandable,
  TableItem,
  TableProps,
  TableSelectable,
} from '../types';

import { StyledFlex } from './styled';

export interface ActionsProps<T> {
  customActions?: React.ReactNode;
  forwardedRef: RefObject<HTMLDivElement>;
  itemName?: string;
  items: T[];
  pagination?: DiscriminatedTablePaginationProps;
  selectedItems: TableSelectable['selectedItems'];
  stickyHeader?: boolean;
  tableId: string;
  getChildren?: TableExpandable<T>['getChildren'];
  onSelectionChange?: TableSelectable['onSelectionChange'];
  getRowId: NonNullable<TableProps<T>['getRowId']>;
  setSelectedParentRowsCrossPages: Dispatch<SetStateAction<Set<string>>>;
  selectedParentRowsCrossPages: Set<string>;
  isChildrenRowsSelectable?: boolean;
  label: string;
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
  getChildren,
  onSelectionChange,
  getRowId,
  setSelectedParentRowsCrossPages,
  selectedParentRowsCrossPages,
  isChildrenRowsSelectable,
  label,
  ...props
}: ActionsProps<T>) => {
  const isSelectable = typeof onSelectionChange === 'function';
  const paginationWithoutTotal = pagination && pagination.totalItems === undefined;
  const totalItems = pagination?.totalItems ?? items.length;

  const renderItemName = () => {
    if (typeof itemName !== 'string') {
      return null;
    }

    const text = isSelectable || paginationWithoutTotal ? itemName : `${totalItems} ${itemName}`;

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
      aria-label={label}
      flexDirection="row"
      justifyContent="stretch"
      ref={forwardedRef}
      role="toolbar"
      stickyHeader={stickyHeader}
      {...props}
    >
      {isSelectable && (
        <SelectAll
          getChildren={getChildren}
          getRowId={getRowId}
          isChildrenRowsSelectable={isChildrenRowsSelectable}
          items={items}
          onChange={onSelectionChange}
          pagination={pagination}
          selectedItems={selectedItems}
          selectedParentRowsCrossPages={selectedParentRowsCrossPages}
          setSelectedParentRowsCrossPages={setSelectedParentRowsCrossPages}
          totalItems={!paginationWithoutTotal ? totalItems : undefined}
        />
      )}
      {renderItemName()}
      {renderActions()}

      {pagination && <TablePagination {...pagination} />}
    </StyledFlex>
  );
};

export const Actions = typedMemo(InternalActions);
