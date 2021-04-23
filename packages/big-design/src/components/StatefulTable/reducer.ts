import { Reducer } from 'react';

import { PillTabItem, PillTabsProps } from '../PillTabs';
import { TableSortDirection } from '../Table';

import { StatefulTableColumn, StatefulTablePillTabFilter, StatefulTableSortFn } from './StatefulTable';

interface State<T> {
  activePills: string[];
  currentItems: T[];
  columns: Array<StatefulTableColumn<T> & { isSortable: boolean }>;
  filteredItems: T[];
  isPaginationEnabled: boolean;
  items: T[];
  pagination: {
    currentPage: number;
    itemsPerPage: number;
    itemsPerPageOptions: number[];
    totalItems: number;
  };
  pillTabsProps?: PillTabsProps;
  searchValue?: string;
  submittedSearchValue?: string;
  selectedItems: T[];
  sortable: {
    direction: TableSortDirection;
    columnHash?: string;
  };
}

interface InitArgs<T> {
  columns: Array<StatefulTableColumn<T>>;
  defaultSelected: T[];
  items: T[];
  pagination: boolean;
}

export const createReducerInit = <T>() => ({ columns, defaultSelected, items, pagination }: InitArgs<T>): State<T> => {
  const currentPage = 1;
  const itemsPerPage = 25;
  const currentItems = getItems(items, pagination, { currentPage, itemsPerPage });

  return {
    activePills: [],
    currentItems,
    columns: augmentColumns(columns),
    filteredItems: [],
    isPaginationEnabled: pagination,
    items,
    pagination: {
      currentPage,
      itemsPerPage,
      itemsPerPageOptions: [25, 50, 100, 250],
      totalItems: items.length,
    },
    searchValue: '',
    submittedSearchValue: '',
    selectedItems: defaultSelected,
    sortable: {
      direction: 'ASC',
    },
  };
};

export type Action<T> =
  | { type: 'COLUMNS_CHANGED'; columns: Array<StatefulTableColumn<T>> }
  | { type: 'ITEMS_CHANGED'; items: T[]; isPaginationEnabled: boolean }
  | { type: 'ITEMS_PER_PAGE_CHANGE'; itemsPerPage: number }
  | { type: 'PAGE_CHANGE'; page: number }
  | { type: 'SELECTED_ITEMS'; selectedItems: T[] }
  | { type: 'SORT'; column: StatefulTableColumn<T>; direction: TableSortDirection }
  | { type: 'SET_PILL_TABS_PROPS'; pillTabsProps: PillTabsProps }
  | { type: 'SEARCH_VALUE_CHANGE'; value: string }
  | { type: 'TOGGLE_PILL'; pillId: string; filter: StatefulTablePillTabFilter<T>['filter'] }
  | { type: 'ON_SEARCH_SUBMIT'; filterPills?: StatefulTablePillTabFilter<T>['filter'] };

export const createReducer = <T>(): Reducer<State<T>, Action<T>> => (state, action) => {
  switch (action.type) {
    case 'COLUMNS_CHANGED': {
      const columns = action.columns;

      return {
        ...state,
        columns: augmentColumns(columns),
      };
    }

    case 'ITEMS_CHANGED': {
      const currentPage = 1;
      const items = action.items;
      const isPaginationEnabled = action.isPaginationEnabled;

      const currentItems = getItems(items, isPaginationEnabled, {
        currentPage,
        itemsPerPage: state.pagination.itemsPerPage,
      });

      const selectedItems = state.selectedItems.filter((item) => items.includes(item));

      return {
        ...state,
        currentItems,
        isPaginationEnabled,
        items,
        selectedItems,
        pagination: {
          ...state.pagination,
          currentPage,
          totalItems: items.length,
        },
        sortable: {
          direction: state.sortable.direction,
        },
      };
    }

    case 'PAGE_CHANGE': {
      const filtersActive = state.activePills.length > 0 || !!state.searchValue;
      const items = filtersActive ? state.filteredItems : state.items;
      const currentPage = action.page;
      const currentItems = getItems(items, true, {
        currentPage,
        itemsPerPage: state.pagination.itemsPerPage,
      });

      return {
        ...state,
        currentItems,
        pagination: {
          ...state.pagination,
          currentPage,
        },
      };
    }

    case 'ITEMS_PER_PAGE_CHANGE': {
      const currentPage = 1;
      const itemsPerPage = action.itemsPerPage;
      const currentItems = getItems(state.items, true, {
        currentPage,
        itemsPerPage,
      });

      return {
        ...state,
        currentItems,
        pagination: {
          ...state.pagination,
          currentPage,
          itemsPerPage,
        },
      };
    }

    case 'SEARCH_VALUE_CHANGE': {
      return { ...state, searchValue: action.value };
    }

    case 'SELECTED_ITEMS': {
      return { ...state, selectedItems: action.selectedItems };
    }

    case 'SET_PILL_TABS_PROPS': {
      return { ...state, pillTabsProps: action.pillTabsProps };
    }

    case 'SORT': {
      const { hash, sortFn, sortKey } = action.column;
      const direction = action.direction;

      if (!sortKey && !sortFn) {
        return state;
      }

      const items = sortKey
        ? sort(state.items, direction, sortKey)
        : sortFn
        ? sort(state.items, direction, sortFn)
        : state.items;

      const currentItems = getItems(items, state.isPaginationEnabled, {
        currentPage: 1,
        itemsPerPage: state.pagination.itemsPerPage,
      });

      return {
        ...state,
        currentItems,
        items,
        pagination: {
          ...state.pagination,
          currentPage: 1,
        },
        sortable: {
          direction,
          columnHash: hash,
        },
      };
    }

    case 'TOGGLE_PILL': {
      if (!state.pillTabsProps) {
        return state;
      }

      const activePills = getActivePills(state.pillTabsProps.items, state.activePills, action.pillId);
      let currentItems = togglePill(state.items, activePills, action.filter);

      if (state.submittedSearchValue) {
        currentItems = onSearchSubmit(currentItems, state.submittedSearchValue, state.columns);
      }

      return {
        ...state,
        activePills,
        pagination: {
          ...state.pagination,
          currentPage: 1,
          totalItems: currentItems.length,
        },
        currentItems,
        filteredItems: currentItems,
      };
    }

    case 'ON_SEARCH_SUBMIT': {
      const { searchValue, activePills } = state;

      let currentItems = state.items;

      if (activePills.length > 0 && action.filterPills) {
        currentItems = togglePill(currentItems, activePills, action.filterPills);
      }

      if (searchValue) {
        currentItems = onSearchSubmit(currentItems, searchValue, state.columns);
      }

      return {
        ...state,
        pagination: {
          ...state.pagination,
          currentPage: 1,
          totalItems: currentItems.length,
        },
        currentItems,
        filteredItems: currentItems,
        submittedSearchValue: searchValue,
      };
    }

    default:
      return state;
  }
};

