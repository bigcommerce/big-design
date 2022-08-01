import { useEffect, useState } from 'react';

import { useEventCallback } from '../../../../hooks';
import { TableExpandable } from '../../types';

export const useExpandable = <T>(expandable?: TableExpandable<T>) => {
  const [expandedRows, setExpandedRows] = useState<TableExpandable<T>['expandedRows']>({});
  const isExpandable = Boolean(expandable);

  const expandedItemsEventCallback = useEventCallback((parentRowIndex: number | null) => {
    if (!expandable || parentRowIndex === null) {
      return;
    }

    const { onExpandedChange } = expandable;

    const isExpandedRow = expandedRows[parentRowIndex] !== undefined;

    if (isExpandedRow) {
      const newExpandedRows = Object.entries(expandedRows).filter(
        ([key]) => key !== `${parentRowIndex}`,
      );

      onExpandedChange(Object.fromEntries(newExpandedRows), parentRowIndex);
    } else {
      const newExpandedRows = { ...expandedRows };

      newExpandedRows[parentRowIndex] = true;

      onExpandedChange(newExpandedRows, parentRowIndex);
    }
  });

  useEffect(() => {
    if (expandable?.expandedRows) {
      setExpandedRows({ ...expandable.expandedRows });
    }
  }, [expandable?.expandedRows]);

  return {
    expandedRows,
    expandedRowSelector: expandable?.expandedRowSelector,
    isExpandable,
    onExpandedRow: isExpandable ? expandedItemsEventCallback : undefined,
    setExpandedRows,
  };
};
