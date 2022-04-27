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
    <StyledTableRow isDragging={isDragging} isSelected={isSelected} ref={forwardedRef} {...rest}>
      {showDragIcon && (
        <DataCell>
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
            {/*
          // @ts-expect-error https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20544 */}
            <CellContent {...item} />
          </DataCell>
        ),
      )}
    </StyledTableRow>
  );
};

export const Row = typedMemo(
  forwardRef<HTMLTableRowElement, RowProps<any>>((props, ref) => (
    <InternalRow {...props} forwardedRef={ref} />
  )),
);