function augmentColumns<T>(columns: Array<StatefulTableColumn<T>>) {
  return columns.map((column) => ({ ...column, isSortable: Boolean(column.sortKey || column.sortFn) }));
}

function getItems<T>(
  items: T[],
  isPaginationEnabled: boolean,
  paginationOptions: { currentPage: number; itemsPerPage: number },
) {
  if (!isPaginationEnabled) {
    return items;
  }

  const maxItems = paginationOptions.currentPage * paginationOptions.itemsPerPage;
  const lastItem = Math.min(maxItems, items.length);
  const firstItem = Math.max(0, maxItems - paginationOptions.itemsPerPage);

  return items.slice(firstItem, lastItem);
}

function sort<T>(items: T[], direction: TableSortDirection, sortKey: keyof T): T[];
function sort<T>(items: T[], direction: TableSortDirection, sortFn: StatefulTableSortFn<T>): T[];
function sort<T>(items: T[], direction: TableSortDirection, sortKeyOrFn: keyof T | StatefulTableSortFn<T>) {
  return [...items].sort((firstItem, secondItem) => {
    if (typeof sortKeyOrFn === 'function') {
      return sortKeyOrFn(firstItem, secondItem, direction);
    }

    const sortKey = sortKeyOrFn;

    const firstValue = firstItem[sortKey];
    const secondValue = secondItem[sortKey];

    if (typeof firstValue === 'number' && typeof secondValue === 'number') {
      return direction === 'ASC' ? firstValue - secondValue : secondValue - firstValue;
    }

    const firstValueString = String(firstValue);
    const secondValueString = String(secondValue);

    return direction === 'ASC'
      ? firstValueString.localeCompare(secondValueString)
      : secondValueString.localeCompare(firstValueString);
  });
}

function getActivePills(pillTabs: PillTabItem[], activePills: string[], pillId: string): string[] {
  const toggledPill = pillTabs.find((pill) => pill.id === pillId);

  if (!toggledPill) {
    return activePills;
  }

  const isToggledPillActive = !activePills.includes(pillId);

  return isToggledPillActive
    ? [...activePills, toggledPill.id]
    : activePills.filter((activeFilter) => activeFilter !== toggledPill.id);
}

function togglePill<T>(items: T[], activePills: string[], filter: StatefulTablePillTabFilter<T>['filter']): T[] {
  return activePills.length > 0
    ? activePills
        .map((pillId) => {
          return filter(pillId, items);
        })
        .reduce((results, filteredItems) => {
          const dedupedItems = filteredItems.filter((item) => !results.includes(item));

          return [...results, ...dedupedItems];
        }, [])
    : items;
}
const checkInclude = (searchValue: string, str: string) =>
  str.toLowerCase().trim().includes(searchValue.toLowerCase().trim());

function onSearchSubmit<T>(items: T[], searchValue: string, columns: Array<StatefulTableColumn<T>>): T[] {
  return items.filter((item) =>
    columns.some((column) => {
      const element = item[column.hash as keyof T];

      switch (typeof element) {
        case 'string':
        case 'number':
        case 'boolean':
          return checkInclude(searchValue, element.toString());

        default:
          return;
      }
    }),
  );
}
