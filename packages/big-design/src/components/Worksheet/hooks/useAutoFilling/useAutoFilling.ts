import { useCallback, useEffect, useMemo } from 'react';
import { useShallow } from 'zustand/shallow';

import { Cell, WorksheetItem } from '../../types';
import { useUpdateItems } from '../useUpdateItems';
import { useWorksheetStore } from '../useWorksheetStore';

export const useAutoFilling = <T extends WorksheetItem>(cell: Cell<T>) => {
  const { store, useStore } = useWorksheetStore();
  const { updateItems } = useUpdateItems();

  const selectedCells = useStore(
    store,
    useShallow((state) => state.selectedCells),
  );
  const disabledRows = useStore(
    store,
    useShallow((state) => state.disabledRows),
  );

  const rows = useStore(
    store,
    useMemo(() => (state) => state.rows, []),
  );

  const isColumnFullyEnabled = useStore(
    store,
    useShallow(
      ({ columns }) =>
        columns.find(({ hash }) => hash === selectedCells[0]?.hash)?.enabled ?? false,
    ),
  );

  const isColumnFullyDisabled = useStore(
    store,
    useShallow(
      ({ columns }) =>
        columns.find(({ hash }) => hash === selectedCells[0]?.hash)?.disabled ?? false,
    ),
  );

  const isBlockedFillOut = useStore(
    store,
    useShallow((state) => state.isBlockedFillOut),
  );

  const isSelectingActive = useStore(
    store,
    useShallow((state) => state.isSelectingActive),
  );

  const isAutoFillActive = useStore(
    store,
    useShallow((state) => state.isAutoFillActive),
  );

  const setSelectingActive = useStore(
    store,
    useShallow((state) => state.setSelectingActive),
  );

  const setAutoFillActive = useStore(
    store,
    useShallow((state) => state.setAutoFillActive),
  );

  const setBlockFillOut = useStore(
    store,
    useShallow((state) => state.setBlockFillOut),
  );

  const setSelectedCells = useStore(
    store,
    useShallow((state) => state.setSelectedCells),
  );

  const getAvailableCells = useCallback(
    (selectedRowsIds: any[]) => {
      if (isColumnFullyEnabled) {
        return selectedCells;
      }

      if (isColumnFullyDisabled) {
        return [];
      }

      return selectedCells.filter((_, idx) => !disabledRows.includes(selectedRowsIds[idx]));
    },
    [disabledRows, isColumnFullyDisabled, isColumnFullyEnabled, selectedCells],
  );

  const onFillFullColumn = useCallback(() => {
    const cells: Array<Cell<T>> = rows.reduce(
      (accum, row, idx) =>
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        idx > cell.rowIndex && !disabledRows.includes(row.id)
          ? [
              ...accum,
              {
                ...cell,
                rowIndex: idx,
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                value: row[cell.hash],
              },
            ]
          : accum,
      [],
    );

    updateItems(
      cells,
      cells.map(() => cell.value),
    );
  }, [cell, disabledRows, rows, updateItems]);

  const handleSelectedCells = useCallback(() => {
    const newSelectedCells: Array<Cell<any>> = [];

    if (isAutoFillActive || isSelectingActive) {
      const firstSelectedCell = selectedCells[0];

      if (firstSelectedCell && firstSelectedCell.rowIndex <= cell.rowIndex) {
        const { columnIndex, hash, type } = firstSelectedCell;

        for (let i = firstSelectedCell.rowIndex; i <= cell.rowIndex; i++) {
          newSelectedCells.push({
            ...cell,
            columnIndex,
            rowIndex: i,
            hash,
            type,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            value: rows[i][firstSelectedCell.hash],
          });
        }
      }

      setSelectedCells(newSelectedCells);
    }
  }, [cell, isAutoFillActive, isSelectingActive, rows, selectedCells, setSelectedCells]);

  useEffect(() => {
    if (!isBlockedFillOut && !isAutoFillActive && selectedCells.length > 1) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const selectedRowsIds = selectedCells.map(({ rowIndex }) => rows[rowIndex].id);
      const availableCells = getAvailableCells(selectedRowsIds);
      const sourceRow = rows[selectedCells[0].rowIndex];

      updateItems(
        availableCells,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        availableCells.map(({ hash }) => sourceRow[hash]),
      );

      setBlockFillOut(true);
    }
  }, [
    disabledRows,
    isAutoFillActive,
    isBlockedFillOut,
    isSelectingActive,
    rows,
    selectedCells,
    setSelectingActive,
    updateItems,
    setBlockFillOut,
    isColumnFullyEnabled,
    getAvailableCells,
  ]);

  return {
    isAutoFillActive,
    onFillFullColumn,
    setIsMouseDown: setAutoFillActive,
    setSelectingActive,
    setBlockFillOut,
    setSelectedCell: handleSelectedCells,
  };
};
