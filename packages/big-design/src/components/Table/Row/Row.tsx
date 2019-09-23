import React, { memo, useContext } from 'react';

import { Checkbox } from '../../Checkbox';
import { TableContext, TableSectionContext } from '../context';
import { TableCell } from '../Cell/Cell';

import { StyledTableRow } from './styled';

export interface TableRowProps extends React.TableHTMLAttributes<HTMLTableRowElement> {
  selected?: boolean;
  verticalAlign?: 'top' | 'bottom' | 'middle';
  onRowSelect?(e: React.ChangeEvent<HTMLInputElement>, nextValue?: boolean): void;
}

export const TableRow: React.FC<TableRowProps> = memo(({ children, selected = false, onRowSelect, ...props }) => {
  const tableContext = useContext(TableContext);
  const tableSectionContext = useContext(TableSectionContext);

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof onRowSelect === 'function') {
      onRowSelect(e, !selected);
    }
  };

  return (
    <StyledTableRow selected={selected} {...props}>
      {tableContext.selectable ? (
        <TableCell isCheckbox>
          {tableSectionContext === 'tbody' ? <Checkbox checked={selected} onChange={handleSelect} /> : null}
        </TableCell>
      ) : null}
      {children}
    </StyledTableRow>
  );
});
