import { useEffect, useState } from 'react';

import { useEventCallback } from '../../../../hooks';
import { TableExpandable } from '../../types';

export const useExpandable = <T>(expandable?: TableExpandable<T>) => {
  const [expandedRows, setExpandedRows] = useState<TableExpandable<T>['expandedRows']>({});
  const isExpandable = Boolean(expandable);

  const expandedItemsEventCallback = useEventCallback((parentRowId: string) => {
    if (!expandable || parentRowId === null) {
      return;
    }

    const { onExpandedChange } = expandable;

    const isExpandedRow = expandedRows[parentRowId] !== undefined;

    if (isExpandedRow) {
      const newExpandedRows = Object.entries(expandedRows).filter(([key]) => {
        return key !== `${parentRowId}`;
      });

      onExpandedChange(Object.fromEntries(newExpandedRows), parentRowId);
    } else {
      const newExpandedRows = { ...expandedRows };

      newExpandedRows[parentRowId] = true;

      onExpandedChange(newExpandedRows, parentRowId);
    }
  });

  useEffect(() => {
    if (expandable?.expandedRows) {
      setExpandedRows({ ...expandable.expandedRows });
    }
  }, [expandable?.expandedRows]);

  return {
    expandedRows,
    getChildren: expandable?.getChildren,
    isExpandable,
    onExpandedRow: isExpandable ? expandedItemsEventCallback : undefined,
    setExpandedRows,
  };
};
