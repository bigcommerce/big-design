import { useCallback, useEffect, useMemo } from 'react';

import { Cell, WorksheetItem } from '../../types';
import { useUpdateItems } from '../useUpdateItems';
import { useWorksheetStore } from '../useWorksheetStore';

export const useAutoFilling = <T extends WorksheetItem>(cell: Cell<T>) => {
  const { store, useStore } = useWorksheetStore();
  const { updateItems } = useUpdateItems();

  const selectedCells = useStore(store, (state) => state.selectedCells);
  const disabledRows = useStore(store, (state) => state.disabledRows);

  const rows = useStore(
    store,
    useMemo(() => (state) => state.rows, []),
  );

  const isBlockedFillOut = useStore(
    store,
    useMemo(() => (state) => state.isBlockedFillOut, []),
  );

  const isSelectingActive = useStore(
    store,
    useMemo(() => (state) => state.isSelectingActive, []),
  );

  const isAutoFillActive = useStore(
    store,
    useMemo(() => (state) => state.isAutoFillActive, []),
  );

  const setSelectingActive = useStore(
    store,
    useMemo(() => (state) => state.setSelectingActive, []),
  );

  const setAutoFillActive = useStore(
    store,
    useMemo(() => (state) => state.setAutoFillActive, []),
  );

  const setBlockFillOut = useStore(
    store,
    useMemo(() => (state) => state.setBlockFillOut, []),
  );

  const setSelectedCells = useStore(store, (state) => state.setSelectedCells);

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
    const copySelectedCells = [...selectedCells];

    if (isAutoFillActive || isSelectingActive) {
      const isUnic = !copySelectedCells.some((editedCell) => editedCell.rowIndex === cell.rowIndex);
      const firstSelectedCell = copySelectedCells[0];

      if (firstSelectedCell && firstSelectedCell.rowIndex <= cell.rowIndex && isUnic) {
        const { columnIndex, hash, type } = firstSelectedCell;

        copySelectedCells.push({
          ...cell,
          columnIndex,
          hash,
          type,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          value: rows[cell.rowIndex][firstSelectedCell.hash],
        });
      }

      if (
        copySelectedCells.length > 1 &&
        cell.rowIndex === copySelectedCells[copySelectedCells.length - 2].rowIndex
      ) {
        copySelectedCells.pop();
      }

      setSelectedCells(copySelectedCells);
    }
  }, [cell, isAutoFillActive, isSelectingActive, rows, selectedCells, setSelectedCells]);

  useEffect(() => {
    if (!isBlockedFillOut && !isAutoFillActive && selectedCells.length > 1) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const selectedRowsIds = selectedCells.map(({ rowIndex }) => rows[rowIndex].id);
      const availableCells = selectedCells.filter(
        ({ rowIndex }) => !disabledRows.includes(selectedRowsIds[rowIndex]),
      );

      updateItems(
        availableCells,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        availableCells.map(({ hash }) => rows[selectedCells[0].rowIndex][hash]),
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
