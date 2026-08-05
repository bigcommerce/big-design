import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
import {
  draggable,
  dropTargetForElements,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { preserveOffsetOnSource } from '@atlaskit/pragmatic-drag-and-drop/element/preserve-offset-on-source';
import { setCustomNativeDragPreview } from '@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview';
import { attachClosestEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
import { announce } from '@atlaskit/pragmatic-drag-and-drop-live-region';
import { ChevronRightIcon, DragIndicatorIcon, ExpandMoreIcon } from '@bigcommerce/big-design-icons';
import React, { ComponentPropsWithoutRef, ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { typedMemo } from '../../../utils';
import { MessagingButton } from '../../Button/private';
import { Checkbox } from '../../Checkbox';
import { Flex } from '../../Flex';
import { FlexedProps } from '../../Flex/types';
import { DataCell } from '../DataCell';
import { TableColumn, TableItem, TableSelectable } from '../types';

import { StyledDragHandle, StyledDragPreview, StyledTableRow } from './styled';
import { useRowState } from './useRowState';

const ALIGN_MAP: Record<string, FlexedProps['justifyContent']> = {
  left: 'flex-start',
  right: 'flex-end',
  center: 'center',
};

export interface RowProps<T> extends ComponentPropsWithoutRef<'tr'> {
  columns: Array<TableColumn<T>>;
  index: number;
  isDraggable: boolean;
  isExpanded?: boolean;
  isExpandable?: boolean;
  isHidden?: boolean;
  isParentRow?: boolean;
  isPhantom?: boolean;
  isSelected?: boolean;
  isSelectable?: boolean;
  item: T;
  itemCount: number;
  selectedItems: TableSelectable['selectedItems'];
  showDragIcon?: boolean;
  tableId: string;
  isChildrenRowsSelectable?: TableSelectable['isChildrenRowsSelectable'];
  onExpandedRow?: () => void;
  onItemSelect: () => void;
  onRowDrop?(from: number, to: number): void;
  parentRowId: string;
  childRowId?: string;
  childrenRowsIds: string[];
}

const InternalRow = <T extends TableItem>({
  childRowId,
  childrenRowsIds,
  columns,
  index,
  isChildrenRowsSelectable = false,
  isDraggable,
  isExpandable = false,
  isExpanded = false,
  isHidden = false,
  isParentRow = false,
  isPhantom = false,
  isSelectable = false,
  isSelected = false,
  item,
  itemCount,
  onExpandedRow,
  onItemSelect,
  onRowDrop,
  parentRowId,
  selectedItems,
  showDragIcon = false,
  tableId,
  ...rest
}: RowProps<T>) => {
  const { hasChildrenRows, isChecked, isIndeterminate, label } = useRowState({
    isParentRow,
    isSelected,
    selectedItems,
    isChildrenRowsSelectable,
    childrenRowsIds,
  });

  const rowRef = useRef<HTMLTableRowElement | null>(null);
  const dragHandleRef = useRef<HTMLButtonElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isGrabbed, setIsGrabbed] = useState(false);
  const [dragPreview, setDragPreview] = useState<{ container: HTMLElement; width: number } | null>(
    null,
  );

  const canDrag = isParentRow && isDraggable && !isPhantom;

  useEffect(() => {
    const rowElement = rowRef.current;
    const dragHandleElement = dragHandleRef.current;

    if (!canDrag || !rowElement || !dragHandleElement) {
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
  }, [canDrag, index, tableId]);

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

  const renderSelectDataCell = () => {
    if (isSelectable && isParentRow) {
      return (
        <DataCell isCheckbox={true} isExpandable={isExpandable} key="data-checkbox" width={10}>
          <Checkbox
            checked={isChecked}
            hiddenLabel
            isIndeterminate={isIndeterminate}
            label={label}
            onChange={onItemSelect}
            width={0}
          />
        </DataCell>
      );
    }

    return null;
  };
  const renderDragIconCell = () => {
    if (!showDragIcon || !isParentRow) {
      return null;
    }

    if (isPhantom) {
      return (
        <DataCell padding="small">
          <DragIndicatorIcon />
        </DataCell>
      );
    }

    return (
      <DataCell padding="small">
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
      </DataCell>
    );
  };
  const renderExpandedIconCell = () => {
    if (isExpandable && isParentRow && hasChildrenRows) {
      const needsHorizontalPadding = !isSelectable && !isDraggable;

      return (
        <DataCell align="center" paddingHorizontal={needsHorizontalPadding ? 'small' : 'none'}>
          <MessagingButton
            iconOnly={isExpanded ? <ExpandMoreIcon /> : <ChevronRightIcon />}
            onClick={onExpandedRow}
            type="button"
            variant="subtle"
          />
        </DataCell>
      );
    }

    return null;
  };
  const renderExtraCellsForParentRow = (): ReactNode[] => {
    if (!hasChildrenRows) {
      return [<DataCell key={`parent-extra-cell-${parentRowId}-1`} />];
    }

    return [];
  };
  const renderExtraCellsForChildRow = () => {
    const extraDataCells: ReactNode[] = [<DataCell key={`child-extra-cell-${childRowId}-0`} />];

    if (isDraggable) {
      extraDataCells.push(<DataCell key={`child-extra-cell-${childRowId}-1`} />);
    }

    if (isSelectable) {
      extraDataCells.push(<DataCell key={`child-extra-cell-${childRowId}-2`} />);
    }

    return extraDataCells;
  };

  const dataCells = columns.map(
    (
      { render: CellContent, align, display, verticalAlign, width, withPadding = true },
      columnIndex,
    ) => (
      <DataCell
        align={align}
        display={display}
        key={columnIndex}
        padding={withPadding ? 'small' : 'none'}
        verticalAlign={verticalAlign}
        width={width}
      >
        <Flex alignItems="center" flexDirection="row" justifyContent={align && ALIGN_MAP[align]}>
          {columnIndex === 0 && !isParentRow && isChildrenRowsSelectable && (
            <Checkbox
              checked={isSelected}
              hiddenLabel
              label={label}
              onChange={onItemSelect}
              width={0}
            />
          )}
          <CellContent {...item} />
        </Flex>
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
                  <DataCell padding="small">
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
        {renderDragIconCell()}
        {isParentRow && renderSelectDataCell()}
        {renderExpandedIconCell()}
        {isParentRow && isExpandable && renderExtraCellsForParentRow()}
        {isExpandable && !isParentRow && renderExtraCellsForChildRow()}
        {dataCells}
      </StyledTableRow>

      {dragPreviewPortal}
    </>
  );
};

export const Row = typedMemo(InternalRow);
