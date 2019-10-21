import React, { memo } from 'react';

import { StyledTableRow } from './styled';

export interface RowProps extends React.TableHTMLAttributes<HTMLTableRowElement> {
  selected?: boolean;
}

export const Row: React.FC<RowProps> = memo(({ children, selected = false }) => {
  return <StyledTableRow selected={selected}>{children}</StyledTableRow>;
});
