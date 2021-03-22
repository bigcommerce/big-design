import React, { useMemo } from 'react';
import { StoreContext } from 'storeon/react';
import create from 'zustand';

import { typedMemo } from '../../utils';

import { Row } from './Row';
import { Status } from './RowStatus/styled';
import { store } from './store';
import { Header, Table } from './styled';
import { WorksheetProps } from './types';

interface Cell {
  rowIndex: number;
  columnIndex: number;
}

interface State<T> {
  selectedRows: T[];
  selectedCells: Cell[];
  setSelectedRows: (rows: T[]) => void;
  setSelectedCells: (cells: Cell[]) => void;
}

export const useStore = create<State<any>>((set) => ({
  selectedRows: [],
  selectedCells: [],
  setSelectedRows: (rows) => set((state) => ({ ...state, selectedRows: rows })),
  setSelectedCells: (cells) => set((state) => ({ ...state, selectedCells: cells })),
}));

const InternalWorksheet = <T extends unknown>({ columns, data }: WorksheetProps<T>) => {
  const renderHeaders = useMemo(
    () => (
      <thead>
        <tr>
          <Status />
          {columns.map((column, index) => (
            <Header key={index}>{column.name}</Header>
          ))}
        </tr>
      </thead>
    ),
    [columns],
  );

  const renderRows = useMemo(
    () => (
      <tbody>
        {data.map((row, rowIndex) => (
          <Row key={rowIndex} columns={columns} rowIndex={rowIndex} row={row} />
        ))}
      </tbody>
    ),
    [columns, data],
  );

  return (
    <StoreContext.Provider value={store}>
      <Table>
        {renderHeaders}
        {renderRows}
      </Table>
    </StoreContext.Provider>
  );
};

export const Worksheet = typedMemo(InternalWorksheet);
