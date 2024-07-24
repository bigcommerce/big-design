import React, { useCallback, useMemo } from 'react';

import { useNavigation } from '../useNavigation';
import { useWorksheetStore } from '../useWorksheetStore';

export interface EditingCellsArgs {
  editWithValue?: string;
  isMetaKey?: boolean;
  isControlKey?: boolean;
}

export const useKeyEvents = () => {
  const { store, useStore } = useWorksheetStore();

  // Get the first cell of the selected values
  const selectedCell = useStore(
    store,
    useMemo(() => (state) => state.selectedCells[0], []),
  );

  const lastSelectedCell = useStore(
    store,
    useMemo(() => (state) => state.selectedCells[state.selectedCells.length - 1], []),
  );

  const selectedCells = useStore(
    store,
    useMemo(() => (state) => state.selectedCells, []),
  );

  const rows = useStore(
    store,
    useMemo(() => (state) => state.rows, []),
  );

  const isEditing = useStore(
    store,

    useMemo(() => (state) => state.editingCell !== null, []),
  );

  const isShiftPressed = useStore(
    store,
    useMemo(() => (state) => state.isShiftPressed, []),
  );

  const setShiftPressed = useStore(
    store,
    useMemo(() => (state) => state.setShiftPressed, []),
  );

  const setEditingCell = useStore(store, (state) => state.setEditingCell);

  const { navigate } = useNavigation(selectedCell);

  const setSelectedCells = useStore(store, (state) => state.setSelectedCells);

  const editSelectedCell = useCallback(
    ({ isMetaKey = false, isControlKey = false, editWithValue = '' }: EditingCellsArgs = {}) => {
      if (selectedCell) {
        setEditingCell({ cell: selectedCell, isMetaKey, isControlKey, editWithValue });
      }
    },
    [selectedCell, setEditingCell],
  );

  const handleKeyUp = useCallback(
    (event: React.KeyboardEvent) => {
      const key = event.key;

      if (key === 'Shift') {
        setShiftPressed(false);
      }
    },
    [setShiftPressed],
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      const key = event.key;

      if (event.metaKey || (event.key === 'c' && (event.ctrlKey || event.metaKey))) {
        return;
      }

      if (isEditing) {
        switch (key) {
          case 'Enter':
            navigate({ rowIndex: 1, columnIndex: 0 });
            break;

          case 'Tab':
            navigate({ rowIndex: 0, columnIndex: event.shiftKey ? -1 : 1 });
            break;
        }
      } else {
        switch (key) {
          case 'Enter':
            if (selectedCell && !selectedCell.disabled) {
              editSelectedCell({});

              if (selectedCell.type === 'checkbox') {
                navigate({ rowIndex: 1, columnIndex: 0 });
              }
            }

            break;

          case ' ':
            if (selectedCell && !selectedCell.disabled) {
              editSelectedCell();
            }

            break;

          case 'ArrowUp':
            if (isShiftPressed && selectedCells.length > 1) {
              setSelectedCells(selectedCells.slice(0, -1));

              break;
            }

            navigate({ rowIndex: -1, columnIndex: 0 });
            break;

          case 'ArrowDown':
            if (isShiftPressed) {
              const nextRowIdx = lastSelectedCell.rowIndex + 1;
              const nextRow = rows[nextRowIdx];

              if (nextRowIdx <= rows.length - 1) {
                setSelectedCells([
                  ...selectedCells,
                  {
                    ...lastSelectedCell,
                    rowIndex: lastSelectedCell.rowIndex + 1,
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                    value: nextRow[lastSelectedCell.hash],
                  },
                ]);
              }
            } else {
              navigate({ rowIndex: 1, columnIndex: 0 });
            }

            break;

          case 'ArrowRight':
            navigate({ rowIndex: 0, columnIndex: 1 });
            break;

          case 'Tab':
            navigate({ rowIndex: 0, columnIndex: event.shiftKey ? -1 : 1 });
            break;

          case 'ArrowLeft':
            navigate({ rowIndex: 0, columnIndex: -1 });
            break;

          case 'Meta':
            if (selectedCell) {
              editSelectedCell({ isMetaKey: true });
            }

            break;

          case 'Control':
            if (selectedCell) {
              editSelectedCell({ isControlKey: true });
            }

            break;

          case 'Shift':
            if (selectedCell) {
              setShiftPressed(true);
            }

            break;

          default:
            if (
              key !== 'Escape' &&
              key.length === 1 &&
              (selectedCell.type === 'text' || selectedCell.type === 'number')
            ) {
              event.preventDefault();
              editSelectedCell({ editWithValue: key });
            }

            break;
        }

        event.preventDefault();
      }
    },
    [
      isEditing,
      navigate,
      selectedCell,
      isShiftPressed,
      selectedCells,
      editSelectedCell,
      setSelectedCells,
      lastSelectedCell,
      rows,
      setShiftPressed,
    ],
  );

  return useMemo(() => ({ handleKeyDown, handleKeyUp }), [handleKeyDown, handleKeyUp]);
};
