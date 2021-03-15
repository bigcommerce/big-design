import { DragIndicatorIcon } from '@bigcommerce/big-design-icons';
import React, { forwardRef, TableHTMLAttributes } from 'react';

import { typedMemo } from '../../../utils';
import { Checkbox } from '../../Checkbox';
import { DataCell } from '../DataCell';
import { TableColumn, TableItem } from '../types';

import { StyledTableRow } from './styled';

export interface RowProps<T> extends TableHTMLAttributes<HTMLTableRowElement> {
  isDragging?: boolean;
  isSelected?: boolean;
  isSelectable?: boolean;
  item: T;
  columns: Array<TableColumn<T>>;
  showDragIcon?: boolean;
  onItemSelect?(item: T): void;
}

interface PrivateProps {
  forwardedRef?: React.Ref<HTMLTableRowElement>;
}

const InternalRow = <T extends TableItem>({
  columns,
  forwardedRef,
  isDragging = false,
  isSelectable = false,
  isSelected = false,
  item,
  showDragIcon = false,
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
    <StyledTableRow isSelected={isSelected} ref={forwardedRef} isDragging={isDragging} {...rest}>
      {showDragIcon && (
        <DataCell>
          <DragIndicatorIcon />
        </DataCell>
      )}
      {isSelectable && (
        <DataCell key="data-checkbox" isCheckbox={true}>
          <Checkbox checked={isSelected} hiddenLabel label={label} onChange={onChange} />
        </DataCell>
      )}

      {columns.map(({ render: CellContent, align, display, verticalAlign, width, withPadding = true }, columnIndex) => (
        <DataCell
          key={columnIndex}
          align={align}
          display={display}
          verticalAlign={verticalAlign}
          width={width}
          withPadding={withPadding}
        >
          {/* https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20544 */}
          {/*
        // @ts-ignore */}
          <CellContent {...item} />
        </DataCell>
      ))}
    </StyledTableRow>
  );
};

export const Row = typedMemo(
  forwardRef<HTMLTableRowElement, RowProps<any>>((props, ref) => <InternalRow {...props} forwardedRef={ref} />),
);
