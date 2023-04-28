import React, { useCallback, useEffect, useMemo, useReducer } from 'react';

import { useDidUpdate } from '../../hooks';
import { typedMemo } from '../../utils';
import { Box } from '../Box';
import { PaginationLocalization } from '../Pagination/Pagination';
import { PillTabItem, PillTabs, PillTabsProps } from '../PillTabs';
import { Search } from '../Search';
import { SearchLocalization } from '../Search/types';
import {
  Table,
  TableColumn,
  TableItem,
  TableProps,
  TableSelectable,
  TableSortDirection,
} from '../Table';

import { createReducer, createReducerInit } from './reducer';

type Localization =
  | PaginationLocalization
  | SearchLocalization
  | (PaginationLocalization & SearchLocalization);

export interface StatefulTablePillTabFilter<T> {
  pillTabs: PillTabItem[];
  filter(itemId: string, items: T[]): T[];
}

export type StatefulTableSortFn<T> = (a: T, b: T, direction: TableSortDirection) => number;

export interface StatefulTableColumn<T> extends Omit<TableColumn<T>, 'isSortable'> {
  sortKey?: keyof T;
  sortFn?: StatefulTableSortFn<T>;
}

export interface StatefulTableProps<T>
  extends Omit<
    TableProps<T>,
    | 'columns'
    | 'pagination'
    | 'filters'
    | 'search'
    | 'selectable'
    | 'sortable'
    | 'onRowDrop'
    | 'localization'
  > {
  columns: Array<StatefulTableColumn<T>>;
  localization?: Localization;
  pagination?: boolean;
  filters?: StatefulTablePillTabFilter<T>;
  selectable?: boolean;
  defaultSelected?: T[];
  search?: boolean;
  onRowDrop?(items: T[]): void;
  onSelectionChange?: TableSelectable<T>['onSelectionChange'];
}

const swapArrayElements = <T,>(array: T[], sourceIndex: number, destinationIndex: number) => {
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
  localization: localizationObj,
  onSelectionChange,
  onRowDrop,
  search,
  pagination = false,
  filters,
  selectable = false,
  stickyHeader = false,
  ...rest
}: StatefulTableProps<T>): React.ReactElement<StatefulTableProps<T>> => {
  // Merge localization and set defaults to make sure prop exists no matter what type
  const localization = {
    of: 'of',
    nextPage: 'Next page',
    previousPage: 'Previous page',
    search: 'Search',
    ...localizationObj,
  };

  const reducer = useMemo(() => createReducer<T>(), []);
  const reducerInit = useMemo(() => createReducerInit<T>(), []);
  const sortable = useMemo(
    () => columns.some((column) => column.sortKey || column.sortFn),
    [columns],
  );

  const [state, dispatch] = useReducer(
    reducer,
    { columns, defaultSelected, items, pagination, filters, search },
    reducerInit,
  );

  const columnsChangedCallback = useCallback(
    () => dispatch({ type: 'COLUMNS_CHANGED', columns }),
    [columns],
  );
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

  const onSort = useCallback(
    (_columnHash: string, direction: TableSortDirection, column: StatefulTableColumn<T>) => {
      dispatch({ type: 'SORT', column, direction });
    },
    [],
  );

  const paginationOptions = useMemo(
    () =>
      pagination
        ? {
            ...state.pagination,
            onItemsPerPageChange,
            onPageChange,
            localization: {
              of: localization.of,
              previousPage: localization.previousPage,
              nextPage: localization.nextPage,
            },
          }
        : undefined,
    [
      pagination,
      state.pagination,
      onItemsPerPageChange,
      onPageChange,
      localization?.of,
      localization?.previousPage,
      localization?.nextPage,
    ],
  );

  const selectableOptions = useMemo(
    () =>
      selectable
        ? { selectedItems: state.selectedItems, onSelectionChange: onItemSelect }
        : undefined,
    [selectable, state.selectedItems, onItemSelect],
  );

  const sortableOptions = useMemo(
    () => (sortable ? { ...state.sortable, onSort } : undefined),
    [sortable, state.sortable, onSort],
  );

  const onDragEnd = useCallback(
    (from: number, to: number) => {
      const updatedItems = swapArrayElements(state.currentItems, from, to);

      dispatch({ type: 'ITEMS_CHANGED', items: updatedItems, isPaginationEnabled: pagination });

      if (typeof onRowDrop === 'function') {
        onRowDrop(updatedItems);
      }
    },
    [state.currentItems, onRowDrop, pagination],
  );

  useEffect(() => {
    if (!filters) {
      return;
    }

    const pillTabsProps: PillTabsProps = {
      activePills: state.activePills,
      onPillClick: (pillId) => {
        dispatch({ type: 'TOGGLE_PILL', pillId, filter: filters.filter });
      },
      items: filters.pillTabs,
    };

    dispatch({ type: 'SET_PILL_TABS_PROPS', pillTabsProps });
  }, [filters, state.activePills, search]);

  const searchProps = useMemo(
    () =>
      search
        ? {
            value: state.searchValue,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
              dispatch({ type: 'SEARCH_VALUE_CHANGE', value: e.target.value }),
            onSubmit: () => dispatch({ type: 'ON_SEARCH_SUBMIT', filterPills: filters?.filter }),
          }
        : undefined,
    [search, state.searchValue, filters],
  );

  const renderPills = () => {
    if (!filters || !state.pillTabsProps) {
      return null;
    }

    return (
      <Box marginBottom="medium">
        <PillTabs {...state.pillTabsProps} />
      </Box>
    );
  };

  const renderSearch = () => {
    if (!search || !searchProps) {
      return;
    }

    return (
      <Box marginBottom="medium">
        <Search localization={{ search: localization.search }} {...searchProps} />
      </Box>
    );
  };

  return (
    <>
      {renderPills()}
      {renderSearch()}
      <Table
        {...rest}
        columns={state.columns}
        itemName={itemName}
        items={state.currentItems}
        keyField={keyField}
        onRowDrop={onRowDrop ? onDragEnd : undefined}
        pagination={paginationOptions}
        selectable={selectableOptions}
        sortable={sortableOptions}
        stickyHeader={stickyHeader}
      />
    </>
  );
};

export const StatefulTable = typedMemo(InternalStatefulTable);
