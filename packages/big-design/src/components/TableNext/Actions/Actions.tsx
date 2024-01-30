import React, { Dispatch, RefObject, SetStateAction } from 'react';

import { typedMemo, withTransients } from '../../../utils';
import { FlexItem } from '../../Flex';
import { Text } from '../../Typography';
import { SelectAll } from '../SelectAll';
import { TablePagination } from '../TablePagination';
import {
  TableExpandable,
  TableItem,
  TablePaginationProps,
  TableProps,
  TableSelectable,
} from '../types';

import { StyledFlex } from './styled';

export interface ActionsProps<T> {
  readonly customActions?: React.ReactNode;
  readonly forwardedRef: RefObject<HTMLDivElement>;
  readonly itemName?: string;
  readonly items: T[];
  readonly pagination?: TablePaginationProps;
  readonly selectedItems: TableSelectable['selectedItems'];
  readonly stickyHeader?: boolean;
  readonly tableId: string;
  readonly getChildren?: TableExpandable<T>['getChildren'];
  readonly onSelectionChange?: TableSelectable['onSelectionChange'];
  readonly getRowId: NonNullable<TableProps<T>['getRowId']>;
  readonly setSelectedParentRowsCrossPages: Dispatch<SetStateAction<Set<string>>>;
  readonly selectedParentRowsCrossPages: Set<string>;
  readonly isChildrenRowsSelectable?: boolean;
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
      aria-controls={tableId}
      ref={forwardedRef}
      {...withTransients(props)}
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
