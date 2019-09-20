import React, { memo, useContext, useState } from 'react';

import { Checkbox } from '../../Checkbox';
import { TableContext, TableSectionContext } from '../context';
import { TableCell } from '../Cell/Cell';

import { StyledTableRow } from './styled';

export interface TableRowProps extends React.TableHTMLAttributes<HTMLTableRowElement> {
  selected?: boolean;
  verticalAlign?: 'top' | 'bottom' | 'middle';
  onRowSelect?(selected: boolean): void;
}

export const TableRow: React.FC<TableRowProps> = memo(({ children, selected, onRowSelect, ...props }) => {
  const tableContext = useContext(TableContext);
  const tableSectionContext = useContext(TableSectionContext);
  const [isSelected, setIsSelected] = useState(selected);

  const handleSelect = () => {
    const nextValue = !isSelected;

    setIsSelected(nextValue);

    if (typeof onRowSelect === 'function') {
      onRowSelect(nextValue);
    }
  };

  return (
    <StyledTableRow selected={isSelected} {...props}>
      {tableContext.selectable ? (
        <TableCell isCheckbox>
          {tableSectionContext === 'tbody' ? (
            <Checkbox label={false} checked={isSelected} onChange={handleSelect} />
          ) : null}
        </TableCell>
      ) : null}
      {children}
    </StyledTableRow>
  );
});

TableRow.defaultProps = { selected: false };
