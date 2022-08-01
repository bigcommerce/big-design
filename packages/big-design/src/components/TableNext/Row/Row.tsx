import { ChevronRightIcon, DragIndicatorIcon, ExpandMoreIcon } from '@bigcommerce/big-design-icons';
import React, { forwardRef, ReactNode, TableHTMLAttributes } from 'react';

import { typedMemo } from '../../../utils';
import { Box } from '../../Box';
import { MessagingButton } from '../../Button/private';
import { Checkbox } from '../../Checkbox';
import { DataCell } from '../DataCell';
import { OnItemSelectFn } from '../hooks';
import { TableColumn, TableItem, TableSelectable } from '../types';

import { StyledTableRow } from './styled';
import { useRowState } from './useRowState';

interface PrivateProps {
  forwardedRef?: React.Ref<HTMLTableRowElement>;
}

export interface RowProps<T> extends TableHTMLAttributes<HTMLTableRowElement> {
  childrenRows?: T[];
  childRowIndex?: number;
  columns: Array<TableColumn<T>>;
  headerCellWidths: Array<number | string>;
  isDraggable: boolean;
  isDragging?: boolean;
  isExpanded?: boolean;
  isExpandable?: boolean;
  isParentRow?: boolean;
  isSelected?: boolean;
  isSelectable?: boolean;
  item: T;
  parentRowIndex: number;
  selectedItems: TableSelectable['selectedItems'];
  showDragIcon?: boolean;
  onExpandedRow?(parentRowIndex: number | null): void;
  onItemSelect?: OnItemSelectFn;
}

const InternalRow = <T extends TableItem>({
  childrenRows,
  childRowIndex,
  columns,
  forwardedRef,
  headerCellWidths,
  isDraggable,
  isDragging = false,
  isExpandable = false,
  isSelectable = false,
  isSelected = false,
  item,
  parentRowIndex,
  showDragIcon = false,
  onItemSelect,
  onExpandedRow,
  isExpanded = false,
  selectedItems,
  isParentRow = false,
  ...rest
}: RowProps<T> & PrivateProps) => {
  const { hasChildrenRows, isChecked, isIndeterminate, label, onChange, onExpandedChange } =
    useRowState({
      childRowIndex,
      childrenRows,
      isExpandable,
      isParentRow,
      isSelected,
      onExpandedRow,
      onItemSelect,
      selectedItems,
      parentRowIndex,
    });

  const renderSelectDataCell = () => {
    if (isSelectable && isParentRow) {
      return (
        <DataCell isCheckbox={true} isExpandable={isExpandable} key="data-checkbox" width={10}>
          <Checkbox
            checked={isChecked}
            hiddenLabel
            isIndeterminate={isIndeterminate}
            label={label}
            onChange={onChange}
            width={0}
          />
        </DataCell>
      );
    }

    return null;
  };

  const renderDragIconCell = () => {
    if (showDragIcon && isParentRow) {
      return (
        <DataCell padding="small" width={headerCellWidths[0]}>
          <DragIndicatorIcon />
        </DataCell>
      );
    }

    return null;
  };

  const renderExpandedIconCell = () => {
    if (isExpandable && isParentRow && hasChildrenRows) {
      const needsHorizontalPadding = !isSelectable && !isDraggable;

      return (
        <DataCell paddingHorizontal={needsHorizontalPadding ? 'small' : 'none'}>
          <MessagingButton
            iconOnly={isExpanded ? <ExpandMoreIcon /> : <ChevronRightIcon />}
            onClick={onExpandedChange}
            variant="subtle"
          />
        </DataCell>
      );
    }

    return null;
  };

  const renderExtraCellsForParentRow = (): ReactNode[] => {
    if (!hasChildrenRows) {
      return [<DataCell key={`parent-extra-cell-${parentRowIndex}-1`} />];
    }

    return [];
  };

  const renderExtraCellsForChildRow = () => {
    const extraDataCells: ReactNode[] = [<DataCell key={`child-extra-cell-${childRowIndex}-0`} />];

    if (isDraggable) {
      extraDataCells.push(<DataCell key={`child-extra-cell-${childRowIndex}-1`} />);
    }

    if (isSelectable) {
      extraDataCells.push(<DataCell key={`child-extra-cell-${childRowIndex}-2`} />);
    }

    return extraDataCells;
  };

  return (
    <StyledTableRow isDragging={isDragging} isSelected={isSelected} ref={forwardedRef} {...rest}>
      {renderDragIconCell()}
      {isParentRow && renderSelectDataCell()}
      {renderExpandedIconCell()}
      {isParentRow && isExpandable && renderExtraCellsForParentRow()}
      {isExpandable && !isParentRow && renderExtraCellsForChildRow()}

      {columns.map(
        (
          { render: CellContent, align, display, verticalAlign, width, withPadding = true },
          columnIndex,
        ) => {
          const cellWidth = headerCellWidths[columnIndex + 1];

          return (
            <DataCell
              align={align}
              display={display}
              key={columnIndex}
              padding={withPadding ? 'small' : 'none'}
              verticalAlign={verticalAlign}
              width={isDragging ? cellWidth : width}
            >
              <Box display="flex">
                {columnIndex === 0 && isExpandable && isSelectable && !isParentRow && (
                  <Checkbox
                    checked={isSelected}
                    hiddenLabel
                    label={label}
                    onChange={onChange}
                    width={0}
                  />
                )}
                {/*
          // @ts-expect-error https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20544 */}
                <CellContent {...item} />
              </Box>
            </DataCell>
          );
        },
      )}
    </StyledTableRow>
  );
};

export const Row = typedMemo(
  forwardRef<HTMLTableRowElement, RowProps<any>>((props, ref) => (
    <InternalRow {...props} forwardedRef={ref} />
  )),
);
