import { Cell } from './types';

export const mergeCells = (oldCells: Cell[], newCells: Cell[]) => {
  return newCells.reduce(
    (accum, cell) => {
      const index = oldCells.findIndex((c) => c.rowIndex === cell.rowIndex && c.columnIndex === cell.columnIndex);

      if (index > -1) {
        accum[index] = cell;

        return accum;
      } else {
        return accum.concat(cell);
      }
    },
    [...oldCells],
  );
};
