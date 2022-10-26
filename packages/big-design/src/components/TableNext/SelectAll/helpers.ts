import { getPagedIndex } from '../helpers';
import { TableSelectable } from '../types';

import { SelectAllProps } from './SelectAll';

type SelectAllRowsArg<T> = Omit<SelectAllProps<T>, 'onChange'>;

export function getTotalSelectedItems(selectedItems: TableSelectable['selectedItems']) {
  return Object.keys(selectedItems).filter((key) => !key.includes('.')).length;
}

export function areAllInPageSelected<T>({ items, selectedItems, pagination }: SelectAllRowsArg<T>) {
  if (items.length <= 0) {
    return false;
  }

  return items.every((_, parentRowIndex) => {
    const pagedIndex = getPagedIndex(parentRowIndex, pagination);

    return selectedItems[pagedIndex] !== undefined;
  });
}

export function areSomeInPageSelected<T>({
  items,
  selectedItems,
  pagination,
}: SelectAllRowsArg<T>): boolean {
  if (items.length <= 0) {
    return false;
  }

  return items.some((_, parentRowIndex) => {
    const pagedIndex = getPagedIndex(parentRowIndex, pagination);

    return selectedItems[pagedIndex] !== undefined;
  });
}

function deselectAllOnCurrentPage<T>(params: SelectAllRowsArg<T>) {
  const { items, selectedItems, pagination } = params;

  const filteredSelectedItems = Object.keys(selectedItems)
    .filter((selectedKey) => {
      const item = items.find(
        (_, index) => getPagedIndex(index, pagination) === parseInt(selectedKey, 10),
      );

      return !item;
    })
    .map<[string, true]>((key) => [key, true]);

  return Object.fromEntries(filteredSelectedItems);
}

function selectAllOnCurrentPage<T>(params: SelectAllRowsArg<T>) {
  const { items, selectedItems, pagination } = params;

  const newSelectedItems = items.map((_, parentRowIndex) => {
    const pagedIndex = getPagedIndex(parentRowIndex, pagination);

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
