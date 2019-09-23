import React from 'react';

import { TableSectionContext } from '../context';

import { StyledTableBody } from './styled';

export interface TableBodyProps extends React.TableHTMLAttributes<HTMLTableSectionElement> {}

export const TableBody: React.FC<TableBodyProps> = ({ className, children, style, ...props }) => (
  <TableSectionContext.Provider value={'tbody'}>
    <StyledTableBody {...props}>{children}</StyledTableBody>
  </TableSectionContext.Provider>
);
