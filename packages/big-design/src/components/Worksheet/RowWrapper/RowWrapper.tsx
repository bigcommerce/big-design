import React from 'react';
import { useStoreon } from 'storeon/react';

import { typedMemo } from '../../../utils';
import { Row } from '../Row';
import { WorksheetColumn } from '../types';

interface RowWrapperProps<T> {
  columns: WorksheetColumn[];
  data: T[];
}

export const RowWrapper = typedMemo(<T extends unknown>({ data, columns }: RowWrapperProps<T>) => {
  const { rowSelected, cellSelected } = useStoreon('rowSelected', 'cellSelected');

  console.log(cellSelected);

  return (
    <tbody>
      {data.map((row, rowIndex) => (
        <Row key={rowIndex} columns={columns} rowIndex={rowIndex} row={row} isSelected={rowSelected === rowIndex} />
      ))}
    </tbody>
  );
});
