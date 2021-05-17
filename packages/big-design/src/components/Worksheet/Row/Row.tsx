import React, { useCallback, useMemo } from 'react';

import { typedMemo } from '../../../utils';
import { Cell } from '../Cell';
import { useStore } from '../hooks';
import { RowStatus } from '../RowStatus';
import {
  WorksheetColumn,
  WorksheetItem,
  WorksheetModalColumn,
  WorksheetNumberColumn,
  WorksheetTextColumn,
} from '../types';

interface RowProps<Item> {
  columns: WorksheetColumn<Item>[];
  rowIndex: number;
}

const InternalRow = <T extends WorksheetItem>({ columns, rowIndex }: RowProps<T>) => {
  const row = useStore(useMemo(() => (state) => state.rows[rowIndex], [rowIndex]));

  const hasFormatting = useCallback((column: WorksheetColumn<T>): column is
    | WorksheetTextColumn<T>
    | WorksheetNumberColumn<T>
    | WorksheetModalColumn<T> => {
    return column.type === 'text' || column.type === 'number' || column.type === 'modal';
  }, []);

  return (
    <tr>
      <RowStatus rowIndex={rowIndex} />
      {columns.map((column, columnIndex) => (
        <Cell
          columnIndex={columnIndex}
          formatting={hasFormatting(column) ? column.formatting : undefined}
          hash={column.hash}
          key={`${rowIndex}-${columnIndex}`}
          options={column.type === 'select' ? column.config.options : undefined}
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
