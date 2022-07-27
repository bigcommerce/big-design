import { TableExpandable, TableSelectable } from '../types';

interface SelectAllRowsArg<T> {
  isExpandable: boolean;
  items: T[];
  selectedItems: TableSelectable['selectedItems'];
  expandedRowSelector?: TableExpandable<T>['expandedRowSelector'];
}

export function getTotalSelectedItems<T>(
  items: T[],
  selectedItems: TableSelectable['selectedItems'],
) {
  return items.reduce((acc, _parentRow, parentRowIndex) => {
    if (selectedItems[parentRowIndex] !== undefined) {
      return acc + 1;
    }

    return acc;
  }, 0);
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
}: SelectAllRowsArg<T>) {
  if (items.length <= 0) {
    return false;
  }

  return items.every((parentRow, parentRowIndex) => {
    const childrenRows: T[] = getChildrenRows(parentRow, expandedRowSelector);

    // Not need to check childrens since expandable mode is not used.
    if (!isExpandable || childrenRows.length === 0) {
      return selectedItems[parentRowIndex] !== undefined;
    }

    return areAllParentsAndChildrenSelected(childrenRows, selectedItems, parentRowIndex);
  });
}

export function areSomeInPageSelected<T>({
  isExpandable,
  items,
  selectedItems,
  expandedRowSelector,
}: SelectAllRowsArg<T>): boolean {
  if (items.length <= 0) {
    return false;
  }

  return items.some((parentRow, parentRowIndex) => {
    const childrenRows: T[] = getChildrenRows(parentRow, expandedRowSelector);

    // Not need to check childrens since expandable mode is not used.
    if (!isExpandable || childrenRows.length === 0) {
      return selectedItems[parentRowIndex] !== undefined;
    }

    return areSomeParentsAndChildrenSelected(childrenRows, selectedItems, parentRowIndex);
  });
}

function areAllParentsAndChildrenSelected<T>(
  childrenRows: T[],
  selectedItems: TableSelectable['selectedItems'],
  parentRowIndex: number,
) {
  const allChildrenRowsSelected = childrenRows.every((_childRow, childRowIndex) => {
    return selectedItems[`${parentRowIndex}.${childRowIndex}`] !== undefined;
  });

  return selectedItems[parentRowIndex] !== undefined && allChildrenRowsSelected;
}

function areSomeParentsAndChildrenSelected<T>(
  childrenRows: T[],
  selectedItems: TableSelectable['selectedItems'],
  parentRowIndex: number,
) {
  const someChildrenRowsInPageSelected = childrenRows.some((_childRow, childRowIndex) => {
    return selectedItems[`${parentRowIndex}.${childRowIndex}`] !== undefined;
  });

  return selectedItems[parentRowIndex] !== undefined && someChildrenRowsInPageSelected;
}

export function selectAll<T>({
  expandedRowSelector,
  isExpandable,
  items,
}: Omit<SelectAllRowsArg<T>, 'selectedItems'>): TableSelectable['selectedItems'] {
  const newSelectedItems = items.map((parentRow, parentRowIndex) => {
    const childrenRows: T[] = getChildrenRows(parentRow, expandedRowSelector);

    if (isExpandable) {
      const newSelectedChildrenRows = childrenRows.map<[string, true]>((_child, childRowIndex) => {
        return [`${parentRowIndex}.${childRowIndex}`, true];
      });

      return [[`${parentRowIndex}`, true], ...newSelectedChildrenRows];
    }

    return [[`${parentRowIndex}`, true]];
  });

  return Object.fromEntries(newSelectedItems.flat());
}
