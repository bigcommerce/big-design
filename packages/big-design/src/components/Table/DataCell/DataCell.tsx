import React, { memo } from 'react';

import { StyledTableDataCell, StyledTableDataCheckbox } from './styled';

export interface DataCellProps extends React.TableHTMLAttributes<HTMLTableCellElement> {
  align?: 'left' | 'center' | 'right';
  isCheckbox?: boolean;
  verticalAlign?: 'top' | 'center';
  width?: number | string;
  withBorder?: boolean;
  withPadding?: boolean;
}

export const DataCell: React.FC<DataCellProps> = memo(
  ({ align, children, isCheckbox, verticalAlign, width, withBorder = true, withPadding = true }: DataCellProps) => {
    return isCheckbox ? (
      <StyledTableDataCheckbox align={align} width={width} withBorder={withBorder}>
        {children}
      </StyledTableDataCheckbox>
    ) : (
      <StyledTableDataCell
        align={align}
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
