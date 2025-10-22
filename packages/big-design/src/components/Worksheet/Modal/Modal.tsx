import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useShallow } from 'zustand/shallow';

import { typedMemo } from '../../../utils';
import { Modal } from '../../Modal';
import { useTableFocus, useUpdateItems, useWorksheetStore } from '../hooks';
import { WorksheetItem, WorksheetModalColumn } from '../types';

interface WorksheetModalProps<Item> {
  readonly column: WorksheetModalColumn<Item>;
}

const InternalWorksheetModal = <T extends WorksheetItem>({ column }: WorksheetModalProps<T>) => {
  const { config, hash } = column;
  const { header, render, saveActionText = 'Save', cancelActionText = 'Cancel' } = config;
  const { store, useStore } = useWorksheetStore();

  const isModalOpen: boolean = useStore(
    store,
    useShallow((state) => state.openedModal === hash),
  );
  const selectedCell = useStore(
    store,
    useShallow((state) => state.selectedCells[0]),
  );

  const setOpenModal = useStore(
    store,
    useShallow((state) => state.setOpenModal),
  );
  const setEditingCell = useStore(
    store,
    useShallow((state) => state.setEditingCell),
  );

  const { focusTable } = useTableFocus();
  const { updateItems } = useUpdateItems();

  const [newValue, setNewValue] = useState<unknown>(null);

  useEffect(() => {
    if (selectedCell) {
      setNewValue(selectedCell.value);
    }
  }, [selectedCell]);

  const handleClose = useCallback(() => {
    setOpenModal(null);
    setEditingCell({ cell: null });
    focusTable();
  }, [focusTable, setEditingCell, setOpenModal]);

  const handleSave = useCallback(() => {
    if (selectedCell && newValue !== null && newValue !== selectedCell.value) {
      updateItems([selectedCell], [newValue]);
    }

    handleClose();
  }, [handleClose, newValue, selectedCell, updateItems]);

  const renderedContent = useMemo(() => {
    const onChange = (newValue: unknown) => {
      if (newValue !== undefined) {
        setNewValue(newValue);
      }
    };

    return selectedCell ? render(selectedCell.value, onChange) : null;
  }, [selectedCell, render]);

  return (
    <Modal
      actions={[
        {
          text: cancelActionText,
          variant: 'subtle',
          onClick: handleClose,
        },
        {
          text: saveActionText,
          onClick: handleSave,
        },
      ]}
      closeOnClickOutside={false}
      closeOnEscKey={true}
      header={header}
      isOpen={isModalOpen}
      onClose={handleClose}
    >
      {renderedContent}
    </Modal>
  );
};

export const WorksheetModal = typedMemo(InternalWorksheetModal);
