import React, { useCallback, useMemo, useReducer } from 'react';

import { useDidUpdate } from '../../hooks';
import { typedMemo } from '../../utils';
import { Table, TableColumn, TableItem, TableProps, TableSelectable, TableSortDirection } from '../Table';

import { createReducer, createReducerInit } from './reducer';

export type StatefulTableSortFn<T> = (a: T, b: T, direction: TableSortDirection) => number;

export interface StatefulTableColumn<T> extends Omit<TableColumn<T>, 'isSortable'> {
  sortKey?: keyof T;
  sortFn?: StatefulTableSortFn<T>;
}

export interface StatefulTableProps<T>
  extends Omit<TableProps<T>, 'columns' | 'pagination' | 'selectable' | 'sortable' | 'onRowDrop'> {
  columns: Array<StatefulTableColumn<T>>;
  pagination?: boolean;
  selectable?: boolean;
  defaultSelected?: T[];
  onRowDrop?(items: T[]): void;
  onSelectionChange?: TableSelectable<T>['onSelectionChange'];
}

const swapArrayElements = <T extends unknown>(array: T[], sourceIndex: number, destinationIndex: number) => {
  const smallerIndex = Math.min(sourceIndex, destinationIndex);
  const largerIndex = Math.max(sourceIndex, destinationIndex);

  return [
    ...array.slice(0, smallerIndex),
    ...(sourceIndex < destinationIndex ? array.slice(smallerIndex + 1, largerIndex + 1) : []),
    array[sourceIndex],
    ...(sourceIndex > destinationIndex ? array.slice(smallerIndex, largerIndex) : []),
    ...array.slice(largerIndex + 1),
  ];
};

const InternalStatefulTable = <T extends TableItem>({
  columns = [],
  defaultSelected = [],
  itemName,
  items = [],
  keyField,
  onSelectionChange,
  onRowDrop,
  pagination = false,
  selectable = false,
  stickyHeader = false,
  ...rest
}: StatefulTableProps<T>): React.ReactElement<StatefulTableProps<T>> => {
  const reducer = useMemo(() => createReducer<T>(), []);
  const reducerInit = useMemo(() => createReducerInit<T>(), []);
  const sortable = useMemo(() => columns.some((column) => column.sortKey || column.sortFn), [columns]);

  const [state, dispatch] = useReducer(reducer, { columns, defaultSelected, items, pagination }, reducerInit);

  const columnsChangedCallback = useCallback(() => dispatch({ type: 'COLUMNS_CHANGED', columns }), [columns]);
  const itemsChangedCallback = useCallback(
    () => dispatch({ type: 'ITEMS_CHANGED', items, isPaginationEnabled: pagination }),
    [items, pagination],
  );

  useDidUpdate(columnsChangedCallback);
  useDidUpdate(itemsChangedCallback);

  const onPageChange = useCallback((page: number) => dispatch({ type: 'PAGE_CHANGE', page }), []);
  const onItemsPerPageChange = useCallback(
    (itemsPerPage: number) => dispatch({ type: 'ITEMS_PER_PAGE_CHANGE', itemsPerPage }),
    [],
  );

  const onItemSelect = useCallback(
    (selectedItems: T[]) => {
      dispatch({ type: 'SELECTED_ITEMS', selectedItems });

      if (typeof onSelectionChange === 'function') {
        onSelectionChange(selectedItems);
      }
    },
    [onSelectionChange],
  );

  const onSort = useCallback((_columnHash: string, direction: TableSortDirection, column: StatefulTableColumn<T>) => {
    dispatch({ type: 'SORT', column, direction });
  }, []);

  const paginationOptions = useMemo(
    () => (pagination ? { ...state.pagination, onItemsPerPageChange, onPageChange } : undefined),
    [pagination, state.pagination, onItemsPerPageChange, onPageChange],
  );

  const selectableOptions = useMemo(
    () => (selectable ? { selectedItems: state.selectedItems, onSelectionChange: onItemSelect } : undefined),
    [selectable, state.selectedItems, onItemSelect],
  );

  const sortableOptions = useMemo(() => (sortable ? { ...state.sortable, onSort } : undefined), [
    sortable,
    state.sortable,
    onSort,
  ]);

  const onDragEnd = useCallback(
    (from: number, to: number) => {
      const updatedItems = swapArrayElements(state.currentItems, from, to);

      dispatch({ type: 'ITEMS_CHANGED', items: updatedItems, isPaginationEnabled: pagination });
      if (typeof onRowDrop === 'function') {
        onRowDrop(updatedItems);
      }
    },
    [onRowDrop, state.currentItems, pagination],
  );

  return (
    <Table
      {...rest}
      columns={state.columns}
      itemName={itemName}
      items={state.currentItems}
      keyField={keyField}
      stickyHeader={stickyHeader}
      pagination={paginationOptions}
      selectable={selectableOptions}
      sortable={sortableOptions}
      onRowDrop={onRowDrop ? onDragEnd : undefined}
    />
  );
};

export const StatefulTable = typedMemo(InternalStatefulTable);
