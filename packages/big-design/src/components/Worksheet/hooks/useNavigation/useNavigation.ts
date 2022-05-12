import { useCallback, useMemo } from 'react';

import { Cell, WorksheetItem } from '../../types';
import { useStore } from '../useStore';

interface Coordinate {
  columnIndex: number;
  rowIndex: number;
}

type Navigate = (offset: Coordinate) => void;

export const useNavigation = <T extends WorksheetItem>(selectedCell: Cell<T>) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  const rows = useStore(useMemo(() => (state) => state.rows, []));
  const columns = useStore(useMemo(() => (state) => state.columns, []));
  const hiddenRows = useStore(useMemo(() => (state) => state.hiddenRows, []));

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

  const isHidden = useCallback(
    (rowIndex: number) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const row = rows[rowIndex];
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { id } = row;

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      return hiddenRows.includes(id);
    },
    [hiddenRows, rows],
  );

  // This function will look for the next non hidden offset,
  // depending on the direction of the offset.
  const getNextOffset = useCallback(({ columnIndex, rowIndex }: Coordinate) => {
    if (rowIndex === 0) {
      if (columnIndex > 0) {
        return { columnIndex: columnIndex + 1, rowIndex };
      }

      return { columnIndex: columnIndex + 1, rowIndex };
    }

    if (rowIndex > 0) {
      return { rowIndex: rowIndex + 1, columnIndex };
    }

    return { rowIndex: rowIndex + 1, columnIndex };
  }, []);

  const navigate: Navigate = useCallback(
    (offset: Coordinate) => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (!selectedCell) {
        return;
      }

      const newPosition: Coordinate = {
        columnIndex: selectedCell.columnIndex + offset.columnIndex,
        rowIndex: selectedCell.rowIndex + offset.rowIndex,
      };

      if (isValidPosition(newPosition)) {
        if (isHidden(newPosition.rowIndex)) {
          return navigate(getNextOffset(offset));
        }

        const hash = columns[newPosition.columnIndex].hash;
        const type = columns[newPosition.columnIndex].type || 'text';
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        const value = rows[newPosition.rowIndex][hash];
        const disabled = columns[newPosition.columnIndex].disabled || false;

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const cell = { ...newPosition, disabled, hash, type, value };

        setSelectedCells([cell]);
        setSelectedRows([newPosition.rowIndex]);
      }
    },
    [
      columns,
      getNextOffset,
      isHidden,
      isValidPosition,
      rows,
      selectedCell,
      setSelectedCells,
      setSelectedRows,
    ],
  );

  return useMemo(() => ({ navigate }), [navigate]);
};
