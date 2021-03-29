import React, { memo, useMemo } from 'react';

import { Cell } from '../Cell';
import { useStore } from '../hooks';
import { RowStatus } from '../RowStatus';
import { WorksheetColumn } from '../types';

interface RowProps {
  rowIndex: number;
  columns: WorksheetColumn[];
}

export const Row: React.FC<RowProps> = memo(({ columns, rowIndex }) => {
  const row = useStore(useMemo(() => (state) => state.rows[rowIndex], [rowIndex]));

  return (
    <tr>
      <RowStatus rowIndex={rowIndex} />
      {columns.map((column, columnIndex) => (
        <Cell
          key={`${rowIndex}-${columnIndex}`}
          columnIndex={columnIndex}
          rowIndex={rowIndex}
          type={column.type}
          value={row[column.hash]} //TODO: fix
          hash={column.hash}
          validation={column.validation}
        />
      ))}
    </tr>
  );
});
