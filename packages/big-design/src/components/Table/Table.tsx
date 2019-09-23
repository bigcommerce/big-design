import React from 'react';

import { uniqueId } from '../../utils';

import { TableContext } from './context';
import { StyledTable, StyledTableFigure } from './styled';
import { TableActions, TableActionsProps } from './Actions';
import { TableBody, TableBodyProps } from './Body';
import { TableCell, TableCellProps } from './Cell';
import { TableFooter, TableFooterProps } from './Footer';
import { TableHead, TableHeadProps } from './Head';
import { TableRow, TableRowProps } from './Row';

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement & { children: React.ReactNode }> {
  selectable?: boolean;
  stickyHeader?: boolean;
}

interface Table extends React.FC<TableProps> {
  Actions: TableActionsProps;
  Body: TableBodyProps;
  Cell: TableCellProps;
  Footer: TableFooterProps;
  Head: TableHeadProps;
  Row: TableRowProps;
}

export function Table(this: Table, props: TableProps) {
  const { children, className, selectable, stickyHeader, style, ...rest } = props;

  const tableId = uniqueId('table_');
  const tableActions: React.ReactChild[] = [];

  function renderChildren() {
    return React.Children.map(children, (child, index) => {
      if (React.isValidElement(child) && child.type === Table.Actions) {
        tableActions.push(
          React.cloneElement<TableActionsProps>(child, {
            selectable,
            tableId: child.props.tableId ? child.props.tableId : tableId,
            key: index,
          }),
        );
      } else {
        return child;
      }
    });
  }

  return (
    <TableContext.Provider value={{ selectable, stickyHeader, tableId }}>
      {tableActions ? tableActions : null}
      <StyledTable id={tableId} {...rest}>
        {renderChildren()}
      </StyledTable>
    </TableContext.Provider>
  );
}

Table.Actions = TableActions;
Table.Body = TableBody;
Table.Cell = TableCell;
Table.Footer = TableFooter;
Table.Head = TableHead;
Table.Row = TableRow;

export const TableFigure: React.FC<any> = ({ className, style, ...props }) => <StyledTableFigure {...props} />;
