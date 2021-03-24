import React, { memo } from 'react';

import { Cell } from '../Cell';
import { RowStatus } from '../RowStatus';

import { RowProps } from './types';

export const Row: React.FC<RowProps> = memo(({ columns, rowIndex, row }) => {
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
        />
      ))}
    </tr>
  );
});
