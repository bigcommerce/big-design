import { Cell } from './types';

export const mergeCells = <T extends unknown>(oldCells: Cell<T>[], newCells: Cell<T>[]) =>
  newCells.reduce(
    (accum, newCell) => {
      const index = oldCells.findIndex(
        (oldCell) => oldCell.rowIndex === newCell.rowIndex && oldCell.columnIndex === newCell.columnIndex,
      );

      if (index > -1) {
        accum[index] = newCell;

        return accum;
      }

      return accum.concat(newCell);
    },
    [...oldCells], // Note: returns a new array every time
  );

export const deleteCells = <T extends unknown>(oldCells: Cell<T>[], newCells: Cell<T>[]) =>
  oldCells.filter(
    (oldCell) =>
      !newCells.find((newCell) => newCell.columnIndex === oldCell.columnIndex && newCell.rowIndex === oldCell.rowIndex),
  );
