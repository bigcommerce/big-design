import React, { memo, useCallback, useMemo } from 'react';

import { Cell } from '../Cell';
import { useStore } from '../hooks';
import { RowStatus } from '../RowStatus';
import { WorksheetColumn } from '../types';

interface RowProps {
  columns: WorksheetColumn[];
  rowIndex: number;
}

export const Row: React.FC<RowProps> = memo(({ columns, rowIndex }) => {
  const row = useStore(useMemo(() => (state) => state.rows[rowIndex], [rowIndex]));

  // At this point we don't know what type value has
  // But we only want to pass values of type string or number to the cells.
  const validatValue = useCallback((value: unknown) => {
    if (typeof value === 'string' || typeof value === 'number') {
      return value;
    }

    // Cast to string if it's anything else
    // Prevents runtime error and displays NaN or [object Object]
    return `${value}`;
  }, []);

  return (
    <tr>
      <RowStatus rowIndex={rowIndex} />
      {columns.map((column, columnIndex) => (
        <Cell
          columnIndex={columnIndex}
          hash={column.hash}
          key={`${rowIndex}-${columnIndex}`}
          rowIndex={rowIndex}
          type={column.type ?? 'text'}
          validation={column.validation}
          value={validatValue(row[column.hash])}
        />
      ))}
    </tr>
  );
});
