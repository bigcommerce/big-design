import { useEffect, useState } from 'react';

import { useEventCallback } from '../../../../hooks';
import { TableSelectable } from '../../types';

import { selectParentRow, SelectRowArg } from './helpers';

interface OnItemSelectFnArg<T> extends Omit<SelectRowArg<T>, 'childRowIndex' | 'selectedItems'> {
  parentRowIndex: number;
  isParentRow: boolean;
}

export type OnItemSelectFn = <T>({ isParentRow, parentRowIndex }: OnItemSelectFnArg<T>) => void;

export const useSelectable = (selectable?: TableSelectable) => {
  const isSelectable = Boolean(selectable);
  const [selectedItems, setSelectedItems] = useState<TableSelectable['selectedItems']>({});

  const onItemSelectEventCallback: OnItemSelectFn = useEventCallback(
    ({ isParentRow, parentRowIndex }) => {
      if (!selectable) {
        return;
      }

      const { onSelectionChange } = selectable;

      if (isParentRow) {
        const newSelectedItems = selectParentRow({
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
