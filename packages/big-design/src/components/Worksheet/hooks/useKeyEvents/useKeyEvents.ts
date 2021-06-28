import { useCallback, useMemo } from 'react';

import { useNavigation } from '../useNavigation';
import { useStore } from '../useStore';

export const useKeyEvents = () => {
  // Get the first cell of the selected values
  const selectedCell = useStore(useMemo(() => (state) => state.selectedCells[0], []));

  const isEditing = useStore(useMemo(() => (state) => state.editingCell !== null, []));
  const setEditingCell = useStore((state) => state.setEditingCell);

  const { navigate } = useNavigation(selectedCell);

  const editSelectedCell = useCallback(() => {
    if (selectedCell) {
      setEditingCell(selectedCell);
    }
  }, [selectedCell, setEditingCell]);

  const handleKeyDown = useCallback(
    (event) => {
      const key = event.key;

      if (isEditing) {
        switch (key) {
          case 'Enter':
            navigate({ rowIndex: 1, columnIndex: 0 });
            break;
          case 'Tab':
            navigate({ rowIndex: 0, columnIndex: event.shiftKey ? -1 : 1 });
            break;
          default:
            return;
        }
      } else {
        switch (key) {
          case 'Enter':
            editSelectedCell();

            if (selectedCell && selectedCell.type === 'checkbox') {
              navigate({ rowIndex: 1, columnIndex: 0 });
            }
            break;
          case ' ':
            editSelectedCell();
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
        }

        event.preventDefault();
      }
    },
    [editSelectedCell, isEditing, navigate, selectedCell],
  );

  return useMemo(() => ({ handleKeyDown }), [handleKeyDown]);
};
