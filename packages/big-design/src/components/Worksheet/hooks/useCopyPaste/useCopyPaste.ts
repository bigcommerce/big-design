import { useCallback, useEffect, useMemo } from 'react';

import { Cell, InternalWorksheetColumn } from '../../types';
import { useUpdateItems } from '../useUpdateItems';
import { useWorksheetStore } from '../useWorksheetStore';

const canPasteBetweenTypes = (
  source: string,
  target: string,
  allowedTypes: Array<[string, string]>,
): boolean =>
  allowedTypes.some(
    ([sourceAllowed, targetAllowed]) => source === sourceAllowed && target === targetAllowed,
  );

const isPasteAllowed = (
  sourceCell: Cell<any>,
  targetCell: Cell<any>,
  column: InternalWorksheetColumn<any>,
): boolean => {
  const { type: sourceType, columnIndex: sourceColumnIndex } = sourceCell;
  const { type: targetType, columnIndex: targetColumnIndex } = targetCell;
  const isSameColumn = sourceColumnIndex === targetColumnIndex;

  if (column.disabled) {
    return false;
  }

  const crossPasteTypes: Array<[string, string]> = [
    ['text', 'number'],
    ['number', 'text'],
  ];

  if (canPasteBetweenTypes(sourceType, targetType, crossPasteTypes)) {
    return true;
  }

  const allowedTypes = ['text', 'number', 'checkbox'];

  return sourceType === targetType && (allowedTypes.includes(sourceType) || isSameColumn);
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

  const setSelectedCells = useStore(store, (state) => state.setSelectedCells);

  const cellsToUpdate = useMemo(() => {
    if (selectedCells.length === 0) {
      return [];
    }

    const pasteFromIdx = selectedCells[0].rowIndex;
    const cellIdxsToUpdate = Array.from(
      { length: Math.min(copiedCells.length, rows.length - pasteFromIdx) },
      (_, index) => pasteFromIdx + index,
    );

    return cellIdxsToUpdate.map((idxToUpdate) => {
      const cellHash = selectedCells[0].hash;
      const rowValues: Record<string | number | symbol, any> = rows[idxToUpdate];

      return {
        rowIndex: idxToUpdate,
        columnIndex: selectedCells[0].columnIndex,
        disabled: selectedCells[0].disabled,
        hash: selectedCells[0].hash,
        type: selectedCells[0].type,
        value: rowValues[cellHash],
      };
    });
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
          setSelectedCells([{ ...selectedCells[0], value: copiedCells[0].value }]);

          updateItems(
            cellsToUpdate.filter((cell) => !disabledRows.includes(cell.rowIndex + 1)),
            copiedCells
              .filter((_, idx) => !disabledRows.includes(cellsToUpdate[idx]?.rowIndex + 1))
              .map((cell) => cell.value),
          );
        }
      }
    },
    [
      updateItems,
      setSelectedCells,
      selectedCells,
      copiedCells,
      cellsToUpdate,
      disabledRows,
      columns,
    ],
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
