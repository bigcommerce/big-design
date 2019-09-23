import React from 'react';

import { TableSectionContext } from '../context';

import { StyledTableHead } from './styled';

export type TableHeadProps = React.TableHTMLAttributes<HTMLTableSectionElement>;

export const TableHead: React.FC<TableHeadProps> = ({ className, style, ...props }) => (
  <TableSectionContext.Provider value="thead">
    <StyledTableHead {...props} />
  </TableSectionContext.Provider>
);
