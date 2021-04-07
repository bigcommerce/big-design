import create, { State } from 'zustand';

import { Cell } from '../types';
import { deleteCells, mergeCells } from '../utils';

interface BaseState<Item> extends State {
  editedCells: Cell<Item[keyof Item]>[];
  invalidCells: Cell<Item[keyof Item]>[];
  rows: Item[];
  selectedCells: Cell<Item[keyof Item]>[];
  selectedRows: number[];
  addEditedCells: (cells: Cell<Item[keyof Item]>[]) => void;
  addInvalidCells: (cells: Cell<Item[keyof Item]>[]) => void;
  removeInvalidCells: (cells: Cell<Item[keyof Item]>[]) => void;
  setRows: (rows: Item[]) => void;
  setSelectedCells: (cells: Cell<Item[keyof Item]>[]) => void;
  setSelectedRows: (rows: number[]) => void;
}

export const useStore = create<BaseState<Record<string, any>>>((set) => ({
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
