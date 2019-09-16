import React from 'react';

import { TableSectionContext } from '../context';

import { StyledTableFooter } from './styled';

export type TableFooterProps = React.TableHTMLAttributes<HTMLTableSectionElement>;

export const TableFooter: React.FC<TableFooterProps> = props => (
  <TableSectionContext.Provider value={'tfoot'}>
    <StyledTableFooter {...props} />
  </TableSectionContext.Provider>
);
