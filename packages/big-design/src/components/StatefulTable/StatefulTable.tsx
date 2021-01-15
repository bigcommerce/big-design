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
  extends Omit<TableProps<T>, 'columns' | 'pagination' | 'selectable' | 'sortable'> {
  columns: Array<StatefulTableColumn<T>>;
  draggable?: boolean;
  pagination?: boolean;
  selectable?: boolean;
  defaultSelected?: T[];
  onSelectionChange?: TableSelectable<T>['onSelectionChange'];
}

const swapArrayElements = <T extends unknown>(array: T[], from: number, to: number) => {
  if (from > to) {
    return [...array.slice(0, to), array[from], ...array.slice(to, from), ...array.slice(from + 1, array.length)];
  } else {
    return [...array.slice(0, from), ...array.slice(from + 1, to), array[from], ...array.slice(to, array.length)];
  }
};

const InternalStatefulTable = <T extends TableItem>({
  columns = [],
  defaultSelected = [],
  itemName,
  items = [],
  keyField,
  onSelectionChange,
  draggable = false,
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
      const updatedItems = swapArrayElements(items, from, to);

      dispatch({ type: 'ITEMS_CHANGED', items: updatedItems, isPaginationEnabled: pagination });
    },
    [items, pagination],
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
      onRowDrop={draggable ? onDragEnd : undefined}
    />
  );
};

export const StatefulTable = typedMemo(InternalStatefulTable);
