import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { typedMemo } from '../../../utils';
import { Modal } from '../../Modal';
import { useStore, useTableFocus, useUpdateItems } from '../hooks';
import { WorksheetItem, WorksheetModalColumn } from '../types';

interface WorksheetModalProps<Item> {
  column: WorksheetModalColumn<Item>;
}

const InternalWorksheetModal = <T extends WorksheetItem>({ column }: WorksheetModalProps<T>) => {
  const { config, hash } = column;
  const { header, render } = config;

  const isModalOpen = useStore(useMemo(() => (state) => state.openedModal === hash, [hash]));
  const selectedCell = useStore(useMemo(() => (state) => state.selectedCells[0], []));

  const setOpenModal = useStore((state) => state.setOpenModal);
  const setEditingCell = useStore((state) => state.setEditingCell);

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
    setEditingCell(null);
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
          text: 'Cancel',
          variant: 'subtle',
          onClick: handleClose,
        },
        {
          text: 'Save',
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
