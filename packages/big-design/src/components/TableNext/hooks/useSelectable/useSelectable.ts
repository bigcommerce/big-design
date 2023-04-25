'use client';

import { useEffect, useState } from 'react';

import { useEventCallback } from '../../../../hooks';
import { TableSelectable } from '../../types';

import {
  getTotalSelectedChildRows,
  selectChildRow,
  selectParentRow,
  SelectRowArg,
} from './helpers';

interface OnItemSelectFnArg
  extends Omit<SelectRowArg, 'selectedItems' | 'setSelectedParentRowsCrossPages'> {
  isParentRow: boolean;
  parentRowId: string;
  childRowId?: string;
  childrenRowsIds: string[];
}

export type OnItemSelectFn = ({
  isParentRow,
  parentRowId,
  childRowId,
  childrenRowsIds,
}: OnItemSelectFnArg) => void;

export const useSelectable = (selectable?: TableSelectable) => {
  const isSelectable = Boolean(selectable);
  const isChildrenRowsSelectable = selectable?.isChildrenRowsSelectable ?? false;
  const [selectedItems, setSelectedItems] = useState<TableSelectable['selectedItems']>({});
  const [selectedParentRowsCrossPages, setSelectedParentRowsCrossPages] = useState<Set<string>>(
    () => {
      const initialSelectedParentRows = selectable?.initialSelectedParentRows ?? [];

      if (initialSelectedParentRows.length) {
        const initialSelectedParentRowsCrossPages = new Set(initialSelectedParentRows);

        return new Set(initialSelectedParentRowsCrossPages);
      }

      return new Set();
    },
  );

  const onItemSelectEventCallback: OnItemSelectFn = useEventCallback(
    ({ isParentRow, parentRowId, childRowId, childrenRowsIds }) => {
      if (!selectable) {
        return;
      }

      const { onSelectionChange } = selectable;

      if (isParentRow) {
        const newSelectedItems = selectParentRow({
          selectedItems,
          setSelectedParentRowsCrossPages,
          parentRowId,
          childRowId,
          isChildrenRowsSelectable,
          childrenRowsIds,
        });

        onSelectionChange(newSelectedItems);
      } else {
        const totalSelectedChildRows = getTotalSelectedChildRows({
          selectedItems,
          parentRowId,
          setSelectedParentRowsCrossPages,
          childRowId,
          childrenRowsIds,
        });

        const isTheOnlySelectedChildRow = totalSelectedChildRows === 1;

        const newSelectedItems = selectChildRow({
          isTheOnlySelectedChildRow,
          selectedItems,
          parentRowId,
          setSelectedParentRowsCrossPages,
          childRowId,
          isChildrenRowsSelectable,
          childrenRowsIds,
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
    isChildrenRowsSelectable,
    selectedParentRowsCrossPages,
    setSelectedParentRowsCrossPages,
  };
};
