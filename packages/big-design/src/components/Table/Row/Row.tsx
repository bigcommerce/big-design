import React, { TableHTMLAttributes } from 'react';

import { typedMemo } from '../../../utils';
import { Checkbox } from '../../Checkbox';
import { DataCell } from '../DataCell';
import { TableColumn, TableItem } from '../types';

import { StyledTableRow } from './styled';

export interface RowProps<T> extends TableHTMLAttributes<HTMLTableRowElement> {
  isSelected?: boolean;
  isSelectable?: boolean;
  item: T;
  columns: Array<TableColumn<T>>;
  onItemSelect?(item: T): void;
}

const InternalRow = <T extends TableItem>({
  columns,
  isSelectable = false,
  isSelected = false,
  item,
  onItemSelect,
}: RowProps<T>) => {
  const onChange = () => {
    if (onItemSelect) {
      onItemSelect(item);
    }
  };

  const label = isSelected ? `Selected` : `Unselected`;

  return (
    <StyledTableRow isSelected={isSelected}>
      {isSelectable && (
        <DataCell key="data-checkbox" isCheckbox={true}>
          <Checkbox checked={isSelected} hiddenLabel label={label} onChange={onChange} />
        </DataCell>
      )}

      {columns.map(({ render: CellContent, align, verticalAlign, width, withPadding = true }, columnIndex) => (
        <DataCell key={columnIndex} align={align} verticalAlign={verticalAlign} width={width} withPadding={withPadding}>
          {/* https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20544 */}
          {/*
        // @ts-ignore */}
          <CellContent {...item} />
        </DataCell>
      ))}
    </StyledTableRow>
  );
};

export const Row = typedMemo(InternalRow);
