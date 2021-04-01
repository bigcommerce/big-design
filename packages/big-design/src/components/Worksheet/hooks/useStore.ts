import create, { State } from 'zustand';

import { Cell } from '../types';
import { deleteCells, mergeCells } from '../utils';

interface BaseState extends State {
  editedCells: Cell[];
  invalidCells: Cell[];
  rows: any[]; // TODO: Can we actually get a T type here?
  selectedCells: Cell[];
  selectedRows: number[];
  addEditedCells: (cells: Cell[]) => void;
  addInvalidCells: (cells: Cell[]) => void;
  removeInvalidCells: (cells: Cell[]) => void;
  setRows: (rows: any[]) => void;
  setSelectedCells: (cells: Cell[]) => void;
  setSelectedRows: (rows: number[]) => void;
}

export const useStore = create<BaseState>((set) => ({
  editedCells: [],
  invalidCells: [],
  rows: [],
  selectedCells: [],
  selectedRows: [],
  addEditedCells: (cells) => set((state) => ({ ...state, editedCells: mergeCells(state.editedCells, cells) })),
  addInvalidCells: (cells) => set((state) => ({ ...state, invalidCells: mergeCells(state.invalidCells, cells) })),
  removeInvalidCells: (cells) => set((state) => ({ ...state, invalidCells: deleteCells(state.invalidCells, cells) })),
  setRows: (rows) => set((state) => ({ ...state, rows })),
  setSelectedCells: (cells) => set((state) => ({ ...state, selectedCells: cells })),
  setSelectedRows: (rowIndexes) => set((state) => ({ ...state, selectedRows: rowIndexes })),
}));
