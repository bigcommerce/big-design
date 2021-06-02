import { useCallback, useMemo } from 'react';

import { Cell, WorksheetItem } from '../types';

import { useStore } from './useStore';

interface Coordinate {
  columnIndex: number;
  rowIndex: number;
}

export const useNavigation = <T extends WorksheetItem>(selectedCell: Cell<T>) => {
  const rows = useStore(useMemo(() => (state) => state.rows, []));
  const columns = useStore(useMemo(() => (state) => state.columns, []));

  const setSelectedCells = useStore((state) => state.setSelectedCells);
  const setSelectedRows = useStore((state) => state.setSelectedRows);

  const isValidPosition = useCallback(
    (position: Coordinate) => {
      const rowLength = rows.length;
      const columnsLength = columns.length;

      // Check to see if the next indexes fit inside the matrix
      return (
        position.rowIndex >= 0 &&
        position.rowIndex < rowLength &&
        position.columnIndex >= 0 &&
        position.columnIndex < columnsLength
      );
    },
    [columns, rows],
  );

  const navigate = useCallback(
    (offset: Coordinate) => {
      const newPosition: Coordinate = {
        columnIndex: selectedCell.columnIndex + offset.columnIndex,
        rowIndex: selectedCell.rowIndex + offset.rowIndex,
      };

      if (isValidPosition(newPosition)) {
        const hash = columns[newPosition.columnIndex].hash;
        const type = columns[newPosition.columnIndex].type || 'text';
        const value = rows[newPosition.rowIndex][hash];

        const cell = { ...newPosition, hash, type, value };

        setSelectedCells([cell]);
        setSelectedRows([newPosition.rowIndex]);
      }
    },
    [columns, isValidPosition, rows, selectedCell, setSelectedCells, setSelectedRows],
  );

  return useMemo(() => ({ navigate }), [navigate]);
};
