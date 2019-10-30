import React, { useCallback, useMemo, useReducer } from 'react';

import { typedMemo } from '../../utils';
import { useDidUpdate } from '../../utils/useDidUpdate';
import { Table, TableColumn, TableItem, TableProps, TableSelectable, TableSortDirection } from '../Table';

import { createReducer, createReducerInit } from './reducer';

export interface StatefulTableColumn<T> extends Omit<TableColumn<T>, 'isSortable'> {
  sortKey?: keyof T;
}

export interface StatefulTableProps<T>
  extends Omit<TableProps<T>, 'columns' | 'pagination' | 'selectable' | 'sortable'> {
  columns: Array<StatefulTableColumn<T>>;
  pagination?: boolean;
  selectable?: boolean;
  defaultSelected?: T[];
  onSelectionChange?: TableSelectable<T>['onSelectionChange'];
}

const InternalStatefulTable = <T extends TableItem>({
  columns = [],
  defaultSelected = [],
  itemName,
  items = [],
  keyField,
  onSelectionChange,
  pagination = false,
  selectable = false,
  stickyHeader = false,
  ...rest
}: StatefulTableProps<T>): React.ReactElement<StatefulTableProps<T>> => {
  const reducer = useMemo(() => createReducer<T>(), []);
  const reducerInit = useMemo(() => createReducerInit<T>(), []);
  const sortable = useMemo(() => columns.some(column => column.sortKey), [columns]);

  const [state, dispatch] = useReducer(reducer, { columns, defaultSelected, items, pagination }, reducerInit);

  useDidUpdate(() => dispatch({ type: 'COLUMNS_CHANGED', columns }), [columns]);
  useDidUpdate(() => dispatch({ type: 'ITEMS_CHANGED', items, isPaginationEnabled: pagination }), [items, pagination]);

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

  const onSort = useCallback((columnHash: string, direction: TableSortDirection, column: StatefulTableColumn<T>) => {
    dispatch({ type: 'SORT', columnHash, direction, sortKey: column.sortKey });
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
    />
  );
};

export const StatefulTable = typedMemo(InternalStatefulTable);
