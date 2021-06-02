import create, { State } from 'zustand';

import { Cell } from '../types';
import { deleteCells, mergeCells } from '../utils';

interface BaseState<Item> extends State {
  editedCells: Array<Cell<Item>>;
  invalidCells: Array<Cell<Item>>;
  openedModal: keyof Item | null;
  rows: Item[];
  selectedCells: Array<Cell<Item>>;
  selectedRows: number[];
  addEditedCells: (cells: Array<Cell<Item>>) => void;
  addInvalidCells: (cells: Array<Cell<Item>>) => void;
  removeInvalidCells: (cells: Array<Cell<Item>>) => void;
  setOpenModal: (value: keyof Item | null) => void;
  setRows: (rows: Item[]) => void;
  setSelectedCells: (cells: Array<Cell<Item>>) => void;
  setSelectedRows: (rows: number[]) => void;
}

export const useStore = create<BaseState<any>>((set) => ({
  editedCells: [],
  invalidCells: [],
  openedModal: null,
  rows: [],
  selectedCells: [],
  selectedRows: [],
  addEditedCells: (cells) => set((state) => ({ ...state, editedCells: mergeCells(state.editedCells, cells) })),
  addInvalidCells: (cells) => set((state) => ({ ...state, invalidCells: mergeCells(state.invalidCells, cells) })),
  removeInvalidCells: (cells) => set((state) => ({ ...state, invalidCells: deleteCells(state.invalidCells, cells) })),
  setOpenModal: (value) => set((state) => ({ ...state, openedModal: value })),
  setRows: (rows) => set((state) => ({ ...state, rows })),
  setSelectedCells: (cells) => set((state) => ({ ...state, selectedCells: cells })),
  setSelectedRows: (rowIndexes) => set((state) => ({ ...state, selectedRows: rowIndexes })),
}));
