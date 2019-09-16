import React, { useContext } from 'react';

import { TableContext, TableSectionContext } from '../context';
import { TableRowProps } from '../Row/Row';

import { StyledTableBody } from './styled';

export interface TableBodyProps extends React.TableHTMLAttributes<HTMLTableSectionElement> {}

export const TableBody: React.FC<TableBodyProps> = ({ className, children, style, ...props }) => {
  const tableContext = useContext(TableContext);

  const renderChildren = () => {
    return React.Children.map(children, child => {
      if (React.isValidElement(child)) {
        return React.cloneElement<TableRowProps>(child, { selected: tableContext.selectAll });
      }

      return child;
    });
  };

  return (
    <TableSectionContext.Provider value={'tbody'}>
      <StyledTableBody {...props}>{renderChildren()}</StyledTableBody>
    </TableSectionContext.Provider>
  );
};
