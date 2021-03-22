import { createStoreon, StoreonModule } from 'storeon';

interface RowsState {
  rowSelected: number | null;
}

interface RowsEvents {
  setRowSelected: number;
}

const RowsModule: StoreonModule<RowsState, RowsEvents> = (store) => {
  store.on('@init', () => ({ rowSelected: null }));
  store.on('setRowSelected', (state, event) => ({ rowSelected: event }));
};

interface Cell {
  rowIndex: number;
  columnIndex: number;
}

interface CellsState {
  cellSelected: Cell | null;
}

interface CellsEvents {
  setCellSelected: Cell;
}

const CellsModule: StoreonModule<CellsState, CellsEvents> = (store) => {
  store.on('@init', () => ({ cellSelected: null }));
  store.on('setCellSelected', (state, event) => ({ cellSelected: event }));
};

export type State = RowsState & CellsState;
export type Events = RowsEvents & CellsEvents;

export const store = createStoreon<State & CellsState, Events & CellsEvents>([RowsModule, CellsModule]);
