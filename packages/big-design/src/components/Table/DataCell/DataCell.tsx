import React, { memo, TableHTMLAttributes } from 'react';

import { TableColumnDisplayProps } from '../mixins';

import { StyledTableDataCell, StyledTableDataCheckbox } from './styled';

export interface DataCellProps
  extends TableHTMLAttributes<HTMLTableCellElement>,
    TableColumnDisplayProps {
  readonly align?: 'left' | 'center' | 'right';
  readonly children?: React.ReactNode;
  readonly isCheckbox?: boolean;
  readonly verticalAlign?: 'top' | 'middle';
  readonly width?: number | string;
  readonly withBorder?: boolean;
  readonly withPadding?: boolean;
}

export const DataCell: React.FC<DataCellProps> = memo(
  ({
    align,
    children,
    display,
    isCheckbox,
    verticalAlign,
    width,
    withBorder = true,
    withPadding = true,
  }: DataCellProps) => {
    return isCheckbox ? (
      <StyledTableDataCheckbox
        $display={display}
        $withBorder={withBorder}
        align={align}
        width={width}
      >
        {children}
      </StyledTableDataCheckbox>
    ) : (
      <StyledTableDataCell
        $display={display}
        $verticalAlign={verticalAlign}
        $withBorder={withBorder}
        $withPadding={withPadding}
        align={align}
        width={width}
      >
        {children}
      </StyledTableDataCell>
    );
  },
);
