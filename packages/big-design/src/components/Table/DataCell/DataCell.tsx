import React, { memo, TableHTMLAttributes } from 'react';

import { TableColumnDisplayProps } from '../mixins';

import { StyledTableDataCell, StyledTableDataCheckbox } from './styled';

export interface DataCellProps extends TableHTMLAttributes<HTMLTableCellElement>, TableColumnDisplayProps {
  align?: 'left' | 'center' | 'right';
  colSpan?: number;
  isCheckbox?: boolean;
  verticalAlign?: 'top' | 'middle';
  width?: number | string;
  withBorder?: boolean;
  withPadding?: boolean;
}

export const DataCell: React.FC<DataCellProps> = memo(
  ({
    align,
    children,
    colSpan,
    display,
    isCheckbox,
    verticalAlign,
    width,
    withBorder = true,
    withPadding = true,
  }: DataCellProps) => {
    return isCheckbox ? (
      <StyledTableDataCheckbox align={align} display={display} width={width} withBorder={withBorder}>
        {children}
      </StyledTableDataCheckbox>
    ) : (
      <StyledTableDataCell
        align={align}
        colSpan={colSpan}
        display={display}
        verticalAlign={verticalAlign}
        width={width}
        withBorder={withBorder}
        withPadding={withPadding}
      >
        {children}
      </StyledTableDataCell>
    );
  },
);
