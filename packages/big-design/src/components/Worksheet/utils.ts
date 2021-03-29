import { Cell } from './types';

export const mergeCells = (oldCells: Cell[], newCells: Cell[]) =>
  newCells.reduce(
    (accum, cell) => {
      const index = oldCells.findIndex((c) => c.rowIndex === cell.rowIndex && c.columnIndex === cell.columnIndex);

      if (index > -1) {
        accum[index] = cell;

        return accum;
      }

      return accum.concat(cell);
    },
    [...oldCells],
  );

export const deleteCells = (oldCells: Cell[], newCells: Cell[]) =>
  oldCells.filter((cell) => !newCells.find((c) => c.columnIndex === cell.columnIndex && c.rowIndex === cell.rowIndex));
