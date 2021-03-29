import create from 'zustand';

import { Cell } from '../types';
import { deleteCells, mergeCells } from '../utils';

interface State<T> {
  editedCells: Cell[];
  invalidCells: Cell[];
  rows: T[];
  selectedCells: Cell[];
  selectedRows: number[];
  addEditedCells: (cells: Cell[]) => void;
  addInvalidCells: (cells: Cell[]) => void;
  removeInvalidCells: (cells: Cell[]) => void;
  setRows: (rows: T[]) => void;
  setSelectedCells: (cells: Cell[]) => void;
  setSelectedRows: (rows: number[]) => void;
}

// TODO: Fix Type
export const useStore = create<State<unknown>>((set) => ({
  editedCells: [],
  invalidCells: [],
  rows: [],
  selectedRows: [],
  selectedCells: [],
  addEditedCells: (cells) => set((state) => ({ ...state, editedCells: mergeCells(state.editedCells, cells) })),
  addInvalidCells: (cells) => set((state) => ({ ...state, invalidCells: mergeCells(state.invalidCells, cells) })),
  removeInvalidCells: (cells) => set((state) => ({ ...state, invalidCells: deleteCells(state.invalidCells, cells) })),
  setRows: (rows) => set((state) => ({ ...state, rows })),
  setSelectedRows: (rowIndexes) => set((state) => ({ ...state, selectedRows: rowIndexes })),
  setSelectedCells: (cells) => set((state) => ({ ...state, selectedCells: cells })),
}));
