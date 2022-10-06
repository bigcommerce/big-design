import { TableSelectable } from '../../types';

export interface SelectRowArg<T> {
  childrenRows?: T[];
  childRowIndex?: number;
  isExpandable?: boolean;
  isTheOnlySelectedChildRow?: boolean;
  parentRowIndex: number;
  selectedItems: TableSelectable['selectedItems'];
  isParentRow?: boolean;
}

export function selectParentRow<T>({
  childrenRows,
  isExpandable,
  parentRowIndex,
  selectedItems,
}: SelectRowArg<T>): TableSelectable['selectedItems'] {
  const isSelectedParent = selectedItems[parentRowIndex] !== undefined;

  if (isSelectedParent) {
    const newSelectedItems = unselectParent({
      childrenRows,
      isExpandable,
      parentRowIndex,
      selectedItems,
    });

    return newSelectedItems;
  }

  const newSelectedItems = selectParent({
    childrenRows,
    isExpandable,
    parentRowIndex,
    selectedItems,
  });

  return newSelectedItems;
}

function unselectParent<T>({
  childrenRows,
  isExpandable,
  parentRowIndex,
  selectedItems,
}: SelectRowArg<T>): TableSelectable['selectedItems'] {
  const hasChildrenRows = isExpandable && childrenRows !== undefined;

  // If parent has children, unselect it's childrenRows
  if (hasChildrenRows) {
    const newSelectedItems = unselectParentAndChildren({
      selectedItems,
      parentRowIndex,
    });

    return newSelectedItems;
  }

  // Unselect the parent row
  const newSelectedItems = Object.entries(selectedItems).filter(
    ([key]) => key !== `${parentRowIndex}`,
  );

  return Object.fromEntries(newSelectedItems);
}

function unselectParentAndChildren<T>({ selectedItems, parentRowIndex }: SelectRowArg<T>) {
  const newSelectedItems = Object.entries(selectedItems).filter(([key]) => {
    const [parentIndex] = key.split('.').map((key) => parseInt(key, 10));

    return parentIndex !== parentRowIndex;
  });

  return Object.fromEntries(newSelectedItems);
}

function selectParent<T>({
  childrenRows,
  isExpandable,
  parentRowIndex,
  selectedItems,
}: SelectRowArg<T>): TableSelectable['selectedItems'] {
  const hasChildrenRows = isExpandable && childrenRows !== undefined;

  // If parent has children, select it's childrenRows
  if (hasChildrenRows) {
    const newSelectedItems = selectParentAndChildren({
      selectedItems,
      childrenRows,
      parentRowIndex,
    });

    return newSelectedItems;
  }

  return {
    ...selectedItems,
    [parentRowIndex]: true,
  };
}

function selectParentAndChildren<T>({
  selectedItems,
  childrenRows = [],
  parentRowIndex,
}: SelectRowArg<T>) {
  const newSelectedItems = { ...selectedItems };

  newSelectedItems[parentRowIndex] = true;

  for (let index = 0; index < childrenRows.length; index++) {
    const childRowIndex = index;

    newSelectedItems[`${parentRowIndex}.${childRowIndex}`] = true;
  }

  return newSelectedItems;
}

export function selectChildRow<T>({
  childRowIndex,
  isTheOnlySelectedChildRow,
  selectedItems,
  parentRowIndex,
}: SelectRowArg<T>): TableSelectable['selectedItems'] {
  const isSelectedParent = selectedItems[parentRowIndex] !== undefined;

  if (!isSelectedParent) {
    const newSelectedItems = selectChild({ childRowIndex, parentRowIndex, selectedItems });

    return newSelectedItems;
  }

  const isSelectedChild = selectedItems[`${parentRowIndex}.${childRowIndex}`] !== undefined;

  if (isSelectedChild) {
    const newSelectedItems = unselectChild({
      selectedItems,
      parentRowIndex,
      childRowIndex,
      isTheOnlySelectedChildRow,
    });

    return newSelectedItems;
  }

  // SelectedParent but child is not selected.
  const newSelectedItems = { ...selectedItems };

  newSelectedItems[`${parentRowIndex}.${childRowIndex}`] = true;

  return newSelectedItems;
}

function selectChild<T>({
  childRowIndex,
  parentRowIndex,
  selectedItems,
}: SelectRowArg<T>): TableSelectable['selectedItems'] {
  const newSelectedItems = { ...selectedItems };

  newSelectedItems[`${parentRowIndex}`] = true;
  newSelectedItems[`${parentRowIndex}.${childRowIndex}`] = true;

  return newSelectedItems;
}

function unselectChild<T>({
  selectedItems,
  parentRowIndex,
  childRowIndex,
  isTheOnlySelectedChildRow,
}: SelectRowArg<T>) {
  const newSelectedItems = Object.entries(selectedItems)
    .filter(([key]) => key !== `${parentRowIndex}.${childRowIndex}`)
    .filter(([key]) => {
      // Remove the parent row if it's the only selected child.
      if (isTheOnlySelectedChildRow) {
        return key !== `${parentRowIndex}`;
      }

      return true;
    });

  return Object.fromEntries(newSelectedItems);
}

export function getTotalSelectedChildRows<T>({
  childrenRows,
  parentRowIndex,
  selectedItems,
}: SelectRowArg<T>) {
  return childrenRows?.reduce((acc, _childRow, childRowIndex) => {
    if (selectedItems[`${parentRowIndex}.${childRowIndex}`] !== undefined) {
      return acc + 1;
    }

    return acc;
  }, 0);
}
