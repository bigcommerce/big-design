import React, { ComponentPropsWithoutRef, memo } from 'react';

import { TableColumnDisplayProps } from '../helpers';

import { StyledTableDataCell, StyledTableDataCheckbox, StyledTableActionCell } from './styled';

export interface DataCellProps extends ComponentPropsWithoutRef<'td'>, TableColumnDisplayProps {
  align?: 'left' | 'center' | 'right';
  children?: React.ReactNode;
  isCheckbox?: boolean;
  verticalAlign?: 'top' | 'middle';
  width?: number | string;
  withBorder?: boolean;
  withPadding?: boolean;
  colSpan?: number;
  rowSpan?: number;
  header?: string;
  isAction?: boolean;
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
    colSpan,
    rowSpan,
    header,
    isAction = false,
  }: DataCellProps) => {
    console.log(isAction, 'isAction');
    return isCheckbox ? (
      <StyledTableDataCheckbox
        align={align}
        display={display}
        width={width}
        withBorder={withBorder}
        colSpan={colSpan}
        rowSpan={rowSpan}
        verticalAlign={verticalAlign}
      >
        {children}
      </StyledTableDataCheckbox>
    ) : isAction ? (
      <StyledTableActionCell
        align={align}
        display={display}
        verticalAlign={verticalAlign}
        width={width}
        withBorder={withBorder}
        withPadding={withPadding}
        colSpan={colSpan}
        rowSpan={rowSpan}
      >
        {children}
      </StyledTableActionCell>
    ) : (
      <StyledTableDataCell
        align={align}
        display={display}
        verticalAlign={verticalAlign}
        width={width}
        withBorder={withBorder}
        withPadding={withPadding}
        colSpan={colSpan}
        rowSpan={rowSpan}
        data-header={header}
      >
        {children}
      </StyledTableDataCell>
    );
  },
);
