import React, { memo } from 'react';

import { StyledTableDataCell, StyledTableDataCheckbox } from './styled';

export interface DataCellProps extends React.TableHTMLAttributes<HTMLTableCellElement> {
  align?: 'left' | 'center' | 'right';
  isCheckbox?: boolean;
  verticalAlign?: 'top' | 'center';
  width?: number | string;
  withPadding?: boolean;
}

export const DataCell: React.FC<DataCellProps> = memo(
  ({ align, children, isCheckbox, verticalAlign, width, withPadding = true }: DataCellProps) => {
    return isCheckbox ? (
      <StyledTableDataCheckbox align={align} width={width}>
        {children}
      </StyledTableDataCheckbox>
    ) : (
      <StyledTableDataCell align={align} verticalAlign={verticalAlign} width={width} withPadding={withPadding}>
        {children}
      </StyledTableDataCell>
    );
  },
);
