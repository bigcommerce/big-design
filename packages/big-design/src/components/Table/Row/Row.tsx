import { DragIndicatorIcon } from '@bigcommerce/big-design-icons';
import React, { ComponentPropsWithoutRef, forwardRef } from 'react';

import { typedMemo } from '../../../utils';
import { Checkbox } from '../../Checkbox';
import { DataCell } from '../DataCell';
import { TableColumn, TableItem } from '../types';

import { StyledTableRow } from './styled';

export type RowStatus = 'danger' | 'success' | 'warning' | 'info';

export interface RowProps<T> extends ComponentPropsWithoutRef<'tr'> {
  columns: Array<TableColumn<T>>;
  headerCellWidths: Array<number | string>;
  item: T;
  isDragging?: boolean;
  isSelected?: boolean;
  isSelectable?: boolean;
  showDragIcon?: boolean;
  onItemSelect?(item: T): void;
  status?: RowStatus;
}

interface PrivateProps {
  forwardedRef?: React.Ref<HTMLTableRowElement>;
}

const InternalRow = <T extends TableItem>({
  columns,
  forwardedRef,
  headerCellWidths,
  isDragging = false,
  isSelectable = false,
  isSelected = false,
  item,
  showDragIcon = false,
  status,
  onItemSelect,
  ...rest
}: RowProps<T> & PrivateProps) => {
  const onChange = () => {
    if (onItemSelect) {
      onItemSelect(item);
    }
  };

  const label = isSelected ? `Selected` : `Unselected`;

  return (
    <StyledTableRow
      isDragging={isDragging}
      isSelected={isSelected}
      ref={forwardedRef}
      status={status}
      {...rest}
    >
      {showDragIcon && (
        <DataCell width={headerCellWidths[0]}>
          <DragIndicatorIcon />
        </DataCell>
      )}
      {isSelectable && (
        <DataCell isCheckbox={true} key="data-checkbox">
          <Checkbox checked={isSelected} hiddenLabel label={label} onChange={onChange} />
        </DataCell>
      )}

      {columns.map(
        (
          {
            render: CellContent,
            align,
            display,
            verticalAlign,
            width,
            withPadding = true,
            isAction,
          },
          columnIndex,
        ) => {
          const cellWidth = headerCellWidths[columnIndex + 1];

          return (
            <DataCell
              align={align}
              display={display}
              isAction={isAction}
              key={columnIndex}
              mobileHeader={columns[columnIndex].header}
              verticalAlign={verticalAlign}
              width={isDragging ? cellWidth : width}
              withPadding={withPadding}
            >
              <CellContent {...item} />
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
