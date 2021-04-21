import React, { useMemo } from 'react';

import { typedMemo } from '../../../utils';
import { Cell } from '../Cell';
import { useStore } from '../hooks';
import { RowStatus } from '../RowStatus';
import { WorksheetColumn, WorksheetItem } from '../types';

interface RowProps<Item> {
  columns: WorksheetColumn<Item>[];
  rowIndex: number;
}

const InternalRow = <T extends WorksheetItem>({ columns, rowIndex }: RowProps<T>) => {
  const row = useStore(useMemo(() => (state) => state.rows[rowIndex], [rowIndex]));

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
          value={row[column.hash]}
        />
      ))}
    </tr>
  );
};

export const Row = typedMemo(InternalRow);
