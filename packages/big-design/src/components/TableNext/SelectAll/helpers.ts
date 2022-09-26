import { getPagedIndex } from '../helpers';
import { TableExpandable, TableSelectable } from '../types';

import { SelectAllProps } from './SelectAll';

type SelectAllRowsArg<T> = Omit<SelectAllProps<T>, 'onChange'>;

export function getTotalSelectedItems(selectedItems: TableSelectable['selectedItems']) {
  return Object.keys(selectedItems).filter((key) => !key.includes('.')).length;
}

export function getChildrenRows<T>(
  parentRow: T,
  expandedRowSelector?: TableExpandable<T>['expandedRowSelector'],
) {
  const expandedRowMode = expandedRowSelector !== undefined;

  if (!expandedRowMode) {
    return [];
  }

  return expandedRowSelector(parentRow) ?? [];
}

export function areAllInPageSelected<T>({
  isExpandable,
  items,
  selectedItems,
  expandedRowSelector,
  pagination,
}: SelectAllRowsArg<T>) {
  if (items.length <= 0) {
    return false;
  }

  return items.every((parentRow, parentRowIndex) => {
    const pagedIndex = getPagedIndex(parentRowIndex, pagination);
    const childrenRows: T[] = getChildrenRows(parentRow, expandedRowSelector);

    // Not need to check childrens since expandable mode is not used.
    if (!isExpandable || childrenRows.length === 0) {
      return selectedItems[pagedIndex] !== undefined;
    }

    return areAllParentsAndChildrenSelected(childrenRows, selectedItems, pagedIndex);
  });
}

export function areSomeInPageSelected<T>({
  isExpandable,
  items,
  selectedItems,
  expandedRowSelector,
  pagination,
}: SelectAllRowsArg<T>): boolean {
  if (items.length <= 0) {
    return false;
  }

  return items.some((parentRow, parentRowIndex) => {
    const pagedIndex = getPagedIndex(parentRowIndex, pagination);
    const childrenRows: T[] = getChildrenRows(parentRow, expandedRowSelector);

    // Not need to check childrens since expandable mode is not used.
    if (!isExpandable || childrenRows.length === 0) {
      return selectedItems[pagedIndex] !== undefined;
    }

    return areSomeParentsAndChildrenSelected(childrenRows, selectedItems, pagedIndex);
  });
}

function areAllParentsAndChildrenSelected<T>(
  childrenRows: T[],
  selectedItems: TableSelectable['selectedItems'],
  pagedIndex: number,
) {
  const allChildrenRowsSelected = childrenRows.every((_childRow, childRowIndex) => {
    return selectedItems[`${pagedIndex}.${childRowIndex}`] !== undefined;
  });

  return selectedItems[pagedIndex] !== undefined && allChildrenRowsSelected;
}

function areSomeParentsAndChildrenSelected<T>(
  childrenRows: T[],
  selectedItems: TableSelectable['selectedItems'],
  pagedIndex: number,
) {
  const someChildrenRowsInPageSelected = childrenRows.some((_childRow, childRowIndex) => {
    return selectedItems[`${pagedIndex}.${childRowIndex}`] !== undefined;
  });

  return selectedItems[pagedIndex] !== undefined && someChildrenRowsInPageSelected;
}

function deselectAllOnCurrentPage<T>(params: SelectAllRowsArg<T>) {
  const { items, selectedItems, pagination } = params;

  const filteredSelectedItems = Object.keys(selectedItems)
    .filter((selectedKey) => {
      const [parentIndex] = selectedKey.split('.').map((key) => parseInt(key, 10));
      const item = items.find((_, index) => getPagedIndex(index, pagination) === parentIndex);

      return !item;
    })
    .map<[string, true]>((key) => [key, true]);

  return Object.fromEntries(filteredSelectedItems);
}

function selectAllOnCurrentPage<T>(params: SelectAllRowsArg<T>) {
  const { isExpandable, items, selectedItems, expandedRowSelector, pagination } = params;

  const newSelectedItems = items.map((parentRow, parentRowIndex) => {
    const pagedIndex = getPagedIndex(parentRowIndex, pagination);
    const childrenRows: T[] = getChildrenRows(parentRow, expandedRowSelector);

    if (isExpandable) {
      const newSelectedChildrenRows = childrenRows.map<[string, true]>((_child, childRowIndex) => {
        return [`${pagedIndex}.${childRowIndex}`, true];
      });

      return [[`${pagedIndex}`, true], ...newSelectedChildrenRows];
    }

    return [[`${pagedIndex}`, true]];
  });

  return { ...selectedItems, ...Object.fromEntries(newSelectedItems.flat()) };
}

export function getSelectAllState<T>(
  params: SelectAllRowsArg<T>,
): TableSelectable['selectedItems'] {
  if (areAllInPageSelected(params)) {
    return deselectAllOnCurrentPage(params);
  }

  return selectAllOnCurrentPage(params);
}
