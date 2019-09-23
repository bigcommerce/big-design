import React from 'react';

import { TableSectionContext } from '../context';

import { StyledTableBody } from './styled';

export interface TableBodyProps extends React.TableHTMLAttributes<HTMLTableSectionElement> {}

export const TableBody: React.FC<TableBodyProps> = ({ className, style, ...props }) => (
  <TableSectionContext.Provider value="tbody">
    <StyledTableBody {...props} />
  </TableSectionContext.Provider>
);
