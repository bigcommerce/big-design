import React, { useContext } from 'react';

import { TableContext, TableSectionContext } from '../context';

import { StyledTableCell, StyledTableHeader } from './styled';

export interface TableCellProps extends React.TableHTMLAttributes<HTMLTableCellElement> {
  align?: 'left' | 'center' | 'right';
  colSpan?: number;
  isCheckbox?: boolean;
  minWidth?: number;
}

export const TableCell: React.FC<TableCellProps> = ({ className, style, ...props }) => {
  const tableContext = useContext(TableContext);
  const tableSectionContext = useContext(TableSectionContext);

  if (tableSectionContext === 'thead') {
    return <StyledTableHeader stickyHeader={tableContext.stickyHeader} {...props} />;
  }

  return <StyledTableCell {...props} />;
};
