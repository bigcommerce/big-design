import React, { useContext } from 'react';

import { TableSectionContext } from '../context';

import { StyledTableCell, StyledTableHeader } from './styled';

export interface TableCellProps extends React.TableHTMLAttributes<HTMLTableCellElement> {
  colSpan?: number;
  isCheckbox?: boolean;
  format?(): any;
}

export const TableCell: React.FC<TableCellProps> = ({ className, style, ...props }) => {
  const context = useContext(TableSectionContext);

  if (context === 'thead') {
    return <StyledTableHeader {...props} />;
  }

  return <StyledTableCell {...props} />;
};
