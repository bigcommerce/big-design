import React, { memo } from 'react';

import { TableSectionContext } from '../context';

import { StyledTableHead } from './styled';

export type HeadProps = React.TableHTMLAttributes<HTMLTableSectionElement>;

export const Head: React.FC<HeadProps> = memo(({ className, style, ...props }) => (
  <TableSectionContext.Provider value="thead">
    <StyledTableHead {...props} />
  </TableSectionContext.Provider>
));
