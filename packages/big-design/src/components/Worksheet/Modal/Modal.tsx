import React, { lazy, Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { useShallow } from 'zustand/shallow';

import { typedMemo } from '../../../utils';
import { Modal } from '../../Modal';
import { useTableFocus, useUpdateItems, useWorksheetStore } from '../hooks';
import { WorksheetItem, WorksheetModalColumn, WorksheetMultilineTextColumn } from '../types';

const LazyWysiwygEditor = lazy(() =>
  import('../editors/MultilineTextEditor/WysiwygEditor/WysiwygEditor').then((mod) => ({
    default: mod.WysiwygEditor,
  })),
);

interface WorksheetModalProps<Item> {
  column: WorksheetModalColumn<Item> | WorksheetMultilineTextColumn<Item>;
}

function isMultilineTextColumn<T>(
  column: WorksheetModalColumn<T> | WorksheetMultilineTextColumn<T>,
): column is WorksheetMultilineTextColumn<T> {
  return column.type === 'multilineText';
}

function isModalColumn<T>(
  column: WorksheetModalColumn<T> | WorksheetMultilineTextColumn<T>,
): column is WorksheetModalColumn<T> {
  return column.type === 'modal';
}

const InternalWorksheetModal = <T extends WorksheetItem>({ column }: WorksheetModalProps<T>) => {
  const { hash, type } = column;
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

  const row = useStore(
    store,
    useShallow((state) => (selectedCell ? state.rows[selectedCell.rowIndex] : null)),
  );

  const header = useMemo(() => {
    const headerConfig = column.config?.header;

    if (type === 'multilineText' && typeof headerConfig === 'function' && row) {
      return headerConfig(row);
    }

    return typeof headerConfig === 'string' ? headerConfig : undefined;
  }, [column.config?.header, row, type]);

  const saveActionText = column.config?.saveActionText ?? 'Save';
  const cancelActionText = column.config?.cancelActionText ?? 'Cancel';

  const renderedContent = useMemo(() => {
    const onChange = (newValue: unknown) => {
      if (newValue !== undefined) {
        setNewValue(newValue);
      }
    };

    if (!selectedCell) {
      return null;
    }

    if (isMultilineTextColumn(column)) {
      return (
        <Suspense fallback={null}>
          <LazyWysiwygEditor
            label={column.config?.label}
            onChange={(value: string) => onChange(value)}
            value={String(selectedCell.value ?? '')}
          />
        </Suspense>
      );
    }

    if (isModalColumn(column)) {
      return column.config.render(selectedCell.value, onChange);
    }

    return null;
  }, [column, selectedCell]);

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
