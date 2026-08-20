import {
  draggable,
  dropTargetForElements,
} from '@atlaskit/pragmatic-drag-and-drop/adapter/element-adapter';
import { combine } from '@atlaskit/pragmatic-drag-and-drop/utils/combine';
import { preserveOffsetOnSource } from '@atlaskit/pragmatic-drag-and-drop/utils/preserve-offset-on-source';
import { setCustomNativeDragPreview } from '@atlaskit/pragmatic-drag-and-drop/utils/set-custom-native-drag-preview';
import { attachClosestEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
import { announce } from '@atlaskit/pragmatic-drag-and-drop-live-region';
import { DragIndicatorIcon } from '@bigcommerce/big-design-icons';
import React, { type ComponentPropsWithoutRef, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { typedMemo } from '../../../utils';
import { Checkbox } from '../../Checkbox';
import { DataCell } from '../DataCell';
import type { TableColumn, TableItem } from '../types';

import { StyledDragHandle, StyledDragPreview, StyledTableRow } from './styled';

export interface RowProps<T> extends ComponentPropsWithoutRef<'tr'> {
  columns: Array<TableColumn<T>>;
  index: number;
  item: T;
  itemCount: number;
  isHidden?: boolean;
  isPhantom?: boolean;
  isSelected?: boolean;
  isSelectable?: boolean;
  showDragIcon?: boolean;
  tableId: string;
  onItemSelect?(item: T): void;
  onRowDrop?(from: number, to: number): void;
}

const InternalRow = <T extends TableItem>({
  columns,
  index,
  isHidden = false,
  isPhantom = false,
  isSelectable = false,
  isSelected = false,
  item,
  itemCount,
  showDragIcon = false,
  tableId,
  onItemSelect,
  onRowDrop,
  ...rest
}: RowProps<T>) => {
  const rowRef = useRef<HTMLTableRowElement | null>(null);
  const dragHandleRef = useRef<HTMLButtonElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isGrabbed, setIsGrabbed] = useState(false);
  const [dragPreview, setDragPreview] = useState<{ container: HTMLElement; width: number } | null>(
    null,
  );

  useEffect(() => {
    const rowElement = rowRef.current;
    const dragHandleElement = dragHandleRef.current;

    if (isPhantom || !showDragIcon || !rowElement || !dragHandleElement) {
      return;
    }

    /* istanbul ignore next -- pointer drag callbacks only run in a real browser */
    return combine(
      draggable({
        element: rowElement,
        dragHandle: dragHandleElement,
        getInitialData: () => ({ index, tableId }),
        onGenerateDragPreview: ({ location, nativeSetDragImage }) => {
          const { width } = rowElement.getBoundingClientRect();

          setCustomNativeDragPreview({
            nativeSetDragImage,
            getOffset: preserveOffsetOnSource({
              element: rowElement,
              input: location.current.input,
            }),
            render: ({ container }) => {
              setDragPreview({ container, width });

              return () => setDragPreview(null);
            },
          });
        },
        onDragStart: () => setIsDragging(true),
        onDrop: () => setIsDragging(false),
      }),
      dropTargetForElements({
        element: rowElement,
        canDrop: ({ source }) => source.data.tableId === tableId,
        getData: ({ input, element }) =>
          attachClosestEdge({ index }, { element, input, allowedEdges: ['top', 'bottom'] }),
        getIsSticky: () => true,
      }),
    );
  }, [index, isPhantom, showDragIcon, tableId]);

  const onChange = () => {
    if (onItemSelect) {
      onItemSelect(item);
    }
  };

  const onDragHandleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    /* istanbul ignore next -- defensive: the handle only renders when onRowDrop is set */
    if (typeof onRowDrop !== 'function') {
      return;
    }

    const { key } = event;

    if (key === ' ' || key === 'Enter') {
      event.preventDefault();

      const nextGrabbed = !isGrabbed;

      setIsGrabbed(nextGrabbed);
      announce(
        nextGrabbed
          ? `Grabbed row ${index + 1} of ${itemCount}. Use the arrow keys to move, space to drop.`
          : `Dropped row at position ${index + 1} of ${itemCount}.`,
      );

      return;
    }

    if (!isGrabbed) {
      return;
    }

    if (key === 'ArrowUp' && index > 0) {
      event.preventDefault();
      onRowDrop(index, index - 1);
      announce(`Moved row to position ${index} of ${itemCount}.`);
    } else if (key === 'ArrowDown' && index < itemCount - 1) {
      event.preventDefault();
      onRowDrop(index, index + 1);
      announce(`Moved row to position ${index + 2} of ${itemCount}.`);
    } else if (key === 'Escape') {
      event.preventDefault();
      setIsGrabbed(false);
      announce('Movement cancelled.');
    }
  };

  const label = isSelected ? `Selected` : `Unselected`;

  const dataCells: React.ReactNode[] = columns.map(
    (
      { render: CellContent, align, display, verticalAlign, width, withPadding = true },
      columnIndex,
    ) => (
      <DataCell
        align={align}
        display={display}
        key={columnIndex}
        verticalAlign={verticalAlign}
        width={width}
        withPadding={withPadding}
      >
        <CellContent {...item} />
      </DataCell>
    ),
  );

  /* istanbul ignore next -- the custom drag preview only renders during a real browser drag */
  const dragPreviewPortal =
    dragPreview !== null
      ? createPortal(
          <StyledDragPreview style={{ width: dragPreview.width }}>
            <tbody>
              <tr>
                {showDragIcon && (
                  <DataCell>
                    <DragIndicatorIcon />
                  </DataCell>
                )}
                {dataCells}
              </tr>
            </tbody>
          </StyledDragPreview>,
          dragPreview.container,
        )
      : null;

  return (
    <>
      <StyledTableRow
        $isDragging={isDragging}
        $isGrabbed={isGrabbed}
        $isHidden={isHidden}
        $isPhantom={isPhantom}
        $isSelected={isSelected}
        ref={rowRef}
        {...rest}
      >
        {showDragIcon && (
          <DataCell>
            {isPhantom ? (
              <DragIndicatorIcon />
            ) : (
              <StyledDragHandle
                aria-label={`Reorder row ${index + 1} of ${itemCount}`}
                aria-pressed={isGrabbed}
                onBlur={() => setIsGrabbed(false)}
                onKeyDown={onDragHandleKeyDown}
                ref={dragHandleRef}
                type="button"
              >
                <DragIndicatorIcon />
              </StyledDragHandle>
            )}
          </DataCell>
        )}
        {isSelectable && (
          <DataCell isCheckbox={true} key="data-checkbox">
            <Checkbox checked={isSelected} hiddenLabel label={label} onChange={onChange} />
          </DataCell>
        )}

        {dataCells}
      </StyledTableRow>

      {dragPreviewPortal}
    </>
  );
};

export const Row = typedMemo(InternalRow);
