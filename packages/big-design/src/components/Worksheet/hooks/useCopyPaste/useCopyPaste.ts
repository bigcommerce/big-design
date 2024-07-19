import { useCallback, useEffect, useMemo } from 'react';

import { Cell, InternalWorksheetColumn } from '../../types';
import { useUpdateItems } from '../useUpdateItems';
import { useWorksheetStore } from '../useWorksheetStore';

const isPasteAllowed = (
  sourceCell: Cell<any>,
  targetCell: Cell<any>,
  column: InternalWorksheetColumn<any>,
) => {
  const sourceType = sourceCell.type;
  const targetType = targetCell.type;

  if (column.disabled) {
    return false;
  }

  return (
    (sourceType === targetType &&
      (sourceType === 'text' ||
        sourceType === 'number' ||
        sourceType === 'checkbox' ||
        sourceCell.columnIndex === targetCell.columnIndex)) ||
    (sourceType === 'text' && targetType === 'number') ||
    (sourceType === 'number' && targetType === 'text')
  );
};

export const useCopyPasteHandler = () => {
  const { store, useStore } = useWorksheetStore();
  const { updateItems } = useUpdateItems();

  const selectedCells = useStore(
    store,
    useMemo(() => (state) => state.selectedCells, []),
  );

  const copiedCells = useStore(
    store,
    useMemo(() => (state) => state.copiedCells, []),
  );

  const rows = useStore(
    store,
    useMemo(() => (state) => state.rows, []),
  );

  const columns = useStore(
    store,
    useMemo(() => (state) => state.columns, []),
  );

  const disabledRows = useStore(
    store,
    useMemo(() => (state) => state.disabledRows, []),
  );

  const setCopiedCells = useStore(store, (state) => state.setCopiedCells);

  const cellsToUpdate = useMemo(() => {
    if (selectedCells.length === 0) {
      return [];
    }

    const pasteFromIdx = selectedCells[0].rowIndex;
    const cellIdxsToUpdate = Array.from(
      { length: Math.min(copiedCells.length, rows.length - pasteFromIdx) },
      (_, index) => pasteFromIdx + index,
    );

    return cellIdxsToUpdate.map((idxToUpdate) => ({
      rowIndex: idxToUpdate,
      columnIndex: selectedCells[0].columnIndex,
      disabled: selectedCells[0].disabled,
      hash: selectedCells[0].hash,
      type: selectedCells[0].type,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      value: rows[idxToUpdate][selectedCells[0].hash],
    }));
  }, [rows, selectedCells, copiedCells]);

  const handleCopy = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'c' && (e.ctrlKey || e.metaKey)) {
        setCopiedCells(selectedCells);
      }
    },
    [setCopiedCells, selectedCells],
  );

  const handlePaste = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'v' && (e.ctrlKey || e.metaKey)) {
        if (
          copiedCells[0] &&
          selectedCells[0] &&
          isPasteAllowed(copiedCells[0], selectedCells[0], columns[selectedCells[0].columnIndex])
        ) {
          updateItems(
            cellsToUpdate.filter((cell) => !disabledRows.includes(cell.rowIndex + 1)),
            copiedCells
              .filter((_, idx) => !disabledRows.includes(cellsToUpdate[idx]?.rowIndex + 1))
              .map((cell) => cell.value),
          );
        }
      }
    },
    [updateItems, selectedCells, copiedCells, cellsToUpdate, disabledRows, columns],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleCopy);
    document.addEventListener('keydown', handlePaste);

    return () => {
      document.removeEventListener('keydown', handleCopy);
      document.removeEventListener('keydown', handlePaste);
    };
  }, [handleCopy, handlePaste]);
};
