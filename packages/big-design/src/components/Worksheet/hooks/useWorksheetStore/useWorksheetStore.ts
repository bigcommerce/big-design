import { useContext } from 'react';
import { createStore, useStore } from 'zustand';

import { Cell, DisabledRows, ExpandableRows, InternalWorksheetColumn } from '../../types';
import { deleteCells, getHiddenRows, mergeCells } from '../../utils';
import { WorksheetContext } from '../../Worksheet';

export interface BaseState<Item> {
  columns: Array<InternalWorksheetColumn<Item>>;
  editedCells: Array<Cell<Item>>;
  editingCell: Cell<Item> | null;
  expandableRows: ExpandableRows;
  disabledRows: DisabledRows;
  hiddenRows: Array<string | number>;
  invalidCells: Array<Cell<Item>>;
  openedModal: keyof Item | null;
  rows: Item[];
  selectedCells: Array<Cell<Item>>;
  selectedRows: number[];
  tableRef: HTMLTableElement | null;
  addEditedCells: (cells: Array<Cell<Item>>) => void;
  addInvalidCells: (cells: Array<Cell<Item>>) => void;
  removeInvalidCells: (cells: Array<Cell<Item>>) => void;
  setColumns: (columns: Array<InternalWorksheetColumn<Item>>) => void;
  setEditingCell: (cell: Cell<Item> | null) => void;
  setExpandableRows: (
    expandableRows: ExpandableRows,
    defaultExpandedRows?: Array<string | number>,
  ) => void;
  setDisabledRows: (disabledRows: DisabledRows) => void;
  setHiddenRows: (hiddenRow: Array<string | number>) => void;
  setOpenModal: (value: keyof Item | null) => void;
  setRows: (rows: Item[]) => void;
  setSelectedCells: (cells: Array<Cell<Item>>) => void;
  setSelectedRows: (rows: number[]) => void;
  setTableRef: (ref: HTMLTableElement | null) => void;
}

export const createWorksheetStore = <Item>() =>
  createStore<BaseState<Item>>((set) => ({
    columns: [],
    editedCells: [],
    editingCell: null,
    expandableRows: {},
    disabledRows: [],
    hiddenRows: [],
    invalidCells: [],
    openedModal: null,
    rows: [],
    selectedCells: [],
    selectedRows: [],
    tableRef: null,
    addEditedCells: (cells) =>
      set((state) => ({ ...state, editedCells: mergeCells(state.editedCells, cells) })),
    addInvalidCells: (cells) =>
      set((state) => ({ ...state, invalidCells: mergeCells(state.invalidCells, cells) })),
    removeInvalidCells: (cells) =>
      set((state) => ({ ...state, invalidCells: deleteCells(state.invalidCells, cells) })),
    setColumns: (columns) => set((state) => ({ ...state, columns })),
    setEditingCell: (cell) => set((state) => ({ ...state, editingCell: cell })),
    setExpandableRows: (expandableRows, defaultExpandedRows) =>
      set((state) => ({
        ...state,
        expandableRows,
        hiddenRows: getHiddenRows(expandableRows, defaultExpandedRows),
      })),
    setDisabledRows: (disabledRows) => set((state) => ({ ...state, disabledRows })),
    setHiddenRows: (hiddenRows) => set((state) => ({ ...state, hiddenRows })),
    setOpenModal: (value) => set((state) => ({ ...state, openedModal: value })),
    setRows: (rows) => set((state) => ({ ...state, rows })),
    setSelectedCells: (cells) => set((state) => ({ ...state, selectedCells: cells })),
    setSelectedRows: (rowIndexes) => set((state) => ({ ...state, selectedRows: rowIndexes })),
    setTableRef: (ref) => set((state) => ({ ...state, tableRef: ref })),
  }));

export const useWorksheetStore = () => {
  const store = useContext(WorksheetContext);

  if (!store) {
    throw new Error('Worksheet store value is null');
  }

  return { store, useStore };
};
