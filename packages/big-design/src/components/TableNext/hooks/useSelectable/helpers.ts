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
  parentRowIndex,
  selectedItems,
}: SelectRowArg<T>): TableSelectable['selectedItems'] {
  const isSelectedParent = selectedItems[parentRowIndex] !== undefined;

  if (isSelectedParent) {
    const newSelectedItems = unselectParent({
      parentRowIndex,
      selectedItems,
    });

    return newSelectedItems;
  }

  const newSelectedItems = selectParent({
    parentRowIndex,
    selectedItems,
  });

  return newSelectedItems;
}

function unselectParent<T>({
  parentRowIndex,
  selectedItems,
}: SelectRowArg<T>): TableSelectable['selectedItems'] {
  // Unselect the parent row
  const newSelectedItems = Object.entries(selectedItems).filter(
    ([key]) => key !== `${parentRowIndex}`,
  );

  return Object.fromEntries(newSelectedItems);
}

function selectParent<T>({
  parentRowIndex,
  selectedItems,
}: SelectRowArg<T>): TableSelectable['selectedItems'] {
  return {
    ...selectedItems,
    [parentRowIndex]: true,
  };
}
