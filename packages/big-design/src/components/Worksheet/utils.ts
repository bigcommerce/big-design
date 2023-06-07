import { Cell, ExpandableRows, WorksheetError, WorksheetItem } from './types';

export const mergeCells = <T extends WorksheetItem>(
  oldCells: Array<Cell<T>>,
  newCells: Array<Cell<T>>,
) =>
  newCells.reduce(
    (accum, newCell) => {
      const index = oldCells.findIndex(
        (oldCell) =>
          oldCell.rowIndex === newCell.rowIndex && oldCell.columnIndex === newCell.columnIndex,
      );

      if (index > -1) {
        accum[index] = newCell;

        return accum;
      }

      return accum.concat(newCell);
    },
    [...oldCells], // Note: returns a new array every time
  );

export const deleteCells = <T extends WorksheetItem>(
  oldCells: Array<Cell<T>>,
  newCells: Array<Cell<T>>,
) =>
  oldCells.filter(
    (oldCell) =>
      !newCells.find(
        (newCell) =>
          newCell.columnIndex === oldCell.columnIndex && newCell.rowIndex === oldCell.rowIndex,
      ),
  );

export const editedRows = <T extends WorksheetItem>(editedCells: Array<Cell<T>>, rows: T[]) =>
  editedCells.reduce<T[]>((accum, { rowIndex }) => {
    const row = rows[rowIndex];

    // Check to see if the row already exists in accum
    if (accum.find((editedRow) => editedRow === row)) {
      return accum;
    }

    // Only append new rows
    return [...accum, row];
  }, []);

export const invalidRows = <T extends WorksheetItem>(invalidCells: Array<Cell<T>>, rows: T[]) => {
  const mapObj = new Map();

  // Create Map with each row and append errors per row
  invalidCells.forEach(({ rowIndex, hash }) => {
    const row = rows[rowIndex];

    if (mapObj.has(row)) {
      const errors = mapObj.get(row);

      mapObj.set(row, new Set([...errors, hash]));
    } else {
      mapObj.set(row, new Set([hash]));
    }
  });

  return Array.from(mapObj).map<WorksheetError<T>>(([item, errors]) => ({
    item,
    errors: Array.from(errors),
  }));
};

export const getHiddenRows = (
  expandableRows: ExpandableRows,
  defaultExpandedRows: Array<string | number> = [],
) =>
  Object.entries(expandableRows).reduce<Array<string | number>>(
    (accum, [key, value]) =>
      defaultExpandedRows.map(String).includes(key) ? accum : [...accum, ...value],
    [],
  );

export const getCellIdx = <T extends WorksheetItem>({ columnIndex, rowIndex }: Cell<T>) =>
  `${rowIndex}_${columnIndex}`;

export const getCellsMap = <T extends WorksheetItem>(cells: Array<Cell<T>>) =>
  cells.reduce(
    (acc, cell) => ({
      ...acc,
      [getCellIdx(cell)]: cell,
    }),
    {},
  );
