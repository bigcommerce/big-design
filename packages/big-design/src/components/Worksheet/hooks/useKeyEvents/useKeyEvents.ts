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
  const isEditing = useStore(
    store,

    useMemo(() => (state) => state.editingCell !== null, []),
  );
  const setEditingCell = useStore(store, (state) => state.setEditingCell);

  const { navigate } = useNavigation(selectedCell);

  const editSelectedCell = useCallback(
    ({ isMetaKey = false, isControlKey = false, editWithValue = '' }: EditingCellsArgs = {}) => {
      if (selectedCell) {
        return setEditingCell({ cell: selectedCell, isMetaKey, isControlKey, editWithValue });
      }
    },
    [selectedCell, setEditingCell],
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      const key = event.key;

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
            navigate({ rowIndex: -1, columnIndex: 0 });
            break;

          case 'ArrowDown':
            navigate({ rowIndex: 1, columnIndex: 0 });
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
    [editSelectedCell, isEditing, navigate, selectedCell],
  );

  return useMemo(() => ({ handleKeyDown }), [handleKeyDown]);
};
