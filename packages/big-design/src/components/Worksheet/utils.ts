import { Cell, WorksheetError, WorksheetItem } from './types';

export const mergeCells = <T extends WorksheetItem>(oldCells: Cell<T>[], newCells: Cell<T>[]) =>
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

export const deleteCells = <T extends WorksheetItem>(oldCells: Cell<T>[], newCells: Cell<T>[]) =>
  oldCells.filter(
    (oldCell) =>
      !newCells.find((newCell) => newCell.columnIndex === oldCell.columnIndex && newCell.rowIndex === oldCell.rowIndex),
  );

export const editedRows = <T extends WorksheetItem>(editedCells: Cell<T>[], rows: T[]) =>
  editedCells.reduce<T[]>((accum, editedCell) => {
    const row = rows[editedCell.rowIndex];

    if (accum.find((editedRow) => editedRow === row)) {
      return accum;
    } else {
      return [...accum, row];
    }
  }, []);

export const invalidRows = <T extends WorksheetItem>(invalidCells: Cell<T>[], rows: T[]) =>
  invalidCells.reduce<WorksheetError<T>[]>((accum, invalidCell) => {
    const row = rows[invalidCell.rowIndex];
    const rowIndex = accum.findIndex((invalidRow) => invalidRow.item === row);

    if (rowIndex >= 0) {
      accum[rowIndex].errors = [...accum[rowIndex].errors, invalidCell.hash];

      return accum;
    } else {
      return [...accum, { item: row, errors: [invalidCell['hash']] }];
    }
  }, []);
