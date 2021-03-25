import React, { useEffect, useMemo } from 'react';
import create from 'zustand';

import { typedMemo } from '../../utils';

import { UpdateItemsProvider } from './context';
import { Row } from './Row';
import { Status } from './RowStatus/styled';
import { Header, Table } from './styled';
import { Cell, WorksheetProps } from './types';
import { mergeCells } from './utils';

interface State<T> {
  editedCells: Cell[];
  rows: T[];
  selectedCells: Cell[];
  selectedRows: number[];
  addEditedCells: (cells: Cell[]) => void;
  setRows: (rows: T[]) => void;
  setSelectedCells: (cells: Cell[]) => void;
  setSelectedRows: (rows: number[]) => void;
}

// TODO: Fix Type
export const useStore = create<State<unknown>>((set) => ({
  editedCells: [],
  rows: [],
  selectedRows: [],
  selectedCells: [],
  addEditedCells: (cells) => set((state) => ({ ...state, editedCells: mergeCells(state.editedCells, cells) })),
  setRows: (rows) => set((state) => ({ ...state, rows })),
  setSelectedRows: (rowIndexes) => set((state) => ({ ...state, selectedRows: rowIndexes })),
  setSelectedCells: (cells) => set((state) => ({ ...state, selectedCells: cells })),
}));

const InternalWorksheet = <T extends unknown>({ columns, items, onChange }: WorksheetProps<T>) => {
  const setRows = useStore((state) => state.setRows);
  const editedCells = useStore((state) => state.editedCells);

  useEffect(() => setRows(items), [items, setRows]);
  useEffect(() => {
    if (editedCells.length) {
      onChange(editedCells);
    }
  }, [editedCells, onChange]);

  const rows = useStore((state) => state.rows);

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
        {rows.map((
          row, //TODO: fix
          rowIndex,
        ) => (
          <Row key={rowIndex} columns={columns} rowIndex={rowIndex} />
        ))}
      </tbody>
    ),
    [columns, rows],
  );

  return (
    <UpdateItemsProvider items={rows}>
      <Table>
        {renderHeaders}
        {renderRows}
      </Table>
    </UpdateItemsProvider>
  );
};

export const Worksheet = typedMemo(InternalWorksheet);
