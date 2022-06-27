import { useEffect, useState } from 'react';

import { useEventCallback } from '../../../../hooks';
import { TableSelectable } from '../../types';

import {
  getTotalSelectedChildRows,
  selectChildRow,
  selectParentRow,
  SelectRowArg,
} from './helpers';

interface OnItemSelectFnArg<T> extends Omit<SelectRowArg<T>, 'childRowIndex' | 'selectedItems'> {
  childRowIndex: number | null;
  isParentRow: boolean;
}

export type OnItemSelectFn = <T>({
  childRowIndex,
  childrenRows,
  isParentRow,
  isExpandable,
  parentRowIndex,
}: OnItemSelectFnArg<T>) => void;

export const useSelectable = (selectable?: TableSelectable) => {
  const isSelectable = Boolean(selectable);
  const [selectedItems, setSelectedItems] = useState<TableSelectable['selectedItems']>({});

  const onItemSelectEventCallback: OnItemSelectFn = useEventCallback(
    ({ childRowIndex, childrenRows, isParentRow, isExpandable, parentRowIndex }) => {
      if (!selectable) {
        return;
      }

      const { onSelectionChange } = selectable;

      if (isParentRow) {
        const newSelectedItems = selectParentRow({
          childrenRows,
          isExpandable,
          parentRowIndex,
          selectedItems,
        });

        onSelectionChange(newSelectedItems);
      } else if (childRowIndex !== null) {
        const totalSelectedChildRows = getTotalSelectedChildRows({
          childrenRows,
          parentRowIndex,
          selectedItems,
        });

        const isTheOnlySelectedChildRow = totalSelectedChildRows === 1;

        const newSelectedItems = selectChildRow({
          childRowIndex,
          isTheOnlySelectedChildRow,
          parentRowIndex,
          selectedItems,
        });

        onSelectionChange(newSelectedItems);
      }
    },
  );

  useEffect(() => {
    if (selectable?.selectedItems) {
      setSelectedItems({ ...selectable.selectedItems });
    }
  }, [selectable?.selectedItems]);

  return {
    isSelectable,
    onItemSelect: isSelectable ? onItemSelectEventCallback : undefined,
    selectedItems,
  };
};
