/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useCallback, useMemo } from 'react';

import { typedMemo } from '../../../utils';
import { Cell } from '../Cell';
import { useStore } from '../hooks';
import { RowStatus } from '../RowStatus';
import {
  InternalWorksheetColumn,
  WorksheetItem,
  WorksheetModalColumn,
  WorksheetNumberColumn,
  WorksheetTextColumn,
} from '../types';

import { StyledTableRow } from './styled';

interface RowProps<Item> {
  columns: Array<InternalWorksheetColumn<Item>>;
  rowIndex: number;
}

const InternalRow = <T extends WorksheetItem>({ columns, rowIndex }: RowProps<T>) => {
  const row = useStore(useMemo(() => (state) => state.rows[rowIndex], [rowIndex]));
  const expandableRows = useStore(useMemo(() => (state) => state.expandableRows, []));

  const isExpanded = useStore(
    useMemo(() => (state) => !state.hiddenRows.includes(row.id), [row.id]),
  );
  const isDisabled = useStore(
    useMemo(() => (state) => state.disabledRows.includes(row.id), [row.id]),
  );

  const parentId = useMemo(() => {
    if (!expandableRows) {
      return;
    }

    const rowIds = Object.keys(expandableRows);

    return rowIds.find((rowId) => expandableRows[rowId].find((childId) => childId === row.id));
  }, [expandableRows, row.id]);

  const isChild = useMemo(() => parentId !== undefined, [parentId]);

  const hasFormatting = useCallback(
    (
      column: InternalWorksheetColumn<T>,
    ): column is WorksheetTextColumn<T> | WorksheetNumberColumn<T> | WorksheetModalColumn<T> => {
      return column.type === 'text' || column.type === 'number' || column.type === 'modal';
    },
    [],
  );

  return (
    <StyledTableRow isChild={isChild} isExpanded={!isChild || isExpanded}>
      <RowStatus rowIndex={rowIndex} />
      {columns.map((column, columnIndex) => (
        <Cell
          columnIndex={columnIndex}
          disabled={column.disabled || isDisabled}
          formatting={hasFormatting(column) ? column.formatting : undefined}
          hash={column.hash}
          key={`${rowIndex}-${columnIndex}`}
          options={column.type === 'select' ? column.config.options : undefined}
          rowId={row.id}
          rowIndex={rowIndex}
          type={column.type ?? 'text'}
          validation={column.validation}
          value={row[column.hash]}
        />
      ))}
    </StyledTableRow>
  );
};

export const Row = typedMemo(InternalRow);
