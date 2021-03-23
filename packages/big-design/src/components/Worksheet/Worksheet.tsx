import React, { useMemo } from 'react';
import create from 'zustand';

import { typedMemo } from '../../utils';

import { Row } from './Row';
import { Status } from './RowStatus/styled';
import { Header, Table } from './styled';
import { WorksheetProps } from './types';

interface Cell {
  columnIndex: number;
  rowIndex: number;
}

interface State<T> {
  selectedCells: Cell[];
  selectedRows: T[];
  setSelectedCells: (cells: Cell[]) => void;
  setSelectedRows: (rows: T[]) => void;
}

// TODO: Fix Type
export const useStore = create<State<unknown>>((set) => ({
  selectedRows: [],
  selectedCells: [],
  setSelectedRows: (rows) => set((state) => ({ ...state, selectedRows: rows })),
  setSelectedCells: (cells) => set((state) => ({ ...state, selectedCells: cells })),
}));

const InternalWorksheet = <T extends unknown>({ columns, items }: WorksheetProps<T>) => {
  const renderHeaders = useMemo(
    () => (
      <thead>
        <tr>
          <Status />
          {columns.map((column, index) => (
            <Header key={index}>{column.header}</Header>
          ))}
        </tr>
      </thead>
    ),
    [columns],
  );

  const renderRows = useMemo(
    () => (
      <tbody>
        {items.map((row, rowIndex) => (
          <Row key={rowIndex} columns={columns} rowIndex={rowIndex} row={row} />
        ))}
      </tbody>
    ),
    [columns, items],
  );

  return (
    <Table>
      {renderHeaders}
      {renderRows}
    </Table>
  );
};

export const Worksheet = typedMemo(InternalWorksheet);
