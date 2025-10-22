import React, { ComponentPropsWithoutRef, memo } from 'react';

import { TableColumnDisplayProps } from '../helpers';

import { StyledTableDataCell, StyledTableDataCheckbox } from './styled';

export interface DataCellProps extends ComponentPropsWithoutRef<'td'>, TableColumnDisplayProps {
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
        align={align}
        display={display}
        width={width}
        withBorder={withBorder}
      >
        {children}
      </StyledTableDataCheckbox>
    ) : (
      <StyledTableDataCell
        align={align}
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
