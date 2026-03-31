import React, { useCallback, useMemo } from 'react';
import { useShallow } from 'zustand/shallow';

import { typedMemo } from '../../../utils';
import { Cell } from '../Cell';
import { useWorksheetStore } from '../hooks';
import { RowStatus } from '../RowStatus';
import {
  InternalWorksheetColumn,
  WorksheetItem,
  WorksheetModalColumn,
  WorksheetMultilineTextColumn,
  WorksheetNumberColumn,
  WorksheetSelectableColumn,
  WorksheetTextColumn,
} from '../types';

interface RowProps<Item> {
  columns: Array<InternalWorksheetColumn<Item>>;
  rowIndex: number;
}

const InternalRow = <T extends WorksheetItem>({ columns, rowIndex }: RowProps<T>) => {
  const { store, useStore } = useWorksheetStore();

  const row: T = useStore(
    store,
    useShallow((state) => state.rows[rowIndex]),
  );
  const nextRow: T = useStore(
    store,
    useShallow((state) => state.rows[rowIndex + 1] || null),
  );
  const expandableRows = useStore(
    store,
    useShallow((state) => state.expandableRows),
  );

  const isExpanded = useStore(
    store,
    useShallow((state) => !state.hiddenRows.includes(row.id)),
  );
  const isDisabled = useStore(
    store,
    useShallow((state) => state.disabledRows.includes(row.id)),
  );

  const parentId = useMemo(() => {
    if (!expandableRows) {
      return;
    }

    const rowIds = Object.keys(expandableRows);

    return rowIds.find((rowId) => expandableRows[rowId].find((childId) => childId === row.id));
  }, [expandableRows, row.id]);

  const isChild = useMemo(() => parentId !== undefined, [parentId]);

  const hasAction = useCallback(
    (
      column: InternalWorksheetColumn<T>,
    ): column is WorksheetTextColumn<T> | WorksheetNumberColumn<T> => {
      return column.type === undefined || column.type === 'text' || column.type === 'number';
    },
    [],
  );

  const hasOptions = useCallback(
    (column: InternalWorksheetColumn<T>): column is WorksheetSelectableColumn<T> => {
      return column.type === 'select' || column.type === 'multiSelect';
    },
    [],
  );

  const hasFormatting = useCallback(
    (
      column: InternalWorksheetColumn<T>,
    ): column is
      | WorksheetTextColumn<T>
      | WorksheetNumberColumn<T>
      | WorksheetModalColumn<T>
      | WorksheetMultilineTextColumn<T> => {
      return (
        column.type === undefined ||
        column.type === 'text' ||
        column.type === 'number' ||
        column.type === 'modal' ||
        column.type === 'multilineText'
      );
    },
    [],
  );

  const isLastChild = useMemo(
    () =>
      expandableRows
        ? Object.values(expandableRows)
            .reduce((accum, item) => [...accum, item[item.length - 1]], [])
            .includes(row.id)
        : false,
    [expandableRows, row.id],
  );

  const getIsCellDisabled = useCallback(
    ({ enabled, disabled }: InternalWorksheetColumn<T>) => {
      if (typeof enabled === 'boolean' && enabled) {
        return false;
      }

      return disabled || isDisabled;
    },
    [isDisabled],
  );

  const getEffectiveType = useCallback(
    (column: InternalWorksheetColumn<T>) => {
      if (column.typeOverride && row) {
        const overriddenType = column.typeOverride(row);

        if (overriddenType) {
          return overriddenType;
        }
      }

      return column.type ?? 'text';
    },
    [row],
  );

  const getEffectiveFormatting = useCallback(
    (column: InternalWorksheetColumn<T>, effectiveType: string) => {
      // If type was overridden to multilineText, use formatting from typeOverrideConfig
      if (
        effectiveType === 'multilineText' &&
        column.typeOverride &&
        column.typeOverrideConfig?.multilineText?.formatting
      ) {
        return column.typeOverrideConfig.multilineText.formatting;
      }

      return hasFormatting(column) ? column.formatting : undefined;
    },
    [hasFormatting],
  );

  if (isChild && !isExpanded) {
    return null;
  }

  return (
    <tr>
      <RowStatus rowIndex={rowIndex} />
      {columns.map((column, columnIndex) => {
        const effectiveType = getEffectiveType(column);

        return (
          <Cell
            action={
              effectiveType === 'text' || effectiveType === 'number'
                ? hasAction(column)
                  ? column.action
                  : undefined
                : undefined
            }
            columnIndex={columnIndex}
            disabled={getIsCellDisabled(column)}
            formatting={getEffectiveFormatting(column, effectiveType)}
            hash={column.hash}
            isChild={isChild}
            isLastChild={isLastChild}
            key={`${rowIndex}-${columnIndex}`}
            nextRowValue={(nextRow && nextRow[column.hash]) || ''}
            notation={column.notation}
            options={hasOptions(column) ? column.config.options : undefined}
            rowId={row.id}
            rowIndex={rowIndex}
            type={effectiveType}
            validation={column.validation}
            value={row[column.hash] ?? ''}
          />
        );
      })}
    </tr>
  );
};

export const Row = typedMemo(InternalRow);
