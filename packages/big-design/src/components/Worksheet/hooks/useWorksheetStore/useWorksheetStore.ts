import { useContext } from 'react';
import { createStore, useStore } from 'zustand';

import {
  Cell,
  DisabledRows,
  ExpandableRows,
  InternalWorksheetColumn,
  WorksheetItem,
} from '../../types';
import { deleteCells, getCellsMap, getHiddenRows, mergeCells } from '../../utils';
import { WorksheetContext } from '../../Worksheet';
import { EditingCellsArgs } from '../useKeyEvents';

export interface SetEditingCellArgs<T> extends EditingCellsArgs {
  cell: Cell<T> | null;
}

export interface BaseState<Item> {
  columns: Array<InternalWorksheetColumn<Item>>;
  editedCells: Array<Cell<Item>>;
  editedCellsMap: Record<string, Cell<Item>>;
  editingCell: Cell<Item> | null;
  isMetaKey: boolean;
  isShiftPressed: boolean;
  isAutoFillActive: boolean;
  isSelectingActive: boolean;
  isBlockedFillOut: boolean;
  isControlKey: boolean;
  editWithValue: string;
  expandableRows: ExpandableRows;
  disabledRows: DisabledRows;
  hiddenRows: Array<string | number>;
  invalidCells: Array<Cell<Item>>;
  invalidCellsMap: Record<string, Cell<Item>>;
  openedModal: keyof Item | null;
  rows: Item[];
  selectedCells: Array<Cell<Item>>;
  selectedCellsMap: Record<string, Cell<Item>>;
  selectedRows: number[];
  tableRef: HTMLTableElement | null;
  addEditedCells: (cells: Array<Cell<Item>>) => void;
  addInvalidCells: (cells: Array<Cell<Item>>) => void;
  removeInvalidCells: (cells: Array<Cell<Item>>) => void;
  resetInvalidCells: () => void;
  setColumns: (columns: Array<InternalWorksheetColumn<Item>>) => void;
  setExpandableRows: (
    expandableRows: ExpandableRows,
    defaultExpandedRows?: Array<string | number>,
  ) => void;
  setEditingCell: ({
    cell,
    isMetaKey,
    isControlKey,
    editWithValue,
  }: SetEditingCellArgs<Item>) => void;
  setShiftPressed: (ShiftPressed: boolean) => void;
  setDisabledRows: (disabledRows: DisabledRows) => void;
  setHiddenRows: (hiddenRow: Array<string | number>) => void;
  setOpenModal: (value: keyof Item | null) => void;
  setRows: (rows: Item[]) => void;
  setSelectedCells: (cells: Array<Cell<Item>>) => void;
  setSelectedRows: (rows: number[]) => void;
  setTableRef: (ref: HTMLTableElement | null) => void;
  setAutoFillActive: (isActive: boolean) => void;
  setSelectingActive: (isActive: boolean) => void;
  setBlockFillOut: (isBlocked: boolean) => void;
}

export const createWorksheetStore = <Item extends WorksheetItem>() =>
  createStore<BaseState<Item>>((set) => ({
    columns: [],
    editedCells: [],
    editedCellsMap: {},
    editingCell: null,
    isMetaKey: false,
    isShiftPressed: false,
    isAutoFillActive: false,
    isSelectingActive: false,
    isBlockedFillOut: false,
    isControlKey: false,
    editWithValue: '',
    expandableRows: {},
    disabledRows: [],
    hiddenRows: [],
    invalidCells: [],
    invalidCellsMap: {},
    openedModal: null,
    rows: [],
    selectedCells: [],
    selectedCellsMap: {},
    selectedRows: [],
    tableRef: null,
    addEditedCells: (cells) =>
      set((state) => {
        const editedCells = mergeCells(state.editedCells, cells);

        return { ...state, editedCells, editedCellsMap: getCellsMap(editedCells) };
      }),
    addInvalidCells: (cells) =>
      set((state) => {
        const invalidCells = mergeCells(state.invalidCells, cells);

        return { ...state, invalidCells, invalidCellsMap: getCellsMap(invalidCells) };
      }),
    removeInvalidCells: (cells) =>
      set((state) => {
        const invalidCells = deleteCells(state.invalidCells, cells);

        return { ...state, invalidCells, invalidCellsMap: getCellsMap(invalidCells) };
      }),
    resetInvalidCells: () => set((state) => ({ ...state, invalidCells: [], invalidCellsMap: {} })),
    setColumns: (columns) => set((state) => ({ ...state, columns })),
    setExpandableRows: (expandableRows, defaultExpandedRows) =>
      set((state) => ({
        ...state,
        expandableRows,
        hiddenRows: getHiddenRows(expandableRows, defaultExpandedRows),
      })),
    setEditingCell: ({ cell, isMetaKey = false, isControlKey = false, editWithValue = '' }) => {
      set((state) => {
        return { ...state, editingCell: cell, isMetaKey, isControlKey, editWithValue };
      });
    },
    setShiftPressed: (isShiftPressed: boolean) => set((state) => ({ ...state, isShiftPressed })),
    setDisabledRows: (disabledRows) => set((state) => ({ ...state, disabledRows })),
    setHiddenRows: (hiddenRows) => set((state) => ({ ...state, hiddenRows })),
    setOpenModal: (value) => set((state) => ({ ...state, openedModal: value })),
    setRows: (rows) => set((state) => ({ ...state, rows })),
    setSelectedCells: (cells) =>
      set((state) => ({ ...state, selectedCells: cells, selectedCellsMap: getCellsMap(cells) })),
    setSelectedRows: (rowIndexes) => set((state) => ({ ...state, selectedRows: rowIndexes })),
    setTableRef: (ref) => set((state) => ({ ...state, tableRef: ref })),
    setAutoFillActive: (isActive) => set((state) => ({ ...state, isAutoFillActive: isActive })),
    setSelectingActive: (isActive) => set((state) => ({ ...state, isSelectingActive: isActive })),
    setBlockFillOut: (isBlock) => set((state) => ({ ...state, isBlockedFillOut: isBlock })),
  }));

export const useWorksheetStore = () => {
  const store = useContext(WorksheetContext);

  if (!store) {
    throw new Error('Worksheet store value is null');
  }

  return { store, useStore };
};
