import React, { useContext, useEffect, useState } from 'react';

import { Checkbox } from '../../Checkbox';
import { TableContext, TableSectionContext } from '../context';
import { TableCell } from '../Cell/Cell';

import { StyledTableRow } from './styled';

export interface TableRowProps extends React.TableHTMLAttributes<HTMLTableRowElement> {
  selected?: boolean;
}

export const TableRow: React.FC<TableRowProps> = ({ children, selected, ...props }) => {
  const tableContext = useContext(TableContext);
  const tableSectionContext = useContext(TableSectionContext);
  const [isSelected, setIsSelected] = useState(selected);
  const noop = () => {}; // tslint:disable-line

  useEffect(() => {
    setIsSelected(selected);
  }, [selected]);

  return (
    <StyledTableRow selected={isSelected} {...props}>
      {tableContext.selectable ? (
        <TableCell isCheckbox>
          {tableSectionContext === 'tbody' ? (
            <Checkbox label={false} checked={isSelected} onClick={() => setIsSelected(!isSelected)} onChange={noop} />
          ) : null}
        </TableCell>
      ) : null}
      {children}
    </StyledTableRow>
  );
};

TableRow.defaultProps = { selected: false };
